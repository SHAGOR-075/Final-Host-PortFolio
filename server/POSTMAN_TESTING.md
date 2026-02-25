# Postman Testing Guide for Admin Registration

## Admin Registration Endpoint

### Endpoint Details
- **URL**: `http://localhost:5000/api/auth/register`
- **Method**: `POST`
- **Content-Type**: `application/json`

### Request Body
```json
{
  "email": "admin@portfolio.com",
  "password": "admin123"
}
```

### Success Response (201 Created)
```json
{
  "message": "Admin registered successfully",
  "admin": {
    "id": "507f1f77bcf86cd799439011",
    "email": "admin@portfolio.com",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### Error Responses

**400 Bad Request - Missing fields**
```json
{
  "error": "Email and password are required"
}
```

**400 Bad Request - Invalid email format**
```json
{
  "error": "Invalid email format"
}
```

**400 Bad Request - Weak password**
```json
{
  "error": "Password must be at least 6 characters long"
}
```

**409 Conflict - Email already exists**
```json
{
  "error": "Admin with this email already exists"
}
```

**500 Internal Server Error**
```json
{
  "error": "Failed to register admin"
}
```

## Example cURL Commands

### Register a new admin
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@portfolio.com","password":"admin123"}'
```

### Register with different email
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"newadmin@example.com","password":"securepassword123"}'
```

## Postman Collection Setup

1. Create a new POST request
2. Set URL to: `http://localhost:5000/api/auth/register`
3. Go to Headers tab and add:
   - Key: `Content-Type`
   - Value: `application/json`
4. Go to Body tab, select "raw" and "JSON"
5. Paste the JSON body:
```json
{
  "email": "admin@portfolio.com",
  "password": "admin123"
}
```
6. Click Send

## Validation Rules

- **Email**: Must be a valid email format
- **Password**: Must be at least 6 characters long
- **Email uniqueness**: Each email can only be registered once

## Notes

- This endpoint is only available on the server and not exposed in the client or admin frontend
- Use this endpoint for testing and creating admin accounts via API
- Passwords are automatically hashed using bcrypt before storage
- Email is stored in lowercase for consistency

