import { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteIcon from '@mui/icons-material/Delete';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { TableHeaderCell, MigTableContainer } from './MigTable.style';
import ModalComponent from '../ModalComponent/ModalComponent.jsx';
import MigrationDetails from '../MigrationDetails/MigrationDetails.jsx';
import { getFiles, getFileById, deleteFile, downloadFile, migrateFile, simulatePast30Days } from '../../services/api.js';

export default function MigTable({ refreshTrigger }) {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileDetails, setFileDetails] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [fileToDelete, setFileToDelete] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [actionLoading, setActionLoading] = useState({});

  // Fetch files on component mount and when refreshTrigger changes
  useEffect(() => {
    fetchFiles();
    // Set up polling to refresh data every 5 seconds
    const interval = setInterval(fetchFiles, 5000);
    return () => clearInterval(interval);
  }, [refreshTrigger]); // Refresh when refreshTrigger changes

  const fetchFiles = async () => {
    try {
      setError(null);
      const data = await getFiles();
      setFiles(data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching files:', err);
      setError(err.message);
      setLoading(false);
    }
  };

  const handleRowClick = async (file) => {
    // Open modal for files that are being migrated (PROCESSING, VERIFYING)
    if (file.migrationStatus === 'PROCESSING' || file.migrationStatus === 'VERIFYING') {
      try {
        const details = await getFileById(file.id);
        setFileDetails(details);
        setSelectedFile(file);
        setModalOpen(true);
      } catch (err) {
        console.error('Error fetching file details:', err);
        showSnackbar('Failed to load file details', 'error');
      }
    }
  };

  const handleDownload = async (file, e) => {
    e.stopPropagation();
    setActionLoading({ ...actionLoading, [file.id]: 'download' });
    try {
      await downloadFile(file.id, file.name);
      showSnackbar('File downloaded successfully', 'success');
    } catch (err) {
      showSnackbar(err.message || 'Failed to download file', 'error');
    } finally {
      setActionLoading({ ...actionLoading, [file.id]: null });
    }
  };

  const handleDeleteClick = (file, e) => {
    e.stopPropagation();
    if (file.isLocked) {
      showSnackbar('File is locked and cannot be deleted', 'warning');
      return;
    }
    setFileToDelete(file);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!fileToDelete) return;
    
    setActionLoading({ ...actionLoading, [fileToDelete.id]: 'delete' });
    try {
      await deleteFile(fileToDelete.id);
      showSnackbar('File deleted successfully', 'success');
      setDeleteDialogOpen(false);
      setFileToDelete(null);
      // Refresh file list
      await fetchFiles();
    } catch (err) {
      showSnackbar(err.message || 'Failed to delete file', 'error');
    } finally {
      setActionLoading({ ...actionLoading, [fileToDelete.id]: null });
    }
  };

  const handleMigrate = async (file, e) => {
    e.stopPropagation();
    if (file.isLocked) {
      showSnackbar('File is locked and cannot be migrated', 'warning');
      return;
    }
    
    setActionLoading({ ...actionLoading, [file.id]: 'migrate' });
    try {
      await migrateFile(file.id);
      showSnackbar('Migration started successfully', 'success');
      // Refresh file list
      await fetchFiles();
    } catch (err) {
      showSnackbar(err.message || 'Failed to start migration', 'error');
    } finally {
      setActionLoading({ ...actionLoading, [file.id]: null });
    }
  };

  const handleViewDetails = async (file, e) => {
    e.stopPropagation();
    try {
      const details = await getFileById(file.id);
      setFileDetails(details);
      setSelectedFile(file);
      setModalOpen(true);
    } catch (err) {
      showSnackbar('Failed to load file details', 'error');
    }
  };

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const getTierDisplay = (tier) => {
    return tier || 'HOT';
  };

  const getStatusDisplay = (file) => {
    if (file.isLocked) {
      return 'Locked';
    }
    if (file.migrationStatus === 'PROCESSING') {
      return 'Processing';
    }
    if (file.migrationStatus === 'VERIFYING') {
      return 'Verifying';
    }
    if (file.migrationStatus === 'FAILED') {
      return 'Failed';
    }
    return 'Available';
  };

  const getIntegrityDisplay = (file) => {
    // Use integrity field from API or check migrationStatus
    if (file.integrity === 'Verified') {
      return 'Verified';
    }
    if (file.migrationStatus === 'VERIFYING') {
      return 'Checking';
    }
    if (file.migrationStatus === 'PROCESSING') {
      return 'Pending';
    }
    return '—';
  };

  const getMigrationPercentage = (file) => {
    // This is a placeholder - in real implementation, you'd track actual progress
    if (file.migrationStatus === 'VERIFYING') {
      return 80;
    }
    if (file.migrationStatus === 'PROCESSING') {
      return 50;
    }
    return 0;
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedFile(null);
    setFileDetails(null);
  };

  const handleSimulatePast30Days = async (file, e) => {
    e.stopPropagation();
    setActionLoading({ ...actionLoading, [file.id]: 'simulate' });
    try {
      await simulatePast30Days(file.id);
      showSnackbar('Simulated lastAccessDate to 30 days ago', 'success');
      await fetchFiles();
    } catch (err) {
      showSnackbar(err.message || 'Failed to simulate last access date', 'error');
    } finally {
      setActionLoading({ ...actionLoading, [file.id]: null });
    }
  };

  if (loading) {
    return (
      <MigTableContainer component={Paper}>
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
          <CircularProgress />
        </Box>
      </MigTableContainer>
    );
  }

  if (error) {
    return (
      <MigTableContainer component={Paper}>
        <Box sx={{ p: 2, color: 'error.main' }}>
          Error: {error}
        </Box>
      </MigTableContainer>
    );
  }

  return (
    <MigTableContainer component={Paper}>
      <Table sx={{ minWidth: 600 }} size="small" aria-label="migration table">
        <TableHead>
          <TableRow>
            <TableHeaderCell sx={{ py: 1 }}>File Name</TableHeaderCell>
            <TableHeaderCell align="right" sx={{ py: 1 }}>Size</TableHeaderCell>
            <TableHeaderCell align="right" sx={{ py: 1 }}>Tier</TableHeaderCell>
            <TableHeaderCell align="right" sx={{ py: 1 }}>Status</TableHeaderCell>
            <TableHeaderCell align="right" sx={{ py: 1 }}>Integrity</TableHeaderCell>
            <TableHeaderCell align="center" sx={{ py: 1 }}>Actions</TableHeaderCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {files.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                No files found. Upload a file to get started.
              </TableCell>
            </TableRow>
          ) : (
            files.map((file) => (
              <TableRow
                key={file.id}
                onClick={() => handleRowClick(file)}
                sx={{
                  '&:last-child td': { borderBottom: 0 },
                  '&:hover': { backgroundColor: 'rgba(136, 165, 170, 0.3) !important' },
                  cursor: (file.migrationStatus === 'PROCESSING' || file.migrationStatus === 'VERIFYING') ? 'pointer' : 'default'
                }}
              >
                <TableCell component="th" scope="row" sx={{ py: 0.9 }}>
                  {file.name}
                </TableCell>
                <TableCell align="right" sx={{ py: 0.5 }}>{file.size}</TableCell>
                <TableCell align="right" sx={{ py: 0.5 }}>{getTierDisplay(file.tier)}</TableCell>
                <TableCell align="right" sx={{ py: 0.5 }}>{getStatusDisplay(file)}</TableCell>
                <TableCell align="right" sx={{ py: 0.5 }}>{getIntegrityDisplay(file)}</TableCell>
                <TableCell align="center" sx={{ py: 0.5 }} onClick={(e) => e.stopPropagation()}>
                  <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'center', flexWrap: 'wrap' }}>
                    <Tooltip title="View Details">
                      <IconButton
                        size="small"
                        onClick={(e) => handleViewDetails(file, e)}
                        disabled={actionLoading[file.id]}
                        sx={{ color: '#66898F' }}
                      >
                        <VisibilityIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Download">
                      <IconButton
                        size="small"
                        onClick={(e) => handleDownload(file, e)}
                        disabled={actionLoading[file.id] || file.isLocked}
                        sx={{ color: '#66898F' }}
                      >
                        {actionLoading[file.id] === 'download' ? (
                          <CircularProgress size={16} />
                        ) : (
                          <DownloadIcon fontSize="small" />
                        )}
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Migrate">
                      <IconButton
                        size="small"
                        onClick={(e) => handleMigrate(file, e)}
                        disabled={actionLoading[file.id] || file.isLocked}
                        sx={{ color: '#66898F' }}
                      >
                        {actionLoading[file.id] === 'migrate' ? (
                          <CircularProgress size={16} />
                        ) : (
                          <SwapHorizIcon fontSize="small" />
                        )}
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton
                        size="small"
                        onClick={(e) => handleDeleteClick(file, e)}
                        disabled={actionLoading[file.id] || file.isLocked}
                        sx={{ color: '#d32f2f' }}
                      >
                        {actionLoading[file.id] === 'delete' ? (
                          <CircularProgress size={16} />
                        ) : (
                          <DeleteIcon fontSize="small" />
                        )}
                      </IconButton>
                    </Tooltip>
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={(e) => handleSimulatePast30Days(file, e)}
                      disabled={actionLoading[file.id]}
                      sx={{
                        ml: 0.5,
                        textTransform: 'none',
                        fontSize: '0.7rem',
                        borderColor: '#66898F',
                        color: '#66898F',
                        '&:hover': {
                          borderColor: '#557377',
                          backgroundColor: 'rgba(102, 137, 143, 0.06)'
                        }
                      }}
                    >
                      {actionLoading[file.id] === 'simulate' ? 'Simulating...' : 'Simulate Past 30 days'}
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      <ModalComponent
        open={modalOpen}
        onClose={handleCloseModal}
      >
        {selectedFile && fileDetails && (
          <MigrationDetails
            fileName={selectedFile.name}
            sourceChecksumBeforeMigration={fileDetails.sourceChecksumBeforeMigration}
            targetChecksumAfterMigration={fileDetails.targetChecksumAfterMigration}
            migrationStatus={fileDetails.migrationStatus}
          />
        )}
      </ModalComponent>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <DialogTitle id="delete-dialog-title">
          Delete File
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-dialog-description">
            Are you sure you want to delete "{fileToDelete?.name}"? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} color="inherit">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </MigTableContainer>
  );
}
