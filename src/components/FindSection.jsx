import React from "react";
import FindCard from "./FindCard";

function FindSection() {
  // Array of items to display in the section
  const findList = [
    {
      id: 1,
      title: "Visit Doctor",
      btnName: "Book now",
      image: "/find_doctor.jpg",
      path: "/book-doctor",
    },
    {
      id: 2,
      title: "Find a Pharmacy",
      btnName: "Find Now",
      image: "/find_medicine.jpg",
      path: "/find-pharmacy",
    },
    {
      id: 3,
      title: "Find a Lab",
      btnName: "Coming soon",
      image: "/find_lab.jpg",
      path: "/find-lab",
    },
  ];

  return (
    <div className="bg-[#f9f9f9] dark:bg-[#030B29]">
      <p className="text-center text-3xl font-semibold text-[#272b41] dark:text-white mb-6">
        What are you looking for?
      </p>
      <div className="grid grid-cols-1 gap-y-4 md:grid-cols-2 lg:grid-cols-3 px-12 md:mx-20 mt-5">
        {findList.map((findItem) => {
          return (
            <FindCard
              key={findItem.id}
              title={findItem.title}
              btnName={findItem.btnName}
              image={findItem.image}
              path={findItem.path}
            />
          );
        })}
      </div>
    </div>
  );
}

export default FindSection;
