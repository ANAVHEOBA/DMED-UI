import React from "react";
import { GoLocation } from "react-icons/go";
import { AiOutlinePhone } from "react-icons/ai";
import { BiMessage } from "react-icons/bi";

function FooterAddress() {
  return (
    <div className="text-white">
      <h5 className="text-white font-medium text-lg">Contact Us</h5>
      <ul className="mt-5 space-y-4">
        <li className="flex space-x-2 text-white items-center">
          <GoLocation className="h-8 w-8 p-2 rounded-full dark:bg-primary-yellow dark:text-black" />
          <span>
            3556 Beech Street, San Francisco,California, CA 94108
          </span>
        </li>
        <li className="flex space-x-2 text-white items-center">
          <AiOutlinePhone className="h-8 w-8 p-2 rounded-full dark:bg-primary-yellow dark:text-black" />
          <span>
            +1 315 369 5943
          </span>
        </li>
        <li className="flex space-x-2 text-white items-center">
          <BiMessage className="h-8 w-8 p-2 rounded-full dark:bg-primary-yellow dark:text-black" />
          <span>
            dedoctor@example.com
          </span>
        </li>
      </ul>
    </div>
  );
}

export default FooterAddress;
