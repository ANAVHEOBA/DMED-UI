import React from "react";
import { useDispatch } from "react-redux";
import { pharmacyUpdateStep } from "@/features/pharmacyStepSlice";

const OwnerDetails = ({
  pharmacyOwnerData,
  setPharmacyOwnerData,
  pharmacyOwnerImage,
  setPharmacyOwnerImage,
}) => {
  const dispatch = useDispatch();

  // Handler for image file input change
  const handleImageChange = (e) => {
    const file = e.currentTarget.files ? e.currentTarget.files[0] : null;
    setPharmacyOwnerImage(file);
  };

  // Handler for input changes
  const handleInputChange = (e) => {
    const { name, value } = e.currentTarget;
    setPharmacyOwnerData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="form-group">
      <div className="flex w-full">
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-96 h-32 border-2 border-[#E6E9F4] border-dashed rounded-lg cursor-pointer bg-[#F5F6FA] hover:bg-gray-100 dark:bg-dark-blue-input dark:border-dark-input-border"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span>
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              SVG, PNG, JPG or GIF (MAX. 800x400px)
            </p>
          </div>
          <input
            id="dropzone-file"
            type="file"
            className="hidden"
            name="image"
            onChange={handleImageChange}
          />
        </label>
      </div>
      <div className="input-group">
        <label className="input-label" htmlFor="name">
          Legal Name *
        </label>
        <input
          type="text"
          name="name"
          id="name"
          value={pharmacyOwnerData.name}
          onChange={handleInputChange}
          className="input-box"
          placeholder="Enter Owner Name"
        />
      </div>
      <div className="flex space-x-2">
        <div className="input-group">
          <label className="input-label" htmlFor="gender">
            Gender *
          </label>
          <select
            className="input-box"
            name="gender"
            id="gender"
            value={pharmacyOwnerData.gender}
            onChange={handleInputChange}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div className="input-group">
          <label className="input-label" htmlFor="dob">
            Date of Birth *
          </label>
          <input
            type="date"
            id="dob"
            name="dob"
            className="input-box"
            value={pharmacyOwnerData.dob}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="flex flex-col md:flex-row space-x-2">
        <div className="input-group">
          <label className="input-label" htmlFor="city">
            City *
          </label>
          <input
            type="text"
            id="city"
            name="city"
            className="input-box"
            value={pharmacyOwnerData.city}
            onChange={handleInputChange}
          />
        </div>
        <div className="input-group">
          <label className="input-label" htmlFor="state">
            State *
          </label>
          <input
            type="text"
            id="state"
            name="state"
            className="input-box"
            value={pharmacyOwnerData.state}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="input-group">
        <label className="input-label" htmlFor="about">
          About You *
        </label>
        <textarea
          name="about"
          id="about"
          className="input-box md:w-[30rem] h-[6rem]"
          value={pharmacyOwnerData.about}
          onChange={handleInputChange}
        />
      </div>
      <button
        className="submit-btn"
        onClick={() => dispatch(pharmacyUpdateStep(1))}
      >
        Continue
      </button>
    </div>
  );
};

export default OwnerDetails;
