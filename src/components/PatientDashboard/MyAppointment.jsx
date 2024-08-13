import React, { useState } from "react";
import JoinAppointment from "./JoinAppointment";

const MyAppointment = ({ myAppointmentList }) => {
  const [isShowModal, setIsShowModal] = useState(false);
  const [activeDoctorId, setActiveDoctorId] = useState();

  return (
    <div className="px-4 py-4 border border-[#f0f0f0] rounded flex flex-col dark:border-dark-input-border dark:bg-dark-card">
      <h4 className="heading dark:text-primary-yellow">My Appointment</h4>
      <table className="mt-8">
        <thead>
          <tr className="text-left border-b border-[#f0f0f0] dark:border-dark-input-border">
            <th className="text-left">Doctor Id</th>
            <th>Symptoms</th>
            <th>Past Medical History</th>
            <th>Appointment Date</th>
            <th>Appointment Time</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {myAppointmentList &&
            myAppointmentList.map((appointmentItem) => {
              return (
                <tr
                  key={appointmentItem.appointmentId}
                  className="text-left border-b border-[#f0f0f0] dark:border-dark-input-border"
                >
                  <td className="text-left">{appointmentItem.doctorId}</td>
                  <td className="py-2 px-1">{appointmentItem.symptoms}</td>
                  <td className="py-2 px-1">{appointmentItem.pastSymptoms}</td>
                  <td className="py-2 px-1">{appointmentItem.date}</td>
                  <td className="py-2 px-1">{appointmentItem.time}</td>
                  <td
                    className="py-2 px-1 cursor-pointer"
                    onClick={() => {
                      setActiveDoctorId(appointmentItem.doctorId);
                      setIsShowModal(true);
                    }}
                  >
                    View
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <div>
        {isShowModal && (
          <JoinAppointment
            activeDoctorId={activeDoctorId}
            isShowModal={isShowModal}
            setIsShowModal={setIsShowModal}
          />
        )}
      </div>
    </div>
  );
};

export default MyAppointment;
