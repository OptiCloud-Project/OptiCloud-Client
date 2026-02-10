# OptiCloud Frontend

OptiCloud is an intelligent cloud storage optimization system that automatically manages your files across different storage tiers (HOT, WARM, COLD) based on access patterns and usage. The frontend provides a user-friendly dashboard to upload, manage, and monitor your files and their migrations.

## Features

### File Management
- **Upload Files**: Upload files directly to the cloud storage system
- **View All Files**: See all your files in an organized table view
- **File Details**: View detailed information including:
  - File name, size, and hash
  - Current storage tier (HOT/WARM/COLD)
  - Upload and last access dates
  - Migration status and history

### Intelligent Migration System
- **Automatic Migrations**: Files are automatically migrated between tiers based on access patterns:
  - **HOT Tier**: Frequently accessed files (accessed within 7 days)
  - **WARM Tier**: Moderately accessed files (accessed 7-30 days ago)
  - **COLD Tier**: Rarely accessed files (not accessed in 30+ days)
- **Migration Tracking**: View real-time migration status (PROCESSING, VERIFYING, COMPLETED)
- **Migration History**: See all past migrations for each file
- **Progress Monitoring**: Watch migrations in progress with detailed progress bars

### Cost Management
- **Storage Cost Calculator**: Real-time cost display based on:
  - HOT storage: $5 per MB
  - WARM storage: $3 per MB
  - COLD storage: $1 per MB
  - Migration fees: $0.10 per migration
- **Cost Breakdown**: Click on storage cost to see detailed breakdown by tier and migration costs

### File Operations
- **Download**: Download any file directly from the cloud
- **Delete**: Remove files from the system
- **Manual Migration**: Force migration of a file between tiers
- **Recovery System**: Automatic file recovery with checksum verification

### Admin Tools
- **System Logs**: View real-time system logs for debugging and monitoring
- **Migration Statistics**: Track total migrations and system activity
- **Auto-refresh**: Data automatically refreshes every 5 seconds

## How to Use the Site

### 1. Upload a File
1. Click the "Select File" button
2. Choose a file from your computer
3. Click "Upload" to upload it to the cloud
4. The file will automatically be placed in the HOT tier

### 2. View Your Files
- All files are displayed in the main table
- The table shows:
  - **Name**: File name
  - **Size**: File size in MB
  - **Tier**: Current storage tier (color-coded)
  - **Migration Status**: Current migration state
  - **Last Access**: When the file was last accessed
  - **Uploaded**: When the file was uploaded

### 3. File Actions
Each file row has action buttons:
- **View Details** 👁️: Click on files with active migrations to see detailed progress
- **Download** : Download the file to your computer
- **Migrate** : Manually migrate the file to a different tier
- **Delete** : Remove the file from the system (requires confirmation)

### 4. Monitor Migrations
- Click on any file with "PROCESSING" or "VERIFYING" status
- A modal will open showing:
  - Overall migration progress
  - Detailed step-by-step progress (Upload, Download, Verify)
  - Migration history with timestamps

### 5. Check Storage Costs
- The current storage cost is displayed in the header
- Click on "Storage Cost: $X.XX" to see:
  - Cost breakdown by tier
  - Number of files in each tier
  - Total migration count
  - Migration fees
  - Total cost

### 6. View System Logs (Admin)
- Click the "Logs" button in the header
- View real-time system logs with:
  - Color-coded log levels (INFO, WARN, ERROR)
  - Special markers for recovery operations
  - Checksum verification logs
  - Auto-scrolling to latest logs

### 7. Simulate Usage (Testing)
- Click "Simulate 30 Days" to test the system
- This will simulate 30 days of file access patterns
- Files will be automatically migrated based on simulated access
- Perfect for testing the migration logic

## 🎨 Visual Indicators

### Storage Tiers
- **HOT** : Red/Orange - Frequently accessed files
- **WARM** : Yellow/Orange - Moderately accessed files
- **COLD** : Blue - Rarely accessed files

### Migration Status
- **COMPLETED** : Green - Migration finished successfully
- **PROCESSING** : Blue - Migration in progress
- **VERIFYING** : Purple - Verifying file integrity
- **FAILED** : Red - Migration failed

## Tech Stack

- **React 19** with Hooks
- **Vite** for fast development and building
- **Material-UI (MUI)** for modern UI components
- **Axios** for API communication
- **Styled Components** for custom styling

## Setup

See [SETUP.md](SETUP.md) for installation and running instructions.

## Troubleshooting

If you encounter the "504 Outdated Optimize Dep" error, see [FIX_CACHE.md](FIX_CACHE.md) for solutions.

## API Integration

The frontend connects to the OptiCloud backend API. Make sure the backend server is running on `http://localhost:3001` or update the `VITE_API_URL` in your `.env` file.
