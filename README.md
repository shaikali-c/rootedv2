# Encrypted Notes Web App 🔒

A secure, privacy-focused notes application built with Next.js, Supabase, and client-side cryptography. All notes are encrypted before storage, ensuring only you can read them, not even the server.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-16-black)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen)

## Features

- **End-to-end encryption** for all notes
- **User authentication** via Supabase Auth
- **Secure cloud storage** with Supabase database
- **Fast UI** powered by Next.js (App Router / SSR ready)
- **Encryption keys** derived from user credentials
- **Responsive design** for desktop and mobile
- **Zero-knowledge architecture** (server never sees plaintext)

## Tech Stack

- **Frontend:** Next.js, React, TypeScript
- **Backend:** Supabase (Postgres, Storage)
- **Security:** Web Crypto API / crypto libraries
- **Hosting:** Vercel / Node environment

## Security Model

- Notes are encrypted in the browser before upload
- Supabase stores only encrypted data
- Decryption happens locally after login
- Encryption keys never leave the client
- Even database admins cannot read user notes


### Star this repo if you find it useful!