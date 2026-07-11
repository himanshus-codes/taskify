const {z} = require('zod');

exports.createBoardSchema = z.object({
   title: z.string().min(3).max(150),
   description: z.string().max(1000)
})

exports.updateBoardSchema = z.object({
    title: z.string().min(3).max(150).optional(),
    description: z.string().max(1000).optional()
}).refine(data => Object.keys(data).length > 0, {
    message:"At least one field required"
})

