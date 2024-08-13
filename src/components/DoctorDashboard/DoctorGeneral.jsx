import generateIpfsMediaLink from "@/utils/generateIpfsLink";
import Image from "next/image";
import React from "react";
import { GoLocation } from "react-icons/go";

function DoctorGeneral({ doctorData }) {
  return (
    <div className="px-4 py-4 border border-[#f0f0f0] rounded space-y-2 flex flex-col justify-between dark:border-dark-input-border dark:bg-dark-card">
      <div className="relative w-36 h-36">
        <Image
          src={generateIpfsMediaLink(doctorData.image)}
          fill
          alt="logo"
          className="rounded-full"
        />
      </div>
      <h5 className="dark:text-white cursor-pointer hover:text-primary-green duration-300 transition transform ease-out">
        {doctorData.name}
      </h5>
      <p className="dark:text-dark-muted">
        {doctorData.specialization}
      </p>
      <div className="flex space-x-2 text-[#757575] items-center dark:text-dark-muted">
        <GoLocation className="h-6 w-6" />
        <span> {`${doctorData.city} ${doctorData.state}`}</span>
      </div>
    </div>
  );
}

export default DoctorGeneral;
