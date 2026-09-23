import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, SearchX } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
      <div className="text-center max-w-2xl">


        <div className="flex justify-center mb-6">
          <div className="h-20 w-20 rounded-full bg-orange-100 flex items-center justify-center">
            <SearchX className="h-10 w-10 text-[#f83002]" />
          </div>
        </div>


        <h1 className="text-8xl md:text-9xl font-extrabold tracking-tight text-gray-900">
          4<span className="text-[#f83002]">0</span>4
        </h1>


        <h2 className="mt-4 text-2xl md:text-3xl font-bold text-gray-800">
          Looks like you took a wrong turn!
        </h2>


        <p className="mt-4 text-gray-500 text-base md:text-lg leading-relaxed">
          The page you're looking for doesn't exist or may have been
          moved. Let's get you back to finding your next opportunity.
        </p>


        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">

          <Button
            asChild
            className="bg-[#f83002] hover:bg-[#d92a00] text-white"
          >
            <Link to="/">
              <Home className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>

          <Button
            variant="outline"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </Button>

        </div>


        <div className="mt-12 text-sm text-gray-400">
          <span className="font-medium text-gray-500">
            Job Portal
          </span>{" "}
          — Your next opportunity is just a click away.
        </div>

      </div>
    </div>
  );
};

export default NotFound;