import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function ModalComponent({ open, onClose, children }) {
    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                {/* <Typography id="modal-modal-title" variant="h6" component="h2">
                    {rowData?.name || 'File Details'}
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Size: {rowData?.size}<br />
                    Tier: {rowData?.tier}<br />
                    Status: {rowData?.status}<br />
                    Integrity: {rowData?.integrity}
                </Typography> */}
                {children}
            </Box>
        </Modal>
    );
}
