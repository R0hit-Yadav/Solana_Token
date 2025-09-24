import React, { FC } from "react";

// Updated props for better reusability and to follow React conventions
interface InputViewProps {
  name: string;
  placeholder: string;
  value: string | number;
  type?: 'text' | 'number' | 'password';
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

export const InputView: FC<InputViewProps> = ({
  name,
  placeholder,
  value,
  type = 'text', // Default to 'text' if no type is provided
  onChange,
}) => {
  return (
    <div className="mb-5">
      <label
        htmlFor={name} // Use the 'name' for the 'for' attribute for accessibility
        className="mb-2 block text-base font-medium text-gray-400"
      >
        {name}  
      </label>
      <input
        type={type}
        id={name} // Also use 'name' for the id
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="block w-full rounded-lg border border-gray-700 bg-gray-800/50 
                   px-4 py-3 text-gray-200 transition-all duration-300 
                   placeholder:text-gray-500 
                   focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/30"
      />
    </div>
  );
};