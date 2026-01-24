import { useState, useEffect, useRef } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { getLogs } from '../../services/api.js';

const POLL_INTERVAL_MS = 2000;

export default function AdminLogsModal({ open, onClose }) {
  const [logs, setLogs] = useState([]);
  const [error, setError] = useState(null);
  const scrollRef = useRef(null);
  const hasScrolledInitialRef = useRef(false);

  useEffect(() => {
    if (!open) {
      hasScrolledInitialRef.current = false;
      return;
    }

    const fetchLogs = async () => {
      try {
        const { logs: data } = await getLogs();
        setLogs(data || []);
        setError(null);
      } catch (err) {
        setError(err.message || 'Failed to load logs');
      }
    };

    fetchLogs();
    const interval = setInterval(fetchLogs, POLL_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [open]);

  useEffect(() => {
    if (!scrollRef.current || logs.length === 0 || hasScrolledInitialRef.current) return;
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    hasScrolledInitialRef.current = true;
  }, [logs]);

  const getLevelColor = (level, text) => {
    if (text && text.includes('[Recovery]')) return '#d32f2f';
    if (level === 'error') return '#d32f2f';
    if (level === 'warn') return '#ed6c02';
    return '#ffffff';
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle>
        <Typography variant="h6" sx={{ fontWeight: 600, color: '#111718' }}>
          Admin logs
        </Typography>
      </DialogTitle>
      <DialogContent>
        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}
        <Box
          ref={scrollRef}
          sx={{
            fontFamily: 'monospace',
            fontSize: '0.8rem',
            bgcolor: '#1e1e1e',
            color: '#d4d4d4',
            p: 2,
            borderRadius: 1,
            maxHeight: 60 * 8,
            overflow: 'auto',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word'
          }}
        >
          {logs.length === 0 && !error && (
            <Typography variant="body2" sx={{ color: '#888' }}>
              No logs yet. Backend output will appear here.
            </Typography>
          )}
          {logs.map((entry, i) => (
            <Box
              key={i}
              component="span"
              sx={{
                display: 'block',
                color: getLevelColor(entry.level, entry.text),
                mb: 0.25
              }}
            >
              [{entry.ts}] {entry.level}: {entry.text}
            </Box>
          ))}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} sx={{ color: '#66898F' }}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
