import { Link } from "react-router-dom";
import ScoreCircle from "./ScoreCircle";

function ResumeCard({ resume }: { resume: Resume }) {
  return (
    <Link
      to={`/resume/${resume.id}`}
      className="resume-card animate-in fade-in duration-75"
    >
      <div className="resume-card-header">
        <div className="flex flex-col gap-2">
          <h2 className="text-black text-left font-bold wrap-break-word">
            {resume.companyName}
          </h2>
          <h3 className="text-lg wrap-break-word text-gray-500">
            {resume.jobTitle}
          </h3>
        </div>
        <div className="shrink">
          <ScoreCircle score={resume.feedback.overallScore} />
        </div>
      </div>
      <div className="gradient-border animate-in fade-in duration-1000">
    <div className="w-full h-full">
        <img src={resume.imagePath} alt="resume" className="w-full h-[350px] max-sm:h-[200px] object-cover object-top" />
    </div>
      </div>
    </Link>
  );
}

export default ResumeCard;
