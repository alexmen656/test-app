// src/components/FormField.tsx
import React, { FC, ChangeEvent } from 'react';

/**
 * Props for the FormField component.
 */
interface FormFieldProps {
    label: string;
    id: string;
    type?: string;
    placeholder: string;
    value: string | number;
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    as?: 'textarea';
}

/**
 * A reusable form field component for text inputs and textareas.
 */
const FormField: FC<FormFieldProps> = ({ label, id, type = 'text', placeholder, value, onChange, as }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-gray-600 mb-1">{label}</label>
        {as === 'textarea' ? (
            <textarea
                id={id}
                name={id}
                rows={4}
                className="w-full px-4 py-2 bg-gray-100 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
        ) : (
            <input
                type={type}
                id={id}
                name={id}
                className="w-full px-4 py-2 bg-gray-100 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
        )}
    </div>
);

export default FormField;
