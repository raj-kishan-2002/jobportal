import mongoose from "mongoose";

const technicalQuestionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: [true, "Question is required"]
    },
    intention: {
      type: String,
      required: [true, "Intension is required"]
    },
    answer: {
      type: String,
      required: [true, "Answer is required"]
    }
  }, {
  _id: false
}
)

const behavioralQuestionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: [true, "Question is required"]
    },
    intention: {
      type: String,
      required: [true, "Intension is required"]
    },
    answer: {
      type: String,
      required: [true, "Answer is required"]
    }
  }, {
  _id: false
}
)

const skillGapSchema = new mongoose.Schema({
  skill: {
    type: String,
    required: [true, "Skill is required"]
  },
  severity: {
    type: String,
    enum: ["high", "medium", "low"],
    required: [true, "Severity is required"]
  }
}, {
  _id: false
})

const preprationPlanSchema = new mongoose.Schema({
  day: {
    type: Number,
    required: [true, "Day is required"]
  },
  focus: {
    type: String,
    required: [true, "Focus is required"]
  },
  tasks: [{
    type: String,
    required: [true, "Tasks is required"]
  }]
}, { _id: false })

const interviewReportSchema = new mongoose.Schema(
  {
    jobDescription: {
      type: String,
      required: [true, "Job description required"]
    },
    resume: {
      type: String,
    },
    selfDescription: {
      type: String,
    },
    matchScore: {
      type: Number,
      min: 0,
      max: 100
    },
    technicalQuestions: [technicalQuestionSchema],
    behavioralQuestions: [behavioralQuestionSchema],
    skillGaps: [skillGapSchema],
    preparationPlan: [preprationPlanSchema],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    title: {
      type: String,
      required: [true, "Title is required"]
    }
  },
  {
    timestamps: true
  }
)

export const Report = mongoose.model("Report", interviewReportSchema);