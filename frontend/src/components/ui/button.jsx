import React from 'react';

export function Button({ children, className = "", ...props }) {
    return (
        <button
            className={`inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white font-medium text-sm rounded transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}
