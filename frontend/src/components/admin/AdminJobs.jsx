import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import AdminJobsTable from "./AdminJobsTable";
import useGetAllAdminJobs from "@/hooks/useGetAllAdminJobs";
import { setSearchJobByText } from "@/redux/jobSlice";
import Footer from "../Footer";

const AdminJobs = () => {
  useGetAllAdminJobs();
  const [input, setinput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input]);
  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto my-10 flex-1 h-[80vh] overflow-y-auto pb-5">
        <div className="flex intem-center justify-between my-5">
          <Input
            className="w-fit"
            placeholder="Filter by name, role"
            onChange={(e) => setinput(e.target.value)}
          />
          <Button onClick={() => navigate('/admin/jobs/create')} >New jobs</Button>
        </div>
        <AdminJobsTable />
      </div>
      <Footer />
    </div>
  )
}

export default AdminJobs