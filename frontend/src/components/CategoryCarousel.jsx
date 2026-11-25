import React from "react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "./ui/carousel";
import { Button } from "./ui/button";
import { setSearchedQuery } from "@/redux/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CategoryCarousel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { allJobs = [] } = useSelector((state) => state.job);

    const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    };

    // Get unique job titles
    const jobTitles = [
        ...new Set(
            allJobs
                .map((job) => job?.title?.trim())
                .filter(Boolean)
        ),
    ];

    return (
        <div>
            <Carousel className="mx-auto my-20 w-full max-w-xl">
                <CarouselContent>
                    {jobTitles.length === 0 ? (
                        <CarouselItem>
                            <p className="text-center text-gray-500">
                                No jobs available.
                            </p>
                        </CarouselItem>
                    ) : (
                        jobTitles.map((title, index) => (
                            <CarouselItem
                                key={`${title}-${index}`}
                                className="basis-1/2 md:basis-1/3"
                            >
                                <Button
                                    onClick={() => searchJobHandler(title)}
                                    variant="outline"
                                    className="w-full rounded-full border-gray-200 text-sm font-medium hover:border-[#7209B7] hover:bg-purple-50 hover:text-[#7209B7]"
                                >
                                    {title}
                                </Button>
                            </CarouselItem>
                        ))
                    )}
                </CarouselContent>

                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    );
};

export default CategoryCarousel;