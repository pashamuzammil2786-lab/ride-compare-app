import { query } from "./db.js";

const providers = [
  {
    name: "Rapido",
    modes: [
      {
        type: "Bike",
        base: 28,
        perKm: 6.4,
        pickup: 3,
        comfort: "Fast city commute",
        appUrl: "https://www.rapido.bike/"
      },
      {
        type: "Auto",
        base: 42,
        perKm: 11.2,
        pickup: 5,
        comfort: "Budget auto ride",
        appUrl: "https://www.rapido.bike/"
      }
    ]
  },
  {
    name: "Uber",
    modes: [
      {
        type: "Auto",
        base: 58,
        perKm: 14.5,
        pickup: 4,
        comfort: "Reliable auto",
        appUrl: "https://m.uber.com/ul/"
      },
      {
        type: "Go",
        base: 82,
        perKm: 19.5,
        pickup: 6,
        comfort: "Compact car",
        appUrl: "https://m.uber.com/ul/"
      },
      {
        type: "Premier",
        base: 115,
        perKm: 27,
        pickup: 8,
        comfort: "Premium car",
        appUrl: "https://m.uber.com/ul/"
      }
    ]
  },
  {
    name: "Ola",
    modes: [
      {
        type: "Bike",
        base: 30,
        perKm: 6.8,
        pickup: 4,
        comfort: "Low-cost bike",
        appUrl: "https://book.olacabs.com/"
      },
      {
        type: "Mini",
        base: 78,
        perKm: 18,
        pickup: 6,
        comfort: "Everyday cab",
        appUrl: "https://book.olacabs.com/"
      },
      {
        type: "Prime",
        base: 105,
        perKm: 25,
        pickup: 7,
        comfort: "Comfort cab",
        appUrl: "https://book.olacabs.com/"
      }
    ]
  },
  {
    name: "Namma Yatri",
    modes: [
      {
        type: "Auto",
        base: 45,
        perKm: 12,
        pickup: 5,
        comfort: "Driver-direct auto",
        appUrl: "https://www.nammayatri.in/"
      },
      {
        type: "Cab",
        base: 72,
        perKm: 17,
        pickup: 7,
        comfort: "Open mobility cab",
        appUrl: "https://www.nammayatri.in/"
      }
    ]
  },
  {
    name: "inDrive",
    modes: [
      {
        type: "City Ride",
        base: 68,
        perKm: 16,
        pickup: 8,
        comfort: "Negotiate fare",
        appUrl: "https://indrive.com/"
      }
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
  {
    keys: ["paramount hills", "hafiz baba nagar", "hafeez baba nagar", "gate no 1", "landmark super market"],
    lat: 17.3934,
    lon: 78.4099
  },
  {
    keys: ["toli chowki", "tolichowki", "nanal nagar"],
    lat: 17.3982,
    lon: 78.4138
  },
  {
    keys: ["mondee tech", "vittal rao nagar", "gafoornagar", "madhapur"],
    lat: 17.4436,
    lon: 78.3889
  },
  {
    keys: ["hitech city", "hitec city", "cyber towers"],
    lat: 17.4504,
    lon: 78.3808
  },
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
  { keys: ["financial district"], lat: 17.4149, lon: 78.3437 },
  { keys: ["miyapur"], lat: 17.4968, lon: 78.3489 },
  { keys: ["begumpet"], lat: 17.4374, lon: 78.4610 },
  { keys: ["lingampally"], lat: 17.4839, lon: 78.3149 },
  { keys: ["golconda fort"], lat: 17.3833, lon: 78.4011 },
  { keys: ["birla mandir"], lat: 17.4062, lon: 78.4690 },
  { keys: ["ntr gardens", "lumbini park"], lat: 17.4138, lon: 78.4735 },
  { keys: ["salar jung museum"], lat: 17.3713, lon: 78.4804 },
  { keys: ["nehru zoological park", "zoo park"], lat: 17.3502, lon: 78.4506 },
  { keys: ["inorbit mall"], lat: 17.4339, lon: 78.3830 },
  { keys: ["ikea"], lat: 17.4373, lon: 78.3742 },
  { keys: ["dlf cyber city"], lat: 17.4475, lon: 78.3562 }
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

function findArea(place) {
  const normalized = place.toLowerCase();
  
  // Coordinate parser (e.g. "17.3948, 78.4399")
  const coordRegex = /^(-?\d+\.\d+)\s*,\s*(-?\d+\.\d+)$/;
  const match = normalized.trim().match(coordRegex);
  if (match) {
    const lat = parseFloat(match[1]);
    const lon = parseFloat(match[2]);
    let closestArea = null;
    let minDistance = Infinity;
    for (const area of hyderabadAreas) {
      const dist = haversineKm({ lat, lon }, area);
      if (dist < minDistance) {
        minDistance = dist;
        closestArea = area;
      }
    }
    if (closestArea && minDistance < 100) {
      return closestArea;
    }
  }
  
  return hyderabadAreas.find((area) => area.keys.some((key) => normalized.includes(key)));
}

async function getOSRMRoute(pickupArea, destinationArea) {
  try {
    const url = `http://router.project-osrm.org/route/v1/driving/${pickupArea.lon},${pickupArea.lat};${destinationArea.lon},${destinationArea.lat}?overview=false`;
    const res = await fetch(url, {
      headers: { "User-Agent": "FareFinderApp/1.0" }
    });
    if (res.ok) {
      const data = await res.json();
      if (data.routes && data.routes.length > 0) {
        const route = data.routes[0];
        const distanceKm = Number((route.distance / 1000).toFixed(2));
        const durationMin = Number((route.duration / 60).toFixed(1));
        return { distanceKm, durationMin, success: true };
      }
    }
  } catch (err) {
    console.error("OSRM Route lookup failed:", err);
  }
  return { success: false };
}

function getTimeOfDayDetails() {
  const currentHour = new Date().getHours();
  let timeOfDay = "Off-Peak";
  let surgeMultiplier = 1.0;
  let trafficCondition = "Moderate Traffic";
  let trafficMultiplier = 1.05;

  if ((currentHour >= 8 && currentHour <= 11) || (currentHour >= 17 && currentHour <= 21)) {
    timeOfDay = "Peak Hours";
    surgeMultiplier = 1.35;
    trafficCondition = "Heavy Traffic";
    trafficMultiplier = 1.3;
  } else if (currentHour >= 23 || currentHour < 5) {
    timeOfDay = "Night Hours";
    surgeMultiplier = 1.25;
    trafficCondition = "Light Traffic";
    trafficMultiplier = 0.9;
  }

  return { timeOfDay, surgeMultiplier, trafficCondition, trafficMultiplier };
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

export async function estimateRides(pickup, destination, transportType = "all") {
  const pickupArea = findArea(pickup);
  const destinationArea = findArea(destination);
  
  let distanceKm = 0;
  let durationMin = 0;
  
  if (pickupArea && destinationArea) {
    const route = await getOSRMRoute(pickupArea, destinationArea);
    if (route.success) {
      distanceKm = route.distanceKm;
      durationMin = route.durationMin;
    } else {
      const directKm = haversineKm(pickupArea, destinationArea);
      distanceKm = Number(Math.max(1.5, directKm * 1.28).toFixed(1));
      durationMin = Number((distanceKm * 2.5 + 5).toFixed(1));
    }
  } else {
    const text = `${pickup}|${destination}`.toLowerCase();
    const score = Array.from(text).reduce((sum, char) => sum + char.charCodeAt(0), 0);
    distanceKm = Number(((score % 8) + 3 + (destination.length % 3) * 0.3).toFixed(1));
    durationMin = Number((distanceKm * 2.5 + 5).toFixed(1));
  }

  const { timeOfDay, surgeMultiplier, trafficCondition, trafficMultiplier } = getTimeOfDayDetails();
  const finalTripMinutes = Math.round(durationMin * trafficMultiplier);

  let options = providers
    .flatMap((provider) =>
      provider.modes
        .filter((mode) => matchesTransportType(mode.type, transportType))
        .map((mode) => {
          const platformFee = mode.type.toLowerCase().includes("bike") ? 5 : 12;
          const override = findRouteOverride(pickup, destination, provider.name, mode.type);
          
          const perMinuteRate = mode.type.toLowerCase().includes("bike") ? 1.0 : mode.type.toLowerCase().includes("auto") ? 1.5 : 2.5;
          const baseFare = mode.base + (mode.perKm * distanceKm) + (perMinuteRate * finalTripMinutes) + platformFee;
          const estimatedFare = override?.price ?? Math.round(baseFare * surgeMultiplier * (trafficCondition === "Heavy Traffic" ? 1.15 : 1.0));
          
          const minPrice = override?.minPrice ?? Math.max(25, Math.round(estimatedFare * 0.94));
          const maxPrice = override?.maxPrice ?? Math.round(estimatedFare * 1.08);

          let rating = 4.2;
          if (provider.name === "Uber") rating = 4.5;
          if (provider.name === "Ola") rating = 4.3;
          if (provider.name === "Rapido") rating = 4.2;
          if (provider.name === "Namma Yatri") rating = 4.4;
          if (provider.name === "inDrive") rating = 4.1;

          return {
            id: `${provider.name}-${mode.type}`.replace(/\s+/g, "-").toLowerCase(),
            provider: provider.name,
            mode: mode.type,
            price: estimatedFare,
            minPrice,
            maxPrice,
            pickupMinutes: mode.pickup + Math.floor(distanceKm % 4),
            tripMinutes: finalTripMinutes,
            comfort: mode.comfort,
            rating,
            distanceKm,
            bookUrl: buildDeepLink(mode.appUrl, pickup, destination)
          };
        })
    );

  if (options.length > 0) {
    const cheapestPrice = Math.min(...options.map((o) => o.price));
    const fastestTime = Math.min(...options.map((o) => o.pickupMinutes + o.tripMinutes));
    const bestRating = Math.max(...options.map((o) => o.rating));
    const bestValue = Math.max(...options.map((o) => o.rating / o.price));

    options = options.map((o) => ({
      ...o,
      isCheapest: o.price === cheapestPrice,
      isFastest: (o.pickupMinutes + o.tripMinutes) === fastestTime,
      isBestRated: o.rating === bestRating,
      isBestValue: (o.rating / o.price) === bestValue
    }));
  }

  options.sort((a, b) => a.price - b.price);
  const finalOptions = options.slice(0, 5);

  return {
    pickup,
    destination,
    transportType,
    distanceKm,
    tripMinutes: finalTripMinutes,
    trafficCondition,
    surgeMultiplier,
    timeOfDay,
    currency: "INR",
    best: finalOptions[0] || null,
    options: finalOptions
  };
}

export async function compareRides(req, res) {
  const { pickup, destination, transportType = "all" } = req.body;

  if (!pickup || !destination) {
    return res.status(400).json({ message: "Pickup and destination are required." });
  }

  try {
    const result = await estimateRides(pickup, destination, transportType);

    await query("INSERT INTO search_history (user_id, category, query_details) VALUES ($1, $2, $3)", [
      req.user?.id || null,
      "ride",
      JSON.stringify({ pickup, destination, transportType })
    ]);

    return res.json(result);
  } catch (error) {
    console.error("Failed to compare rides:", error);
    return res.status(500).json({ message: "Failed to estimate routes." });
  }
}

export async function getMyHistory(req, res) {
  try {
    const rows = await query(
      "SELECT * FROM search_history WHERE user_id = $1 ORDER BY created_at DESC LIMIT 15",
      [req.user.id]
    );
    return res.json({ history: rows });
  } catch (error) {
    console.error("Failed to fetch user history:", error);
    return res.status(500).json({ message: "Failed to fetch search history." });
  }
}

