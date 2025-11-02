import {Link} from "react-router-dom"

function Navbar() {
  return (
    <nav className="navbar">
        <Link to="/" >
        <p className="text-2xl font-bold text-gradient">
            ResumeRada
        </p>
        </Link>
        <Link to="/upload" className="primary-button w-fit">
        Upload Resume
        </Link>
    </nav>
  )
}

export default Navbar
