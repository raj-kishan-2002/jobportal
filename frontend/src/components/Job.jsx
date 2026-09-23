import React from "react"
import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";
import defaultCompanyLogo from "../assets/defaultCompanyLogo.jfif";



const Job = ({ job }) => {
    const navigate = useNavigate();

    const daysAgoFunction = (mongodbTime) => {
        const currentTime = new Date();
        const createdAt = new Date(mongodbTime);
        const timeDiff = currentTime - createdAt;
        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        return days;
    }
    return (
        <div className="p-5 rounded-md shadow-lg bg-white border border-gray-100">
            <div className="flex items-center justify-between">
                <p className="text-gray-500 text-sm">{daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}</p>
                <Button variant="outline" className="rounded-full" size="icon"><Bookmark /></Button>
            </div>

            <div className="flex items-center gap-2 my-2">
                <Button className="p-6" variant="outline" size="icon">
                    <Avatar >
                        <AvatarImage src={job?.company?.logo || defaultCompanyLogo} />
                    </Avatar>
                </Button>
                <div>
                    <h1 className="font-medium text-lg">{job?.company?.name}</h1>
                    <p className="text-sm text-gray-500">{job.location}</p>
                </div>
            </div>

            <div>
                <h1 className="font-bold text-lg my-2">{job?.title}</h1>
                <p className="text-sm text-gray-600">{job?.description}</p>
            </div>
            <div className="flex item-center gap-2 mt-4">
                <Badge className="text-blue-700 font-bold text-sm" variant="ghost"> {job?.position} Positions </Badge>
                <Badge className="text-[#F83002] font-bold text-sm" variant="ghost"> {job?.jobType} </Badge>
                <Badge className="text-[#7209B7] font-bold text-sm" variant="ghost"> {job?.salary}LPA </Badge>
            </div>

            <div className="flex items-center gap-4 mt-4">
                <Button onClick={() => navigate(`/description/${job?._id}`)} variant="outline">Details</Button>
                <Button className="bg-[#7209B7]">Save For Later</Button>
            </div>
        </div>
    )
}

export default Job;
