import { Link, useNavigate, Navigate } from "react-router-dom";
import { signin } from "../../services/authService";
import { useState } from "react";

import { useAuth } from "../../context/AuthContext";

function Login() {
    const [message, setMessage] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    let navigate = useNavigate();

    const { token, setloginContext, user } = useAuth();

    // if a previous render has 3 hooks, then the state triggered re-render of the component should also have 3 hooks; diffing algo shouldnt see change in no. of react hooks

    if (token && user) {
        return <Navigate to="/workspaces" replace={true} />;
    }

    async function sendLoginReq(e) {
        e.preventDefault();
        setMessage("");

        console.log("sendSigninReq");
        setLoading(true);
        console.log(email, password);

        try {
            const response = await signin(email, password);

            // console.log(response);

            await setloginContext(response.data.token);

            setMessage("Login Successful");

            await new Promise((resolve) =>
                setTimeout(resolve, 300)
            );

            // navigate("/workspace", {replace:true});
            navigate("/workspaces", { replace: true });

        } catch (err) {
            switch (err.code) {
                case "UNAUTHORIZED":
                    setMessage("Invalid credentials.");
                    break;

                case "NETWORK_ERROR":
                    // setMessage("Couldn't reach the server. Please try again later.");
                    setMessage("Something went wrong.");
                    break;

                default:
                    // setMessage("Our servers are having trouble. Please try again later.");
                    setMessage("Something went wrong.");
            }

        } finally {
            setLoading(false);
        }
    }

    // useEffect(()=>{
    //     console.log('user', user)
    // }, [user])

     return (
  <div className="min-h-screen bg-[#181717] pt-17.5">
    <div className="m-auto w-[320px] rounded-[18px] border border-[#2d2c2c] bg-[#1e1d1d] p-8">
      <div className="w-full text-[#e5e5e5]">

        <h1 className="mb-4.5 text-[30px] font-bold text-[#f0f0f0]">
          Sign In
        </h1>

        {/* Form */}

        <form
          id="signinForm"
          className="w-full"
          onSubmit={sendLoginReq}
        >
          <label
            className="mb-1.5 mt-3.5 block text-[13px] font-medium text-[#b5b5b5]"
            htmlFor="email"
          >
            Email
          </label>

          <input
            placeholder="example@domain.com"
            id="email"
            type="email"
            value={email}
            className="h-10.5 w-full rounded-[10px] border border-[#3a3939] bg-[#181717] px-3 py-2.5 text-[14px] text-[#e5e5e5] outline-none placeholder:text-[#666] focus:border-[#2f5bd3]"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
          />

          <label
            className="mb-1.5 mt-3.5 block text-[13px] font-medium text-[#b5b5b5]"
            htmlFor="password"
          >
            Password
          </label>

          <input
            placeholder="password"
            id="password"
            type="password"
            value={password}
            className="h-10.5 w-full rounded-[10px] border border-[#3a3939] bg-[#181717] px-3 py-2.5 text-[14px] text-[#e5e5e5] outline-none placeholder:text-[#666] focus:border-[#2f5bd3]"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
          />

          <button
            id="signin"
            className="mt-5 h-10.5 w-full cursor-pointer rounded-[10px] border-none bg-[#2f5bd3] text-[14px] font-semibold text-white hover:bg-[#2447a8]"
            type="submit"
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
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
          Don't have an Account?{" "}

          <Link
            className="font-semibold text-[#2f5bd3] no-underline hover:underline"
            to="/signup"
          >
            Sign Up
          </Link>
        </span>
      </div>
    </div>
  </div>
)};

export default Login;