
import React from "react";
import { Button } from "./ui/button";
import {
    Bookmark,
    MapPin,
    Clock3,
    BriefcaseBusiness,
    Wallet
} from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";
import defaultCompanyLogo from "../assets/defaultCompanyLogo.jfif";

const Job = ({ job }) => {
    const navigate = useNavigate();

    const daysAgoFunction = (mongodbTime) => {
        if (!mongodbTime) return 0;

        const currentTime = new Date();
        const createdAt = new Date(mongodbTime);
        const timeDiff = currentTime - createdAt;

        return Math.max(
            0,
            Math.floor(timeDiff / (1000 * 60 * 60 * 24))
        );
    };

    const daysAgo = daysAgoFunction(job?.createdAt);

    return (
        <div className="group h-[340px] overflow-hidden rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-all duration-300 hover:border-[#7209B7]/40 hover:shadow-lg flex flex-col">

            {/* Posting Date & Bookmark */}
            <div className="flex shrink-0 items-center justify-between">

                <p className="flex items-center gap-1.5 text-xs text-gray-500">
                    <Clock3 size={14} />
                    {daysAgo === 0 ? "Posted today" : `${daysAgo} days ago`}
                </p>

                <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 rounded-full border-gray-200 text-gray-500 hover:border-[#F83002] hover:bg-[#F83002]/5 hover:text-[#F83002]"
                >
                    <Bookmark size={15} />
                </Button>

            </div>

            {/* Company Information */}
            <div className="my-3 flex shrink-0 items-center gap-3">

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-gray-100 bg-gray-50 p-1">

                    <Avatar className="h-full w-full rounded-md">
                        <AvatarImage
                            src={job?.company?.logo || defaultCompanyLogo}
                            className="rounded-md object-contain"
                        />
                    </Avatar>

                </div>

                <div className="min-w-0">
                    <h2 className="truncate text-sm font-semibold text-gray-900">
                        {job?.company?.name}
                    </h2>

                    <p className="mt-1 flex items-center gap-1 truncate text-xs text-gray-500">
                        <MapPin size={12} className="shrink-0" />
                        {job?.location}
                    </p>
                </div>

            </div>

            {/* Job Details */}
            <div className="min-h-0 flex-1 overflow-hidden">

                <h1 className="mb-2 line-clamp-2 text-base font-bold tracking-tight text-gray-900 transition-colors group-hover:text-[#7209B7]">
                    {job?.title}
                </h1>

                <p className="line-clamp-3 text-xs leading-5 text-gray-500">
                    {job?.description}
                </p>

            </div>

            {/* Job Information Badges */}
            <div className="mt-3 flex shrink-0 flex-wrap items-center gap-2">

                <Badge
                    variant="outline"
                    className="border-blue-100 bg-blue-50 px-2 py-1 text-[14px] font-semibold text-blue-700"
                >
                    <BriefcaseBusiness size={15} className="mr-1" />
                    {job?.position} Positions
                </Badge>

                <Badge
                    variant="outline"
                    className="border-[#F83002]/20 bg-[#F83002]/5 px-2 py-1 text-[14px] font-semibold text-[#F83002]"
                >
                    {job?.jobType}
                </Badge>

                <Badge
                    variant="outline"
                    className="border-purple-100 bg-purple-50 px-2 py-1 text-[14px] font-semibold text-[#7209B7]"
                >
                    <Wallet size={15} className="mr-1" />
                    {job?.salary} LPA
                </Badge>

            </div>

            {/* Action Buttons */}
            <div className="mt-3 flex shrink-0 items-center gap-2 border-t border-gray-100 pt-3">

                <Button
                    onClick={() => navigate(`/description/${job?._id}`)}
                    variant="outline"
                    className="h-9 min-w-0 flex-1 border-gray-300 text-xs font-semibold text-gray-700 hover:border-[#7209B7] hover:bg-purple-50 hover:text-[#7209B7]"
                >
                    Details
                </Button>

                <Button
                    className="h-9 min-w-0 flex-1 bg-[#7209B7] text-xs font-semibold text-white hover:bg-[#5e0796]"
                >
                    <Bookmark size={13} className="mr-1 shrink-0" />
                    Save For Later
                </Button>

            </div>

        </div>
    );
};

export default Job;