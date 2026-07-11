const {z} = require("zod");

const createValidifier = z.object({
    title: z.string().min(3).max(150),
    description: z.string().min(3).max(150)
})


const updateValidifier = z.object({
    title: z.string().min(3).max(150).optional(),
    description: z.string().min(3).max(150).optional()
}).refine(data => Object.keys(data).length > 0, {
    message: "At least one field required"
})

module.exports = {
    createValidifier, 
    updateValidifier
}