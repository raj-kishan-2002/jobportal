import React, { useEffect, useRef, useState } from "react";
import Navbar from "./shared/Navbar";
import { useNavigate } from "react-router-dom";
import { setLoading } from "@/redux/authSlice";
import axios from "axios";
import { INTERVIEW_REPORT_API_END_POINT } from "@/utils/Constatnt";
import { useInterview } from '@/hooks/useInterview';

import {
  BriefcaseBusiness,
  UserRound,
  UploadCloud,
  FileText,
  X,
  Sparkles,
  Info,
  History,
  Target,
  LoaderCircle,
} from "lucide-react";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import RecentReports from "./RecentReports";

const GenerateReport = () => {


  const [input, setInput] = useState({
    jobDescription: "",
    selfDescription: "",
    file: null
  });

  const [dragging, setDragging] = useState(false);
  const resumeInputRef = useRef(null);

  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [recentReports, setRecentReports] = useState([]);
  const [reportsLoading, setReportsLoading] = useState(true);

  const { getAllReports } = useInterview();

  useEffect(() => {
    const fetchRecentReports = async () => {
      try {
        const res = await getAllReports();

        if (res) {
          setRecentReports(res.reports || []);
        }
      } catch (error) {
        console.error(error);
        toast.error(message);
      } finally {
        setReportsLoading(false);
      }
    };

    fetchRecentReports();
  }, []);


  const changeEventHandler = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
  }

  const handleFile = (e) => {
    setInput({
      ...input,
      file: e.target.files?.[0] || null
    });
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);

    const file = e.dataTransfer.files?.[0];

    if (file) {
      setInput({
        ...input,
        file
      });
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("jobDescription", input.jobDescription);
    formData.append("selfDescription", input.selfDescription);
    if (!input.file) {
      return toast.error("Please select a resume file");
    }
    formData.append("file", input.file);

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${INTERVIEW_REPORT_API_END_POINT}/report`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        withCredentials: true,
      });

      console.log(res.data);

      if (res.data.success) {
        navigate(`/interview/${res.data?.interviewReport?._id}`);
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);

      const messages = error?.response?.data?.message;

      if (Array.isArray(messages)) {
        messages.forEach((message) => {
          toast.error(message);
        });
      } else {
        toast.error(
          messages ||
          error?.response?.data?.message ||
          "Something went wrong"
        );
      }
    } finally {
      dispatch(setLoading(false));
    }
  }

  return (

    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-12">

        {/* Header */}
        <header className="text-center max-w-3xl mx-auto mb-10">
          <span className="inline-flex items-center gap-2 rounded-full bg-violet-50 border border-violet-100 px-4 py-2 text-sm font-medium text-violet-700">
            <Sparkles size={15} />
            AI-Powered Career Preparation
          </span>

          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-950 mt-6">
            Create Your Custom{" "}
            <span className="text-violet-600">
              Interview Plan
            </span>
          </h1>

          <p className="text-slate-500 text-sm sm:text-base leading-7 mt-4">
            Prepare for your next opportunity with a personalized
            interview strategy based on your skills and target role.
          </p>
        </header>

        {loading ? (
          <div className="mt-6 rounded-2xl border border-violet-200 bg-violet-50/70 p-8 sm:p-12 text-center">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-sm">
              <LoaderCircle
                size={34}
                className="animate-spin text-violet-600"
              />
            </div>

            <h2 className="text-xl font-semibold text-slate-900">
              Analyzing Your Interview Profile
            </h2>

            <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-slate-600">
              We're reviewing your resume, matching your skills with the job
              description, and preparing personalized interview questions.
              This may take a few moments.
            </p>

            <div className="mx-auto mt-6 h-1.5 max-w-xs overflow-hidden rounded-full bg-violet-100">
              <div className="h-full w-1/3 animate-pulse rounded-full bg-violet-600" />
            </div>

            <p className="mt-3 text-xs text-slate-500">
              Please don't close or refresh this page.
            </p>
          </div>
        ) : (
          < form onSubmit={submitHandler}>
            <div className="grid lg:grid-cols-2 bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">

              <section className="p-5 sm:p-7 flex flex-col">
                <div className="flex items-center gap-3 mb-5">
                  <div className="p-3 rounded-xl bg-violet-50 text-violet-600">
                    <BriefcaseBusiness size={21} />
                  </div>

                  <div className="flex-1">
                    <h2 className="font-semibold text-slate-900">
                      Target Job Description
                    </h2>
                    <p className="text-xs text-slate-500 mt-1">
                      Tell us about your target role
                    </p>
                  </div>

                  <span className="text-[10px] font-semibold text-red-600 bg-red-50 px-2 py-1 rounded-md">
                    REQUIRED
                  </span>
                </div>

                <textarea
                  type="text"
                  name='jobDescription'
                  value={input.jobDescription}
                  onChange={changeEventHandler}
                  maxLength={5000}
                  required
                  placeholder="Paste the job description here, including responsibilities, required skills, and qualifications..."
                  className="w-full flex-1 min-h-64 resize-y rounded-xl border border-slate-200 bg-slate-50/60 p-4 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
                />

                <div className="flex justify-between mt-2 text-xs text-slate-400">
                  <span>Include key job requirements.</span>
                  <span>{input.jobDescription.length}/5000</span>
                </div>

              </section>

              {/* Candidate profile */}
              <section className="p-5 sm:p-7 border-t lg:border-t-0 lg:border-l border-slate-200">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 rounded-xl bg-orange-50 text-orange-600">
                    <UserRound size={21} />
                  </div>

                  <div>
                    <h2 className="font-semibold text-slate-900">
                      Your Profile
                    </h2>
                    <p className="text-xs text-slate-500 mt-1">
                      Share your experience and skills
                    </p>
                  </div>
                </div>

                {/* Resume upload */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <label className="text-sm font-medium text-slate-800">
                      Upload Resume
                    </label>

                    <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-md">
                      RECOMMENDED
                    </span>
                  </div>

                  <input
                    ref={resumeInputRef}
                    type="file"
                    accept=".pdf,application/pdf"
                    hidden
                    onChange={handleFile}
                  />

                  {input.file ? (
                    <div className="flex items-center gap-3 rounded-xl border border-violet-200 bg-violet-50/50 p-4">
                      <FileText size={24} className="text-violet-600 shrink-0" />

                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-slate-800 truncate">
                          {input.file.name}
                        </p>

                        <p className="text-xs text-slate-500 mt-1">
                          {(input.file.size / (1024 * 1024)).toFixed(2)} MB
                        </p>
                      </div>

                      <button
                        type="button"
                        className="p-2 rounded-lg text-slate-500 hover:text-red-600 hover:bg-red-50"
                        aria-label="Remove resume"
                        onClick={() => {
                          setInput({ ...input, file: null });

                          if (resumeInputRef.current) {
                            resumeInputRef.current.value = "";
                          }
                        }}
                      >
                        <X size={18} />
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => resumeInputRef.current?.click()}
                      onDragOver={(e) => {
                        e.preventDefault();
                        setDragging(true);
                      }}
                      onDragLeave={() => setDragging(false)}
                      onDrop={handleDrop}
                      className={`w-full min-h-36 flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed p-5 transition ${dragging
                        ? "border-violet-500 bg-violet-50"
                        : "border-slate-200 bg-slate-50 hover:border-violet-300 hover:bg-violet-50/50"
                        }`}
                    >
                      <span className="p-3 rounded-full bg-white border border-slate-200 text-violet-600">
                        <UploadCloud size={25} />
                      </span>

                      <span className="text-sm font-medium text-slate-800">
                        Click to upload or drag and drop
                      </span>

                      <span className="text-xs text-slate-500">
                        PDF only · Maximum 3 MB
                      </span>
                    </button>
                  )}
                </div>


                {/* Separator */}
                <div className="flex items-center gap-3 my-5">
                  <div className="h-px flex-1 bg-slate-200" />
                  <span className="text-xs font-medium text-slate-400">
                    OR
                  </span>
                  <div className="h-px flex-1 bg-slate-200" />
                </div>

                {/* Self description */}
                <div>
                  <label
                    htmlFor="selfDescription"
                    className="block text-sm font-medium text-slate-800 mb-3"
                  >
                    Quick Self-Description
                  </label>

                  <textarea
                    id="selfDescription"
                    name="selfDescription"
                    value={input.selfDescription}
                    onChange={changeEventHandler}
                    maxLength={2000}
                    placeholder="Describe your experience, technical skills, projects, and career goals..."
                    className="w-full min-h-28 resize-y rounded-xl border border-slate-200 bg-slate-50/60 p-3.5 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
                  />

                  <p className="text-right text-xs text-slate-400 mt-1">
                    {input.selfDescription.length}/2000
                  </p>
                </div>

                {/* Information */}
                <div className="flex items-start gap-2.5 mt-4 rounded-xl bg-blue-50 border border-blue-100 p-3.5">
                  <Info size={17} className="text-blue-600 shrink-0 mt-0.5" />
                  <p className="text-xs leading-5 text-slate-600">
                    A <strong>resume</strong> or{" "}
                    <strong>self-description</strong> is required.
                    You can also provide both.
                  </p>
                </div>
              </section>
            </div>

            {/* Action bar */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-6 rounded-2xl border border-slate-200 bg-white p-5 sm:px-7 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-violet-50 text-violet-600 shrink-0">
                  <Target size={21} />
                </div>


                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    Ready to prepare?
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    Personalized interview preparation
                  </p>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto shrink-0 flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 font-semibold text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <LoaderCircle size={20} className="animate-spin shrink-0" />
                    <span>Generating Report...</span>
                  </>
                ) : (
                  <>
                    <Sparkles size={20} className="shrink-0" />
                    <span>Generate Interview Report</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}


        {/* Sample recent reports */}
        <section className="mt-10">
          <div className="flex items-center gap-3 mb-5">
            <div className="p-2.5 rounded-xl bg-violet-50 text-violet-600">
              <History size={21} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Recent Interview Reports
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Click to see your individual report summary.
              </p>
            </div>
          </div>

          {reportsLoading ? (
            <p>Loading recent reports...</p>
          ) : recentReports.length === 0 ? (
            <p>No recent reports found</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {recentReports.map((report) => (
                <RecentReports key={report._id} report={report} />
              ))}
            </div>
          )}

        </section>
      </main>
    </div >
  );
};

export default GenerateReport;