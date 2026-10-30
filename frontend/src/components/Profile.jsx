import React, { useState } from "react"
import Navbar from "./shared/Navbar"
import Footer from "./Footer"
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar"
import { Button } from "./ui/button"
import { Contact, Mail, Pen, Sparkles, FileText, ArrowUpRight, BriefcaseBusiness } from "lucide-react"
import { Badge } from "./ui/badge"
import { Label } from "./ui/label"
import AppliedJobTable from "./AppliedJobTable"
import UpdateProfileDialog from "./UpdateProfileDialog"
import { useSelector } from "react-redux"
import defaultUserLogo from "../assets/defaultUserLogo.jfif"
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs"
import { useNavigate } from "react-router-dom"
import GenerateReport from "./GenerateReport"


const Profile = () => {
  useGetAppliedJobs()

  const { user } = useSelector(state => state.auth)
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  const skills = user?.profile?.skills || []

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">

        <div className="mb-6">
          <p className="text-sm text-slate-500 mb-1">
            Dashboard / Profile
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
            My Profile
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Manage your professional information and career profile.
          </p>
        </div>

        <section className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-8 shadow-sm transition-shadow hover:shadow-md">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4 min-w-0">
              <Avatar className="h-20 w-20 sm:h-24 sm:w-24 shrink-0 border-2 border-slate-100 shadow-sm">
                <AvatarImage
                  src={user?.profile?.profilePhoto || defaultUserLogo}
                  alt="Profile"
                />
                <AvatarFallback>
                  {user?.fullname?.charAt(0)?.toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>

              <div className="min-w-0">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                  {user?.fullname || "Your Name"}
                </h2>
                <p className="text-sm text-slate-500 mt-1 break-words">
                  {user?.profile?.bio || "Add a bio to introduce yourself."}
                </p>
              </div>
            </div>

            <Button
              onClick={() => setOpen(true)}
              variant="outline"
              className="rounded-xl gap-2 self-start sm:self-auto shrink-0"
            >
              <Pen size={16} />
              Edit Profile
            </Button>
          </div>

          {/* Contact details */}
          <div className="grid sm:grid-cols-2 gap-4 mt-6">
            <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100 transition-colors hover:bg-orange-50">
              <div className="p-2.5 rounded-lg bg-orange-100 text-orange-600">
                <Mail size={19} />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-slate-500">Email address</p>
                <p className="text-sm font-medium text-slate-800 break-all">
                  {user?.email || "Not provided"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100 transition-colors hover:bg-blue-50">
              <div className="p-2.5 rounded-lg bg-blue-100 text-blue-600">
                <Contact size={19} />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-slate-500">Phone number</p>
                <p className="text-sm font-medium text-slate-800">
                  {user?.phoneNumber || "Not provided"}
                </p>
              </div>
            </div>
          </div>
        </section>


        <div className="grid md:grid-cols-2 gap-5 mt-5">

          <section className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5">
            <div className="flex items-center gap-3 mb-5">
              <div className="p-3 rounded-xl bg-violet-100 text-violet-600">
                <Sparkles size={21} />
              </div>
              <div>
                <h2 className="font-bold text-lg text-slate-900">
                  My Skills
                </h2>
                <p className="text-sm text-slate-500">
                  Your professional skill set
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {skills.length > 0 ? (
                skills.map((skill, index) => (
                  <Badge
                    key={`${skill}-${index}`}
                    variant="secondary"
                    className="rounded-lg px-3 py-1.5 bg-violet-50 text-violet-700 border border-violet-100 transition-colors hover:bg-violet-100"
                  >
                    {skill}
                  </Badge>
                ))
              ) : (
                <span className="text-sm text-slate-500">
                  No skills added yet.
                </span>
              )}
            </div>

            <Button
              variant="outline"
              onClick={() => setOpen(true)}
              className="mt-6 rounded-xl gap-2"
            >
              Update Skills <Pen size={15} />
            </Button>
          </section>

          <section className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5">
            <div className="flex items-center gap-3 mb-5">
              <div className="p-3 rounded-xl bg-emerald-100 text-emerald-600">
                <FileText size={21} />
              </div>
              <div>
                <h2 className="font-bold text-lg text-slate-900">
                  My Resume
                </h2>
                <p className="text-sm text-slate-500">
                  Your uploaded resume
                </p>
              </div>
            </div>

            {user?.profile?.resume ? (
              <a
                href={user.profile.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-emerald-50 hover:border-emerald-200 transition-colors group"
              >
                <FileText className="text-emerald-600 shrink-0" size={23} />
                <span className="text-sm font-medium text-slate-800 break-all flex-1">
                  {user?.profile?.resumeOriginalName || "View Resume"}
                </span>
                <ArrowUpRight
                  size={18}
                  className="text-slate-400 group-hover:text-emerald-600 shrink-0"
                />
              </a>
            ) : (
              <p className="text-sm text-slate-500 p-4 rounded-xl bg-slate-50 border border-dashed border-slate-200">
                No resume uploaded yet.
              </p>
            )}

            <Button
              variant="outline"
              onClick={() => setOpen(true)}
              className="mt-6 rounded-xl gap-2"
            >
              Manage Resume <Pen size={15} />
            </Button>
          </section>
        </div>

        {/* AI Interview Report access */}
        <section className="mt-5 rounded-2xl overflow-hidden bg-slate-950 text-white shadow-sm transition-shadow hover:shadow-lg">
          <div className="relative p-6 sm:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="absolute -right-10 -top-16 h-48 w-48 rounded-full bg-orange-500/20 blur-3xl pointer-events-none" />

            <div className="relative flex gap-4 items-start">
              <div className="shrink-0 rounded-xl p-3 bg-orange-500/15 border border-orange-400/20 text-orange-400">
                <Sparkles size={27} />
              </div>
              <div>
                <span className="text-xs uppercase tracking-widest font-semibold text-orange-400">
                  AI-powered career tool
                </span>
                <h2 className="text-xl sm:text-2xl font-bold mt-2">
                  AI Interview Report
                </h2>
                <p className="text-sm text-slate-300 mt-2 max-w-xl leading-6">
                  Analyze your resume against a job description,
                  discover skill gaps, and get personalized
                  interview preparation recommendations.
                </p>
              </div>
            </div>

            <Button
              onClick={() => navigate("/interview")}
              className="relative shrink-0 rounded-xl bg-orange-500 hover:bg-orange-600 text-white gap-2"
            >
              Generate Report
              <ArrowUpRight size={17} />
            </Button>
          </div>
        </section>

        <section className="mt-8">
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-5 sm:p-6 border-b border-slate-100">
              <div>
                <h1 className="text-xl font-bold text-slate-900">
                  Applied Jobs
                </h1>
                <p className="text-sm text-slate-500 mt-1">
                  Track your job applications and their current status.
                </p>
              </div>

              <div className="flex items-center gap-2 w-fit rounded-lg bg-orange-50 text-orange-700 px-3 py-2">
                <BriefcaseBusiness size={17} />
                <span className="text-sm font-medium">
                  Application History
                </span>
              </div>
            </div>


            <div className="p-3 sm:p-5 overflow-x-auto">
              <AppliedJobTable />
            </div>

          </div>
        </section>


      </main>

      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  )
}

export default Profile