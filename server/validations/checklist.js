const { z } = require("zod");

const objectIdSchema = z.string().regex(
    /^[0-9a-fA-F]{24}$/,
    "Invalid MongoDB ObjectId."
);


// Create Checklist

exports.createChecklistSchema = z.object({

    title: z
        .string()
        .trim()
        .min(1)
        .max(100),

});


// Update Checklist

exports.updateChecklistSchema = z.object({

    title: z
        .string()
        .trim()
        .min(1)
        .max(100)
        .optional(),
    
    completed: z.boolean().optional()    

}).refine(

    data => Object.keys(data).length > 0,

    {
        message: "At least one field required"
    }

);


// Create Checklist Item

exports.createChecklistItemSchema = z.object({

    text: z
        .string()
        .trim()
        .min(1)
        .max(500),

    checked: z
        .boolean()
        .optional()
        .default(false),

    order: z
        .number()
        .int()
        .min(0),

});


// Update Checklist Item

exports.updateChecklistItemSchema = z.object({

    text: z
        .string()
        .trim()
        .min(1)
        .max(500)
        .optional(),

    checked: z
        .boolean()
        .optional(),

    order: z
        .number()
        .int()
        .min(0)
        .optional(),

}).refine(

    data => Object.keys(data).length > 0,

    {
        message: "At least one field required"
    }

);

exports.objectIdSchema = objectIdSchema;