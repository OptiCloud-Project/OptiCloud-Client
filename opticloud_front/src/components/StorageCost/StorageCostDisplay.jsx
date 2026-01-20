import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { getFiles } from '../../services/api.js';
import StorageCostDetailsModal from './StorageCostDetailsModal.jsx';

// Pricing per MB
const PRICING = {
  HOT: 5,    // $5 per MB
  WARM: 3,   // $3 per MB
  COLD: 1    // $1 per MB
};

// Helper function to convert bytes to MB
const bytesToMB = (bytes) => {
  if (!bytes || bytes === 0) return 0;
  return bytes / (1024 * 1024);
};

export default function StorageCostDisplay() {
  const [totalCost, setTotalCost] = useState(0);
  const [files, setFiles] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFilesAndCalculate();
    // Refresh every 5 seconds
    const interval = setInterval(fetchFilesAndCalculate, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchFilesAndCalculate = async () => {
    try {
      const filesData = await getFiles();
      setFiles(filesData);
      
      // Calculate total cost
      let total = 0;
      const filesWithCost = filesData.map(file => {
        // Use sizeBytes if available, otherwise parse from size string
        const sizeInBytes = file.sizeBytes || 0;
        const sizeInMB = bytesToMB(sizeInBytes);
        const tier = file.tier || 'HOT';
        const cost = sizeInMB * PRICING[tier];
        total += cost;
        return {
          ...file,
          sizeInMB,
          cost
        };
      });
      
      setTotalCost(total);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching files for cost calculation:', error);
      setLoading(false);
    }
  };

  const handleClick = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  if (loading) {
    return null;
  }

  return (
    <>
      <Button
        onClick={handleClick}
        sx={{
          color: '#66898F',
          textTransform: 'none',
          fontSize: '0.875rem',
          '&:hover': {
            backgroundColor: 'rgba(102, 137, 143, 0.1)'
          }
        }}
      >
        <Typography variant="body2" sx={{ fontWeight: 600 }}>
          Storage Cost: ${totalCost.toFixed(2)}
        </Typography>
      </Button>
      
      <StorageCostDetailsModal
        open={modalOpen}
        onClose={handleCloseModal}
        files={files}
        totalCost={totalCost}
        pricing={PRICING}
      />
    </>
  );
}
