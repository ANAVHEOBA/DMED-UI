import React from 'react';

function FooterBottom() {
  return (
    <div className='py-5 border-t border-white flex flex-col md:flex-row justify-between text-white space-y-2 dark:border-[#A0AABA2B] dark:text-dark-muted'>
      <div>
        <p>© 2024 DMED. All rights reserved.</p>
      </div>
      <div>
        <ul className='flex space-x-2'>
          <li className='hover:text-primary-green cursor-pointer transition transform duration-300 ease-linear dark:hover:text-primary-yellow'>
            Terms and Condition
          </li>
          <li className='hover:text-primary-green cursor-pointer transition transform duration-300 ease-linear dark:hover:text-primary-yellow'>
            Policy
          </li>
        </ul>
      </div>
    </div>
  );
}

export default FooterBottom;
