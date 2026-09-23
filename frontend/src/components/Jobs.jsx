import React, { useEffect, useState } from "react"
import Navbar from "./shared/Navbar"
import Footer from "./Footer"
import FilterCard from "./FilterCard"
import Job from "./Job"
import { useSelector } from "react-redux"
import useGetBrowseJobs from "@/hooks/useGetBrowseJobs"


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
                    <div className="w-20%">
                        <FilterCard />
                    </div>
                    {
                        filterJobs.length <= 0 ? <span>Jobs not found</span> : (
                            <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
                                <div className="grid grid-cols-3 gap-5">
                                    {
                                        filterJobs.map((job) => (
                                            <div key={job?._id}>
                                                <Job job={job} />
                                            </div>
                                        ))
                                    }
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