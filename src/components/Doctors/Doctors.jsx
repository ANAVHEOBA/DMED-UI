import deDoctorABI from "@/constants/constants";
import generateIpfsMediaLink from "@/utils/generateIpfsLink";
import axios from "axios";
import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import { useContractRead } from "wagmi";
import Breadcrumb from "../Breadcrumb/Breadcrumb";
import LongDoctorCard from "./LongDoctorCard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAccount, useSigner } from "wagmi";
import { useProvider } from "wagmi";
import { Dna } from "react-loader-spinner";

function Doctors() {
  const provider = useProvider();
  const { data: signer, isError, isLoading } = useSigner();
  const { address, isConnecting, isDisconnected } = useAccount();

  const [doctorData, setDoctorData] = useState([]);
  
  const updateData = async () => {
    let patientRegisterContract = new ethers.Contract(
      process.env.NEXT_PUBLIC_DEDOCTOR_SMART_CONTRACT || "",
      deDoctorABI,
      signer || provider
    );
    let traction = await patientRegisterContract.getAllDoctors();
    const data = traction;
    let newItems = await Promise.all(
      data.map(async (d) => {
        let meta = await axios.get(d.profileURI);
        meta = meta.data;
        return {
          name: meta.name,
          category: meta.specialization,
          image: generateIpfsMediaLink(meta.image),
          address: meta.address,
          chargeStart: meta.minAmount,
          chargeEnd: 0,
          slotTime: "",
          city: meta.city,
          state: meta.state,
          id: d.doctorId.toString(),
        };
      })
    );
    setDoctorData(newItems);
  };

  useEffect(() => {
    updateData();
  }, []);

  return (
    <div>
      <Breadcrumb heading="Doctors" subHeading="Home/ Doctors" />
      {doctorData.length ? (
        <div className="mx-5 my-3 space-y-3">
          {doctorData.map((doctor) => (
            <LongDoctorCard key={doctor.id} {...doctor} />
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center">
          <Dna
            visible={true}
            height="80"
            width="80"
            ariaLabel="dna-loading"
            wrapperStyle={{}}
            wrapperClass="dna-wrapper"
          />
        </div>
      )}
    </div>
  );
}

export default Doctors;
