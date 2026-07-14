// validations/user.validation.js
const { z } = require("zod");

exports.signupSchema = z.object({
  email: z.string().email().min(7).max(100),
  password: z.string().min(8).max(128),
  firstName: z.string().min(3).max(30),
  lastName: z.string().min(2).max(30),
  password: z.string().min(8).max(128)

})

exports.updateSchema = z
  .object({
    email: z.string().email().max(100).optional(),
    firstName: z.string().min(3).max(30).optional(),
    lastName: z.string().min(2).max(30).optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field required",
  });


exports.passwordUpdateSchema = z.object({
  currentPassword: z.string().min(8).max(128),
  newPassword: z.string().min(8).max(128),
});