const {z} = require("zod");

exports.columnSchema = z.object({
    title: z.string().min(1).max(150),
    // order:z.number().min(1)
})

exports.columnUpdateSchema = z.object({
    title: z.string().min(1).max(150).optional(),
    order: z.number().min(1).optional()
}).refine(
    (data) => Object.keys(data).length > 0,
    {
        message: "At least one field required"
    }
);