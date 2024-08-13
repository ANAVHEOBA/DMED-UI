import React, { useState } from "react";
import DoctorVerification from "./DoctorVerification";
import PersonalDetailsForm from "./PersonalDetailsForm";
import Preferences from "./Preferences";
import UploadIdentification from "./UploadIdentification";
import { useSelector, useDispatch } from "react-redux";
import { updateStep } from "@/features/doctorStepSlice";
import { useAccount, useSigner, useProvider } from "wagmi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NFTStorage, File } from "nft.storage";
import deDoctorABI from "@/constants/constants";
import { ethers } from "ethers";

const DoctorRegistration = () => {
  const { address } = useAccount();
  const doctorStep = useSelector((state) => state.doctorStep.value);
  const dispatch = useDispatch();
  
  // Personal Data
  const [personalData, setPersonalData] = useState({
    name: "",
    about: "",
    address: "",
    city: "",
    dob: "",
    gender: "",
    state: "",
  });
  const [userImage, setUserImage] = useState(null);
  
  // Identification Data
  const [identificationData, setIdentificationData] = useState({
    docNumber: "",
    docType: "",
  });
  const [identificationDoc, setIdentificationDoc] = useState(null);
  
  // Doctor Verification
  const [medicalCouncilData, setMedicalCouncilData] = useState({
    councilNumber: "",
    specialization: "",
  });
  const [councilFile, setCouncilFile] = useState(null);
  
  // Preferences
  const [preference, setPreference] = useState({
    minAmount: 0,
    callType: [""],
    date: "",
    days: [""],
    startTime: "",
    language: "",
    endTime: "",
  });

  const { data: signer } = useSigner();
  const provider = useProvider();

  const submitIpfs = async () => {
    try {
      const nftStorage = new NFTStorage({
        token: process.env.NEXT_PUBLIC_NFT_STORAGE_API || "",
      });
      const link = await nftStorage.store({
        image: userImage,
        name: personalData.name,
        description: personalData.about || "",
        about: personalData.about || "",
        address: personalData.address,
        city: personalData.city,
        dob: personalData.dob,
        gender: personalData.gender,
        state: personalData.state,
        docNumber: identificationData.docNumber,
        docType: identificationData.docType,
        identificationDoc: identificationDoc,
        councilNumber: medicalCouncilData.councilNumber,
        specialization: medicalCouncilData.specialization,
        councilFile: councilFile,
        minAmount: preference.minAmount,
        callType: preference.callType,
        date: preference.date,
        days: preference.days,
        startTime: preference.startTime,
        language: preference.language,
        endTime: preference.endTime,
      });
      const ipfsURL = `https://ipfs.io/ipfs/${link.url.substr(7)}`;
      const price = ethers.utils.parseUnits(preference.minAmount.toString(), "ether");
      const patientRegisterContract = new ethers.Contract(
        process.env.NEXT_PUBLIC_DEDOCTOR_SMART_CONTRACT || "",
        deDoctorABI,
        signer || provider
      );
      const transaction = await patientRegisterContract.registerDoctor(
        personalData.name,
        personalData.gender,
        personalData.city,
        preference.language,
        address,
        price,
        ipfsURL
      );
      await transaction.wait();
      toast.success("Doctor registered successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const registrationSteps = [
    {
      id: 1,
      title: "Registration",
      subTitle: "Enter Details for Registration",
      component: (
        <PersonalDetailsForm
          personalData={personalData}
          setPersonalData={setPersonalData}
          userImage={userImage}
          setUserImage={setUserImage}
        />
      ),
    },
    {
      id: 2,
      title: "Upload Identity",
      subTitle: "Upload your Identity for Verification",
      component: (
        <UploadIdentification
          identificationData={identificationData}
          setIdentificationData={setIdentificationData}
          identificationDoc={identificationDoc}
          setIdentificationDoc={setIdentificationDoc}
        />
      ),
    },
    {
      id: 3,
      title: "Doctor Verification",
      subTitle: "Setup Your Payment Details",
      component: (
        <DoctorVerification
          medicalCouncilData={medicalCouncilData}
          setMedicalCouncilData={setMedicalCouncilData}
          councilFile={councilFile}
          setCouncilFile={setCouncilFile}
        />
      ),
    },
    {
      id: 4,
      title: "Preferences",
      subTitle: "Setup Your Preferences for your Account",
      component: (
        <Preferences
          preference={preference}
          setPreference={setPreference}
          submitIpfs={submitIpfs}
        />
      ),
    },
  ];

  return (
    <div className="px-5 py-3">
      <ToastContainer theme="dark" />
      <div className="flex flex-col md:flex-row space-x-5 space-y-5">
        <div className="space-y-3 md:w-[24rem]">
          {registrationSteps.map((registrationStep) => (
            <div
              key={registrationStep.id}
              className="flex space-x-2 px-2 py-3 shadow-lg rounded-md cursor-pointer border border-[#F4F4F4] dark:border-dark-input-border dark:bg-dark-card"
              onClick={() => dispatch(updateStep(registrationStep.id - 1))}
            >
              <div className="rounded-full p-2 bg-[#10916F] text-white w-10 h-10 text-center dark:bg-primary-yellow dark:text-black">
                {registrationStep.id}
              </div>
              <div>
                <h5 className="font-semibold dark:text-white">
                  {registrationStep.title}
                </h5>
                <p className="text-[#585858] dark:text-dark-muted">
                  {registrationStep.subTitle}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="w-full">{registrationSteps[doctorStep].component}</div>
      </div>
    </div>
  );
};

export default DoctorRegistration;
