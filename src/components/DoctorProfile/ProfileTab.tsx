import React, { useState } from "react";
import BusinessHourTab from "./BusinessHourTab";
import LocationTab from "./LocationTab";
import OverviewTab from "./OverviewTab";

function ProfileTab() {
  const tabList = [
    {
      id: 1,
      name: "Overview",
      component: <OverviewTab />,
    },
    {
      id: 2,
      name: "Locations",
      component: <LocationTab />,
    },
    {
      id: 3,
      name: "Business Hours",
      component: <BusinessHourTab />,
    },
  ];
  const [activeTab, setActiveTab] = useState(tabList[0]);
  return (
    <div className="px-2 md:px-5 py-5 border border-[#f0f0f0] rounded-lg">
      <div className="flex justify-between pb-5 items-center">
        {tabList.map((tabItem) => {
          return (
            <div
              key={tabItem.id}
              onClick={() => setActiveTab(tabItem)}
              className={`px-4 md:px-10 border-b pb-5 ${
                tabItem.id == activeTab.id
                  ? "border-primary-green"
                  : "border-[#f0f0f0]"
              }`}
            >
              <span
                className={`font-medium md:text-xl cursor-pointer ${
                  tabItem.id == activeTab.id
                    ? "text-primary-green"
                    : "text-[#3e3e3e]"
                }`}
              >
                {tabItem.name}
              </span>
            </div>
          );
        })}
      </div>
      <div className="px-3 py-5">
        {activeTab.component}
      </div>
    </div>
  );
}

export default ProfileTab;
