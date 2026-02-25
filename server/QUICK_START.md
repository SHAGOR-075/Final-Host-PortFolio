# Quick Start Guide

## Starting the Server

Use one of these commands:

```bash
npm run dev    # Development mode with auto-reload (recommended)
npm start      # Production mode
```

**Do NOT use:** `nodemon start` (this is incorrect)

## After Installing New Packages

If you add new dependencies to `package.json`, always run:
```bash
npm install
```

This installs all dependencies including the new ones.

## Current Status

✅ Nodemailer is installed and ready to use
✅ All dependencies are up to date

## Next Steps

1. Configure Gmail in `.env` (see `GMAIL_SETUP.md`)
2. Start the server: `npm run dev`
3. Test the contact form on your website

