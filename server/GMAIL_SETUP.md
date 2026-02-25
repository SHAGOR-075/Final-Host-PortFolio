# Gmail SMTP Setup Guide

To receive contact form emails in your Gmail inbox, you need to configure Gmail App Password.

## Steps to Set Up Gmail App Password

### 1. Enable 2-Step Verification
1. Go to your Google Account: https://myaccount.google.com/
2. Click on **Security** in the left sidebar
3. Under "Signing in to Google", click **2-Step Verification**
4. Follow the prompts to enable 2-Step Verification (if not already enabled)

### 2. Generate App Password
1. Go back to **Security** settings
2. Under "Signing in to Google", click **App passwords**
3. You may need to sign in again
4. Select **Mail** as the app
5. Select **Other (Custom name)** as the device
6. Enter "Portfolio Server" as the name
7. Click **Generate**
8. **Copy the 16-character password** (you'll need this for the .env file)

### 3. Update .env File

Add these variables to your `server/.env` file:

```env
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=your-16-character-app-password
RECIPIENT_EMAIL=your-email@gmail.com
```

**Important Notes:**
- `GMAIL_USER`: Your Gmail address (e.g., `yourname@gmail.com`)
- `GMAIL_APP_PASSWORD`: The 16-character app password you generated (no spaces)
- `RECIPIENT_EMAIL`: The email where you want to receive contact form messages (usually the same as GMAIL_USER)

### 4. Example .env Configuration

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/portfolio_dashboard
JWT_SECRET=your-secret-key-change-in-production
NODE_ENV=development
CLIENT_URL=http://localhost:5173
ADMIN_URL=http://localhost:5174

# Gmail Configuration
GMAIL_USER=yourname@gmail.com
GMAIL_APP_PASSWORD=abcd efgh ijkl mnop
RECIPIENT_EMAIL=yourname@gmail.com
```

**Note:** Remove spaces from the app password when adding to .env (it should be: `abcdefghijklmnop`)

### 5. Restart Server

After updating the .env file, restart your server:
```bash
npm run dev
```

## Testing

1. Fill out the contact form on your website
2. Submit the form
3. Check your Gmail inbox for the message
4. The email will have:
   - Subject: "Portfolio Contact: [Subject]"
   - Reply-To: The sender's email (so you can reply directly)

## Troubleshooting

### Error: "Invalid login" or "EAUTH"
- Make sure you're using an **App Password**, not your regular Gmail password
- Verify the app password has no spaces in the .env file
- Check that 2-Step Verification is enabled

### Error: "EENVELOPE"
- Verify GMAIL_USER is a valid Gmail address
- Check that RECIPIENT_EMAIL is set correctly

### Not receiving emails
- Check your spam folder
- Verify the RECIPIENT_EMAIL is correct
- Check server logs for error messages
- Make sure the server is running and connected to MongoDB

## Security Notes

- **Never commit your .env file to git** (it's already in .gitignore)
- **Never share your App Password** publicly
- App Passwords are safer than using your regular password
- You can revoke App Passwords anytime from Google Account settings

