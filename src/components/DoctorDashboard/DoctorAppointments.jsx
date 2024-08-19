import React, { useState } from "react";
import AppointmentModal from "./AppointmentModal";

const DoctorAppointments = ({ doctorAppointmentList }) => {
  const [isShowModal, setIsModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  return (
    <div className="px-4 py-4 border border-[#f0f0f0] rounded space-y-2 flex flex-col md:flex-row justify-between dark:border-dark-input-border dark:bg-dark-card">
      <table>
        <thead>
          <tr className="text-left border-b border-[#f0f0f0] dark:border-dark-input-border">
            <th className="text-left">Patient Id</th>
            <th>Symptoms</th>
            <th>Past Medical History</th>
            <th>Appointment Date</th>
            <th>Appointment Time</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {doctorAppointmentList && doctorAppointmentList.map((appointmentItem, index) => (
            <tr
              key={appointmentItem.id}
              className="text-left border-b border-[#f0f0f0] dark:border-dark-input-border"
            >
              <td className="text-left">{index + 1}</td>
              <td>{appointmentItem.symptoms}</td>
              <td>{appointmentItem.pastMedicalHistory}</td>
              <td>{appointmentItem.date}</td>
              <td>{appointmentItem.time}</td>
              <td onClick={() => {
                setSelectedAppointment(appointmentItem);
                setIsModal(true);
              }}>View</td>
            </tr>
          ))}
        </tbody>
      </table>
      {isShowModal && (
        <AppointmentModal
          isShowModal={isShowModal}
          setIsModal={setIsModal}
          appointmentData={selectedAppointment}
        />
      )}
    </div>
  );
};

export default DoctorAppointments;