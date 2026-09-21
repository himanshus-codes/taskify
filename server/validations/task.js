const {z} = require('zod');

exports.createTaskSchema = z.object({
    title: z.string().min(3).max(150),
    description: z.string().min(5).max(1500).optional(),
    priority: z.enum(["low", "medium", "high","normal"]).optional().default("normal"),
    order: z.number().positive()
});

exports.updateTaskSchema = z.object({
    title: z.string().min(3).max(150).optional(),
    description: z.string().min(5).max(1500).optional(),
    priority: z.enum(["low", "medium", "high"]).optional(),
    order: z.number().positive().optional()
}).refine(
    data => Object.keys(data).length > 0,
    {
        message: "At least one field required"
    }
);
