import React from "react";
import { BsSearch } from "react-icons/bs";
import { GrLocation } from "react-icons/gr";

function Banner() {
  return (
    <div className="py-20 px-4 bg-[#f9f9f9] items-center flex flex-col space-y-4 dark:bg-[#030B29] rounded-lg shadow-md">
      {/* Header Section */}
      <header className="text-center mb-6">
        <h4 className="text-4xl font-bold text-[#272b41] dark:text-white mb-2">
          Search Doctor, Make an Appointment
        </h4>
        <p className="text-muted dark:text-dark-muted text-lg">
          Discover the best doctors, clinics, and hospitals in the city nearest to you. Easily find and connect with the medical professionals who can help you with your health needs.
        </p>
      </header>

      {/* Search Section */}
      <div className="flex gap-x-4 gap-y-4 flex-col md:flex-row">
        {/* Location Search */}
        <div className="flex-1 text-light-gray">
          <div className="border border-[#ccc] rounded-md flex items-center bg-white space-x-2 px-3 py-2 dark:border-dark-input-border dark:bg-dark-blue-input shadow-sm">
            <BsSearch className="h-6 w-6 dark:text-white" />
            <input
              type="text"
              className="outline-transparent bg-transparent focus:outline-none w-full md:w-64 h-10 dark:border-dark-input-border dark:bg-dark-blue-input dark:placeholder:text-dark-placeholder"
              placeholder="Search Location"
            />
          </div>
          <span className="text-sm text-muted dark:text-dark-muted mt-2">Based on your Location</span>
        </div>

        {/* Medical Search */}
        <div className="flex-1 text-light-gray">
          <div className="border border-[#ccc] rounded-md flex items-center bg-white space-x-2 px-3 py-2 dark:border-dark-input-border dark:bg-dark-blue-input shadow-sm">
            <GrLocation className="h-6 w-6 dark:text-white" />
            <input
              type="text"
              className="outline-transparent bg-transparent focus:outline-none w-full md:w-64 h-10 dark:border-dark-input-border dark:bg-dark-blue-input dark:placeholder:text-dark-placeholder"
              placeholder="Search Doctors, Clinics, Hospitals, Diseases Etc"
            />
          </div>
          <span className="text-sm text-muted dark:text-dark-muted mt-2">E.g., Dental, Sugar Check-up, etc.</span>
        </div>

        {/* Search Button */}
        <div className="flex items-center justify-center mt-4">
          <button className="bg-primary-green text-white h-12 w-full md:w-48 rounded-md flex items-center justify-center space-x-2 dark:bg-primary-yellow dark:text-black shadow-lg hover:bg-green-600 dark:hover:bg-yellow-500 transition-colors duration-300">
            <span className="flex items-center space-x-2">
              <BsSearch className="h-6 w-6 font-semibold" />
              <span className="hidden md:block">Search</span>
            </span>
          </button>
        </div>
      </div>

      {/* Additional Information */}
      <div className="mt-8 text-center">
        <p className="text-muted dark:text-dark-muted mb-2">
          For any assistance, please contact our support team. We are here to help you 24/7 with all your queries and concerns related to finding the right medical care.
        </p>
        <a href="/contact" className="text-primary-blue dark:text-primary-light hover:underline">Contact Us</a>
      </div>
    </div>
  );
}

export default Banner;

