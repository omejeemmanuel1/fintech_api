import Joi from "joi";


export const registerSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.empty": "Email cannot be empty",
    "string.email": "Email must be a valid email",
  }),
  password: Joi.string().min(6).required().messages({
    "string.empty": "Password cannot be empty",
    "string.min": "Password should have a minimum length of 6 characters",
  }),
});


export const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.empty": "Email cannot be empty",
    "string.email": "Email must be a valid email",
  }),
  password: Joi.string().min(6).required().messages({
    "string.empty": "Password cannot be empty",
    "string.min": "Password should have a minimum length of 6 characters",
  }),
});

export const transactionSchema = Joi.object({
  amount: Joi.number().positive().required().messages({
    "number.base": "Amount must be a number",
    "number.positive": "Amount must be a positive number",
    "any.required": "Amount is required",
  }),
  recipient_account_number: Joi.string().length(10).required().messages({
    "string.length": "Recipient account number must be 10 characters long",
    "any.required": "Recipient account number is required",
  }),
  sender_account_number: Joi.string().length(10).required().messages({
    "string.length": "Sender account number must be 10 characters long",
    "any.required": "Sender account number is required",
  }),
  description: Joi.string().optional().allow("").messages({
    "string.base": "Description must be a string",
  }),
});



export const options = {
  abortEarly: false, 
  errors: {
    wrap: {
      label: "",
    },
  },
};
