import {BrowserRouter, Routes, Route, Link, useNavigate} from "react-router-dom"
  
import '../styles/landing.css'
  


function Landing(){

    const navigate = useNavigate()

  function redirectToLogin(){
    console.log("redirecting... login")
    navigate('/signin')
  }
  function redirectToRegister(){
    console.log("redirecting... register")

    navigate('/signup')
  }
 return <>
        <div className="landing-page">

        <header className="hero">
          <h1>Taskify</h1>

          <p className="tagline">
            Organize your work. Track progress. Finish tasks faster.
          </p>

          <div className="hero-buttons">
            <button className="btn primary" onClick={redirectToRegister}>
              Sign Up
            </button>

            <button className="btn secondary" onClick={redirectToLogin}>
              Login
            </button>
          </div>
        </header>

      <section className="features">

          <div className="feature-card">
            <h3>📋 Kanban Boards</h3>
            <p>
              Organize tasks into New, In Progress, Review,
              and Completed columns.
            </p>
          </div>

          <div className="feature-card">
            <h3>✏️ Edit Tasks</h3>
            <p>
              Update task details and priorities whenever
              requirements change.
            </p>
          </div>

          <div className="feature-card">
            <h3>🚀 Stay Productive</h3>
            <p>
              Keep all your work organized in one place and
              track progress visually.
            </p>
          </div>

        </section>

        <section className="preview">
          <h2>How Taskify Works</h2>

          <div className="board-preview">

            <div className="column">
              <h4>New</h4>
              <div className="task">Create Landing Page</div>
              <div className="task">Design Dashboard</div>
            </div>

            <div className="column">
              <h4>In Progress</h4>
              <div className="task">Build React Components</div>
            </div>

            <div className="column">
              <h4>Review</h4>
              <div className="task">API Integration</div>
            </div>

            <div className="column">
              <h4>Done</h4>
              <div className="task">Project Setup</div>
            </div>

            </div>
        </section>

        <footer>
          <p>Taskify © 2026</p>
        </footer>

    </div>
    </>
}


export default Landing