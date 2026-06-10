# RideCompare

RideCompare is a ride-hailing comparison web app that helps users compare estimated ride prices from platforms like Rapido, Uber, Ola, Namma Yatri, and inDrive before opening the original provider app for booking.

## Features

- Home page with Login and Signup
- User signup and login
- Pickup and destination input
- Location suggestions while typing
- Transport type filter: All, Bike, Auto, Car
- Top ride options sorted by cheapest estimated fare
- Estimated fare range display
- Pickup time and trip time display
- Booking handoff button to open the original provider website/app
- MySQL-ready backend with demo fallback mode

## Tech Stack

Frontend:

- React.js
- Vite
- CSS
- lucide-react icons

Backend:

- Node.js
- Express.js
- JWT authentication
- bcrypt password hashing

Database:

- MySQL
- mysql2

## Project Structure

```text
ride-compare-app
├── client
│   ├── index.html
│   ├── package.json
│   └── src
│       ├── main.jsx
│       └── styles.css
├── server
│   ├── package.json
│   ├── sql
│   │   └── schema.sql
│   └── src
│       ├── auth.js
│       ├── db.js
│       ├── index.js
│       └── rides.js
├── package.json
├── PROJECT_SPEC.md
└── README.md
```

## How To Run

Open PowerShell:

```powershell
cd C:\Users\dell\Desktop\ride-compare-app
npm run dev
```

Frontend:

```text
http://localhost:5173
```

Backend:

```text
http://localhost:5000
```

Health check:

```text
http://localhost:5000/api/health
```

## Install Dependencies

If dependencies are missing, run:

```powershell
cd C:\Users\dell\Desktop\ride-compare-app
npm run install:all
```

## MySQL Setup

Import this file into MySQL:

```text
C:\Users\dell\Desktop\ride-compare-app\server\sql\schema.sql
```

Create a `.env` file inside:

```text
C:\Users\dell\Desktop\ride-compare-app\server\.env
```

Example `.env`:

```env
PORT=5000
JWT_SECRET=change-this-secret
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=your_mysql_password
MYSQL_DATABASE=ride_compare
```

Then restart the app:

```powershell
npm run dev
```

## API Routes

```text
GET  /api/health
POST /api/auth/register
POST /api/auth/login
POST /api/rides/compare
```

## Current Limitation

The app currently shows estimated fare ranges, not exact live provider prices.

Exact prices require official APIs or approved partner integrations from ride providers like Rapido, Uber, Ola, and others.

## Future Improvements

- Real provider API integration
- Google Maps or Mapbox autocomplete
- Real route distance calculation
- Ride search history page
- User profile page
- Coupons and offers
- Fastest ride recommendation
- Admin dashboard
- React Native mobile app version

## Summary

RideCompare is a V1 prototype for comparing ride-hailing options in one place. It reduces the time users spend checking multiple apps manually and helps them choose a cheaper or better ride faster.
