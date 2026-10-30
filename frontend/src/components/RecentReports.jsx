import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FileText,
  ArrowUpRight,
  CalendarDays,
  Target,
  ChevronRight,
} from "lucide-react";

const RecentReports = ({ report }) => {
  const navigate = useNavigate();

  const formattedDate = new Date(report.createdAt).toLocaleDateString(
    "en-IN",
    {
      day: "numeric",
      month: "short",
      year: "numeric",
    }
  );

  const handleClick = () => {
    navigate(`/interview/${report._id}`);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="group w-full text-left rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-violet-300 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2"
    >
      {/* Card Header */}
      <div className="flex items-start justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-50 text-violet-600 transition-colors group-hover:bg-violet-600 group-hover:text-white">
          <FileText size={21} />
        </div>

        <div className="flex items-center gap-1 rounded-full bg-violet-50 px-3 py-1.5 text-xs font-semibold text-violet-700">
          <Target size={13} />
          {report.matchScore}/100
        </div>
      </div>

      {/* Report Details */}
      <div className="mt-5">
        <h3 className="line-clamp-2 min-h-12 text-base font-semibold leading-6 text-slate-900 transition-colors group-hover:text-violet-700">
          {report.title}
        </h3>

        <div className="mt-3 flex items-center gap-2 text-xs text-slate-500">
          <CalendarDays size={14} />
          <span>Generated on {formattedDate}</span>
        </div>
      </div>

      {/* Match Score */}
      <div className="mt-5 border-t border-slate-100 pt-4">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs font-medium text-slate-500">
            Profile Match Score
          </span>
          <span className="text-sm font-bold text-violet-700">
            {report.matchScore}%
          </span>
        </div>

        <div
          className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100"
          role="progressbar"
          aria-valuenow={report.matchScore}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Profile match score"
        >
          <div
            className="h-full rounded-full bg-violet-600 transition-all duration-500"
            style={{
              width: `${Math.min(100, Math.max(0, report.matchScore))}%`,
            }}
          />
        </div>
      </div>

      {/* Footer */}
      <div className="mt-5 flex items-center justify-between">
        <span className="text-xs font-semibold text-violet-700">
          View Interview Report
        </span>

        <ChevronRight
          size={18}
          className="text-slate-400 transition-all group-hover:translate-x-1 group-hover:text-violet-600"
        />
      </div>
    </button>
  );
};

export default RecentReports;