import { useRouter } from "next/router";
import React from "react";
import { IconType } from "react-icons";

function RegisterCard({ id, icon: Icon, title, description, routeRegister, routeLogin }) {
  const router = useRouter();

  return (
    <div className="px-4 py-4 border border-[#f0f0f0] flex flex-col space-y-2 rounded-md dark:border-dark-input-border dark:bg-dark-card justify-center">
      <Icon className="h-10 w-10" />
      <h5 className="font-semibold text-xl">{title}</h5>
      <p>{description}</p>
      <div className="flex space-x-3">
        <button
          className="submit-btn"
          onClick={() => router.push(routeRegister)}
        >
          Register
        </button>
        <button
          className="submit-btn"
          onClick={() => router.push(routeLogin)}
        >
          Login/View Dashboard
        </button>
      </div>
    </div>
  );
}

export default RegisterCard;
