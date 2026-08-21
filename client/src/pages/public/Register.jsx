import { Link } from "react-router-dom";
import { signup } from "../../services/authService";
import { useState } from "react";



function Register() {
    const [message, setMessage] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const INITIAL_ERRORS = {
        firstName: {
            fail: false,
            too_small: false,
            too_big: false
        },

        lastName: {
            fail: false,
            too_small: false,
            too_big: false
        },

        email: {
            fail: false,
            invalid_format: false,
            too_small: false,
            too_big: false
        },

        password: {
            fail: false,
            too_small: false,
            too_big: false
        }
    };

    const [errors, setErrors] = useState(
        structuredClone(INITIAL_ERRORS)
    );

    const ERROR_MESSAGES = {
        firstName: {
            too_small: "First Name should be at least 3 characters long.",
            too_big: "First Name should be at most 30 characters long."
        },

        lastName: {
            too_small: "Last Name should be at least 2 characters long.",
            too_big: "Last Name should be at most 30 characters long."
        },

        email: {
            invalid_format: "Invalid Email Address.",
            too_small: "Email is too short.",
            too_big: "Email is too long."
        },

        password: {
            too_small: "Password should be at least 8 characters long.",
            too_big: "Password should be at most 128 characters long."
        }
    };

    function resetErrors() {
        setErrors(structuredClone(INITIAL_ERRORS));
    }

    function clearFieldError(field) {
        setErrors((prev) => ({
            ...prev,
            [field]: structuredClone(INITIAL_ERRORS[field])
        }));
    }

    function buildValidationErrors(issues) {
        const validationErrors = structuredClone(INITIAL_ERRORS);

        for (const issue of issues) {
            const field = issue.path[0];

            if (!validationErrors[field]) continue;

            validationErrors[field].fail = true;
            validationErrors[field][issue.code] = true;
        }

        return validationErrors;
    }

    async function sendRegisterReq(e) {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        resetErrors();

        console.log("signing up...");

        try {
            let data = await signup(
                firstName,
                lastName,
                email,
                password
            );

            console.log(data);
            setMessage(data.message);

        } catch (err) {
            console.log(err);
            console.dir(err);
            console.log(err.code);
            console.log(err.message);
            console.log(err.issues);

            switch (err.code) {
                case "VALIDATION_FAILED":
                    setErrors(buildValidationErrors(err.issues));
                    break;

                case "CONFLICT":
                    setMessage("Email already in use.");
                    break;

                case "NETWORK_ERROR":
                    setMessage("Couldn't reach server.");
                    break;

                case "INTERNAL_SERVER_ERROR":
                    setMessage("Something went wrong.");
                    break;

                default:
                    setMessage("Something went wrong.");
            }

        } finally {
            await new Promise((resolve) =>
                setTimeout(resolve, 220)
            );

            setLoading(false);
        }
    }

    return (  <div className="min-h-screen bg-[#181717] pt-17.5">
    <div className="m-auto w-[320px] rounded-[18px] border border-[#2d2c2c] bg-[#1e1d1d] p-8">
      <div className="w-full text-[#e5e5e5]">

      <h1 className="mb-4.5 text-[30px] font-bold text-[#f0f0f0]">
        Sign Up
      </h1>

      {/* Form */}

      <form
        noValidate
        id="signupForm"
        className="w-full"
        onSubmit={sendRegisterReq}
      >
        {/* First Name */}

        <label
          className="mb-1.5 mt-3.5 block text-[13px] font-medium text-[#b5b5b5]"
          htmlFor="firstName"
        >
          First Name
        </label>

        <input
          id="firstName"
          type="text"
          placeholder="John"
          value={firstName}
          className="h-10.5 w-full rounded-[10px] border border-[#3a3939] bg-[#181717] px-3 py-2.5 text-[14px] text-[#e5e5e5] outline-none placeholder:text-[#666] focus:border-[#2f5bd3]"
          onChange={(e) => {
            setFirstName(e.target.value);
            clearFieldError("firstName");
          }}
        />

        {errors.firstName.too_small && (
          <p className="mt-1.25 text-[10px] text-[#c15b34]">
            First name should be at least 3 characters long.
          </p>
        )}

        {errors.firstName.too_big && (
          <p className="mt-1.25 text-[10px] text-[#c15b34]">
            First name should be at most 30 characters long.
          </p>
        )}

        {/* Last Name */}

        <label
          className="mb-1.5 mt-3.5 block text-[13px] font-medium text-[#b5b5b5]"
          htmlFor="lastName"
        >
          Last Name
        </label>

        <input
          id="lastName"
          type="text"
          placeholder="Doe"
          value={lastName}
          className="h-10.5 w-full rounded-[10px] border border-[#3a3939] bg-[#181717] px-3 py-2.5 text-[14px] text-[#e5e5e5] outline-none placeholder:text-[#666] focus:border-[#2f5bd3]"
          onChange={(e) => {
            setLastName(e.target.value);
            clearFieldError("lastName");
          }}
        />

        {errors.lastName.too_small && (
          <p className="mt-1.25 text-[10px] text-[#c15b34]">
            Last name should be at least 2 characters long.
          </p>
        )}

        {errors.lastName.too_big && (
          <p className="mt-1.25 text-[10px] text-[#c15b34]">
            Last name should be at most 30 characters long.
          </p>
        )}

        {/* Email */}

        <label
          className="mb-1.5 mt-3.5 block text-[13px] font-medium text-[#b5b5b5]"
          htmlFor="email"
        >
          Email
        </label>

        <input
          id="email"
          type="email"
          placeholder="john@example.com"
          value={email}
          className="h-10.5 w-full rounded-[10px] border border-[#3a3939] bg-[#181717] px-3 py-2.5 text-[14px] text-[#e5e5e5] outline-none placeholder:text-[#666] focus:border-[#2f5bd3]"
          onChange={(e) => {
            setEmail(e.target.value);
            clearFieldError("email");
          }}
        />

        {errors.email.invalid_format && (
          <p className="mt-1.25 text-[10px] text-[#c15b34]">
            Please enter a valid email address.
          </p>
        )}

        {errors.email.too_small && (
          <p className="mt-1.25 text-[10px] text-[#c15b34]">
            Email must contain at least 7 characters.
          </p>
        )}

        {errors.email.too_big && (
          <p className="mt-1.25 text-[10px] text-[#c15b34]">
            Email cannot exceed 254 characters.
          </p>
        )}

        {/* Password */}

        <label
          className="mb-1.5 mt-3.5 block text-[13px] font-medium text-[#b5b5b5]"
          htmlFor="password"
        >
          Password
        </label>

        <input
          id="password"
          type="password"
          value={password}
          className="h-10.5 w-full rounded-[10px] border border-[#3a3939] bg-[#181717] px-3 py-2.5 text-[14px] text-[#e5e5e5] outline-none placeholder:text-[#666] focus:border-[#2f5bd3]"
          onChange={(e) => {
            setPassword(e.target.value);
            clearFieldError("password");
          }}
        />

        {errors.password.too_small && (
          <p className="mt-1.25 text-[10px] text-[#c15b34]">
            Password must be at least 8 characters long.
          </p>
        )}

        {errors.password.too_big && (
          <p className="mt-1.25 text-[10px] text-[#c15b34]">
            Password cannot exceed 128 characters.
          </p>
        )}

        {errors.password.invalid_format && (
          <p className="mt-1.25 text-[10px] text-[#c15b34]">
            Password format is invalid.
          </p>
        )}

        {/* Submit Button */}

        <button
          id="signup"
          className="mt-5 h-10.5 w-full cursor-pointer rounded-[10px] border-none bg-[#2f5bd3] text-[14px] font-semibold text-white hover:bg-[#2447a8]"
          type="submit"
          disabled={loading}
        >
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
      </form>

      {/* Message */}

      <p
        id="message"
        className="mt-3 text-[12px] text-[#c15b34]"
      >
        {message}
      </p>

      {/* Navigation Link */}

      <span
        className="mt-4 block text-[14px] text-[#939393]"
      >
        Already have an Account?{" "}

        <Link
          className="font-semibold text-[#2f5bd3] no-underline hover:underline"
          to="/signin"
        >
          Sign In
        </Link>
      </span>
    </div>
  </div>
  </div>
)};

export default Register;