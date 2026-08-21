import { useNavigate } from "react-router-dom";

function Landing() {
  const navigate = useNavigate();

  function redirectToLogin() {
    console.log("redirecting... login");
    navigate("/signin");
  }

  function redirectToRegister() {
    console.log("redirecting... register");
    navigate("/signup");
  }

  return (
  <div className="min-h-screen bg-[#181717] text-[#e5e5e5]">
    {/* Hero Section */}
    <header className="h-screen bg-[#181717] px-5 py-22.5 text-center">
      <h1 className="mb-3.75 text-[4rem] font-semibold text-[#f0f0f0]">
        Taskify
      </h1>

      <p className="mb-7.5 text-[1.2rem] text-[#939393]">
        Organize your work. Track progress. Finish tasks faster.
      </p>

      <div className="flex justify-center gap-3.75">
        <button
          className="cursor-pointer rounded-lg border-none bg-[#2563eb] px-6 py-3 text-[1rem] text-white transition-colors hover:bg-[#1d4ed8]"
          onClick={redirectToRegister}
        >
          Sign Up
        </button>

        <button
          className="cursor-pointer rounded-lg border border-[#3a3939] bg-[#1e1d1d] px-6 py-3 text-[1rem] text-[#e5e5e5] transition-colors hover:bg-[#252424]"
          onClick={redirectToLogin}
        >
          Login
        </button>
      </div>
    </header>

    {/* Features Section */}
    <section className="mx-auto my-12.5 grid max-w-300 grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-5 px-5">
      <div className="rounded-xl border border-[#2d2c2c] bg-[#1e1d1d] p-6.25">
        <h3 className="mb-2.5 text-[#e5e5e5]">
          📋 Kanban Boards
        </h3>

        <p className="text-[#939393]">
          Organize tasks into New, In Progress, Review,
          and Completed columns.
        </p>
      </div>

      <div className="rounded-xl border border-[#2d2c2c] bg-[#1e1d1d] p-6.25">
        <h3 className="mb-2.5 text-[#e5e5e5]">
          ✏️ Edit Tasks
        </h3>

        <p className="text-[#939393]">
          Update task details and priorities whenever
          requirements change.
        </p>
      </div>

      <div className="rounded-xl border border-[#2d2c2c] bg-[#1e1d1d] p-6.25">
        <h3 className="mb-2.5 text-[#e5e5e5]">
          🚀 Stay Productive
        </h3>

        <p className="text-[#939393]">
          Keep all your work organized in one place and
          track progress visually.
        </p>
      </div>
    </section>

    {/* Preview Section */}
    <section className="px-5 py-15">
      <h2 className="mb-10 text-center text-[2rem] font-semibold text-[#e5e5e5]">
        How Taskify Works
      </h2>

      <div className="mx-auto grid max-w-300 grid-cols-4 gap-5">
        {/* New */}
        <div className="rounded-xl border border-[#2d2c2c] bg-[#1e1d1d] p-3.75">
          <h4 className="mb-3.75 text-[#e5e5e5]">
            New
          </h4>

          <div className="mb-2.5 rounded-lg border border-[#303030] bg-[#252424] p-2.5 text-[#b5b5b5]">
            Create Landing Page
          </div>

          <div className="mb-2.5 rounded-lg border border-[#303030] bg-[#252424] p-2.5 text-[#b5b5b5]">
            Design Dashboard
          </div>
        </div>

        {/* In Progress */}
        <div className="rounded-xl border border-[#2d2c2c] bg-[#1e1d1d] p-3.75">
          <h4 className="mb-3.75 text-[#e5e5e5]">
            In Progress
          </h4>

          <div className="mb-2.5 rounded-lg border border-[#303030] bg-[#252424] p-2.5 text-[#b5b5b5]">
            Build React Components
          </div>
        </div>

        {/* Review */}
        <div className="rounded-xl border border-[#2d2c2c] bg-[#1e1d1d] p-3.75">
          <h4 className="mb-3.75 text-[#e5e5e5]">
            Review
          </h4>

          <div className="mb-2.5 rounded-lg border border-[#303030] bg-[#252424] p-2.5 text-[#b5b5b5]">
            API Integration
          </div>
        </div>

        {/* Done */}
        <div className="rounded-xl border border-[#2d2c2c] bg-[#1e1d1d] p-3.75">
          <h4 className="mb-3.75 text-[#e5e5e5]">
            Done
          </h4>

          <div className="mb-2.5 rounded-lg border border-[#303030] bg-[#252424] p-2.5 text-[#b5b5b5]">
            Project Setup
          </div>
        </div>
      </div>
    </section>

    {/* Footer */}
    <footer className="p-7.5 text-center text-[#777]">
      <p>Taskify © 2026</p>
    </footer>
  </div>
)};

export default Landing;