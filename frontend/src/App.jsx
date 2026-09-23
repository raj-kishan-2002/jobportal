import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import ProtectedRoute from './components/auth/ProtectedRoute'
import Home from './components/Home'
import Jobs from './components/Jobs'
import Browse from './components/Browse'
import Profile from './components/Profile'
import JobDescription from './components/JobDescription'
import Companies from './components/admin/Companies'
import AdminJobs from './components/admin/AdminJobs'
import CompanyCreate from './components/admin/CompanyCreate'
import CompanySetup from './components/admin/CompanySetup'
import Applicants from './components/admin/Applicants'
import JobCreate from './components/admin/JobCreate'
import JobSetup from './components/admin/JobSetup'

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/browse",
    element: <Browse />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/signup",
    element: <Signup />
  },
  {
    path: "/jobs",
    element: (
      <ProtectedRoute allowedRoles={["student"]}>
        <Jobs />
      </ProtectedRoute>
    )
  },
  {
    path: "/description/:id",
    element: (
      <ProtectedRoute allowedRoles={["student"]}>
        <JobDescription />
      </ProtectedRoute>
    )
  },
  {
    path: "/profile",
    element: (
      <ProtectedRoute allowedRoles={["student"]}>
        <Profile />
      </ProtectedRoute>
    )
  },
  {
    path: "/admin/companies",
    element: (
      <ProtectedRoute allowedRoles={["recruiter"]}>
        <Companies />
      </ProtectedRoute>
    )
  },
  {
    path: "/admin/companies/create",
    element: (
      <ProtectedRoute allowedRoles={["recruiter"]}>
        <CompanyCreate />
      </ProtectedRoute>
    )
  },
  {
    path: "/admin/companies/:id",
    element: (
      <ProtectedRoute allowedRoles={["recruiter"]}>
        <CompanySetup />
      </ProtectedRoute>
    )
  },
  {
    path: "/admin/jobs",
    element: (
      <ProtectedRoute allowedRoles={["recruiter"]}>
        <AdminJobs />
      </ProtectedRoute>
    )
  },
  {
    path: "/admin/jobs/create",
    element: (
      <ProtectedRoute allowedRoles={["recruiter"]}>
        <JobCreate />
      </ProtectedRoute>
    )
  },
  {
    path: "/admin/jobs/:id",
    element: (
      <ProtectedRoute allowedRoles={["recruiter"]}>
        <JobSetup />
      </ProtectedRoute>
    )
  },
  {
    path: "/admin/jobs/:id/applicants",
    element: (
      <ProtectedRoute allowedRoles={["recruiter"]}>
        <Applicants />
      </ProtectedRoute>
    )
  }
])

function App() {

  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  )
}

export default App
