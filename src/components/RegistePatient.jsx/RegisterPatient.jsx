import React, { useState, useEffect } from "react";
import { useAccount, useProvider, useSigner } from "wagmi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ColorRing } from "react-loader-spinner";
import { ethers } from "ethers";
import deDoctorABI from "@/constants/constants";
import Tesseract from 'tesseract.js';
// @ts-ignore
import WeaveDB from 'weavedb-sdk';


const WEAVEDB_CONTRACT_TX_ID = "DznefHbFhcyqyjZ0aNGqsWwkjcwRDlraUR72EkXames";

function SuccessPopup({ isVisible, onClose }) {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl">
        <h2 className="text-xl font-bold mb-4">Registration Successful!</h2>
        <p>Your information has been saved successfully.</p>
        <button 
          onClick={onClose}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Close
        </button>
      </div>
    </div>
  );
}

function RegisterPatient() {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [patientData, setPatientData] = useState({
    name: "",
    gender: "male",
    dob: "",
    address: "",
    city: "",
    state: "",
    country: "",
    description: "",
  });
  const [db, setDb] = useState(null);

  const provider = useProvider();
  const { data: signer } = useSigner();
  const { address } = useAccount();

  useEffect(() => {
    const initWeaveDB = async () => {
      const weaveDB = new WeaveDB({ contractTxId: WEAVEDB_CONTRACT_TX_ID });
      await weaveDB.init();
      setDb(weaveDB);
    };
    initWeaveDB();
  }, []);

  const onSubmitHandle = async () => {
    if (!image) {
      toast.error("Please upload an image.");
      return;
    }

    const requiredFields = ['name', 'gender', 'dob', 'address', 'city', 'state', 'country'];
    for (let field of requiredFields) {
      if (!patientData[field]) {
        toast.error(`Please fill in the ${field} field.`);
        return;
      }
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append('file', image);

      const uploadResponse = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!uploadResponse.ok) {
        throw new Error(`HTTP error! status: ${uploadResponse.status}`);
      }

      const uploadResult = await uploadResponse.json();
      const fileUrl = uploadResult.cloud.url;

      const fileResponse = await fetch(fileUrl);
      const fileBlob = await fileResponse.blob();

      const { data: { text } } = await Tesseract.recognize(fileBlob, 'eng', {
        logger: m => console.log(m)
      });

      // Save data to WeaveDB
      await db.add({
        name: patientData.name,
        gender: patientData.gender,
        dob: patientData.dob,
        address: patientData.address,
        city: patientData.city,
        state: patientData.state,
        country: patientData.country,
        description: patientData.description,
        imageUrl: fileUrl,
        extractedText: text,
        walletAddress: address,
      }, 'anavheoba');

      let patientRegisterContract = new ethers.Contract(
        process.env.NEXT_PUBLIC_DEDOCTOR_SMART_CONTRACT || "",
        deDoctorABI,
        signer || provider
      );

      let transaction = await patientRegisterContract.registerPatient(
        patientData.name,
        address,
        patientData.gender,
        patientData.city,
        fileUrl
      );
      await transaction.wait();

      setLoading(false);
      setShowSuccessPopup(true);
    } catch (error) {
      setLoading(false);
      toast.error(`Error: ${error.message}`);
    }
  };

  return (
    <div className="px-5 py-3">
      <ToastContainer />
      <div className="flex flex-col md:flex-row space-x-5 space-y-5">
        <div className="space-y-3 md:w-[15rem]"></div>
        <div className="form-group">
          <div className="flex w-full">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-96 h-32 border-2 border-[#E6E9F4] border-dashed rounded-lg cursor-pointer bg-[#F5F6FA] dark:bg-dark-blue-input hover:bg-gray-100 dark:border-dark-input-border"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold dark:text-dark-muted">
                    Click to upload
                  </span>
                </p>
                <p className="text-xs text-gray-500 dark:text-dark-muted">
                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                </p>
              </div>
              <input
                id="dropzone-file"
                type="file"
                className="hidden"
                name="image"
                onChange={(e) =>
                  setImage(e.currentTarget.files && e.currentTarget.files[0])
                }
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
              value={patientData.name}
              onChange={(e) =>
                setPatientData({
                  ...patientData,
                  name: e.currentTarget.value,
                })
              }
              className="input-box"
              placeholder="Enter Name"
            />
          </div>
          <div className="flex space-x-2">
            <div className="input-group">
              <label className="input-label" htmlFor="gender">
                Gender *
              </label>
              <select
                className="input-box"
                placeholder="Select Gender"
                name="gender"
                id="gender"
                value={patientData.gender}
                onChange={(e) =>
                  setPatientData({
                    ...patientData,
                    gender: e.currentTarget.value,
                  })
                }
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
                placeholder="Date of Birth"
                value={patientData.dob}
                onChange={(e) =>
                  setPatientData({
                    ...patientData,
                    dob: e.currentTarget.value,
                  })
                }
              />
            </div>
          </div>
          <div className="input-group">
            <label className="input-label" htmlFor="address">
              Address *
            </label>
            <textarea
              id="address"
              name="address"
              className="input-box md:w-[30rem]"
              placeholder="Enter Address"
              value={patientData.address}
              onChange={(e) =>
                setPatientData({
                  ...patientData,
                  address: e.currentTarget.value,
                })
              }
            />
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
                placeholder="City"
                value={patientData.city}
                onChange={(e) =>
                  setPatientData({
                    ...patientData,
                    city: e.currentTarget.value,
                  })
                }
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
                placeholder="State"
                value={patientData.state}
                onChange={(e) =>
                  setPatientData({
                    ...patientData,
                    state: e.currentTarget.value,
                  })
                }
              />
            </div>
          </div>
          <div className="input-group">
            <label className="input-label" htmlFor="country">
              Country *
            </label>
            <input
              type="text"
              name="country"
              id="country"
              value={patientData.country}
              onChange={(e) =>
                setPatientData({
                  ...patientData,
                  country: e.currentTarget.value,
                })
              }
              className="input-box"
              placeholder="Country"
            />
          </div>
          <div className="input-group">
            <label className="input-label" htmlFor="about">
              About You *
            </label>
            <textarea
              name="about"
              id="about"
              className="input-box md:w-[30rem] h-[6rem]"
              value={patientData.description}
              onChange={(e) =>
                setPatientData({
                  ...patientData,
                  description: e.currentTarget.value,
                })
              }
            />
          </div>
          <button
            className="submit-btn flex space-x-2 items-center h-14"
            onClick={onSubmitHandle}
          >
            {loading ? (
              <ColorRing
                visible={true}
                height="40"
                width="40"
                ariaLabel="blocks-loading"
                wrapperStyle={{}}
                wrapperClass="blocks-wrapper"
                colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
              />
            ) : (
              ""
            )}
            <span>Register</span>
          </button>
        </div>
      </div>
      <SuccessPopup 
        isVisible={showSuccessPopup} 
        onClose={() => setShowSuccessPopup(false)}
      />
    </div>
  );
}

export default RegisterPatient;