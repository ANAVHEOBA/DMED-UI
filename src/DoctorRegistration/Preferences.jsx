import React, { useState } from "react";
import { AiOutlineRight } from "react-icons/ai";
import Availabilities from "./Availabilities";
import CostConsultation from "./CostConsultation";
import OnlineConsultation from "./OnlineConsultation";

const Preferences = ({ preference, setPreference, submitIpfs }) => {
  const preferenceList = [
    {
      id: 1,
      title: "Cost of Consultation",
      component: (
        <CostConsultation
          preference={preference}
          setPreference={setPreference}
        />
      ),
    },
    {
      id: 2,
      title: "Preferred means for online consultations",
      component: (
        <OnlineConsultation
          preference={preference}
          setPreference={setPreference}
        />
      ),
    },
    {
      id: 3,
      title: "Availabilities",
      component: (
        <Availabilities
          preference={preference}
          setPreference={setPreference}
          submitIpfs={submitIpfs}
        />
      ),
    },
  ];
  
  const [activeTab, setActiveTab] = useState(0);
  
  return (
    <div className="form-group">
      <h5 className="font-semibold text-2xl dark:text-primary-yellow">Preferences</h5>
      <p className="text-[#585858] dark:text-white">
        This can be edited later on from the account settings.
      </p>
      <div className="space-y-5">
        {preferenceList.map((preferenceItem) => (
          <div
            key={preferenceItem.id}
            className={`px-2 py-2 border border-[#E6E9F4] rounded dark:border-dark-input-border dark:bg-dark-blue-input`}
          >
            <div className="flex justify-between dark:text-dark-muted">
              <span>{preferenceItem.title}</span>
              <AiOutlineRight
                className={`h-6 w-6 cursor-pointer dark:text-primary-yellow ${
                  activeTab === preferenceItem.id ? "rotate-90" : ""
                }`}
                onClick={() =>
                  setActiveTab(
                    activeTab === preferenceItem.id ? 0 : preferenceItem.id
                  )
                }
              />
            </div>
            <div
              className={`${
                activeTab === preferenceItem.id ? "" : "hidden"
              } mt-5`}
            >
              {preferenceItem.component}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Preferences;
