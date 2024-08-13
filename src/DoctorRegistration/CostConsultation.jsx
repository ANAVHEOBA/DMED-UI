import React, { useState } from 'react';

const CostConsultation = ({ preference, setPreference }) => {
  const [amount, setAmount] = useState(preference.minAmount);

  // Handles changes in the amount input field
  const handleAmountChange = (e) => {
    const value = parseFloat(e.currentTarget.value);
    if (!isNaN(value)) {
      setAmount(value);
      setPreference({
        ...preference,
        minAmount: value,
      });
    }
  };

  // Handles form submission
  const handleSubmit = () => {
    if (amount >= 0) {
      setPreference({
        ...preference,
        minAmount: amount,
      });
      alert('Cost updated successfully!');
    } else {
      alert('Please enter a valid amount.');
    }
  };

  return (
    <div className="space-y-4 flex flex-col p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md">
      <h5 className="font-semibold text-2xl dark:text-white">
        What is the maximum cost per consultation?*
      </h5>
      <p className="text-[#585858] dark:text-dark-muted">
        This can be edited later from the preferences section.
      </p>
      <div className="input-group">
        <label className="input-label" htmlFor="cost">
          Maximum Cost *
        </label>
        <input
          id="cost"
          type="number"
          className="input-box"
          placeholder="Enter Amount"
          value={amount}
          onChange={handleAmountChange}
          min="0"
          step="0.01"
        />
      </div>
      <button
        className="submit-btn w-40 py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 ease-in-out"
        onClick={handleSubmit}
      >
        Save
      </button>
    </div>
  );
};

export default CostConsultation;
