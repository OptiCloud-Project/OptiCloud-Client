# 🔧 Fix for 504 Error - Outdated Optimize Dep

## The Problem:
Vite cannot load MUI dependencies due to an optimization cache issue.

## The Solution:

### Step 1: Stop the Server
Press `Ctrl+C` in the terminal where the Frontend is running

### Step 2: Delete Vite's Cache

**Windows (PowerShell/CMD):**
```bash
cd OptiCloud-Client/opticloud_front
rmdir /s /q node_modules\.vite
```

**Or Windows (PowerShell):**
```powershell
cd OptiCloud-Client/opticloud_front
Remove-Item -Recurse -Force node_modules\.vite
```

**Mac/Linux:**
```bash
cd OptiCloud-Client/opticloud_front
rm -rf node_modules/.vite
```

### Step 3: Restart with --force

```bash
npm run dev
```

Or:

```bash
npx vite --force
```

### Step 4: If Still Not Working

Try deleting all node_modules and reinstalling:

```bash
# Stop the server (Ctrl+C)

# Delete node_modules
rmdir /s /q node_modules  # Windows
# or
rm -rf node_modules      # Mac/Linux

# Delete package-lock.json
del package-lock.json    # Windows
# or
rm package-lock.json     # Mac/Linux

# Reinstall
npm install

# Run
npm run dev
```

---

## What I Changed in the Code:

1. ✅ Added `optimizeDeps.force: true` to vite.config.js
2. ✅ Added `--force` to the dev script
3. ✅ Added explicit include for MUI dependencies

Now try running it again!
