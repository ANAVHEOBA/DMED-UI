import deDoctorABI from "@/constants/constants";
import generateIpfsMediaLink from "@/utils/generateIpfsLink";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useAccount, useSigner, useProvider } from "wagmi";
import { ethers } from "ethers";
import ProfileGeneral from "./ProfileGeneral";
import ProfileTab from "./ProfileTab";
import { Dna } from "react-loader-spinner";

const DoctorProfile = () => {
  const router = useRouter();
  const { id } = router.query;
  const [doctorData, setDoctorData] = useState();
  const provider = useProvider();
  const { data: signer } = useSigner();
  const { address } = useAccount();

  const updateData = async () => {
    const patientRegisterContract = new ethers.Contract(
      process.env.NEXT_PUBLIC_DEDOCTOR_SMART_CONTRACT || "",
      deDoctorABI,
      signer || provider
    );
    console.log(patientRegisterContract);
    const traction = await patientRegisterContract.getDoctorById(id);
    const data = traction;
    let meta = await axios.get(data.profileURI);
    meta = meta.data;
    const jsonData = {
      name: meta.name,
      specialization: meta.specialization,
      image: generateIpfsMediaLink(meta.image),
      address: meta.address,
      chargeStart: meta.minAmount,
      chargeEnd: 0,
      slotTime: "",
      about: meta.description,
      city: meta.city,
      state: meta.state,
      price: meta.minAmount,
      walletAddress: data.docAddress,
      id: data.doctorId.toString(),
    };

    setDoctorData(jsonData);
  };

  useEffect(() => {
    if (id) {
      updateData();
    }
  }, [id]);

  return (
    <div className="px-5 py-5 m-5">
      <div>
        {doctorData ? (
          <ProfileGeneral doctorData={doctorData} />
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
      <div>
        <ProfileTab />
      </div>
    </div>
  );
};

export default DoctorProfile;
