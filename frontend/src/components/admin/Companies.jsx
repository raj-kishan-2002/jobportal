import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import CompaniesTable from "./CompaniesTable";
import { useNavigate } from "react-router-dom";
import useGetAllCompanies from "@/hooks/useGetAllCompanies";
import { useDispatch } from "react-redux";
import { setSearchCompanyByText } from "@/redux/companySlice";
import Footer from "../Footer";
import { useSelector } from "react-redux";

const Companies = () => {

    const { user } = useSelector(state => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (user?.role === 'student') {
            navigate('/');
        }
    }, []);

    useGetAllCompanies();
    const [input, setinput] = useState("");

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setSearchCompanyByText(input));
    }, [input]);
    return (
        <div>
            <Navbar />
            <div className="max-w-6xl mx-auto my-10 flex-1 h-[80vh] overflow-y-auto pb-5">
                <div className="flex intem-center justify-between my-5">
                    <Input
                        className="w-fit"
                        placeholder="filter by name"
                        onChange={(e) => setinput(e.target.value)}
                    />
                    <Button onClick={() => navigate('/admin/companies/create')} >New Company</Button>
                </div>
                <CompaniesTable />

            </div>
            <Footer />
        </div>
    )
}

export default Companies