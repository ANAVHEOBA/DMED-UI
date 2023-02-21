import Image from "next/image";
import React from "react";
import { FiPhoneCall } from "react-icons/fi";
import { HiLocationMarker } from "react-icons/hi";
import { AiOutlineRight } from "react-icons/ai";
import { useRouter } from "next/router";

interface pharmacyStruct {
  id: number;
  image: string;
  phone: string;
  address: string;
  dealer: string;
  name: string;
  openTime: string;
}

function PharmacyCard(pharmacyData: pharmacyStruct) {
  const router = useRouter();
  return (
    <div className="px-4 py-4 border border-[#f0f0f0] rounded space-y-2 flex flex-col md:flex-row justify-between dark:border-dark-input-border dark:bg-dark-card">
      <div className="flex flex-col md:flex-row space-y-2 space-x-1 md:space-x-4">
        <div className="relative h-48 w-72 md:h-44 md:w-56">
          <Image
            src={pharmacyData.image}
            alt={pharmacyData.name}
            fill
            className="rounded-md"
          />
        </div>
        <div className="flex flex-col space-y-2 text-[#757575] dark:text-dark-muted">
          <h5 className="font-extrabold text-lg dark:text-white dark:hover:text-primary-yellow">
            {pharmacyData.name}
          </h5>
          <div className="flex space-x-2 items-center">
            <FiPhoneCall className="h-6 w-6" />
            <span>{pharmacyData.phone}</span>
          </div>
          <div className="flex space-x-2 items-center">
            <HiLocationMarker className="h-6 w-6" />
            <span>{pharmacyData.address}</span>
          </div>
          <div className="flex space-x-2 items-center">
            <AiOutlineRight className="h-6 w-6" />
            <span>{pharmacyData.dealer}</span>
          </div>
          <div className="flex space-x-2 items-center">
            <AiOutlineRight className="h-6 w-6" />
            <span>{pharmacyData.openTime}</span>
          </div>
        </div>
      </div>
      <div>
        <button
          className="px-8 py-2 border-2 border-primary-blue text-primary-blue rounded-lg hover:bg-primary-blue hover:text-white transition transform ease-out duration-300 dark:bg-primary-yellow dark:text-black dark:border-none"
          onClick={() => router.push(`/pharmacy/${pharmacyData.id}`)}
        >
          View Details
        </button>
      </div>
    </div>
  );
}

export default PharmacyCard;
