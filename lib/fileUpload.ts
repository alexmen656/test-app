/**
 * File Upload API Client for Next.js
 * Upload files to PHP backend and get URLs back
 */

interface UploadResponse {
  success: boolean;
  url?: string;
  filename?: string;
  originalName?: string;
  size?: number;
  mimeType?: string;
  error?: string;
}

interface UploadProgress {
  loaded: number;
  total: number;
  percentage: number;
}

class FileUploadAPI {
  private baseUrl: string;

  constructor(baseUrl: string = process.env.NEXT_PUBLIC_UPLOAD_API_URL || 'https://alex.polan.sk/betabay-backend') {
    this.baseUrl = baseUrl.replace(/\/$/, ''); // Remove trailing slash
  }

  /**
   * Upload a single file
   */
  async uploadFile(
    file: File, 
    onProgress?: (progress: UploadProgress) => void
  ): Promise<UploadResponse> {
    const formData = new FormData();
    formData.append('file', file);

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      // Track upload progress
      if (onProgress) {
        xhr.upload.addEventListener('progress', (e) => {
          if (e.lengthComputable) {
            const progress: UploadProgress = {
              loaded: e.loaded,
              total: e.total,
              percentage: Math.round((e.loaded / e.total) * 100)
            };
            onProgress(progress);
          }
        });
      }

      xhr.addEventListener('load', () => {
        try {
          const response: UploadResponse = JSON.parse(xhr.responseText);
          if (xhr.status === 200 && response.success) {
            resolve(response);
          } else {
            reject(new Error(response.error || 'Upload failed'));
          }
        } catch (error) {
          reject(new Error('Invalid server response'));
        }
      });

      xhr.addEventListener('error', () => {
        reject(new Error('Network error during upload'));
      });

      xhr.open('POST', `${this.baseUrl}/upload.php`);
      xhr.send(formData);
    });
  }

  /**
   * Upload multiple files
   */
  async uploadFiles(
    files: File[],
    onProgress?: (fileIndex: number, progress: UploadProgress) => void,
    onFileComplete?: (fileIndex: number, result: UploadResponse) => void
  ): Promise<UploadResponse[]> {
    const results: UploadResponse[] = [];

    for (let i = 0; i < files.length; i++) {
      try {
        const result = await this.uploadFile(files[i], (progress) => {
          if (onProgress) {
            onProgress(i, progress);
          }
        });
        
        results.push(result);
        
        if (onFileComplete) {
          onFileComplete(i, result);
        }
      } catch (error) {
        const errorResult: UploadResponse = {
          success: false,
          error: error instanceof Error ? error.message : 'Upload failed'
        };
        results.push(errorResult);
        
        if (onFileComplete) {
          onFileComplete(i, errorResult);
        }
      }
    }

    return results;
  }

  /**
   * Upload with fetch (no progress tracking)
   */
  async uploadFileSimple(file: File): Promise<UploadResponse> {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(`${this.baseUrl}/upload.php`, {
        method: 'POST',
        body: formData,
      });

      const result: UploadResponse = await response.json();
      
      if (!response.ok || !result.success) {
        throw new Error(result.error || `HTTP ${response.status}`);
      }

      return result;
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Upload failed');
    }
  }

  /**
   * Validate file before upload
   */
  validateFile(file: File, options?: {
    maxSize?: number;
    allowedTypes?: string[];
  }): { valid: boolean; error?: string } {
    const maxSize = options?.maxSize || 50 * 1024 * 1024; // 50MB default
    const allowedTypes = options?.allowedTypes || [
      'image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp',
      'application/pdf', 'text/plain', 'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];

    if (file.size > maxSize) {
      return {
        valid: false,
        error: `File too large. Maximum size is ${Math.round(maxSize / 1024 / 1024)}MB`
      };
    }

    if (!allowedTypes.includes(file.type)) {
      return {
        valid: false,
        error: `File type not allowed: ${file.type}`
      };
    }

    return { valid: true };
  }

  /**
   * Get file info without uploading
   */
  getFileInfo(file: File) {
    return {
      name: file.name,
      size: file.size,
      type: file.type,
      lastModified: new Date(file.lastModified),
      sizeFormatted: this.formatFileSize(file.size)
    };
  }

  /**
   * Format file size for display
   */
  private formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
}

// Create default instance
export const fileUploadAPI = new FileUploadAPI();

// Export class for custom instances
export { FileUploadAPI };
export type { UploadResponse, UploadProgress };
