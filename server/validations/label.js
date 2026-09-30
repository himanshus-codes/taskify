const { z } = require("zod");

const objectIdSchema = z.string().regex(
    /^[0-9a-fA-F]{24}$/,
    "Invalid MongoDB ObjectId."
);


// Create Label

exports.createLabelSchema = z.object({

    name: z
        .string()
        .trim()
        .min(1)
        .max(50),

    color: z
        .string()
        .regex(
            /^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/,
            "Invalid label color."
        )

});


// Update Label

exports.updateLabelSchema = z.object({

    name: z
        .string()
        .trim()
        .min(1)
        .max(50)
        .optional(),

    color: z
        .string()
        .regex(
            /^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/,
            "Invalid label color."
        )
        .optional()

}).refine(

    data => Object.keys(data).length > 0,

    {
        message: "At least one field required"
    }

);


// Exported in case we want to validate route params later
exports.objectIdSchema = objectIdSchema;