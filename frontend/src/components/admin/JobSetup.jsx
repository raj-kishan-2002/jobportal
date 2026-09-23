import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import axios from "axios";
import { JOB_API_END_POINT } from "@/utils/Constatnt";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { ArrowLeft, Loader2 } from "lucide-react";
import useGetJobById from "@/hooks/useGetJobById";


const JobSetup = () => {

  const params = useParams();
  useGetJobById(params.id);

  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: 0,
    companyId: ""
  });

  const { singleJob } = useSelector(state => state.job);

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { companies } = useSelector(state => state.company);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  }

  const selectChangeHandler = (value) => {
    const selectedCompany = companies.find((company) => company.name.toLowerCase()
      === value);
    setInput({ ...input, companyId: selectedCompany._id });
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      const res = await axios.put(`${JOB_API_END_POINT}/update/${params.id}`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/jobs");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
    finally {
      setLoading(false);
    }
  }

  const deleteJobHandler = async () => {
    try {
      setLoading(true);

      const res = await axios.delete(
        `${JOB_API_END_POINT}/delete/${params.id}`,
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/jobs");
      }
    } catch (error) {
      console.log(error);
      const messages = error?.response?.data?.message;

      if (Array.isArray(messages)) {
        messages.forEach((message) => {
          toast.error(message);
        });
      } else {
        toast.error(
          messages ||
          error?.response?.data?.message ||
          "Something went wrong"
        );
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setInput({
      title: singleJob?.title || "",
      description: singleJob?.description || "",
      requirements: singleJob?.requirements || "",
      salary: singleJob?.salary || "",
      location: singleJob?.location || "",
      jobType: singleJob?.jobType || "",
      experience: singleJob?.experienceLevel || "",
      position: singleJob?.position || "",
      companyId: singleJob?.company || ""
    });
  }, [singleJob]);



  return (
    <div>
      <Navbar />
      <div className="flex justify-center w-screen my-5">
        <div className="w-full max-w-4xl">

          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => navigate("/admin/jobs")}
            className="mb-2"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>

          <form onSubmit={submitHandler} className="p-8 max-w-4xl border border-gray-200 shadow-lg rounded-md">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label>Title</Label>
                <Input
                  type="text"
                  name="title"
                  value={input.title}
                  onChange={changeEventHandler}
                  className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                />
              </div>
              <div>
                <Label>Description</Label>
                <Input
                  type="text"
                  name="description"
                  value={input.description}
                  onChange={changeEventHandler}
                  className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                />
              </div>
              <div>
                <Label>Requirements</Label>
                <Input
                  type="text"
                  name="requirements"
                  value={input.requirements}
                  onChange={changeEventHandler}
                  className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                />
              </div>
              <div>
                <Label>Salary</Label>
                <Input
                  type="text"
                  name="salary"
                  value={input.salary}
                  onChange={changeEventHandler}
                  className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                />
              </div>
              <div>
                <Label>Location</Label>
                <Input
                  type="text"
                  name="location"
                  value={input.location}
                  onChange={changeEventHandler}
                  className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                />
              </div>
              <div>
                <Label>Job Type</Label>
                <Input
                  type="text"
                  name="jobType"
                  value={input.jobType}
                  onChange={changeEventHandler}
                  className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                />
              </div>
              <div>
                <Label>Experience Level</Label>
                <Input
                  type="text"
                  name="experience"
                  value={input.experience}
                  onChange={changeEventHandler}
                  className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                />
              </div>
              <div>
                <Label>No of Position</Label>
                <Input
                  type="number"
                  name="position"
                  value={input.position}
                  onChange={changeEventHandler}
                  className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                />
              </div>
              {
                companies.length > 0 && (
                  <Select onValueChange={selectChangeHandler}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a company" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {
                          companies.map((company) => {
                            return (
                              <SelectItem value={company?.name?.toLowerCase()}>{company.name}</SelectItem>
                            )
                          })
                        }
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )
              }
            </div>
            <div className="flex gap-3 my-4">
              <Button
                type="submit"
                className="w-full bg-[#6a38c2] hover:bg-[#5b30a6]"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </>
                ) : (
                  "Update"
                )}
              </Button>

              <Button
                type="button"
                variant="destructive"
                className="w-full"
                onClick={deleteJobHandler}
                disabled={loading}
              >
                Delete
              </Button>
            </div>
          </form>

        </div>
      </div>



    </div>
  )
}

export default JobSetup;