# Novocrypt

> An enterprise-grade Post-Quantum Cryptography (PQC) awareness and migration platform. Assess quantum risks, test NIST-approved algorithms, and future-proof your digital infrastructure before Q-Day.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-18-blue.svg)
![Node.js](https://img.shields.io/badge/Node.js-Express-green.svg)
![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL-blue.svg)

## Overview

Modern digital security relies heavily on RSA encryption, which will be rendered obsolete the moment sufficiently powerful quantum computers arrive (an event researchers call "Q-Day"). Adversaries are already employing "Harvest Now, Decrypt Later" (HNDL) attacks to store encrypted traffic today for future decryption.

**Novocrypt** is a comprehensive SaaS platform designed to:
1. Educate teams about the quantum threat.
2. Assess the cryptographic vulnerability of your infrastructure.
3. Provide a sandbox to test new NIST-approved algorithms (like CRYSTALS-Kyber).
4. Guide organizations in planning their Post-Quantum migration roadmap.

## Features

- **Risk Calculator:** Evaluate your organization's current vulnerability to quantum attacks.
- **Algorithm Lab:** Experiment with classical vs. post-quantum cryptography in a safe sandbox.
- **Q-Day Timeline:** Global countdown and progress tracking of quantum computing advancements.
- **Threat Feed:** Real-time updates on HNDL attacks and NIST compliance mandates.
- **Migration Planner:** Step-by-step tools to transition legacy systems to PQC standards.

## Tech Stack

- **Frontend:** React 18, TypeScript, Vite, Tailwind CSS, Framer Motion, Zustand
- **Backend:** Node.js, Express, TypeScript, Prisma, JWT Authentication
- **Database & Cache:** PostgreSQL, Redis (Dockerized)
- **Real-time:** Socket.io for live threat feeds

## Getting Started

### Prerequisites
- Node.js (v18+)
- Docker & Docker Compose (for DB and Redis)
- npm or pnpm

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/shlok926/novocrypt.git
   cd novocrypt
   ```

2. **Start Infrastructure (Database & Redis):**
   ```bash
   docker compose up -d postgres redis
   ```

3. **Setup Backend:**
   ```bash
   cd backend
   npm install
   # Copy .env.example to .env and configure your environment variables
   npm run prisma:migrate
   npm run dev
   ```

4. **Setup Frontend:**
   ```bash
   cd ../frontend
   npm install
   # Copy .env.example to .env if needed
   npm run dev
   ```

5. **Access the application:**
   Open your browser and navigate to `http://localhost:5173`.

## Documentation
Detailed product requirements and architecture documentation can be found in the `/docs` directory.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
