import React from "react";
import {
  AiTwotoneAudio,
  AiOutlineVideoCameraAdd,
  AiOutlineWechat,
} from "react-icons/ai";

const OnlineConsultation = ({ preference, setPreference }) => {
  const callTypeList = [
    {
      key: 1,
      title: "Audio call",
      icon: AiTwotoneAudio,
    },
    {
      key: 2,
      title: "Video call",
      icon: AiOutlineVideoCameraAdd,
    },
    {
      key: 3,
      title: "Chat",
      icon: AiOutlineWechat,
    },
  ];

  return (
    <div className="space-y-3 flex flex-col">
      <h5 className="font-semibold text-2xl dark:text-white">
        Which are your preferred means of online consultation?
      </h5>
      <p className="text-[#585858] dark:text-dark-muted">
        You can select more than one from the below. These will show up as
        options for the patient when booking an appointment.
      </p>
      <div className="flex space-x-2">
        {callTypeList.map((callTypeItem) => (
          <div
            key={callTypeItem.key}
            className="flex space-x-2 px-2 py-2 border border-[#E6E9F4] rounded-md dark:border-dark-input-border"
          >
            <callTypeItem.icon className="h-6 w-6" />
            <span>{callTypeItem.title}</span>
          </div>
        ))}
      </div>
      <p className="text-[#585858] dark:text-dark-muted">
        Choose your preferred language for Audio, Video calls and chat. You can
        select more than one option.
      </p>
      <div className="input-group">
        <label className="input-label" htmlFor="language">
          Language *
        </label>
        <select
          className="input-box"
          value={preference.language}
          onChange={(e) =>
            setPreference({
              ...preference,
              language: e.currentTarget.value,
            })
          }
          placeholder="Select Language"
          id="language"
        >
          <option value="french">French</option>
          <option value="hindi">Hindi</option>
          <option value="english">English</option>
          <option value="tamil">Tamil</option>
        </select>
      </div>
      <button className="submit-btn w-40">Save</button>
    </div>
  );
};

export default OnlineConsultation;
