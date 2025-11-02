import FileUploder from "./FileUploder";
import Navbar from "./Navbar";
import { FormEvent, useState } from "react";

function Upload() {
    const [isProcessing, setIsProcessing] = useState(false);
    const [statusTest, setStatusText] = useState();
    const [file, setFile] = useState<File | null>(null)

    const handleFileSelect = (file: File | null) => {
        setFile(file) // stores the selected file in state
    }

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        // stop the page to reload preventDefault()
        e.preventDefault(); // tell the browser, don’t do your default form-submission behavior
        const form = e.currentTarget.closest("form");
        if(!form) return;
        const formData = new FormData(form);

        const companyName = formData.get("company-name")
        const jobTitle = formData.get("job-title")
        const jobDiscription = formData.get("job-discription")

        console.log({
            jobDiscription, jobTitle, companyName
        })

    }

  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover p-1">
      <Navbar />
      <section className="main-section">
        <div className="page-heading py-16">
          <h1>Smart feedback for your dream job</h1>

          {isProcessing ? (
            <>
            <h2>{statusTest}</h2>
            <img src="/images/resume-scan.gif" className="w-full" />
            </>
          ) : (
            <h2>
                Drop your resume for ATS score and Improvement tips
            </h2>
          )}

          {!isProcessing && (
            <form id="upload-form" onSubmit={handleSubmit} className="flex flex-col gap-4 mt-8">
                <div className="form-div">
                    <label htmlFor="company-name" className="px-2">
                        Company
                    </label>
                    <input type="text" name="company-name" placeholder="Company Name" id="company-name" />
                </div>
                <div className="form-div">
                    <label htmlFor="job-title" className="px-2">
                        Job Title
                    </label>
                    <input type="text" name="job-title" placeholder="Job Title" id="job-title" />
                </div>
                <div className="form-div">
                    <label htmlFor="job-discription" className="px-2">
                        Job Discription
                    </label>
                    <textarea rows={5}  name="job-description" placeholder="Job Discription" id="job-discription" />
                </div>
                <div className="form-div">
                    <label htmlFor="uploader" className="px-2">
                        Upload Resume
                    </label>
                    <FileUploder onFileSelect={handleFileSelect} />
                </div>
                <button className="primary-button" type="submit">Evaluate Resume</button>
            </form>
          )}
        </div>
      </section>
    </main>
  );
}

export default Upload;
