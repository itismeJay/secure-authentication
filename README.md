# Secure Registration and Login System

![ChatGPT Image Jun 9, 2025, 07_09_10 PM](https://github.com/user-attachments/assets/660133ca-5463-4c77-9ece-37280caa229c)


## Overview

Cybersecurity final project for a secure registration and login system. It demonstrates password strength validation, hashing, salt, and pepper using Next.js, Drizzle, and Neon Postgres.


Short Documentation
1. Hashing Algorithm Used
The system uses PBKDF2 with SHA-256 to hash passwords. The password is not stored as plain text. Instead, the system generates a secure hash before saving it to the database.

2. How Salt Works
A unique random salt is generated for every registered user. The salt is combined with the password before hashing. This makes identical passwords produce different hashes in the database.

3. How Pepper Works
A pepper is a secret value stored in the environment variables. It is combined with the password and salt before hashing, but it is not stored in the database. This adds extra protection if the database is exposed.

4. Password Meter Validation
The password meter checks if the password has at least one lowercase letter, one uppercase letter, one number, one symbol, and a minimum of 12 characters. It displays the password strength as Weak, Medium, or Strong.

5. Why Strong Passwords Are Important
Strong passwords help protect accounts from guessing, brute-force attacks, and dictionary attacks. Longer and more complex passwords are harder for attackers to crack.

6. Screenshot of Hosted System
Insert screenshot of the hosted registration/login system here.

7. Public URL
Hosted website link: [Insert public URL here]

## Getting Started

### Installation

To begin, install the required dependencies using the following command:

```bash
pnpm i
```

### Configuration

Create a copy of the provided `env.example` file and name it `.env`. Use database credentials from a database account that you own:

`cp env.example .env`

```bash
BETTER_AUTH_SECRET="your-better-auth-secret"
BETTER_AUTH_URL="http://localhost:3000"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
PASSWORD_PEPPER="your-secret-password-pepper-do-not-store-in-db"

DATABASE_URL="postgresql://USER:PASSWORD@HOST/DB?sslmode=require"

GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

For a school project, the easiest owned database setup is to create your own Neon Postgres project, copy its connection string, and paste it into `DATABASE_URL` in `.env`. Then create the tables with:

```bash
pnpm db:push
```

Make sure to replace placeholder values with your actual keys, and keep `.env` private.

## Cybersecurity Features

- Registration module with username, password, and confirm password
- Login module with username and password
- Password strength meter with Weak, Medium, and Strong states
- Minimum 12-character password requirement
- Uppercase, lowercase, digit, and symbol validation
- Unique random salt per user
- Environment-only pepper
- PBKDF2-SHA256 password hashing
- Database stores `username`, `password_hash`, and `salt`
- Plain text passwords are not stored

The assignment documentation draft is in `documentation.md`.

# Development Server

After installing the dependencies, and adding configuration variables run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.




