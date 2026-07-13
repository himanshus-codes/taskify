// controllers/user.controller.js
const userService = require("../services/user.js");
const { signupSchema, updateSchema, passwordSchema } = require("../validations/user");


exports.signup = async (req, res) => {

    let result;

    console.log(req.body);

    // req.body = JSON.parse(req.body);
    result = signupSchema.safeParse(req.body);

    console.log(result);
    console.log("req received", req.path);

    // console.log("error: ", result.error.issues)

    if (!result.success) {

        console.log("error: ", result.error.issues);

        return res.status(400).json({
            success: false,
            code: "VALIDATION_FAILED",
            message: "Invalid User data provided.",
            issues: result.error.issues
        });
    }

    try {

        await userService.signup(result.data);

        return res.status(201).json({
            success: true,
            code: "CREATED",
            message: "User successfully registered."
        });

    } catch (err) {

        console.log("Result", result);
        console.log("Error", err);

        if (err.message === "EMAIL_ALREADY_EXISTS") {

            console.log("EMAIL_ALREADY_EXISTS");

            return res.status(409).json({
                success: false,
                code: "CONFLICT",
                message: "A User with this email already exists.",
                issues: [
                    {
                        field: "email",
                        value: result.data.email
                    }
                ]
            });
        }

        return res.status(500).json({
            success: false,
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to register User."
        });
    }
};


exports.login = async (req, res) => {

    try {

        const token = await userService.login(req.body);

        return res.status(200).json({
            success: true,
            code: "FETCHED",
            message: "User signed in successfully.",
            data: {
                token
            }
        });

    } catch (err) {

        console.log(err);

        // res.status(403).json({ message: "Sign_In_Failed",error: e });
        // res.status(403).json({ message: "Sign_In_Failed",error: e.message });

        // res.status(403).json({ message: "Sign_In_Failed",error: "Invalid_Credentials" });

        return res.status(401).json({
            success: false,
            code: "UNAUTHORIZED",
            message: "Invalid credentials."
        });
    }
};


exports.getMe = (req, res) => {

    return res.status(200).json({
        success: true,
        code: "FETCHED",
        message: "User profile fetched successfully.",
        data: req.userData
    });
};


exports.updateMe = async (req, res) => {

    const result = updateSchema.safeParse(req.body);

    if (!result.success) {

        return res.status(400).json({
            success: false,
            code: "VALIDATION_FAILED",
            message: "Invalid User update data.",
            issues: result.error.issues
        });
    }

    try {

        const user = await userService.updateMe(
            req.userData._id,
            result.data
        );

        return res.status(200).json({
            success: true,
            code: "UPDATED",
            message: "User updated successfully.",
            data: user
        });

    } catch (err) {

        if (err.message === "NOT_FOUND") {

            return res.status(404).json({
                success: false,
                code: "NOT_FOUND",
                message: "User not found."
            });
        }

        return res.status(500).json({
            success: false,
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to update User."
        });
    }
};


exports.updatePassword = async (req, res) => {

    const result = passwordSchema.safeParse(req.body);

    if (!result.success) {

        return res.status(400).json({
            success: false,
            code: "VALIDATION_FAILED",
            message: "Invalid password data provided.",
            issues: result.error.issues
        });
    }

    try {

        await userService.updatePassword(
            req.userData,
            result.data
        );

        return res.status(200).json({
            success: true,
            code: "UPDATED",
            message: "Password updated successfully."
        });

    } catch (err) {

        if (err.message === "UNAUTHORIZED") {

            return res.status(401).json({
                success: false,
                code: "UNAUTHORIZED",
                message: "Current password is incorrect."
            });
        }

        return res.status(500).json({
            success: false,
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to update password."
        });
    }
};


exports.deleteMe = async (req, res) => {

    try {

        await userService.deleteMe(req.userData._id);

        return res.status(200).json({
            success: true,
            code: "DELETED",
            message: "User deleted successfully."
        });

    } catch (err) {

        if (err.message === "NOT_FOUND") {

            return res.status(404).json({
                success: false,
                code: "NOT_FOUND",
                message: "User not found."
            });
        }

        return res.status(500).json({
            success: false,
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to delete User."
        });
    }
};