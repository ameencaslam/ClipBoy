# Installing Node.js on Windows

## Option 1: Direct Download (Easiest)

1. Visit: https://nodejs.org/
2. Download the **LTS version** (Long Term Support)
3. Run the installer (.msi file)
4. Follow the installation wizard (default options are fine)
5. **Restart PowerShell** after installation
6. Verify installation:
   ```powershell
   node --version
   npm --version
   ```

## Option 2: Using winget (Windows Package Manager)

If you have Windows 10/11 with winget installed:

```powershell
winget install OpenJS.NodeJS.LTS
```

## Option 3: Using Chocolatey (if you have it)

```powershell
choco install nodejs-lts
```

## After Installation

1. Close and reopen PowerShell
2. Navigate to your project:
   ```powershell
   cd C:\ClipBoy
   ```
3. Install dependencies:
   ```powershell
   npm install
   ```
4. Run the app:
   ```powershell
   npm start
   ```

## Verify Installation

After installing, verify with:

```powershell
node --version
npm --version
```

You should see version numbers (e.g., v18.x.x or v20.x.x for Node, 9.x.x or 10.x.x for npm).
