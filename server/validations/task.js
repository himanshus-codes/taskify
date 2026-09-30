const {z} = require('zod');

const objectIdSchema = z.string().regex(
    /^[0-9a-fA-F]{24}$/
);

// exports.createTaskSchema = z.object({
//     title: z.string().min(3).max(150),
//     description: z.string().min(5).max(1500).optional(),
//     priority: z.enum(["low", "medium", "high","normal"]).optional().default("normal"),
//     order: z.number().positive()
// });

// exports.updateTaskSchema = z.object({
//     title: z.string().min(3).max(150).optional(),
//     description: z.string().min(5).max(1500).optional(),
//     priority: z.enum(["low", "medium", "high"]).optional(),
//     order: z.number().positive().optional(),
//     columnId: z.string().optional()
// }).refine(
//     data => Object.keys(data).length > 0,
//     {
//         message: "At least one field required"
//     }
// );



// Create Task

exports.createTaskSchema = z.object({

    title: z.string().min(3).max(150),

    description: z.string().min(5).max(1500).optional(),

    priority: z.enum([
        "low",
        "medium",
        "high",
        "normal"
    ]).optional().default("normal"),

    status: z.enum([
        "pending",
        "in-progress",
        "completed",
        "under-review"
    ]).optional(),

    labels: z.array(
        objectIdSchema
    ).optional(),

    startDate: z.coerce.date().nullable().optional(),

    targetDate: z.coerce.date().nullable().optional(),

    order: z.number().positive()

});


// Update Task

exports.updateTaskSchema = z.object({

    title: z.string().min(3).max(150).optional(),

    description: z.string().min(5).max(1500).optional(),

    priority: z.enum([
        "low",
        "medium",
        "high",
        "normal"
    ]).optional(),

    status: z.enum([
        "pending",
        "in-progress",
        "completed",
        "under-review"
    ]).optional(),

    labels: z.array(
        objectIdSchema
    ).optional(),

    startDate: z.coerce.date().nullable().optional(),

    targetDate: z.coerce.date().nullable().optional(),

    order: z.number().positive().optional(),

    columnId: objectIdSchema.optional()

}).refine(

    data => Object.keys(data).length > 0,

    {
        message: "At least one field required"
    }

);