import React, { useEffect, useState } from "react";
import { useInterview } from "@/hooks/useInterview";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";
import {
  Star,
  Monitor,
  Brain,
  Settings,
  CalendarDays,
  ChevronDown,
  ChevronUp,
  Download,
  UserRound,
  Loader2,
  CheckCircle2,
  FileText,
  AlertCircle,
} from "lucide-react";
import Navbar from "./shared/Navbar";

const InterviewReport = () => {
  const { getReportById, getResumePdf } = useInterview();
  const { loading } = useSelector((state) => state.auth);
  const { interviewId } = useParams();
  const dispatch = useDispatch();

  const [report, setReport] = useState(null);
  const [activeTab, setActiveTab] = useState("technical");
  const [openQuestions, setOpenQuestions] = useState({});
  const [completedTasks, setCompletedTasks] = useState({});
  const [isDownloading, setIsDownloading] = useState(false);

  // Your existing useEffect logic — unchanged
  useEffect(() => {
    dispatch(setLoading(true));

    const fetchReport = async () => {
      const data = await getReportById(interviewId);

      if (data) {
        setReport(data.report);
        dispatch(setLoading(false));
      }
    };

    if (interviewId) {
      fetchReport();
    }
  }, [interviewId]);

  const toggleQuestion = (index) => {
    setOpenQuestions((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const toggleTask = (taskId) => {
    setCompletedTasks((prev) => ({
      ...prev,
      [taskId]: !prev[taskId],
    }));
  };

  const handleDownloadResume = async () => {
    try {
      setIsDownloading(true);
      await getResumePdf(interviewId);
    } finally {
      setIsDownloading(false);
    }
  };

  if (loading || !report) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center gap-4 bg-slate-50 px-4">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-violet-100 border-t-violet-600" />
        <h2 className="text-lg font-semibold text-slate-800">
          Loading interview report...
        </h2>
        <p className="text-sm text-slate-500">
          Preparing your personalized interview analysis.
        </p>
      </div>
    );
  }

  const technicalQuestions = report.technicalQuestions || [];
  const behavioralQuestions = report.behavioralQuestions || [];
  const preparationPlan = report.preparationPlan || [];
  const skillGaps = report.skillGaps || [];

  const matchScore = report.matchScore ?? 0;

  const tabs = [
    {
      id: "technical",
      label: "Technical",
      icon: Monitor,
      count: technicalQuestions.length,
    },
    {
      id: "behavioral",
      label: "Behavioral",
      icon: Brain,
      count: behavioralQuestions.length,
    },
    {
      id: "roadmap",
      label: "Road Map",
      icon: CalendarDays,
      count: preparationPlan.length,
    },
  ];

  const currentQuestions =
    activeTab === "technical"
      ? technicalQuestions
      : behavioralQuestions;

  const severityClasses = {
    high: "border-red-200 bg-red-50 text-red-700",
    medium: "border-amber-200 bg-amber-50 text-amber-700",
    low: "border-emerald-200 bg-emerald-50 text-emerald-700",
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="mx-auto max-w-[1500px]">

        {/* Header */}
        <header className="mb-6">
          <div className="mb-2 flex items-center gap-2 text-sm font-medium text-violet-700">
            <FileText size={17} />
            AI Interview Analysis
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            {report.title}
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Analyze your profile, practice interview questions, and follow
            your personalized preparation plan.
          </p>
        </header>

        {/* Profile Match Score */}
        <section className="mb-6 rounded-2xl border border-violet-100 bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-amber-50 p-3 text-amber-500">
                <Star size={22} fill="currentColor" />
              </div>

              <div>
                <h2 className="font-semibold text-slate-800">
                  Profile Match Score
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Your profile alignment with the target role
                </p>
              </div>
            </div>

            <div className="flex items-baseline">
              <span className="text-4xl font-bold text-violet-700">
                {matchScore}
              </span>
              <span className="ml-1 text-base text-slate-400">/100</span>
            </div>
          </div>

          <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-violet-600 transition-all duration-700"
              style={{
                width: `${Math.min(100, Math.max(0, matchScore))}%`,
              }}
            />
          </div>
        </section>

        {/* Main Layout */}
        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[220px_minmax(0,1fr)] xl:grid-cols-[220px_minmax(0,1fr)_260px]">

          {/* Left Sidebar */}
          <aside className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="mb-3 px-2 text-xs font-bold uppercase tracking-wider text-slate-400">
              Report Sections
            </p>

            <nav className="space-y-1">
              {tabs.map(({ id, label, icon: Icon, count }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setActiveTab(id)}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${activeTab === id
                    ? "bg-violet-50 text-violet-700"
                    : "text-slate-600 hover:bg-slate-50"
                    }`}
                >
                  <Icon size={18} />

                  <span className="flex-1 text-left">{label}</span>

                  <span
                    className={`rounded-md px-2 py-0.5 text-xs ${activeTab === id
                      ? "bg-violet-100 text-violet-700"
                      : "bg-slate-100 text-slate-500"
                      }`}
                  >
                    {count}
                  </span>
                </button>
              ))}
            </nav>

            <div className="my-5 border-t border-slate-100" />

            <p className="mb-3 px-2 text-xs font-bold uppercase tracking-wider text-slate-400">
              Overview
            </p>

            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="rounded-xl bg-slate-50 px-1 py-3">
                <p className="text-lg font-bold text-slate-800">
                  {technicalQuestions.length}
                </p>
                <p className="mt-1 text-[10px] text-slate-500 sm:text-xs">
                  Technical
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 px-1 py-3">
                <p className="text-lg font-bold text-slate-800">
                  {behavioralQuestions.length}
                </p>
                <p className="mt-1 text-[10px] text-slate-500 sm:text-xs">
                  Behavioral
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 px-1 py-3">
                <p className="text-lg font-bold text-slate-800">
                  {preparationPlan.length}
                </p>
                <p className="mt-1 text-[10px] text-slate-500 sm:text-xs">
                  Days
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleDownloadResume}
              disabled={isDownloading}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 px-3 py-3 text-sm font-semibold text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isDownloading ? (
                <>
                  <Loader2 size={17} className="animate-spin" />
                  Downloading...
                </>
              ) : (
                <>
                  <Download size={17} />
                  Download Resume
                </>
              )}
            </button>
          </aside>

          {/* Center Content */}
          <section className="min-w-0">

            {/* Technical / Behavioral Questions */}
            {(activeTab === "technical" ||
              activeTab === "behavioral") && (
                <div>
                  <div className="mb-5 flex items-center justify-between gap-3">
                    <div>
                      <h2 className="text-xl font-bold text-slate-900">
                        {activeTab === "technical"
                          ? "Technical Questions"
                          : "Behavioral Questions"}
                      </h2>

                      <p className="mt-1 text-sm text-slate-500">
                        Expand a question to see its intention and ideal answer.
                      </p>
                    </div>

                    <span className="rounded-lg bg-violet-100 px-3 py-1.5 text-sm font-bold text-violet-700">
                      {currentQuestions.length}
                    </span>
                  </div>

                  <div className="space-y-3">
                    {currentQuestions.map((question, index) => {
                      const questionKey = `${activeTab}-${index}`;
                      const isOpen = Boolean(openQuestions[questionKey]);

                      return (
                        <article
                          key={questionKey}
                          className={`overflow-hidden rounded-xl border bg-white transition ${isOpen
                            ? "border-violet-200 shadow-sm"
                            : "border-slate-200 hover:border-violet-200"
                            }`}
                        >
                          <button
                            type="button"
                            onClick={() => toggleQuestion(questionKey)}
                            aria-expanded={isOpen}
                            className="flex w-full items-center gap-3 p-4 text-left sm:p-5"
                          >
                            <span className="flex h-9 w-10 shrink-0 items-center justify-center rounded-lg bg-violet-50 text-sm font-bold text-violet-700">
                              Q{index + 1}
                            </span>

                            <span className="flex-1 text-sm font-semibold leading-6 text-slate-800 sm:text-base">
                              {question.question}
                            </span>

                            {isOpen ? (
                              <ChevronUp
                                size={18}
                                className="shrink-0 text-slate-500"
                              />
                            ) : (
                              <ChevronDown
                                size={18}
                                className="shrink-0 text-slate-500"
                              />
                            )}
                          </button>

                          {isOpen && (
                            <div className="space-y-5 border-t border-slate-100 bg-slate-50/70 p-4 sm:p-5">
                              <div>
                                <p className="mb-2 flex items-center gap-2 text-sm font-semibold text-violet-700">
                                  <UserRound size={16} />
                                  Intention
                                </p>

                                <p className="whitespace-pre-line text-sm leading-6 text-slate-600">
                                  {question.intention ||
                                    "No intention provided."}
                                </p>
                              </div>

                              <div>
                                <p className="mb-2 flex items-center gap-2 text-sm font-semibold text-emerald-700">
                                  <CheckCircle2 size={16} />
                                  Ideal Answer
                                </p>

                                <p className="whitespace-pre-line text-sm leading-6 text-slate-600">
                                  {question.answer ||
                                    "No ideal answer provided."}
                                </p>
                              </div>
                            </div>
                          )}
                        </article>
                      );
                    })}

                    {currentQuestions.length === 0 && (
                      <div className="rounded-xl border border-slate-200 bg-white p-8 text-center">
                        <AlertCircle
                          size={28}
                          className="mx-auto mb-3 text-slate-400"
                        />
                        <p className="text-sm text-slate-500">
                          No questions available in this section.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

            {/* Preparation Roadmap */}
            {activeTab === "roadmap" && (
              <div>
                <div className="mb-5">
                  <h2 className="text-xl font-bold text-slate-900">
                    Preparation Road Map
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Check off each task as you complete your preparation.
                  </p>
                </div>

                <div className="space-y-4">
                  {preparationPlan.map((plan) => {
                    const tasks = plan.tasks || [];
                    const completedCount = tasks.filter(
                      (_, index) =>
                        completedTasks[`${plan.day}-${index}`]
                    ).length;

                    return (
                      <article
                        key={plan.day}
                        className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
                      >
                        <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                          <span className="rounded-lg bg-violet-50 px-3 py-1.5 text-xs font-bold text-violet-700">
                            Day {plan.day}
                          </span>

                          <span className="text-xs text-slate-500">
                            {completedCount}/{tasks.length} tasks completed
                          </span>
                        </div>

                        <h3 className="mb-4 text-base font-semibold text-slate-800">
                          {plan.focus}
                        </h3>

                        <div className="space-y-3">
                          {tasks.map((task, index) => {
                            const taskId = `${plan.day}-${index}`;
                            const checked = Boolean(completedTasks[taskId]);

                            return (
                              <label
                                key={taskId}
                                className="flex cursor-pointer items-start gap-3 text-sm leading-6 text-slate-600"
                              >
                                <input
                                  type="checkbox"
                                  checked={checked}
                                  onChange={() => toggleTask(taskId)}
                                  className="mt-1 h-4 w-4 shrink-0 accent-violet-600"
                                />

                                <span
                                  className={
                                    checked
                                      ? "text-slate-400 line-through"
                                      : ""
                                  }
                                >
                                  {task}
                                </span>
                              </label>
                            );
                          })}
                        </div>
                      </article>
                    );
                  })}

                  {preparationPlan.length === 0 && (
                    <p className="rounded-xl border border-slate-200 bg-white p-6 text-sm text-slate-500">
                      No preparation plan available.
                    </p>
                  )}
                </div>
              </div>
            )}
          </section>

          {/* Right Sidebar: Skill Gaps */}
          <aside className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-2 flex items-center gap-2">
              <Settings size={19} className="text-violet-600" />

              <h2 className="font-bold text-slate-900">Skill Gaps</h2>

              <span className="ml-auto rounded-full bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-600">
                {skillGaps.length}
              </span>
            </div>

            <p className="mb-4 text-sm leading-6 text-slate-500">
              Areas to strengthen for your target role.
            </p>

            <div className="space-y-3">
              {skillGaps.map((gap, index) => (
                <div
                  key={`${gap.skill}-${index}`}
                  className={`rounded-xl border p-3 ${severityClasses[gap.severity] ||
                    "border-slate-200 bg-slate-50 text-slate-600"
                    }`}
                >
                  <p className="text-sm font-semibold">{gap.skill}</p>

                  <p className="mt-1 text-xs capitalize opacity-80">
                    {gap.severity || "Unspecified"} priority
                  </p>
                </div>
              ))}
            </div>

            {skillGaps.length === 0 && (
              <p className="text-sm text-slate-500">
                No skill gaps available.
              </p>
            )}

            <div className="my-5 border-t border-slate-100" />

            <h3 className="mb-3 text-sm font-semibold text-slate-800">
              Severity Guide
            </h3>

            <div className="space-y-3 text-sm text-slate-600">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
                High priority
              </div>

              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
                Medium priority
              </div>

              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                Low priority
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default InterviewReport;