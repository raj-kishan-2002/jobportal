import React, { useEffect, useState } from "react"
import Navbar from "./shared/Navbar"
import Footer from "./Footer"
import FilterCard from "./FilterCard"
import Job from "./Job"
import { useSelector } from "react-redux"
import useGetBrowseJobs from "@/hooks/useGetBrowseJobs"
import NoJobsFound from "./NoJobsFound"


const Jobs = () => {
    useGetBrowseJobs();
    const { browseJobs, searchedQuery } = useSelector(state => state.job);
    const [filterJobs, setFilterJobs] = useState(browseJobs);


    useEffect(() => {
        if (searchedQuery && searchedQuery !== "allJobs") {
            const query = String(searchedQuery).toLowerCase();
            const filteredJobs = browseJobs.filter((job) => {
                return job.title.toLowerCase().includes(query.toLowerCase()) ||
                    job.description.toLowerCase().includes(query.toLowerCase()) ||
                    job.location.toLowerCase().includes(query.toLowerCase())
            })
            setFilterJobs(filteredJobs);
        } else {
            setFilterJobs(browseJobs);
        }
    }, [browseJobs, searchedQuery]);

    return (
        <div>
            <Navbar />
            <div className="max-w-7xl mx-auto my-10 ">
                <div className="flex gap-5">
                    <div className="w-[16%] shrink-0">
                        <FilterCard />
                    </div>
                    {
                        filterJobs.length <= 0 ? <NoJobsFound /> : (

                            <div className="flex-1 min-w-0 h-[88vh] overflow-y-auto pb-5">

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 items-start">

                                    {filterJobs.map((job) => (
                                        <div key={job?._id} className="min-w-0">
                                            <Job job={job} />
                                        </div>
                                    ))}

                                </div>

                            </div>

                        )
                    }
                </div>
            </div>
            <Footer />
        </div>
    )
}
export default Jobs