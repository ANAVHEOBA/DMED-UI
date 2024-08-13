import React from 'react';
import { BiChevronsRight } from "react-icons/bi";

function FooterItem({ id, name, route }) {
  return (
    <li className='flex space-x-2 text-white items-center cursor-pointer'>
        <BiChevronsRight className='h-6 w-6 dark:text-primary-yellow' />
        <span className='hover:pl-2 hover:brightness-90 transition transform duration-300 ease-linear'>{name}</span>
    </li>
  );
}

export default FooterItem;
