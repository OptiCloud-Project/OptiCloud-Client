import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import BarPercentage from '../BarPercentage/BarPercentage.jsx';

export default function MigrationDetails({ 
    fileName, 
    sourceChecksumBeforeMigration, 
    targetChecksumAfterMigration,
    migrationStatus
}) {
    // Check if file is in migration process
    const isInMigration = migrationStatus === 'PROCESSING' || migrationStatus === 'VERIFYING';
    
    // Determine if checksums are equal
    const checksumsEqual = sourceChecksumBeforeMigration && 
                           targetChecksumAfterMigration && 
                           sourceChecksumBeforeMigration === targetChecksumAfterMigration;
    
    // Determine verification status message
    // Only show "Verification in progress..." if file is in migration process
    let verificationStatus = null;
    if (sourceChecksumBeforeMigration && targetChecksumAfterMigration) {
        verificationStatus = checksumsEqual 
            ? 'Checksum Verification Passed : Both Equals'
            : 'Checksum Verification Failed: Not Equal';
    } else if (isInMigration) {
        verificationStatus = 'Verification in progress...';
    }

    return (
        <Box>
            <Typography variant="h6" component="h6" sx={{ mb: 3, fontWeight: 600, color: '#111718' }}>
                Migration Details ({fileName})
            </Typography>
            <Box sx={{ mb: 2 }}>
                <Typography variant="body1" sx={{ mb: 1.5, color: '#111718' }}>
                    <strong>Source checksum (Before migration):</strong>
                </Typography>
                <Typography variant="body2" sx={{ mb: 2, color: '#666', fontFamily: 'monospace', wordBreak: 'break-all' }}>
                    {sourceChecksumBeforeMigration || 'Not calculated yet'}
                </Typography>
                
                <Typography variant="body1" sx={{ mb: 1.5, color: '#111718' }}>
                    <strong>Target checksum (After Migration):</strong>
                </Typography>
                <Typography variant="body2" sx={{ mb: 2, color: '#666', fontFamily: 'monospace', wordBreak: 'break-all' }}>
                    {targetChecksumAfterMigration || 'Not calculated yet'}
                </Typography>
                
                {verificationStatus && (
                    <Typography 
                        variant="body1" 
                        sx={{ 
                            mb: 2, 
                            color: checksumsEqual ? '#2e7d32' : (sourceChecksumBeforeMigration && targetChecksumAfterMigration ? '#d32f2f' : '#666'),
                            fontWeight: 600
                        }}
                    >
                        {verificationStatus}
                    </Typography>
                )}
            </Box>
        </Box>
    );
}
