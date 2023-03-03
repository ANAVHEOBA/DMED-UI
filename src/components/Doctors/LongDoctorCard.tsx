import Image from "next/image";
import React from "react";
import { BiChat, BiMoney } from "react-icons/bi";
import { BsBookmark, BsChat, BsFillCameraVideoOffFill, BsTelephoneFill } from "react-icons/bs";
import { GoLocation, GoThumbsup } from "react-icons/go";
import { useRouter } from "next/router";


interface doctorStruct {
  id: number;
  name: string;
  category: string;
  image: string;
  address: string;
  slotTime: string;
  chargeStart: number;
  chargeEnd: number;
  city: string;
  state: string
}

function LongDoctorCard(doctorData: doctorStruct) {
  const router = useRouter();
  return (
    <div className="px-4 py-4 border border-[#f0f0f0] flex justify-between rounded-md dark:border-dark-input-border dark:bg-dark-card">
      <div className="flex space-x-2">
        <div className="relative h-32 w-32">
          <Image
            src={doctorData.image}
            alt={doctorData.name}
            fill
            className="rounded-lg"
          />
        </div>
        <div>
          <h3 className="dark:text-white cursor-pointer hover:text-primary-green duration-300 transition transform ease-out" onClick={() => router.push(`/doctor/${doctorData.id}`)}>{doctorData.name}</h3>
          <p className="dark:text-dark-muted">{doctorData.category}</p>
          <div className="flex space-x-2 text-[#757575] items-center dark:text-dark-muted">
            <GoLocation className="h-6 w-6" />
            <span> {doctorData.address}</span>
          </div>
        </div>
      </div>
      <div>
        <div className="space-y-2 items-center mx-auto md:mx-0">
          <div className="space-y-2 text-[#4E4852] dark:text-dark-muted">
            <div className="flex space-x-2 items-center">
              <GoThumbsup className="h-6 w-6" />
              <span>99%</span>
            </div>
            <div className="flex space-x-2 items-center">
              <BsChat className="h-6 w-6" />
              <span>35 Feedback</span>
            </div>
            <div className="flex space-x-2 items-center">
              <GoLocation className="h-6 w-6" />
              <span>{doctorData.city}, {doctorData.state}</span>
            </div>
            <div className="flex space-x-2 items-center">
              <BiMoney className="h-6 w-6" />
              <span><span className="font-semibold">{doctorData.chargeStart}</span>SH per hour</span>
            </div>
          </div>
          <button className="px-3 py-2 bg-primary-blue text-white rounded-md text-xl dark:bg-primary-yellow dark:text-black">
            Book Appointment
          </button>
        </div>
      </div>
    </div>
  );
}

export default LongDoctorCard;
