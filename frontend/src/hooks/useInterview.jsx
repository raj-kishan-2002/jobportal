import { toast } from "sonner";
import axios from "axios";
import { INTERVIEW_REPORT_API_END_POINT } from "../utils/Constatnt";

export const useInterview = () => {

  const getReportById = async (interviewId) => {
    try {
      const res = await axios.get(`${INTERVIEW_REPORT_API_END_POINT}/report/${interviewId}`, { withCredentials: true });
      if (res.data.success) {
        toast.success(res.data.message);
        return res.data;
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  }

  const getAllReports = async () => {
    try {
      const res = await axios.get(`${INTERVIEW_REPORT_API_END_POINT}/reports`, { withCredentials: true });
      if (res.data.success) {
        return res.data;
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  }

  const getResumePdf = async (interviewId) => {
    try {
      const res = await axios.get(`${INTERVIEW_REPORT_API_END_POINT}/report/${interviewId}/pdf`,
        {
          withCredentials: true,
          responseType: "blob",
        });
      const url = window.URL.createObjectURL(new Blob([res.data], { type: "application/pdf" }));
      const link = document.createElement("a");
      link.href = url;
      link.download = `resume_${interviewId}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.log(error);
      toast.error(error.res.data.message);
    }
  }

  return { getReportById, getAllReports, getResumePdf }

};