import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { getFiles, getMigrationStats } from '../../services/api.js';
import StorageCostDetailsModal from './StorageCostDetailsModal.jsx';

// Pricing per MB
const PRICING = {
  HOT: 5,    // $5 per MB
  WARM: 3,   // $3 per MB
  COLD: 1    // $1 per MB
};

// Fine per migration between tiers ($)
const FINE_PER_MIGRATION = 0.1;

// Helper function to convert bytes to MB
const bytesToMB = (bytes) => {
  if (!bytes || bytes === 0) return 0;
  return bytes / (1024 * 1024);
};

export default function StorageCostDisplay() {
  const [totalCost, setTotalCost] = useState(0);
  const [files, setFiles] = useState([]);
  const [totalMigrations, setTotalMigrations] = useState(0);
  const [totalFines, setTotalFines] = useState(0);
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
      const [filesData, migrationStats] = await Promise.all([
        getFiles(),
        getMigrationStats()
      ]);
      setFiles(filesData);
      setTotalMigrations(migrationStats.totalMigrations || 0);
      const fines = (migrationStats.totalMigrations || 0) * FINE_PER_MIGRATION;
      setTotalFines(fines);

      // Calculate tier cost
      let tierTotal = 0;
      filesData.forEach(file => {
        const sizeInBytes = file.sizeBytes || 0;
        const sizeInMB = bytesToMB(sizeInBytes);
        const tier = file.tier || 'HOT';
        tierTotal += sizeInMB * PRICING[tier];
      });

      setTotalCost(tierTotal + fines);
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
          color: '#557377',
          textTransform: 'none',
          fontSize: '0.875rem',
          '&:hover': {
            backgroundColor: 'rgba(46, 125, 50, 0.08)'
          }
        }}
      >
        <Typography
          variant="body2"
          sx={{
            fontWeight: 700,
            textDecoration: 'underline',
            textUnderlineOffset: 3
          }}
        >
          Storage Cost: ${totalCost.toFixed(2)}
        </Typography>
      </Button>
      
      <StorageCostDetailsModal
        open={modalOpen}
        onClose={handleCloseModal}
        files={files}
        totalCost={totalCost}
        pricing={PRICING}
        totalMigrations={totalMigrations}
        totalFines={totalFines}
        finePerMigration={FINE_PER_MIGRATION}
      />
    </>
  );
}
