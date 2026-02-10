# Setup Instructions - OptiCloud Frontend

## Step 1: API URL Setup

1. Create a `.env` file in the `opticloud_front` directory (if you haven't already)
2. Add:

```env
VITE_API_URL=http://localhost:3001/api
```

## Step 2: Install Dependencies

```bash
cd OptiCloud-Client/opticloud_front
npm install
```

## Step 3: Run Frontend

```bash
npm run dev
```

The Frontend will run on: `http://localhost:5173` (or another port that Vite chooses)

## Production Build

```bash
npm run build
```

The files will be built in the `dist/` directory
