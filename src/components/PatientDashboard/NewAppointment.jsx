import shortAddress from "@/utils/shortAddress";
import React, { useState } from "react";
import CreateAppointmentModal from "./CreateAppointmentModal";

const NewAppointment = ({ doctorList }) => {
  const [isShowModal, setIsShowModal] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState();

  const updateCreateAppointment = () => {
    setIsShowModal(true);
  };

  return (
    <div className="px-4 py-4 border border-[#f0f0f0] rounded flex flex-col dark:border-dark-input-border dark:bg-dark-card">
      <h4 className="heading dark:text-primary-yellow">
        Create New Appointment
      </h4>
      <table className="mt-8 w-full">
        <thead>
          <tr className="text-left border-b border-[#f0f0f0] dark:border-dark-input-border dark:text-white">
            <th className="text-left">Id</th>
            <th>Name</th>
            <th>Specialization</th>
            <th>Consult Fee</th>
            <th>Wallet Address</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {doctorList.map((doctorItem) => {
            return (
              <tr key={doctorItem.id} className="py-2 border-b">
                <td className="py-4 px-2">{doctorItem.id}</td>
                <td className="py-4 px-2 text-center">{doctorItem.name}</td>
                <td className="py-4 px-2 text-center">{doctorItem.category}</td>
                <td className="py-4 px-2 text-center">
                  {doctorItem.chargeStart}
                </td>
                <td className="py-4 px-2 text-center">
                  {shortAddress(doctorItem.walletAddress)}
                </td>
                <td
                  className="py-4 px-2 cursor-pointer hover:text-primary-green"
                  onClick={() => {
                    setSelectedDoctor(doctorItem);
                    setIsShowModal(true);
                  }}
                >
                  Create
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {isShowModal && (
        <CreateAppointmentModal
          isShowModal={isShowModal}
          setIsShowModal={setIsShowModal}
          selectedDoctor={selectedDoctor}
        />
      )}
    </div>
  );
};

export default NewAppointment;
