import React, { useEffect, useState } from "react";
import DoctorAppointments from "./DoctorAppointments";
import DoctorGeneral from "./DoctorGeneral";
import { WeaveDB } from "weavedb-sdk"; 
import { Dna } from "react-loader-spinner";

function DoctorDashboard() {
  const { address } = useAccount();
  const [doctorData, setDoctorData] = useState(null);
  const [doctorAppointmentList, setDoctorAppointmentList] = useState([]);

  const db = new WeaveDB(); // Initialize WeaveDB instance

  const fetchDoctorData = async () => {
    const COLLECTION_NAME = "anavheoba"; // Replace with your collection name
    const CURRENT_USER = address; // User's wallet address

    const _posts = await db.cget(COLLECTION_NAME, [
      "user_wallet",
      "==",
      CURRENT_USER,
    ]);

    if (_posts.length > 0) {
      const meta = _posts[0];
      setDoctorData(meta);
    }
  };

  const fetchDoctorAppointments = async () => {
    const COLLECTION_NAME = "anavheoba"; // Replace with your collection name
    const CURRENT_USER = address; // User's wallet address

    const _appointments = await db.cget(COLLECTION_NAME, [
      "doctor_wallet",
      "==",
      CURRENT_USER,
    ]);

    const newItems = _appointments.map((d) => ({
      doctorId: d.doctorId.toString(),
      patientId: d.patientId.toString(),
      pastSymptoms: d.pastSymptoms,
      symptoms: d.symptoms,
      time: d.time,
      date: d.date,
      appointmentId: d.id.toString(),
    }));

    setDoctorAppointmentList(newItems);
  };

  useEffect(() => {
    if (address) {
      fetchDoctorData();
    }
  }, [address]);

  useEffect(() => {
    if (doctorData) {
      fetchDoctorAppointments();
    }
  }, [doctorData]);

  return (
    <div className="flex space-x-5 my-8 mx-5">
      <div className="">
        {doctorData ? (
          <DoctorGeneral doctorData={doctorData} />
        ) : (
          <div className="flex justify-end items-center">
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
        {doctorAppointmentList.length > 0 ? (
          <DoctorAppointments doctorAppointmentList={doctorAppointmentList} />
        ) : (
          <div className="flex justify-end items-center">
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
    </div>
  );
}

export default DoctorDashboard;
