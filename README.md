# RideCompare

RideCompare is a two-in-one comparison web app. It helps users compare ride options and e-commerce product options from one place before opening the original provider app or website.

## Main Modules

### Ride Compare

Users can compare estimated ride options from:

- Rapido
- Ola
- Uber
- Namma Yatri
- inDrive

Ride features:

- Login and signup
- Pickup and destination input
- Hyderabad-focused location suggestions
- Current location pickup button
- Transport type filter: All, Bike, Auto, Car
- Estimated fare range
- Pickup time and trip time
- Cheapest ride highlight
- Open original provider website/app

### E-commerce Compare

Users can compare product options from:

- Amazon
- Flipkart
- Meesho

E-commerce features:

- Search product by name
- Upload product photo
- Photo upload sets detected shopping keywords
- Editable detected keywords
- Size selector: Any, Small, Medium, Large, XL, XXL
- Cheapest product highlight
- Best quality/rating highlight
- Open product search on the original marketplace

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
│       ├── ecommerce.js
│       ├── index.js
│       └── rides.js
├── package.json
├── PROJECT_SPEC.md
└── README.md
```

## How To Run Locally

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

If MySQL is not connected, the backend uses demo memory storage for auth during the current server session.

## API Routes

```text
GET  /api/health
POST /api/auth/register
POST /api/auth/login
POST /api/rides/compare
POST /api/ecommerce/compare
```

## Current Limitations

Ride prices are estimates. Exact live Rapido, Ola, Uber, Namma Yatri, or inDrive prices require official APIs or approved partner integrations.

E-commerce prices, ratings, and quality scores are estimates. Exact live Amazon, Flipkart, and Meesho prices require official marketplace APIs or approved integrations.

Photo upload currently uses keyword-based detection. True visual matching like Google Lens requires an AI vision model or marketplace image-search API.

## Deployment Notes

Recommended deployment:

- Frontend: Vercel
- Backend: Render or Railway
- Database: hosted MySQL

When deploying, update the frontend API URL in:

```text
client/src/main.jsx
```

And add the deployed frontend URL to backend CORS in:

```text
server/src/index.js
```

## Future Improvements

- Real ride provider API integration
- Real Amazon/Flipkart/Meesho API integration
- Google Maps or Mapbox autocomplete
- Real route distance calculation
- AI vision model for product photo recognition
- Product category filters
- Coupons and offers
- Ride and product search history
- User profile page
- Admin dashboard
- React Native mobile app version

## Summary

RideCompare is a V1 prototype for comparing daily services in one place. It reduces the time users spend checking multiple apps manually and helps them choose cheaper rides and better shopping options faster.
