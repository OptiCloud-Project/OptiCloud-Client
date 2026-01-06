import { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableHeaderCell, MigTableContainer } from './MigTable.style';
import ModalComponent from '../ModalComponent/ModalComponent.jsx';
import MigrationDetails from '../MigrationDetails/MigrationDetails.jsx';

function createData(name, size, tier, status, integrity) {
  return { name, size, tier, status, integrity };
}

// Sample data for the table
const rows = [
  createData('project_v1.pdf', '2MB', 'HOT', 'Available', '—'),
  createData('backup_log.zip', '5GB', 'HOT', 'Locked', 'Pending'),
  createData('old_video.mp4', '1GB', '→', 'Verifying', 'Checking'),
  createData('archive_2024', '10GB', 'COLD', 'Archived', 'Verified'),
];

export default function MigTable() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const handleRowClick = (row) => {
    if (row.tier === '→') {
      setSelectedRow(row);
      setModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedRow(null);
  };

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
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              onClick={() => handleRowClick(row)}
              sx={{
                '&:last-child td': { borderBottom: 0 },
                '&:hover': { backgroundColor: 'rgba(136, 165, 170, 0.3) !important' },
                cursor: 'pointer'
              }}
            >
              <TableCell component="th" scope="row" sx={{ py: 0.9 }}>
                {row.name}
              </TableCell>
              <TableCell align="right" sx={{ py: 0.5 }}>{row.size}</TableCell>
              <TableCell align="right" sx={{ py: 0.5 }}>{row.tier}</TableCell>
              <TableCell align="right" sx={{ py: 0.5 }}>{row.status}</TableCell>
              <TableCell align="right" sx={{ py: 0.5 }}>{row.integrity}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <ModalComponent
        open={modalOpen}
        onClose={handleCloseModal}
      >
        {selectedRow && (
          <MigrationDetails
            fileName={selectedRow.name}
            currentStage="Comparing Checksums"
            sourceHash="a1b2c3d4e5f6g7h8i9j0"
            destinationHash="a1b2c3d4e5f6g7h8i9j0"
            percentage={65}
          />
        )}
      </ModalComponent>
    </MigTableContainer>
  );
}
