
import React, { useEffect, useState } from "react";
import {
    BriefcaseBusiness,
    MapPin,
    Wallet,
    Users,
    CalendarDays,
    Clock3,
    Building2,
    FileText,
    CheckCircle2,
    Loader2,
    Bookmark
} from "lucide-react";

import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useParams } from "react-router-dom";
import axios from "axios";

import {
    APPLICATION_API_END_POINT,
    JOB_API_END_POINT,
} from "@/utils/Constatnt";

import { setSingleJob } from "@/redux/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

import Navbar from "./shared/Navbar";
import Footer from "./Footer";

const JobDescription = () => {
    const { singleJob } = useSelector((state) => state.job);
    const { user } = useSelector((state) => state.auth);

    const [isApplied, setIsApplied] = useState(false);
    const [isApplying, setIsApplying] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const { id: jobId } = useParams();
    const dispatch = useDispatch();

    // Apply for Job
    const applyJobHandler = async () => {
        if (isApplied || isApplying) return;

        try {
            setIsApplying(true);

            const res = await axios.get(
                `${APPLICATION_API_END_POINT}/apply/${jobId}`,
                { withCredentials: true }
            );

            if (res.data.success) {
                setIsApplied(true);

                const updatedSingleJob = {
                    ...singleJob,
                    applications: [
                        ...(singleJob?.applications || []),
                        { applicant: user?._id },
                    ],
                };

                dispatch(setSingleJob(updatedSingleJob));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(
                error.response?.data?.message || "Unable to apply for this job."
            );
        } finally {
            setIsApplying(false);
        }
    };

    // Fetch Single Job
    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                setIsLoading(true);

                const res = await axios.get(
                    `${JOB_API_END_POINT}/get/${jobId}`,
                    { withCredentials: true }
                );

                if (res.data.success) {
                    const job = res.data.job;

                    dispatch(setSingleJob(job));

                    const alreadyApplied = job?.applications?.some(
                        (application) =>
                            application.applicant === user?._id
                    ) || false;

                    setIsApplied(alreadyApplied);
                }
            } catch (error) {
                console.log(error);
                toast.error(
                    error.response?.data?.message || "Failed to load job details."
                );
            } finally {
                setIsLoading(false);
            }
        };

        fetchSingleJob();
    }, [jobId, dispatch, user?._id]);

    // Format Posted Date
    const postedDate = singleJob?.createdAt
        ? new Date(singleJob.createdAt).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "long",
            year: "numeric",
        })
        : "Not available";

    // Loading State
    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Navbar />
                <div className="mx-auto flex min-h-[70vh] max-w-7xl items-center justify-center px-4">
                    <Loader2 className="h-8 w-8 animate-spin text-[#7209B7]" />
                </div>
                <Footer />
            </div>
        );
    }

    if (!singleJob?._id || singleJob._id !== jobId) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Navbar />
                <div className="mx-auto flex min-h-[70vh] max-w-7xl flex-col items-center justify-center px-4 text-center">
                    <BriefcaseBusiness className="mb-4 h-12 w-12 text-gray-300" />
                    <h2 className="text-xl font-bold text-gray-800">
                        Job not found
                    </h2>
                    <p className="mt-2 text-sm text-gray-500">
                        This job may have been removed or is no longer available.
                    </p>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

                {/* Job Header */}
                <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">

                    <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">

                        <div className="min-w-0">
                            <div className="mb-3 flex items-center gap-2">
                                <Badge className="border-0 bg-purple-50 text-[#7209B7] hover:bg-purple-50">
                                    Job Opportunity
                                </Badge>
                                <span className="text-sm text-gray-400">
                                    <Clock3 className="mr-1 inline h-3.5 w-3.5" />
                                    {postedDate}
                                </span>
                            </div>

                            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                                {singleJob?.title}
                            </h1>

                            <div className="mt-4 flex flex-wrap items-center gap-3">
                                <Badge
                                    variant="outline"
                                    className="border-blue-100 bg-blue-50 px-3 py-1.5 text-sm font-semibold text-blue-700"
                                >
                                    <BriefcaseBusiness className="mr-1.5 h-4 w-4" />
                                    {singleJob?.position} Positions
                                </Badge>

                                <Badge
                                    variant="outline"
                                    className="border-[#F83002]/20 bg-[#F83002]/5 px-3 py-1.5 text-sm font-semibold text-[#F83002]"
                                >
                                    {singleJob?.jobType}
                                </Badge>

                                <Badge
                                    variant="outline"
                                    className="border-purple-100 bg-purple-50 px-3 py-1.5 text-sm font-semibold text-[#7209B7]"
                                >
                                    <Wallet className="mr-1.5 h-4 w-4" />
                                    {singleJob?.salary} LPA
                                </Badge>
                            </div>
                        </div>

                        {/* Apply Button */}
                        <div className="flex shrink-0 items-center gap-3">
                            <Button
                                variant="outline"
                                className="h-11 rounded-lg border-[#7209B7] px-5 font-semibold text-[#7209B7] transition-all hover:bg-purple-50"
                            >
                                <Bookmark className="mr-2 h-4 w-4" />
                                Save For Later
                            </Button>

                            <Button
                                onClick={applyJobHandler}
                                disabled={isApplied || isApplying}
                                className={`h-11 min-w-[160px] rounded-lg px-6 font-semibold text-white shadow-sm transition-all ${isApplied
                                    ? "cursor-not-allowed bg-gray-400 hover:bg-gray-400"
                                    : "bg-[#7209B7] hover:bg-[#5e0796]"
                                    }`}
                            >
                                {isApplying ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Applying...
                                    </>
                                ) : isApplied ? (
                                    <>
                                        <CheckCircle2 className="mr-2 h-4 w-4" />
                                        Already Applied
                                    </>
                                ) : (
                                    "Apply Now"
                                )}
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Job Description and Information */}
                <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">

                    {/* Left: Description */}
                    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm lg:col-span-2 sm:p-8">

                        <div className="mb-6 flex items-center gap-3 border-b border-gray-100 pb-4">
                            <div className="rounded-lg bg-[#F83002]/10 p-2.5">
                                <FileText className="h-5 w-5 text-[#F83002]" />
                            </div>

                            <h2 className="text-xl font-bold text-gray-900">
                                Job Description
                            </h2>
                        </div>

                        <div className="space-y-6">

                            <div>
                                <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-500">
                                    Role
                                </h3>
                                <p className="font-medium text-gray-900">
                                    {singleJob?.title}
                                </p>
                            </div>

                            <div>
                                <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-500">
                                    About the Job
                                </h3>
                                <p className="whitespace-pre-line text-sm leading-7 text-gray-600">
                                    {singleJob?.description}
                                </p>
                            </div>

                        </div>
                    </div>

                    {/* Right: Job Overview */}
                    <aside className="h-fit rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

                        <h2 className="mb-5 text-lg font-bold text-gray-900">
                            Job Overview
                        </h2>

                        <div className="space-y-5">

                            <div className="flex items-start gap-3">
                                <div className="rounded-lg bg-blue-50 p-2.5">
                                    <MapPin className="h-5 w-5 text-blue-600" />
                                </div>
                                <div className="min-w-0">
                                    <p className="text-xs font-medium text-gray-400">
                                        Location
                                    </p>
                                    <p className="mt-1 break-words text-sm font-semibold text-gray-800">
                                        {singleJob?.location}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="rounded-lg bg-purple-50 p-2.5">
                                    <Building2 className="h-5 w-5 text-[#7209B7]" />
                                </div>
                                <div className="min-w-0">
                                    <p className="text-xs font-medium text-gray-400">
                                        Experience
                                    </p>
                                    <p className="mt-1 text-sm font-semibold text-gray-800">
                                        {singleJob?.experienceLevel} Years
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="rounded-lg bg-green-50 p-2.5">
                                    <Users className="h-5 w-5 text-green-600" />
                                </div>
                                <div className="min-w-0">
                                    <p className="text-xs font-medium text-gray-400">
                                        Total Applicants
                                    </p>
                                    <p className="mt-1 text-sm font-semibold text-gray-800">
                                        {singleJob?.applications?.length ?? 0}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="rounded-lg bg-orange-50 p-2.5">
                                    <CalendarDays className="h-5 w-5 text-[#F83002]" />
                                </div>
                                <div className="min-w-0">
                                    <p className="text-xs font-medium text-gray-400">
                                        Posted Date
                                    </p>
                                    <p className="mt-1 text-sm font-semibold text-gray-800">
                                        {postedDate}
                                    </p>
                                </div>
                            </div>

                        </div>
                    </aside>
                </div>

            </main>

            <Footer />
        </div>
    );
};

export default JobDescription;