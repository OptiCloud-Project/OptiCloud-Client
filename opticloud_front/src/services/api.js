const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

/**
 * API Service for OptiCloud
 */

/**
 * Get all files
 * @returns {Promise<Array>}
 */
export const getFiles = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/files`);
    if (!response.ok) {
      throw new Error('Failed to fetch files');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching files:', error);
    throw error;
  }
};

/**
 * Get file by ID
 * @param {string} id - File ID
 * @returns {Promise<Object>}
 */
export const getFileById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/files/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch file');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching file:', error);
    throw error;
  }
};

/**
 * Upload a file
 * @param {File} file - File object from input
 * @returns {Promise<Object>}
 */
export const uploadFile = async (file) => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    // Create AbortController for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 60000); // 60 seconds timeout

    const response = await fetch(`${API_BASE_URL}/files/upload`, {
      method: 'POST',
      body: formData,
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      let errorMessage = 'Failed to upload file';
      try {
        const error = await response.json();
        errorMessage = error.error || error.details || errorMessage;
      } catch (e) {
        errorMessage = `Server error: ${response.status} ${response.statusText}`;
      }
      throw new Error(errorMessage);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error uploading file:', error);
    if (error.name === 'AbortError') {
      throw new Error('Upload timeout - file is too large or server is not responding');
    }
    throw error;
  }
};

/**
 * Delete a file
 * @param {string} id - File ID
 * @returns {Promise<Object>}
 */
export const deleteFile = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/files/${id}`, {
      method: 'DELETE'
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to delete file');
    }

    return await response.json();
  } catch (error) {
    console.error('Error deleting file:', error);
    throw error;
  }
};

/**
 * Download a file
 * @param {string} id - File ID
 * @param {string} fileName - File name for download
 */
export const downloadFile = async (id, fileName) => {
  try {
    const response = await fetch(`${API_BASE_URL}/files/${id}/download`);
    
    if (!response.ok) {
      throw new Error('Failed to download file');
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  } catch (error) {
    console.error('Error downloading file:', error);
    throw error;
  }
};

/**
 * Manually trigger migration for a file
 * @param {string} id - File ID
 * @returns {Promise<Object>}
 */
export const migrateFile = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/files/${id}/migrate`, {
      method: 'POST'
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to migrate file');
    }

    return await response.json();
  } catch (error) {
    console.error('Error migrating file:', error);
    throw error;
  }
};
