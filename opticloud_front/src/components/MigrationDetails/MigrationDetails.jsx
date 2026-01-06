import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import BarPercentage from '../BarPercentage/BarPercentage.jsx';

export default function MigrationDetails({ fileName, currentStage, sourceHash, destinationHash, percentage }) {
    return (
        <Box>
            <Typography variant="h6" component="h6" sx={{ mb: 3, fontWeight: 600, color: '#111718' }}>
                Migration Details ({fileName})
            </Typography>
            <Box sx={{ mb: 2 }}>
                <Typography variant="body1" sx={{ mb: 1, color: '#111718' }}>
                    <strong>Stage:</strong> {currentStage}
                </Typography>
                <Typography variant="body1" sx={{ mb: 1, color: '#111718' }}>
                    <strong>Source Hash:</strong> {sourceHash}
                </Typography>
                <Typography variant="body1" sx={{ mb: 2, color: '#111718' }}>
                    <strong>Destination Hash:</strong> {destinationHash}
                </Typography>
            </Box>
            <BarPercentage percentage={percentage} />
        </Box>
    );
}
