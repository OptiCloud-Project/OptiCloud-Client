import { useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import { uploadFile } from '../../services/api.js';

export default function FileUpload({ onUploadSuccess }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setError(null);
      setSuccess(false);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError('Please select a file');
      return;
    }

    setUploading(true);
    setError(null);
    setSuccess(false);

    try {
      await uploadFile(selectedFile);
      setSuccess(true);
      setSelectedFile(null);
      // Reset file input
      const fileInput = document.getElementById('file-input');
      if (fileInput) {
        fileInput.value = '';
      }
      
      // Notify parent component
      if (onUploadSuccess) {
        onUploadSuccess();
      }
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err.message || 'Failed to upload file');
    } finally {
      setUploading(false);
    }
  };

  return (
    <Box sx={{ mb: 3 }}>
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
        <Button
          variant="outlined"
          component="label"
          disabled={uploading}
          sx={{
            borderColor: '#66898F',
            color: '#66898F',
            '&:hover': {
              borderColor: '#557377',
              backgroundColor: 'rgba(102, 137, 143, 0.1)'
            }
          }}
        >
          Select File
          <input
            id="file-input"
            type="file"
            hidden
            onChange={handleFileChange}
            disabled={uploading}
          />
        </Button>
        
        {selectedFile && (
          <Box sx={{ flex: 1, minWidth: 200 }}>
            <Box sx={{ fontSize: '0.875rem', color: '#111718' }}>
              {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
            </Box>
          </Box>
        )}

        <Button
          variant="contained"
          onClick={handleUpload}
          disabled={!selectedFile || uploading}
          sx={{
            backgroundColor: '#66898F',
            '&:hover': {
              backgroundColor: '#557377'
            }
          }}
        >
          {uploading ? (
            <>
              <CircularProgress size={16} sx={{ mr: 1 }} />
              Uploading...
            </>
          ) : (
            'Upload'
          )}
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" sx={{ mt: 2 }}>
          File uploaded successfully!
        </Alert>
      )}
    </Box>
  );
}
