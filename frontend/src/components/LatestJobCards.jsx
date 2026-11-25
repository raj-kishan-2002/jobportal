
import React from "react";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarImage } from "./ui/avatar";
import {
    MapPin,
    BriefcaseBusiness,
    Wallet,
    ArrowUpRight
} from "lucide-react";
import defaultCompanyLogo from "../assets/defaultCompanyLogo.jfif";

const LatestJobCards = ({ job }) => {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(`/description/${job?._id}`)}
            className="group flex h-[280px] w-full min-w-0 cursor-pointer flex-col overflow-hidden rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:border-[#7209B7]/40 hover:shadow-lg"
        >
            {/* Company Information */}
            <div className="flex shrink-0 items-center gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-gray-100 bg-gray-50 p-1">
                    <Avatar className="h-full w-full rounded-lg">
                        <AvatarImage
                            src={job?.company?.logo || defaultCompanyLogo}
                            className="rounded-lg object-contain"
                        />
                    </Avatar>
                </div>

                <div className="min-w-0">
                    <h2 className="truncate text-base font-semibold text-gray-900">
                        {job?.company?.name}
                    </h2>

                    <p className="mt-1 flex items-center gap-1 truncate text-sm text-gray-500">
                        <MapPin size={13} className="shrink-0" />
                        {job?.location}
                    </p>
                </div>
            </div>

            {/* Job Details */}
            <div className="mt-5 min-h-0 flex-1 overflow-hidden">
                <h1 className="mb-2 line-clamp-2 text-lg font-bold leading-6 tracking-tight text-gray-900 transition-colors group-hover:text-[#7209B7]">
                    {job?.title}
                </h1>

                <p className="line-clamp-3 text-sm leading-5 text-gray-500">
                    {job?.description}
                </p>
            </div>

            {/* Job Information */}
            <div className="mt-3 flex shrink-0 flex-wrap items-center gap-2">
                <Badge
                    variant="outline"
                    className="whitespace-nowrap border-blue-100 bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700"
                >
                    <BriefcaseBusiness size={12} className="mr-1" />
                    {job?.position} Positions
                </Badge>

                <Badge
                    variant="outline"
                    className="whitespace-nowrap border-[#F83002]/20 bg-[#F83002]/5 px-2.5 py-1 text-xs font-semibold text-[#F83002]"
                >
                    {job?.jobType}
                </Badge>

                <Badge
                    variant="outline"
                    className="whitespace-nowrap border-purple-100 bg-purple-50 px-2.5 py-1 text-xs font-semibold text-[#7209B7]"
                >
                    <Wallet size={12} className="mr-1" />
                    {job?.salary} LPA
                </Badge>
            </div>

            {/* View Details Indicator */}
            <div className="mt-3 flex shrink-0 items-center justify-between border-t border-gray-100 pt-3">
                <span className="text-sm font-semibold text-gray-600 transition-colors group-hover:text-[#7209B7]">
                    View Job Details
                </span>

                <ArrowUpRight
                    size={18}
                    className="text-gray-400 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#7209B7]"
                />
            </div>
        </div>
    );
};

export default LatestJobCards;