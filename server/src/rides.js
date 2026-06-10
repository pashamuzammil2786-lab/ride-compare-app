import { query } from "./db.js";

const providers = [
  {
    name: "Rapido",
    modes: [
      { type: "Bike", base: 28, perKm: 6.4, pickup: 3, comfort: "Fast city commute", appUrl: "https://www.rapido.bike/" },
      { type: "Auto", base: 42, perKm: 11.2, pickup: 5, comfort: "Budget auto ride", appUrl: "https://www.rapido.bike/" }
    ]
  },
  {
    name: "Uber",
    modes: [
      { type: "Auto", base: 58, perKm: 14.5, pickup: 4, comfort: "Reliable auto", appUrl: "https://m.uber.com/ul/" },
      { type: "Go", base: 82, perKm: 19.5, pickup: 6, comfort: "Compact car", appUrl: "https://m.uber.com/ul/" },
      { type: "Premier", base: 115, perKm: 27, pickup: 8, comfort: "Premium car", appUrl: "https://m.uber.com/ul/" }
    ]
  },
  {
    name: "Ola",
    modes: [
      { type: "Bike", base: 30, perKm: 6.8, pickup: 4, comfort: "Low-cost bike", appUrl: "https://book.olacabs.com/" },
      { type: "Mini", base: 78, perKm: 18, pickup: 6, comfort: "Everyday cab", appUrl: "https://book.olacabs.com/" },
      { type: "Prime", base: 105, perKm: 25, pickup: 7, comfort: "Comfort cab", appUrl: "https://book.olacabs.com/" }
    ]
  },
  {
    name: "Namma Yatri",
    modes: [
      { type: "Auto", base: 45, perKm: 12, pickup: 5, comfort: "Driver-direct auto", appUrl: "https://www.nammayatri.in/" },
      { type: "Cab", base: 72, perKm: 17, pickup: 7, comfort: "Open mobility cab", appUrl: "https://www.nammayatri.in/" }
    ]
  },
  {
    name: "inDrive",
    modes: [
      { type: "City Ride", base: 68, perKm: 16, pickup: 8, comfort: "Negotiate fare", appUrl: "https://indrive.com/" }
    ]
  }
];

const modeGroups = {
  all: ["bike", "auto", "go", "mini", "prime", "premier", "cab", "city ride"],
  bike: ["bike"],
  auto: ["auto"],
  car: ["go", "mini", "prime", "premier", "cab", "city ride"]
};

const hyderabadAreas = [
  { keys: ["paramount hills", "hafiz baba nagar", "hafeez baba nagar", "gate no 1", "landmark super market"], lat: 17.3934, lon: 78.4099 },
  { keys: ["toli chowki", "tolichowki", "nanal nagar"], lat: 17.3982, lon: 78.4138 },
  { keys: ["mondee tech", "vittal rao nagar", "gafoornagar", "madhapur"], lat: 17.4436, lon: 78.3889 },
  { keys: ["hitech city", "hitec city", "cyber towers"], lat: 17.4504, lon: 78.3808 },
  { keys: ["gachibowli"], lat: 17.4401, lon: 78.3489 },
  { keys: ["mehdipatnam", "medhipatnam"], lat: 17.3948, lon: 78.4399 },
  { keys: ["banjara hills"], lat: 17.4126, lon: 78.4482 },
  { keys: ["jubilee hills"], lat: 17.4326, lon: 78.4071 },
  { keys: ["masab tank"], lat: 17.4031, lon: 78.4526 },
  { keys: ["attapur"], lat: 17.3687, lon: 78.4256 },
  { keys: ["langar houz", "langer house"], lat: 17.3824, lon: 78.4191 },
  { keys: ["kukatpally", "kphb"], lat: 17.4933, lon: 78.3996 },
  { keys: ["ameerpet"], lat: 17.4375, lon: 78.4483 },
  { keys: ["panjagutta", "punjagutta"], lat: 17.4262, lon: 78.4526 },
  { keys: ["secunderabad"], lat: 17.4399, lon: 78.4983 },
  { keys: ["charminar"], lat: 17.3616, lon: 78.4747 },
  { keys: ["airport", "rgia", "shamshabad"], lat: 17.2403, lon: 78.4294 },
  { keys: ["lb nagar"], lat: 17.3457, lon: 78.5522 },
  { keys: ["dilsukhnagar"], lat: 17.3688, lon: 78.5247 },
  { keys: ["uppal"], lat: 17.4058, lon: 78.5591 },
  { keys: ["kondapur"], lat: 17.4637, lon: 78.3647 },
  { keys: ["raidurg", "rayadurg"], lat: 17.4239, lon: 78.3775 },
  { keys: ["financial district"], lat: 17.4149, lon: 78.3437 }
];

const routeFareOverrides = [
  {
    pickup: ["paramount hills", "hafiz baba nagar", "hafeez baba nagar", "toli chowki"],
    destination: ["mondee tech", "vittal rao nagar", "madhapur", "gafoornagar"],
    modes: {
      "Rapido-Bike": { price: 82, minPrice: 78, maxPrice: 92 }
    }
  }
];

function findArea(place) {
  const normalized = place.toLowerCase();
  return hyderabadAreas.find((area) => area.keys.some((key) => normalized.includes(key)));
}

function degreesToRadians(value) {
  return (value * Math.PI) / 180;
}

function haversineKm(first, second) {
  const earthRadiusKm = 6371;
  const latDelta = degreesToRadians(second.lat - first.lat);
  const lonDelta = degreesToRadians(second.lon - first.lon);
  const a =
    Math.sin(latDelta / 2) * Math.sin(latDelta / 2) +
    Math.cos(degreesToRadians(first.lat)) *
      Math.cos(degreesToRadians(second.lat)) *
      Math.sin(lonDelta / 2) *
      Math.sin(lonDelta / 2);
  return earthRadiusKm * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function pseudoDistanceKm(pickup, destination) {
  const pickupArea = findArea(pickup);
  const destinationArea = findArea(destination);

  if (pickupArea && destinationArea) {
    const directKm = haversineKm(pickupArea, destinationArea);
    return Number(Math.max(1.5, directKm * 1.28).toFixed(1));
  }

  const text = `${pickup}|${destination}`.toLowerCase();
  const score = Array.from(text).reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return Number(((score % 8) + 3 + (destination.length % 3) * 0.3).toFixed(1));
}

function buildDeepLink(appUrl, pickup, destination) {
  const query = new URLSearchParams({ pickup, destination });
  return `${appUrl}${appUrl.includes("?") ? "&" : "?"}${query.toString()}`;
}

function matchesTransportType(mode, transportType = "all") {
  const normalizedMode = mode.toLowerCase();
  const allowedModes = modeGroups[transportType] || modeGroups.all;
  return allowedModes.some((allowedMode) => normalizedMode.includes(allowedMode));
}

function findRouteOverride(pickup, destination, provider, mode) {
  const normalizedPickup = pickup.toLowerCase();
  const normalizedDestination = destination.toLowerCase();
  const route = routeFareOverrides.find(
    (override) =>
      override.pickup.some((key) => normalizedPickup.includes(key)) &&
      override.destination.some((key) => normalizedDestination.includes(key))
  );

  return route?.modes?.[`${provider}-${mode}`] || null;
}

export function estimateRides(pickup, destination, transportType = "all") {
  const distanceKm = pseudoDistanceKm(pickup, destination);
  const trafficMultiplier = distanceKm > 12 ? 1.16 : distanceKm > 7 ? 1.08 : 1.02;

  const options = providers
    .flatMap((provider) =>
      provider.modes
        .filter((mode) => matchesTransportType(mode.type, transportType))
        .map((mode) => {
          const platformFee = mode.type.toLowerCase().includes("bike") ? 5 : 12;
          const override = findRouteOverride(pickup, destination, provider.name, mode.type);
          const estimatedFare = override?.price ?? Math.round((mode.base + mode.perKm * distanceKm + platformFee) * trafficMultiplier);
          const minPrice = override?.minPrice ?? Math.max(25, Math.round(estimatedFare * 0.94));
          const maxPrice = override?.maxPrice ?? Math.round(estimatedFare * 1.08);
          return {
            id: `${provider.name}-${mode.type}`.replace(/\s+/g, "-").toLowerCase(),
            provider: provider.name,
            mode: mode.type,
            price: estimatedFare,
            minPrice,
            maxPrice,
            pickupMinutes: mode.pickup + Math.floor(distanceKm % 4),
            tripMinutes: Math.round(distanceKm * 4.2 + 8),
            comfort: mode.comfort,
            distanceKm,
            bookUrl: buildDeepLink(mode.appUrl, pickup, destination)
          };
        })
    )
    .sort((a, b) => a.price - b.price)
    .slice(0, 5);

  return {
    pickup,
    destination,
    transportType,
    distanceKm,
    currency: "INR",
    best: options[0] || null,
    options
  };
}

export async function compareRides(req, res) {
  const { pickup, destination, transportType = "all" } = req.body;

  if (!pickup || !destination) {
    return res.status(400).json({ message: "Pickup and destination are required." });
  }

  const result = estimateRides(pickup, destination, transportType);

  try {
    await query(
      "INSERT INTO ride_searches (user_id, pickup, destination) VALUES (?, ?, ?)",
      [req.user?.id || null, pickup, destination]
    );
  } catch {
    // The app still works in demo mode when MySQL is not configured.
  }

  return res.json(result);
}
