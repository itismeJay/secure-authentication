# Secure Registration and Login System

## 1. Hashing Algorithm Used

This project uses PBKDF2 with SHA-256 to hash passwords before storing them in the database. The implementation uses 310,000 iterations and creates a 32-byte derived key. Plain text passwords are never stored.

Source file: `lib/password-security.ts`

## 2. How Salt Works

During registration, the system generates a unique random salt for each user. The salt is stored in the database with the username and password hash. Even if two users choose the same password, their stored hashes will be different because their salts are different.

Database columns:
- `username`
- `password_hash`
- `salt`

## 3. How Pepper Works

The pepper is a secret value stored in the environment variable `PASSWORD_PEPPER`. It is combined with the password and salt during hashing, but it is not stored in the database. This adds protection because an attacker who only gets the database does not have the pepper.

The pepper must not appear in the database screenshot.

## 4. Password Meter Validation

The password meter checks these requirements:
- At least one lowercase letter
- At least one uppercase letter
- At least one number
- At least one special character
- At least 12 characters

The meter displays:
- Weak
- Medium
- Strong

Registration is allowed only when the password is strong.

Source file: `lib/password-strength.ts`

## 5. Why Strong Passwords Are Important

Strong passwords are important because weak passwords are easier to guess or crack using dictionary attacks, brute-force attacks, or leaked password lists. Requiring length, uppercase letters, lowercase letters, digits, and symbols increases password complexity and makes attacks more difficult.

## 6. Hosted Online System

Public URL:

Add your hosted link here after deployment.

## 7. Screenshots To Include

Add screenshots for:
- Registration form
- Password meter
- Successful registration
- Successful login
- Failed login attempt
- Neon database table showing `username`, `password_hash`, and `salt`

Do not show any pepper value in the database screenshot.
