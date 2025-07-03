'use client';

import React, { useRef } from 'react';
import { useSimpleFileUpload } from '@/hooks/useFileUpload';

interface FileUploadButtonProps {
  onUpload?: (url: string) => void;
  onError?: (error: string) => void;
  accept?: string;
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
}

export const FileUploadButton: React.FC<FileUploadButtonProps> = ({
  onUpload,
  onError,
  accept = 'image/*',
  className = '',
  children,
  disabled = false
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { upload, isUploading, error } = useSimpleFileUpload();

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const url = await upload(file);
      if (url) {
        onUpload?.(url);
      } else if (error) {
        onError?.(error);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Upload failed';
      onError?.(errorMessage);
    }

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleClick = () => {
    if (!disabled && !isUploading && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileSelect}
        style={{ display: 'none' }}
      />
      <button
        type="button"
        onClick={handleClick}
        disabled={disabled || isUploading}
        className={`${className} ${isUploading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
      >
        {isUploading ? 'Uploading...' : (children || 'Upload File')}
      </button>
      {error && (
        <div className="text-red-500 text-sm mt-1">
          {error}
        </div>
      )}
    </>
  );
};

// Drag & Drop Upload Component
interface DragDropUploadProps {
  onUpload?: (url: string) => void;
  onError?: (error: string) => void;
  accept?: string;
  className?: string;
  children?: React.ReactNode;
}

export const DragDropUpload: React.FC<DragDropUploadProps> = ({
  onUpload,
  onError,
  accept: _accept = 'image/*', // Prefix with underscore to indicate intentionally unused
  className = '',
  children
}) => {
  const { upload, isUploading, error } = useSimpleFileUpload();
  const [isDragOver, setIsDragOver] = React.useState(false);

  const handleDrop = async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(false);

    const file = event.dataTransfer.files?.[0];
    if (!file) return;

    try {
      const url = await upload(file);
      if (url) {
        onUpload?.(url);
      } else if (error) {
        onError?.(error);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Upload failed';
      onError?.(errorMessage);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(false);
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className={`
        border-2 border-dashed rounded-lg p-8 text-center transition-colors
        ${isDragOver ? 'border-blue-400 bg-blue-50' : 'border-gray-300'}
        ${isUploading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
    >
      {isUploading ? (
        <div className="text-gray-600">Uploading...</div>
      ) : (
        children || (
          <div className="text-gray-600">
            <div className="text-lg mb-2">📁</div>
            <div>Drag & drop a file here</div>
          </div>
        )
      )}
      {error && (
        <div className="text-red-500 text-sm mt-2">
          {error}
        </div>
      )}
    </div>
  );
};
