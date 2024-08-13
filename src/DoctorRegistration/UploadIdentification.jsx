import { updateStep } from "@/features/doctorStepSlice";
import { useSelector, useDispatch } from "react-redux";
import React from "react";
import { GrDocumentText } from "react-icons/gr";

const UploadIdentification = ({
  identificationData,
  setIdentificationData,
  identificationDoc,
  setIdentificationDoc,
}) => {
  const doctorStep = useSelector((state) => state.doctorStep.value);
  const dispatch = useDispatch();

  return (
    <div className="form-group">
      <h5 className="font-semibold text-2xl dark:text-white">Upload identification</h5>
      <p className="text-[#585858] dark:text-dark-muted">
        We need to determine if an identity document is authentic and belongs to
        you. You just need to go through some steps which will help us to build
        a secure system together.
      </p>
      <div className="input-group">
        <label className="input-label" htmlFor="docType">
          Document Type *
        </label>
        <select
          name="docType"
          className="input-box"
          placeholder="Select Document Type"
          value={identificationData.docType}
          onChange={(e) =>
            setIdentificationData({
              ...identificationData,
              docType: e.currentTarget.value,
            })
          }
          id="docType"
        >
          <option value={"none"}>Select Document Type</option>
          <option value={"pdf"}>PDF</option>
          <option value={"txt"}>TXT</option>
          <option value={"jpeg"}>JPEG</option>
        </select>
      </div>
      <div className="input-group">
        <label className="input-label" htmlFor="docNumber">
          Document Number *
        </label>
        <input
          type="text"
          id="docNumber"
          className="input-box"
          placeholder="Enter Document Number"
          value={identificationData.docNumber}
          onChange={(e) =>
            setIdentificationData({
              ...identificationData,
              docNumber: e.currentTarget.value,
            })
          }
        />
      </div>
      <div className="flex w-full">
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-96 h-32 border-2 border-[#E6E9F4] border-dashed rounded-lg cursor-pointer bg-[#F5F6FA] hover:bg-gray-100 dark:bg-dark-blue-input dark:border-dark-input-border"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <GrDocumentText className="w-10 h-10 mb-3 dark:text-white" />
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Upload Document</span>
            </p>
          </div>
          <input
            id="dropzone-file"
            type="file"
            className="hidden"
            onChange={(e) =>
              setIdentificationDoc(
                e.currentTarget.files && e.currentTarget.files[0]
              )
            }
          />
        </label>
      </div>
      <button className="submit-btn" onClick={() => dispatch(updateStep(2))}>
        Continue
      </button>
    </div>
  );
};

export default UploadIdentification;
