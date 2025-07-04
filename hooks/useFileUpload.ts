import { useState, useCallback } from 'react';
import { fileUploadAPI, UploadResponse, UploadProgress } from '@/lib/fileUpload';

interface UseFileUploadOptions {
  maxSize?: number;
  allowedTypes?: string[];
  multiple?: boolean;
}

interface UseFileUploadReturn {
  // State
  isUploading: boolean;
  progress: UploadProgress | null;
  uploadedFiles: UploadResponse[];
  error: string | null;
  
  // Actions
  uploadFile: (file: File) => Promise<UploadResponse | null>;
  uploadFiles: (files: File[]) => Promise<UploadResponse[]>;
  reset: () => void;
  validateFile: (file: File) => { valid: boolean; error?: string };
}

export const useFileUpload = (options: UseFileUploadOptions = {}): UseFileUploadReturn => {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState<UploadProgress | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<UploadResponse[]>([]);
  const [error, setError] = useState<string | null>(null);

  const reset = useCallback(() => {
    setIsUploading(false);
    setProgress(null);
    setUploadedFiles([]);
    setError(null);
  }, []);

  const validateFile = useCallback((file: File) => {
    return fileUploadAPI.validateFile(file, {
      maxSize: options.maxSize,
      allowedTypes: options.allowedTypes
    });
  }, [options.maxSize, options.allowedTypes]);

  const uploadFile = useCallback(async (file: File): Promise<UploadResponse | null> => {
    // Reset previous state
    setError(null);
    setProgress(null);

    // Validate file
    const validation = validateFile(file);
    if (!validation.valid) {
      setError(validation.error || 'File validation failed');
      return null;
    }

    setIsUploading(true);

    try {
      const result = await fileUploadAPI.uploadFile(file, (progressData) => {
        setProgress(progressData);
      });

      setUploadedFiles((prev: UploadResponse[]) => [...prev, result]);
      setProgress(null);
      return result;
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Upload failed';
      setError(errorMessage);
      return null;
    } finally {
      setIsUploading(false);
    }
  }, [validateFile]);

  const uploadFiles = useCallback(async (files: File[]): Promise<UploadResponse[]> => {
    // Reset previous state
    setError(null);
    setProgress(null);

    if (!options.multiple && files.length > 1) {
      setError('Multiple files not allowed');
      return [];
    }

    // Validate all files first
    for (const file of files) {
      const validation = validateFile(file);
      if (!validation.valid) {
        setError(`${file.name}: ${validation.error}`);
        return [];
      }
    }

    setIsUploading(true);

    try {
      const results = await fileUploadAPI.uploadFiles(
        files,
        (fileIndex, progressData) => {
          // Show progress for current file
          setProgress({
            ...progressData,
            // Add info about which file is being uploaded
            percentage: Math.round(((fileIndex * 100) + progressData.percentage) / files.length)
          });
        },
        (fileIndex, result) => {
          // Add completed file to results
          if (result.success) {
            setUploadedFiles((prev: UploadResponse[]) => [...prev, result]);
          }
        }
      );

      setProgress(null);
      return results;
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Upload failed';
      setError(errorMessage);
      return [];
    } finally {
      setIsUploading(false);
    }
  }, [options.multiple, validateFile]);

  return {
    isUploading,
    progress,
    uploadedFiles,
    error,
    uploadFile,
    uploadFiles,
    reset,
    validateFile
  };
};

// Helper hook for simple single file upload
export const useSimpleFileUpload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const upload = useCallback(async (file: File): Promise<string | null> => {
    setIsUploading(true);
    setError(null);

    try {
      const result = await fileUploadAPI.uploadFileSimple(file);
      return result.url || null;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Upload failed';
      setError(errorMessage);
      return null;
    } finally {
      setIsUploading(false);
    }
  }, []);

  return {
    upload,
    isUploading,
    error
  };
};
