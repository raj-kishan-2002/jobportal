import React, { useEffect } from "react"
import Navbar from "./shared/Navbar"
import Footer from "./Footer"
import Job from "./Job";
import useGetBrowseJobs from "@/hooks/useGetBrowseJobs";
import { useDispatch, useSelector } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import NoJobsFound from "./NoJobsFound";

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

                {browseJobs.length === 0 ? (
                    <NoJobsFound />
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {browseJobs.map((job) => (
                            <div key={job._id}>
                                <Job job={job} />
                            </div>
                        ))}
                    </div>
                )}

            </div>

            <Footer />
        </div>
    )
}

export default Browse