# RideCompare Project Specification

## Project Name

RideCompare

## Project Idea

RideCompare is a ride-hailing comparison web application. The goal is to reduce the time users spend opening multiple ride apps like Rapido, Uber, Ola, Namma Yatri, and inDrive to compare prices manually.

The user enters a pickup location, destination, and preferred transport type. The app compares estimated ride options and shows the cheapest or most suitable ride. When the user clicks the booking button, the original provider website/app is opened so the user can complete the booking there.

## Problem Statement

Users often need to open many ride-hailing apps separately to check which one is cheaper or faster. This wastes time and makes price comparison difficult.

RideCompare solves this by showing multiple ride options in one place.

## Target Users

- Students
- Office commuters
- Daily travelers
- Budget-conscious users
- Users who compare prices before booking rides

## Main Features

### 1. Home Page

The website starts with a home page that introduces the app and provides Login and Signup buttons.

### 2. User Authentication

Users can create an account or log in using email and password.

Current behavior:

- If MySQL is connected, user data is stored in MySQL.
- If MySQL is not connected, the app uses demo memory storage.

### 3. Pickup and Destination Input

Users can enter:

- Pickup location
- Destination location

The app also provides location suggestions while typing.

Example:

If the user types `med`, the app can suggest:

- Mehdipatnam, Hyderabad
- Mehdipatnam Bus Stop, Hyderabad
- Mehdipatnam Rythu Bazaar, Hyderabad

### 4. Transport Type Selection

Users can select the type of ride they want:

- All
- Bike
- Auto
- Car

If the user selects Auto, only auto ride options are shown.

### 5. Ride Comparison Results

The app shows the top ride options with:

- Provider name
- Ride type
- Estimated fare range
- Pickup time
- Trip time
- Cheapest ride badge
- Open provider button

### 6. Booking Handoff

When the user clicks `Open Rapido`, `Open Uber`, or another provider, the provider website/app opens. The user completes the final booking on the original provider platform.

## Tech Stack

### Frontend

- React.js
- Vite
- CSS
- lucide-react icons

### Backend

- Node.js
- Express.js
- JSON Web Token authentication
- bcrypt password hashing

### Database

- MySQL
- mysql2 package

## Project Folder Structure

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
└── PROJECT_SPEC.md
```

## Frontend Explanation

Main frontend file:

```text
client/src/main.jsx
```

This file controls:

- Home page
- Login page
- Signup page
- Ride search form
- Transport type buttons
- Place suggestions
- Ride result cards

Main styling file:

```text
client/src/styles.css
```

This file controls the layout, colors, buttons, cards, home page, auth page, and ride results design.

## Backend Explanation

Main backend file:

```text
server/src/index.js
```

This starts the Express server and defines API routes.

API routes:

```text
GET  /api/health
POST /api/auth/register
POST /api/auth/login
POST /api/rides/compare
```

Authentication file:

```text
server/src/auth.js
```

This handles:

- Signup
- Login
- Password hashing
- JWT token creation
- Protected route checking

Ride comparison file:

```text
server/src/rides.js
```

This handles:

- Provider data
- Ride modes
- Fare estimate calculation
- Transport type filtering
- Cheapest ride sorting
- Booking link generation

Database file:

```text
server/src/db.js
```

This connects the backend to MySQL.

## MySQL Database

Schema file:

```text
server/sql/schema.sql
```

It creates the database:

```sql
ride_compare
```

Tables:

```text
users
ride_searches
```

### users Table

Stores user account data:

- id
- name
- email
- password_hash
- created_at

### ride_searches Table

Stores user search history:

- id
- user_id
- pickup
- destination
- selected_provider
- selected_mode
- created_at

## Current Fare Calculation

The current version does not use live Rapido, Uber, Ola, or Namma Yatri APIs.

Instead, it uses estimated pricing based on:

- Base fare
- Per kilometer fare
- Estimated distance
- Traffic multiplier
- Platform fee

The frontend shows a fare range, for example:

```text
Rs 200 - Rs 243
```

This is more realistic than showing one exact price.

## Current Limitation

The app does not show exact live provider prices yet.

Reason:

Ride-hailing companies usually do not provide open public APIs for live price comparison. To show exact prices legally and reliably, the project needs:

- Official provider APIs
- Partner integrations
- Approved affiliate/deep-link access

## Future Improvements

- Connect real ride provider APIs
- Add Google Maps or Mapbox location autocomplete
- Add real route distance calculation
- Store complete ride search history
- Add coupons and offers
- Add fastest ride recommendation
- Add user profile page
- Add admin dashboard
- Add mobile app version using React Native
- Add payment or affiliate tracking if provider partnerships are available

## How To Run The Project

Open PowerShell and run:

```powershell
cd C:\Users\dell\Desktop\ride-compare-app
npm run dev
```

Then open:

```text
http://localhost:5173
```

Backend runs on:

```text
http://localhost:5000
```

## How To Connect MySQL

Create this file:

```text
server/.env
```

Example:

```env
PORT=5000
JWT_SECRET=change-this-secret
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=your_mysql_password
MYSQL_DATABASE=ride_compare
```

Import this SQL file into MySQL:

```text
server/sql/schema.sql
```

Then restart the app.

## Final Summary

RideCompare is a V1 ride comparison platform. It helps users compare ride options by price, transport type, and pickup time before opening the original ride provider app for booking.

The current version is a strong prototype with authentication, route input, transport filtering, location suggestions, estimated fare ranges, and booking handoff links.
