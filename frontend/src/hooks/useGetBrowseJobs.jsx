import { setBrowseJobs } from '@/redux/jobSlice';
import { JOB_API_END_POINT } from '@/utils/Constatnt';
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const useGetBrowseJobs = () => {
  const dispatch = useDispatch();
  const { searchedQuery } = useSelector((state) => state.job);

  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        let keyword = searchedQuery;

        if (keyword === "allJobs") {
          keyword = "";
        }

        const res = await axios.get(`${JOB_API_END_POINT}/get?keyword=${encodeURIComponent(keyword)}`, { withCredentials: true });

        if (res.data.success) {
          dispatch(setBrowseJobs(res.data.jobs));
        }

      } catch (error) {
        console.log(error);
      }
    }
    fetchAllJobs();
  }, []);
};

export default useGetBrowseJobs