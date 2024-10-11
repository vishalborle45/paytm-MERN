const { z } = require("zod");

const signupSchema = z.object({
  firstname: z
    .string()
    .min(3, { message: "First name must be at least 3 characters long." })
    .max(30, { message: "First name cannot exceed 30 characters." })
    .trim()
    .toLowerCase()
    .nonempty({ message: "First name is required." }),

  lastname: z
    .string()
    .min(3, { message: "Last name must be at least 3 characters long." })
    .max(30, { message: "Last name cannot exceed 30 characters." })
    .trim()
    .toLowerCase()
    .nonempty({ message: "Last name is required." }),

  email: z
    .string()
    .email({ message: "Invalid email address." })
    .nonempty({ message: "Email is required." }),

  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long." })
    .nonempty({ message: "Password is required." }),
});

const signinSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .nonempty({ message: "email is required" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long." })
    .nonempty({ message: "Password is required" }),
});

const updateSchema = z.object({
  password: z
    .string()
    .nonempty({ message: "password is must" })
    .min(6, { message: "password should be min 6 char" }),
  firstname: z
    .string()
    .min(3, { message: "First name must be at least 3 characters long." })
    .max(30, { message: "First name cannot exceed 30 characters." })
    .trim()
    .toLowerCase(),

  lastname: z
    .string()
    .min(3, { message: "Last name must be at least 3 characters long." })
    .max(30, { message: "Last name cannot exceed 30 characters." })
    .trim()
    .toLowerCase(),
});

module.exports = {
  signupSchema,
  signinSchema,
  updateSchema,
};
