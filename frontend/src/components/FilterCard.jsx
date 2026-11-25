
import React, { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";

const filterData = [
    {
        filterType: "Location",
        array: ["Delhi NCR", "Ranchi", "Hydrabad", "Pune", "Mumbai"]
    },
    {
        filterType: "Industry",
        array: ["IT", "Marketing", "Finance", "HR", "Sales"]
    },
    {
        filterType: "Salary",
        array: ["0-40k", "42-1lakh", "1lakh to 5lakh"]
    },
];

const FilterCard = () => {
    const [selectedValue, setSelectedValue] = useState("");
    const dispatch = useDispatch();

    const changeHandler = (value) => {
        setSelectedValue(value);
    };

    useEffect(() => {
        dispatch(setSearchedQuery(selectedValue));
    }, [selectedValue, dispatch]);

    return (
        <div className="w-full rounded-md bg-white p-3">
            <h1 className="text-lg font-bold">Filter Jobs</h1>
            <hr className="mt-3" />

            <RadioGroup value={selectedValue} onValueChange={changeHandler}>
                <div>
                    <h2 className="text-lg font-bold">All Jobs</h2>

                    <div className="my-2 flex items-center space-x-2">
                        <RadioGroupItem value="allJobs" id="allJobs" />
                        <Label htmlFor="allJobs">All Jobs</Label>
                    </div>
                </div>

                {filterData.map((data, index) => (
                    <div key={data.filterType}>
                        <h2 className="text-lg font-bold">
                            {data.filterType}
                        </h2>

                        {data.array.map((item, idx) => {
                            const itemId = `id${index}-${idx}`;

                            return (
                                <div
                                    key={itemId}
                                    className="my-2 flex items-center space-x-2"
                                >
                                    <RadioGroupItem value={item} id={itemId} />
                                    <Label htmlFor={itemId}>{item}</Label>
                                </div>
                            );
                        })}
                    </div>
                ))}
            </RadioGroup>
        </div>
    );
};

export default FilterCard;