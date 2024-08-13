import React from "react";
import { GoLocation } from "react-icons/go";

function LocationTab() {
  const timeSlot = [
    {
      id: 1,
      days: "Mon - Sat",
      time: ["10:00 AM - 2:00 PM", "4:00 PM - 9:00 PM"],
    },
    {
      id: 2,
      days: "Sun",
      time: ["10:00 AM - 2:00 PM"],
    },
  ];

  return (
    <div className="px-5 py-5 border border-[#f0f0f0] rounded-lg flex flex-col md:flex-row space-y-3 justify-between dark:border-dark-input-border">
      {/* Left - about */}
      <div className="space-y-3">
        <h5 className="text-lg font-semibold dark:text-white">
          Smile Cute Dental Care Center
        </h5>
        <p className="text-[#757575] dark:text-dark-muted">
          MDS - Periodontology and Oral Implantology, BDS
        </p>
        <div className="flex items-center space-x-2 text-[#757575] dark:text-dark-muted">
          <GoLocation className="h-6 w-6" />
          <span>2286 Sundown Lane, Austin, Texas 78749, USA</span>
        </div>
      </div>
      {/* Center - time slot */}
      <div>
        {timeSlot.map((slotItem) => (
          <div key={slotItem.id}>
            <p className="font-semibold text-xl">{slotItem.days}</p>
            {slotItem.time.map((timeItem, index) => (
              <p key={index}>{timeItem}</p>
            ))}
          </div>
        ))}
      </div>
      {/* Right */}
      <div>
        <p className="font-medium text-lg">$ 250</p>
      </div>
    </div>
  );
}

export default LocationTab;
