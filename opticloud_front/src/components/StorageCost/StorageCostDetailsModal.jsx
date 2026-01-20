import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

// Helper function to convert bytes to MB
const bytesToMB = (bytes) => {
  if (!bytes || bytes === 0) return 0;
  return bytes / (1024 * 1024);
};

export default function StorageCostDetailsModal({
  open,
  onClose,
  files,
  totalCost,
  pricing,
}) {
  // Calculate cost for each file
  const filesWithCost = files.map((file) => {
    // Use sizeBytes if available, otherwise parse from size string
    const sizeInBytes = file.sizeBytes || 0;
    const sizeInMB = bytesToMB(sizeInBytes);
    const tier = file.tier || "HOT";
    const cost = sizeInMB * pricing[tier];
    return {
      ...file,
      sizeInMB,
      cost,
      tier,
    };
  });

  // Group by tier for summary
  const tierSummary = {
    HOT: { count: 0, totalSizeMB: 0, totalCost: 0 },
    WARM: { count: 0, totalSizeMB: 0, totalCost: 0 },
    COLD: { count: 0, totalSizeMB: 0, totalCost: 0 },
  };

  filesWithCost.forEach((file) => {
    const tier = file.tier || "HOT";
    tierSummary[tier].count++;
    tierSummary[tier].totalSizeMB += file.sizeInMB;
    tierSummary[tier].totalCost += file.cost;
  });

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Typography
          variant="h6"
          component="div"
          sx={{ fontWeight: 600, color: "#111718" }}
        >
          Storage Cost Details
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ mb: 3 }}>
          <Typography
            variant="h6"
            sx={{
              mb: 2,
              color: "#2e7d32", // success green
              fontWeight: 700,
              textDecoration: "underline",
              textUnderlineOffset: 4,
            }}
          >
            Total Cost: ${totalCost.toFixed(2)}
          </Typography>

          {/* Tier Summary */}
          <Paper sx={{ p: 2, mb: 3, backgroundColor: "#f5f5f5" }}>
            <Typography
              variant="subtitle1"
              sx={{ mb: 1, fontWeight: 600, color: "#111718" }}
            >
              Summary by Tier:
            </Typography>
            <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
              {Object.entries(tierSummary).map(([tier, summary]) => (
                <Box key={tier} sx={{ minWidth: 150 }}>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 600,
                      color: "#66898F",
                      textDecoration: "underline",
                      textUnderlineOffset: 3,
                    }}
                  >
                    {tier} Tier:
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#666" }}>
                    Files: {summary.count}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#666" }}>
                    Size: {summary.totalSizeMB.toFixed(2)} MB
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "#666", fontWeight: 600 }}
                  >
                    Cost: ${summary.totalCost.toFixed(2)}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Paper>

          {/* Pricing Info */}
          <Box
            sx={{ mb: 2, p: 1.5, backgroundColor: "#e3f2fd", borderRadius: 1 }}
          >
            <Typography
              variant="body2"
              sx={{
                color: "#111718",
                fontWeight: 600,
                mb: 0.5,
                textDecoration: "underline",
                textUnderlineOffset: 3,
              }}
            >
              Pricing:
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "#666", display: "flex", flexWrap: "wrap", gap: 1 }}
            >
              <Box
                component="span"
                sx={{
                  fontWeight: 700,
                  color: "#d32f2f",
                  textTransform: "uppercase",
                  animation: "pulseHot 2s infinite",
                }}
              >
                HOT
              </Box>
              : ${pricing.HOT}/MB |
              <Box
                component="span"
                sx={{
                  fontWeight: 700,
                  color: "#ed6c02",
                  textTransform: "uppercase",
                  animation: "pulseWarm 2.2s infinite",
                }}
              >
                WARM
              </Box>
              : ${pricing.WARM}/MB |
              <Box
                component="span"
                sx={{
                  fontWeight: 700,
                  color: "#1976d2",
                  textTransform: "uppercase",
                  animation: "pulseCold 2.4s infinite",
                }}
              >
                COLD
              </Box>
              : ${pricing.COLD}/MB
            </Typography>
          </Box>
        </Box>

        {/* Files Table */}
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 600 }}>File Name</TableCell>
              <TableCell align="right" sx={{ fontWeight: 600 }}>
                Tier
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: 600 }}>
                Size (MB)
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: 600 }}>
                Cost ($)
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filesWithCost.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} align="center" sx={{ py: 3 }}>
                  No files found
                </TableCell>
              </TableRow>
            ) : (
              filesWithCost.map((file) => (
                <TableRow key={file.id}>
                  <TableCell>{file.name}</TableCell>
                  <TableCell align="right">{file.tier || "HOT"}</TableCell>
                  <TableCell align="right">
                    {file.sizeInMB.toFixed(2)}
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600 }}>
                    ${file.cost.toFixed(2)}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} sx={{ color: "#66898F" }}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
