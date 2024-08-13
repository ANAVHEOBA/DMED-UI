import React from "react";
import { useDispatch } from "react-redux";
import { pharmacyUpdateStep } from "@/features/pharmacyStepSlice";

const PharmacyPersonal = ({
  pharmacyPersonaData,
  setPharmacyPersonalData,
  pharmacyImage,
  setPharmacyImage,
}) => {
  const dispatch = useDispatch();

  // Handler for image file input change
  const handleImageChange = (e) => {
    const file = e.currentTarget.files ? e.currentTarget.files[0] : null;
    setPharmacyImage(file);
  };

  // Handler for input changes
  const handleInputChange = (e) => {
    const { name, value } = e.currentTarget;
    setPharmacyPersonalData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Render the form group component
  const renderFormGroup = (label, id, name, value, placeholder, type = "text") => (
    <div className="input-group">
      <label className="input-label" htmlFor={id}>
        {label} *
      </label>
      <input
        type={type}
        name={name}
        id={id}
        className="input-box"
        placeholder={placeholder}
        value={value}
        onChange={handleInputChange}
      />
    </div>
  );

  // Render the form text area component
  const renderTextArea = (label, id, name, value, placeholder) => (
    <div className="input-group">
      <label className="input-label" htmlFor={id}>
        {label} *
      </label>
      <textarea
        name={name}
        id={id}
        className="input-box md:w-[30rem]"
        placeholder={placeholder}
        value={value}
        onChange={handleInputChange}
      />
    </div>
  );

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
      {renderFormGroup(
        "Pharmacy Legal Name",
        "name",
        "name",
        pharmacyPersonaData.name,
        "Enter Pharmacy Name"
      )}
      {renderTextArea(
        "Address",
        "address",
        "address",
        pharmacyPersonaData.address,
        "Enter Address"
      )}
      <div className="flex flex-col md:flex-row space-x-2">
        {renderFormGroup(
          "City",
          "city",
          "city",
          pharmacyPersonaData.city,
          "City"
        )}
        {renderFormGroup(
          "State",
          "state",
          "state",
          pharmacyPersonaData.state,
          "State"
        )}
      </div>
      {renderTextArea(
        "About Pharmacy",
        "about",
        "about",
        pharmacyPersonaData.about,
        "Describe the Pharmacy"
      )}
      <button
        className="submit-btn"
        onClick={() => dispatch(pharmacyUpdateStep(1))}
      >
        Continue
      </button>
    </div>
  );
};

export default PharmacyPersonal;
