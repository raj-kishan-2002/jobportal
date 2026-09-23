import BaseJoi from "joi";
import sanitizeHtml from "sanitize-html";


const extension = (joi) => ({
  type: "string",

  base: joi.string(),

  messages: {
    "string.escapeHTML": "{{#label}} must not include HTML!"
  },

  rules: {
    escapeHTML: {
      validate(value, helpers) {
        const clean = sanitizeHtml(value, {
          allowedTags: [],
          allowedAttributes: {}
        });

        if (clean !== value) {
          return helpers.error("string.escapeHTML", { value });
        }

        return clean;
      }
    }
  }
});

const Joi = BaseJoi.extend(extension);


export const registerSchema = Joi.object({
  fullname: Joi.string()
    .trim()
    .min(2)
    .max(50)
    .required()
    .escapeHTML(),

  email: Joi.string()
    .trim()
    .email()
    .max(100)
    .required()
    .escapeHTML(),

  phoneNumber: Joi.string()
    .trim()
    .pattern(/^[0-9]{10}$/)
    .required(),

  password: Joi.string()
    .min(6)
    .max(100)
    .required(),

  role: Joi.string()
    .valid("student", "recruiter")
    .required()
});


export const loginSchema = Joi.object({
  email: Joi.string()
    .trim()
    .email()
    .required()
    .escapeHTML(),

  password: Joi.string()
    .required(),

  role: Joi.string()
    .valid("student", "recruiter")
    .required()
});


export const updateProfileSchema = Joi.object({
  fullname: Joi.string()
    .trim()
    .min(2)
    .max(50)
    .escapeHTML(),

  email: Joi.string()
    .trim()
    .email()
    .max(100)
    .escapeHTML(),

  phoneNumber: Joi.string()
    .trim()
    .pattern(/^[0-9]{10}$/),

  bio: Joi.string()
    .trim()
    .max(500)
    .escapeHTML(),

  skills: Joi.string()
    .trim()
    .max(500)
    .escapeHTML()
});




export const companySchema = Joi.object({
  companyName: Joi.string()
    .trim()
    .min(2)
    .max(100)
    .required()
    .escapeHTML(),

});


export const updateCompanySchema = Joi.object({
  name: Joi.string()
    .trim()
    .min(2)
    .max(100)
    .required()
    .escapeHTML(),

  description: Joi.string()
    .trim()
    .max(1000)
    .allow("")
    .escapeHTML(),

  website: Joi.string()
    .trim()
    .max(300)
    .allow("")
    .escapeHTML(),

  location: Joi.string()
    .trim()
    .min(2)
    .max(200)
    .allow("")
    .escapeHTML()
});


export const jobSchema = Joi.object({
  title: Joi.string()
    .trim()
    .min(2)
    .max(100)
    .required()
    .escapeHTML(),

  description: Joi.string()
    .trim()
    .min(10)
    .max(5000)
    .required()
    .escapeHTML(),

  requirements: Joi.string()
    .trim()
    .min(1)
    .max(2000)
    .required()
    .escapeHTML(),

  salary: Joi.number()
    .min(0)
    .required(),

  experience: Joi.number()
    .integer()
    .min(0)
    .required(),

  location: Joi.string()
    .trim()
    .min(2)
    .max(200)
    .required()
    .escapeHTML(),

  jobType: Joi.string()
    .trim()
    .min(2)
    .max(50)
    .required()
    .escapeHTML(),

  position: Joi.number()
    .integer()
    .min(1)
    .required(),

  companyId: Joi.string()
    .hex()
    .length(24)
    .required()
});


export const updateJobSchema = Joi.object({
  title: Joi.string()
    .trim()
    .min(2)
    .max(100)
    .required()
    .escapeHTML(),

  description: Joi.string()
    .trim()
    .min(10)
    .max(5000)
    .required()
    .escapeHTML(),

  requirements: Joi.alternatives()
    .try(
      Joi.string()
        .trim()
        .min(1)
        .max(2000)
        .escapeHTML(),

      Joi.array()
        .items(
          Joi.string()
            .trim()
            .min(1)
            .max(200)
            .escapeHTML()
        )
    )
    .required(),

  salary: Joi.number()
    .min(0)
    .required(),

  experience: Joi.number()
    .integer()
    .min(0)
    .required(),

  location: Joi.string()
    .trim()
    .min(2)
    .max(200)
    .required()
    .escapeHTML(),

  jobType: Joi.string()
    .trim()
    .min(2)
    .max(50)
    .required()
    .escapeHTML(),

  position: Joi.number()
    .integer()
    .min(1)
    .required(),

  companyId: Joi.string()
    .hex()
    .length(24)
    .required()
});