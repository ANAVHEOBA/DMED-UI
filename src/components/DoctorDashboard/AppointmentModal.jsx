import React from "react";
import { MdClose } from "react-icons/md";
import { FiUser } from "react-icons/fi";
import { useRouter } from "next/router";

const AppointmentModal = ({ isShowModal, setIsModal, appointmentData }) => {
  const router = useRouter();

  return (
    <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
      <div className="relative w-auto my-6 mx-auto max-w-3xl">
        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white dark:bg-dark-card outline-none focus:outline-none dark:border dark:border-dark-input-border">
          <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
            <h3 className="text-3xl font-semibold dark:text-white">
              Patient Info
            </h3>
            <button
              className="bg-transparent border-0 text-black float-right"
              onClick={() => setIsModal(false)}
            >
              <span className="text-black opacity-7 px-2 py-2 text-xl block bg-gray-400 rounded-full">
                <MdClose className="h-5 w-5" />
              </span>
            </button>
          </div>
          <div className="relative p-6 flex-auto space-y-1">
            <div className="flex space-x-2">
              <FiUser className="h-6 w-6" />
              <span className="text-xl dark:text-primary-yellow">
                {appointmentData.patientName}
              </span>
            </div>
            <div className="flex space-x-2 dark:text-dark-muted">
              <span className="text-muted dark:text-dark-muted dark:font-semibold">
                Wallet Address:
              </span>
              <span className="modal-heading">
                {appointmentData.patientWalletAddress}
              </span>
            </div>
            <div className="flex space-x-2 dark:text-dark-muted">
              <span className="text-muted dark:text-dark-muted dark:font-semibold">
                Symptoms:
              </span>
              <span className="modal-heading">
                {appointmentData.symptoms}
              </span>
            </div>
            <div className="flex space-x-2 dark:text-dark-muted">
              <span className="text-muted dark:text-dark-muted dark:font-semibold">
                Past Medical History:
              </span>
              <span className="modal-heading">{appointmentData.pastMedicalHistory}</span>
            </div>
            <div className="flex space-x-2 dark:text-dark-muted">
              <span className="text-muted dark:text-dark-muted dark:font-semibold">
                Appointment Date:
              </span>
              <span className="modal-heading">{appointmentData.date}</span>
            </div>
            <div className="flex space-x-2 dark:text-dark-muted">
              <span className="text-muted dark:text-dark-muted dark:font-semibold">
                Appointment Time:
              </span>
              <span className="modal-heading">{appointmentData.time}</span>
            </div>
          </div>
          <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
            <button
              className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
              type="button"
              onClick={() => setIsModal(false)}
            >
              Close
            </button>
            <button
              className="submit-btn"
              type="button"
              onClick={() => {
                router.push('/meet_room');
                setIsModal(false);
              }}
            >
              Join Meeting
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentModal;