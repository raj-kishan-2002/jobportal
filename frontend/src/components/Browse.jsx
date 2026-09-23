import React, { useEffect } from "react"
import Navbar from "./shared/Navbar"
import Footer from "./Footer"
import Job from "./Job";
import useGetBrowseJobs from "@/hooks/useGetBrowseJobs";
import { useDispatch, useSelector } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";

const Browse = () => {
    useGetBrowseJobs();
    const { browseJobs } = useSelector((state) => state.job);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setSearchedQuery(""));
    });

    return (
        <div >
            <Navbar />

            <div className="max-w-7xl mx-auto my-10 flex-1 h-[80vh] overflow-y-auto pb-5">
                <h1 className="font-bold text-xl my-10">Search Results ({browseJobs.length})</h1>

                <div className=" grid grid-cols-3 gap-5">
                    {
                        browseJobs.map((job) => {
                            return (
                                <Job
                                    key={job._id}
                                    job={job}
                                />
                            )
                        })
                    }
                </div>

            </div>

            <Footer />
        </div>
    )
}

export default Browse