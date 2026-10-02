const { z } = require("zod");


// Create Comment

exports.createCommentSchema = z.object({

    comment: z
        .string()
        .trim()
        .min(1)
        .max(5000)

});


// Update Comment

exports.updateCommentSchema = z.object({

    comment: z
        .string()
        .trim()
        .min(1)
        .max(5000)

});