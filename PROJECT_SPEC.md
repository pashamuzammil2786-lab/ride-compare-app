# RideCompare Project Specification

## Project Name

RideCompare

## Project Idea

RideCompare is a two-in-one comparison platform. It helps users compare ride-hailing options and e-commerce product options before opening the original app or website.

The app has two main modules after login:

1. Ride Compare
2. E-commerce Compare

## Problem Statement

Users often open many apps to compare prices manually.

For rides, users open Rapido, Ola, Uber, and other apps to check the cheapest or fastest ride.

For shopping, users open Amazon, Flipkart, and Meesho to compare product price, rating, and availability.

RideCompare reduces this manual work by showing comparison results in one interface.

## Target Users

- Students
- Office commuters
- Daily travelers
- Budget-conscious shoppers
- Users who compare prices before booking rides or buying products

## User Flow

1. User opens the website.
2. User logs in or signs up.
3. User sees two options:
   - Ride Compare
   - E-commerce
4. User selects a module.
5. App shows comparison results.
6. User opens the original provider app or marketplace to complete booking or purchase.

## Main Features

### 1. Home Page

The public home page introduces the app as a ride and shopping comparison platform. It includes Login and Signup buttons.

### 2. User Authentication

Users can create an account or log in using email and password.

Current behavior:

- If MySQL is connected, user data is stored in MySQL.
- If MySQL is not connected, the app uses demo memory storage.

### 3. Module Menu

After login, users choose:

- Ride Compare
- E-commerce

### 4. Ride Compare

Users can enter:

- Pickup location
- Destination location
- Ride type

Ride type options:

- All
- Bike
- Auto
- Car

Ride results show:

- Provider name
- Ride type
- Estimated fare range
- Pickup time
- Trip time
- Cheapest ride badge
- Open provider button

The app supports Hyderabad-focused location suggestions and a current-location pickup button.

### 5. E-commerce Compare

Users can search products by:

- Product name
- Uploaded product photo

Users can choose size:

- Any
- Small
- Medium
- Large
- XL
- XXL

E-commerce results show:

- Marketplace name
- Estimated product price
- Rating
- Review count
- Quality score
- Cheapest product badge
- Best quality marketplace
- Open marketplace button

Supported marketplaces:

- Amazon
- Flipkart
- Meesho

### 6. Photo Upload Search

Photo upload currently uses keyword-based detection. For example, a striped polo/t-shirt photo is converted into a shopping query like:

```text
men navy blue white brown striped polo t shirt
```

The user can edit the detected keywords before comparing.

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
│       ├── ecommerce.js
│       ├── index.js
│       └── rides.js
├── package.json
├── PROJECT_SPEC.md
└── README.md
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
- Logged-in module menu
- Ride search form
- E-commerce search form
- Photo upload preview
- Size selection
- Ride result cards
- Product result cards

Main styling file:

```text
client/src/styles.css
```

This file controls the layout, colors, buttons, forms, cards, home page, auth page, ride results, and product results.

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
POST /api/ecommerce/compare
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

- Ride provider data
- Ride modes
- Hyderabad area matching
- Fare estimate calculation
- Transport type filtering
- Cheapest ride sorting
- Booking link generation

E-commerce comparison file:

```text
server/src/ecommerce.js
```

This handles:

- Marketplace data
- Product query normalization
- Photo keyword fallback
- Product price estimate calculation
- Rating and quality score estimate
- Marketplace search link generation

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

Stores user ride search data:

- id
- user_id
- pickup
- destination
- selected_provider
- selected_mode
- created_at

## Current Ride Fare Calculation

The current version does not use live Rapido, Uber, Ola, Namma Yatri, or inDrive APIs.

Instead, it uses estimated pricing based on:

- Base fare
- Per kilometer fare
- Estimated distance
- Traffic multiplier
- Platform fee
- Hyderabad route overrides for specific known routes

The frontend shows a fare range, for example:

```text
Rs 78 - Rs 92
```

## Current Product Price Calculation

The current version does not use live Amazon, Flipkart, or Meesho APIs.

Instead, it uses estimated pricing based on:

- Product category
- Marketplace price factors
- Estimated rating
- Estimated review count
- Quality score

For example, searching `shoes` can return lower realistic estimate ranges such as:

```text
Meesho: Rs 507
Flipkart: Rs 624
Amazon: Rs 819
```

## Current Limitations

The app does not show exact live provider prices yet.

Reason:

Ride-hailing companies and marketplaces usually do not provide open public APIs for direct price comparison. To show exact prices legally and reliably, the project needs:

- Official provider APIs
- Partner integrations
- Approved affiliate/deep-link access
- Marketplace APIs
- AI vision model or image-search API for accurate product photo matching

## Future Improvements

- Connect real ride provider APIs
- Connect real marketplace APIs
- Add Google Maps or Mapbox location autocomplete
- Add real route distance calculation
- Add AI vision model for product photo recognition
- Store complete ride and product search history
- Add coupons and offers
- Add fastest ride recommendation
- Add product category filters
- Add user profile page
- Add admin dashboard
- Add mobile app version using React Native
- Add payment or affiliate tracking if partnerships are available

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

## Deployment Recommendation

Recommended production setup:

- Frontend on Vercel
- Backend on Render or Railway
- Database on hosted MySQL

The frontend API URL must point to the deployed backend, and the backend CORS settings must allow the deployed frontend domain.

## Final Summary

RideCompare is a V1 comparison platform for rides and online shopping. It helps users compare ride fares, product prices, ratings, and quality estimates before opening the original app or website.
