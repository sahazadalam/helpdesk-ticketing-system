import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

const Alert = ({ type, message, onClose }) => {
  const types = {
    success: 'bg-green-50 border-green-400 text-green-800',
    error: 'bg-red-50 border-red-400 text-red-800',
    warning: 'bg-yellow-50 border-yellow-400 text-yellow-800',
    info: 'bg-blue-50 border-blue-400 text-blue-800',
  };

  return (
    <div className={`${types[type]} border-l-4 p-4 rounded-lg mb-4 animate-slide-up`}>
      <div className="flex justify-between items-start">
        <p className="text-sm">{message}</p>
        {onClose && (
          <button onClick={onClose} className="ml-4">
            <XMarkIcon className="h-5 w-5" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Alert;