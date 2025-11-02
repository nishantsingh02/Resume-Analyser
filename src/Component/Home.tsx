import Navbar from "./Navbar";
import ResumeCard from "./ResumeCard";
import { resumes } from "../Constants";
import "../App.css"
import { useEffect } from "react";
import { usePuterStore } from "../lib/puter";
import { useNavigate } from "react-router-dom";

function Home() {
  const { auth } = usePuterStore();
    const navigate = useNavigate();

    useEffect(() => {
        if(!auth.isAuthenticated) navigate("/auth?next=/");
        // if(!auth.isAuthenticated) navigate("?next=/");
    }, [auth.isAuthenticated])

  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover p-1">
      <Navbar />
      <section className="main-section">
        <div className="page-heading">
          <h1>Track Your Application & Resume Ratings</h1>
          <h2>Rivew your submisssions and check AI-powerd feedback.</h2>
        </div>

        {resumes.length > 0 && (
          <div className="resumes-section">
            {resumes.map((resume) => (
              <ResumeCard key={resume.id} resume={resume} />
            ))}
          </div>
        )}
      </section>
    </main>
  )
}

export default Home
