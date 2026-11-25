
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const NoJobsFound = () => {
  const { browseJobs } = useSelector((state) => state.job);
  const navigate = useNavigate();

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-12">

      <div className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-gray-200 bg-white p-8 sm:p-12 text-center shadow-sm hover:shadow-lg transition-all duration-300">

        {/* Decorative Background */}
        <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full bg-blue-100/60 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-40 h-40 rounded-full bg-indigo-100/60 blur-3xl pointer-events-none" />

        <div className="relative z-10">

          {/* Empty State Illustration */}
          <div className="mx-auto mb-7 flex h-24 w-24 items-center justify-center rounded-2xl bg-blue-50 border border-blue-100 group">

            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-12 w-12 text-blue-600 transition-transform duration-300 hover:scale-110"
            >
              <rect x="3" y="4" width="18" height="16" rx="2" />
              <path d="M8 4V2h8v2" />
              <path d="M3 10h18" />
              <path d="M9 15h6" />
              <path d="M12 12v6" />
            </svg>

          </div>

          {/* Heading */}
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
            No Jobs Found!
          </h2>

          {/* Description */}
          <p className="text-sm sm:text-base leading-7 text-gray-500 max-w-md mx-auto">
            We couldn't find any jobs matching your search.
            Try adjusting your search criteria or explore
            other available opportunities.
          </p>

          {/* Search Information */}
          <div className="inline-flex items-center gap-2 mt-6 px-4 py-2 rounded-full bg-gray-50 border border-gray-200">

            <span className="h-2 w-2 rounded-full bg-orange-500" />

            <span className="text-sm text-gray-600">
              <span className="font-semibold text-gray-900">
                {browseJobs?.length ?? 0}
              </span>{" "}
              jobs available in your search
            </span>

          </div>

          {/* Action Button */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">

            <button
              onClick={() => navigate("/")}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-blue-600/20 hover:bg-blue-700 hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>

              Back to Home
            </button>

            <button
              onClick={() => navigate("/jobs")}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-700 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300"
            >
              Explore Jobs

              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </button>

          </div>

          {/* Bottom Note */}
          <p className="mt-8 text-xs text-gray-400">
            New opportunities are added regularly. Keep exploring!
          </p>

        </div>
      </div>
    </div>
  );
};

export default NoJobsFound;