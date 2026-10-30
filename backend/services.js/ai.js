import { GoogleGenAI } from "@google/genai";
import { z } from "zod";
import puppeteer from "puppeteer";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});


const interviewReportJsonSchema = {
  type: "object",

  properties: {
    matchScore: {
      type: "number",
      description:
        "The match score between 0 to 100 indicating how well the candidate's profile matches the job description.",
    },

    technicalQuestions: {
      type: "array",

      items: {
        type: "object",

        properties: {
          question: {
            type: "string",
            description:
              "The technical question that can be asked in the interview.",
          },

          intention: {
            type: "string",
            description:
              "The intention behind asking this question.",
          },

          answer: {
            type: "string",
            description:
              "How to answer this question, what points to cover, and what approach to take.",
          },
        },

        required: ["question", "intention", "answer"],
      },

      description:
        "Technical questions that can be asked in the interview along with their intention and how to answer them.",
    },

    behavioralQuestions: {
      type: "array",

      items: {
        type: "object",

        properties: {
          question: {
            type: "string",
            description:
              "The behavioral question that can be asked in the interview.",
          },

          intention: {
            type: "string",
            description:
              "The intention behind asking this question.",
          },

          answer: {
            type: "string",
            description:
              "How to answer this question, what points to cover, and what approach to take.",
          },
        },

        required: ["question", "intention", "answer"],
      },

      description:
        "Behavioral questions that can be asked in the interview along with their intention and how to answer them.",
    },

    skillGaps: {
      type: "array",

      items: {
        type: "object",

        properties: {
          skill: {
            type: "string",
            description:
              "The skill that needs to be improved.",
          },

          severity: {
            type: "string",
            enum: ["high", "medium", "low"],
            description:
              "The severity of the skill gap. High means the candidate needs substantial improvement, medium means moderate improvement is needed, and low means only a little revision is needed.",
          },
        },

        required: ["skill", "severity"],
      },

      description:
        "Skill gaps that need to be improved along with their severity.",
    },

    preparationPlan: {
      type: "array",

      items: {
        type: "object",

        properties: {
          day: {
            type: "integer",
            description:
              "The day number in the preparation plan, starting from 1.",
          },

          focus: {
            type: "string",
            description:
              "The main focus of this day in the preparation plan, such as data structures and algorithms, mock interviews, databases, backend development, or system design.",
          },

          tasks: {
            type: "array",

            items: {
              type: "string",
            },

            description:
              "List of tasks to complete on this day to follow the preparation plan.",
          },
        },

        required: ["day", "focus", "tasks"],
      },

      description:
        "A day-wise preparation plan for the candidate to follow in order to prepare effectively for the interview.",
    },

    title: {
      type: "string",
      description:
        "Title of the job for which the interview is generated.",
    }
  },

  required: [
    "matchScore",
    "technicalQuestions",
    "behavioralQuestions",
    "skillGaps",
    "preparationPlan",
  ],
};



const interviewReportSchema = z.fromJSONSchema(
  interviewReportJsonSchema
);

export const generateinterviewReport = async ({
  resume,
  selfDescription,
  jobDescription,
}) => {
  try {

    const prompt = `
                    You are an expert technical interviewer and career coach.

                    Generate a detailed interview preparation report by analyzing the candidate's
                    resume, self-description, and the target job description.

                    The report must be specifically tailored to this candidate and this job.

                    Requirements:

                    1. Calculate a realistic match score between 0 and 100.
                    2. Generate multiple relevant technical interview questions based on:
                      - The candidate's actual skills
                      - The candidate's projects
                      - The technical requirements of the job
                      - Potential areas the interviewer may test
                    3. For every technical question:
                      - Explain the interviewer's intention.
                      - Explain how the candidate should answer.
                      - Mention the important points the candidate should cover.
                    4. Generate multiple relevant behavioral interview questions.
                    5. For every behavioral question:
                      - Explain the interviewer's intention.
                      - Explain how the candidate should approach the answer.
                    6. Identify meaningful skill gaps by comparing the candidate against the job requirements.
                    7. Assign each skill gap a severity of high, medium, or low.
                    8. Create a practical day-wise preparation plan.
                    9. Make the preparation plan specific to the candidate's weaknesses and the job requirements.
                    10. Keep all information relevant to the supplied resume and job description.
                    11. Do not invent professional experience that is not present in the resume.
                    12. Return ONLY the requested structured JSON response. Do not return Markdown,
                        headings, explanations, or any text outside the JSON object.

                    CANDIDATE RESUME:
                    ${resume}

                    CANDIDATE SELF DESCRIPTION:
                    ${selfDescription}

                    JOB DESCRIPTION:
                    ${jobDescription}
                    `;

    const interaction = await ai.interactions.create({
      model: "gemini-3-flash-preview",

      input: prompt,

      response_format: {
        type: "text",
        mime_type: "application/json",
        schema: interviewReportJsonSchema,
      },
    });

    const interviewReport = interviewReportSchema.parse(
      JSON.parse(interaction.output_text)
    );

    console.log("Interview Report:");
    console.dir(interviewReport, { depth: null });

    return interviewReport;

  } catch (error) {
    console.error("Gemini Interview Report Error:", error);
    throw error;
  }
};


const resumePdfJsonSchema = {
  type: "object",
  properties: {
    html: {
      "type": "string",
      description: "The HTML content of the resume which can be converted to PDF using any library like puppeteer "
    }
  },
  required: ["html"],

  additionalProperties: false
};

const resumePdfSchema = z.fromJSONSchema(
  resumePdfJsonSchema
);

const generatePdfFromHtml = async (htmlContent) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(htmlContent, { waitUntil: "networkidle0" })
  const pdfBuffer = await page.pdf({
    format: "A4", margin: {
      top: "20mm",
      bottom: "20mm",
      left: "15mm",
      right: "15mm",
    }
  });

  browser.close();

  return pdfBuffer;
}

export const generateresumePdf = async ({
  resume,
  selfDescription,
  jobDescription,
}) => {
  try {

    const prompt = `Generate a resume PDF for a candidate with the following details:
                    Resume: ${resume}
                    Self Description: ${selfDescription}
                   Job Description: ${jobDescription}

                   Here are some poitns to be follolw:
                   
                   1.The resume should not be so lenghty, it should ideally be 1 pages long when converted to PDF.
                   2.Focus on quality rather than quantity and make sure to include all the relevant  information that candidate's chances of getting an interview call for the given job description.
                   3.The format should be a JSON object with a single field named "html" which contain the HTML content of the resume which can be converted to PDF using any library like puppeteer.
                   4.The response should be tailored for the given job description & should highlight the candidate's strengths and relevant experience. The HTML content should be well-formated and structured making it easy to read and visible.
                   5.The content of resume should be not sound like its generated by AI. It should be as close as possible to a real real human-written resume.
                   6.Highlight the content uding some colors or different font style but the overall design should be simple and professional.
                   7.The content should be ATS friendly, i.e. it should be easily parsable by ATS systems without losing important information.
                 `

    const interaction = await ai.interactions.create({
      model: "gemini-3-flash-preview",

      input: prompt,

      response_format: {
        type: "text",
        mime_type: "application/json",
        schema: resumePdfJsonSchema,
      },
    });

    const jsonContent = resumePdfSchema.parse(
      JSON.parse(interaction.output_text)
    );

    console.log("Resume Pdf:");
    console.dir(jsonContent, { depth: null });

    const pdfBuffer = await generatePdfFromHtml(jsonContent.html);
    return pdfBuffer

  } catch (error) {
    console.error("Gemini Interview Report Error:", error);
    throw error;
  }
};