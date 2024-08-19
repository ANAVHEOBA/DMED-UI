import Image from "next/image";
import React from "react";
import FindCard from "./FindCard";

const FindSection = () => {
  const findList = [
    {
      id: 1,
      title: "Visit Doctor",
      btnName: "Book now",
      image: "/find_doctor.jpg",
      path: "",
    },
    {
      id: 2,
      title: "Find a Pharmacy",
      btnName: "Find Now",
      image: "/find_medicine.jpg",
      path: "",
    },
    {
      id: 3,
      title: "Find a Lab",
      btnName: "Coming soon",
      image: "/find_lab.jpg",
      path: "",
    },
  ];

  return (
    <div className="bg-[#f9f9f9] dark:bg-[#030B29]">
      <p className="text-center text-3xl font-semibold text-[#272b41] dark:text-white">
        What are you looking for?
      </p>
      <div className="grid grid-cols-1 gap-y-4 md:grid-cols-2 lg:grid-cols-3 px-12 md:mx-20 mt-5">
        {findList.map((findItem) => (
          <FindCard key={findItem.id} {...findItem} />
        ))}
      </div>
    </div>
  );
};

export default FindSection;
