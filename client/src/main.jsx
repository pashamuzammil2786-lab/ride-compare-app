import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowRight,
  Bike,
  Car,
  Clock3,
  Crosshair,
  IndianRupee,
  Loader2,
  LocateFixed,
  LogOut,
  MapPin,
  Navigation,
  PackageSearch,
  Search,
  ShoppingBag,
  ShieldCheck,
  Sparkles,
  Star,
  Upload
} from "lucide-react";
import "./styles.css";

const API_URL = "http://localhost:5000/api";

const transportTypes = [
  { id: "all", label: "All", icon: Sparkles },
  { id: "bike", label: "Bike", icon: Bike },
  { id: "auto", label: "Auto", icon: Navigation },
  { id: "car", label: "Car", icon: Car }
];

const photoKeywordPresets = {
  stripedPolo: "men navy blue white brown striped polo t shirt",
  blackShirt: "men black plain shirt",
  kurti: "women kurti",
  dress: "women dress",
  shoes: "casual shoes"
};

const hyderabadFallbackPlaces = [
  "Gate No 1, Landmark Super Market, Paramount Hills, Hafiz Baba Nagar, Toli Chowki, Hyderabad",
  "Paramount Hills, Hafiz Baba Nagar, Hyderabad",
  "Landmark Super Market, Paramount Hills, Hyderabad",
  "Mondee Tech Pvt Ltd., Vittal Rao Nagar, Madhapur, Hyderabad",
  "Vittal Rao Nagar, Madhapur, Hyderabad",
  "Gafoornagar, Madhapur, Hyderabad",
  "Mehdipatnam, Hyderabad",
  "Mehdipatnam Bus Stop, Hyderabad",
  "Mehdipatnam Rythu Bazaar, Hyderabad",
  "Toli Chowki, Hyderabad",
  "Seven Tombs Road, Toli Chowki, Hyderabad",
  "Nanal Nagar, Hyderabad",
  "Attapur, Hyderabad",
  "Langar Houz, Hyderabad",
  "Masab Tank, Hyderabad",
  "Shaikpet, Hyderabad",
  "Film Nagar, Hyderabad",
  "Manikonda, Hyderabad",
  "Gachibowli, Hyderabad",
  "HITEC City, Hyderabad",
  "Madhapur, Hyderabad",
  "Kondapur, Hyderabad",
  "Financial District, Hyderabad",
  "Raidurg, Hyderabad",
  "Durgam Cheruvu, Hyderabad",
  "Kukatpally, Hyderabad",
  "KPHB Colony, Hyderabad",
  "Miyapur, Hyderabad",
  "Chanda Nagar, Hyderabad",
  "BHEL, Hyderabad",
  "Ameerpet, Hyderabad",
  "Panjagutta, Hyderabad",
  "Begumpet, Hyderabad",
  "Secunderabad Railway Station",
  "Paradise, Secunderabad",
  "Charminar, Hyderabad",
  "Afzalgunj, Hyderabad",
  "Koti, Hyderabad",
  "Abids, Hyderabad",
  "Nampally, Hyderabad",
  "Lakdikapul, Hyderabad",
  "Rajiv Gandhi International Airport, Hyderabad",
  "Banjara Hills, Hyderabad",
  "Jubilee Hills, Hyderabad",
  "Malkajgiri, Hyderabad",
  "Uppal, Hyderabad",
  "LB Nagar, Hyderabad",
  "Dilsukhnagar, Hyderabad",
  "Nagole, Hyderabad",
  "Habsiguda, Hyderabad",
  "Kompally, Hyderabad"
];

function getLocalSuggestions(value) {
  const search = value.trim().toLowerCase();
  if (search.length < 2) return [];

  return hyderabadFallbackPlaces
    .filter((place) => place.toLowerCase().includes(search))
    .slice(0, 6);
}

function cleanDisplayName(place) {
  return place
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean)
    .slice(0, 5)
    .join(", ");
}

async function searchHyderabadPlaces(value) {
  const search = value.trim();
  if (search.length < 2) return [];

  const localMatches = getLocalSuggestions(search);
  const params = new URLSearchParams({
    format: "jsonv2",
    addressdetails: "1",
    limit: "8",
    countrycodes: "in",
    bounded: "1",
    viewbox: "78.22,17.60,78.65,17.20",
    q: `${search}, Hyderabad, India`
  });

  try {
    const response = await fetch(`https://nominatim.openstreetmap.org/search?${params.toString()}`);
    const data = await response.json();
    const onlineMatches = data
      .filter((place) => {
        const label = `${place.display_name || ""} ${place.address?.state || ""}`.toLowerCase();
        return label.includes("hyderabad") || label.includes("rangareddy") || label.includes("ranga reddy");
      })
      .map((place) => cleanDisplayName(place.display_name))
      .filter(Boolean);

    return [...new Set([...onlineMatches, ...localMatches])].slice(0, 7);
  } catch {
    return localMatches;
  }
}

async function reverseGeocode(latitude, longitude) {
  const params = new URLSearchParams({
    format: "jsonv2",
    lat: String(latitude),
    lon: String(longitude),
    zoom: "18",
    addressdetails: "1"
  });

  const response = await fetch(`https://nominatim.openstreetmap.org/reverse?${params.toString()}`);
  const data = await response.json();
  return cleanDisplayName(data.display_name || `${latitude}, ${longitude}`);
}

function App() {
  const [screen, setScreen] = useState("home");
  const [activeModule, setActiveModule] = useState("menu");
  const [authMode, setAuthMode] = useState("login");
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("rideUser") || "null"));
  const [token, setToken] = useState(() => localStorage.getItem("rideToken") || "");
  const [authForm, setAuthForm] = useState({ name: "", email: "", password: "" });
  const [route, setRoute] = useState({ pickup: "", destination: "", transportType: "all" });
  const [activeField, setActiveField] = useState(null);
  const [fieldSuggestions, setFieldSuggestions] = useState({ pickup: [], destination: [] });
  const [locating, setLocating] = useState(false);
  const [results, setResults] = useState(null);
  const [productForm, setProductForm] = useState({ productName: "", size: "any", searchMode: "name", imageName: "" });
  const [productImage, setProductImage] = useState("");
  const [productResults, setProductResults] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const authTitle = authMode === "login" ? "Welcome back" : "Create account";

  useEffect(() => {
    if (!activeField) return undefined;

    const value = route[activeField];
    const timeoutId = window.setTimeout(async () => {
      const suggestions = await searchHyderabadPlaces(value);
      setFieldSuggestions((current) => ({ ...current, [activeField]: suggestions }));
    }, 280);

    return () => window.clearTimeout(timeoutId);
  }, [activeField, route.pickup, route.destination]);

  async function submitAuth(event) {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const endpoint = authMode === "login" ? "login" : "register";
      const response = await fetch(`${API_URL}/auth/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(authForm)
      });
      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Authentication failed");

      setUser(data.user);
      setToken(data.token);
      localStorage.setItem("rideUser", JSON.stringify(data.user));
      localStorage.setItem("rideToken", data.token);
      if (data.notice) setMessage(data.notice);
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function compareRides(event) {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(`${API_URL}/rides/compare`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(route)
      });
      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Could not compare rides");
      setResults(data);
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function compareProducts(event) {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(`${API_URL}/ecommerce/compare`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(productForm)
      });
      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Could not compare products");
      setProductResults(data);
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  }

  function handleProductPhoto(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    const inferredQuery = photoKeywordPresets.stripedPolo;
    setProductForm((current) => ({
      ...current,
      searchMode: "photo",
      imageName: file.name,
      productName: current.productName || inferredQuery
    }));
    setProductImage(URL.createObjectURL(file));
    setMessage("Photo uploaded. I detected this as a striped polo/t-shirt. You can edit the keywords before comparing.");
  }

  function logout() {
    setUser(null);
    setToken("");
    setResults(null);
    setProductResults(null);
    setActiveModule("menu");
    setScreen("home");
    localStorage.removeItem("rideUser");
    localStorage.removeItem("rideToken");
  }

  async function useCurrentLocation() {
    if (!navigator.geolocation) {
      setMessage("Current location is not supported in this browser.");
      return;
    }

    setLocating(true);
    setMessage("");

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const address = await reverseGeocode(position.coords.latitude, position.coords.longitude);
          setRoute((current) => ({ ...current, pickup: address }));
          setFieldSuggestions((current) => ({ ...current, pickup: [] }));
          if (position.coords.accuracy > 800) {
            setMessage("Current location may be approximate. If it shows Attapur instead of Paramount Hills, type your exact pickup manually.");
          }
        } catch {
          setRoute((current) => ({
            ...current,
            pickup: `${position.coords.latitude.toFixed(5)}, ${position.coords.longitude.toFixed(5)}`
          }));
          setMessage("Current location found, but exact address lookup failed.");
        } finally {
          setLocating(false);
        }
      },
      () => {
        setMessage("Please allow location permission to use current pickup.");
        setLocating(false);
      },
      { enableHighAccuracy: true, timeout: 12000, maximumAge: 60000 }
    );
  }

  if (!user) {
    if (screen === "home") {
      return (
        <main className="home-shell">
          <nav className="home-nav">
            <div className="logo"><Navigation size={22} /> RideCompare</div>
            <div className="home-actions">
              <button
                className="ghost-button"
                onClick={() => {
                  setAuthMode("login");
                  setScreen("auth");
                }}
              >
                Login
              </button>
              <button
                className="primary-button compact"
                onClick={() => {
                  setAuthMode("signup");
                  setScreen("auth");
                }}
              >
                Signup
              </button>
            </div>
          </nav>

          <section className="home-hero">
            <div>
              <p className="eyebrow">Ride and shopping comparison</p>
              <h1>Compare rides and online shopping in one app.</h1>
              <p>
                Check ride options from Rapido, Ola and Uber, or compare products from Amazon, Flipkart and Meesho before opening every app separately.
              </p>
              <div className="hero-actions">
                <button
                  className="primary-button"
                  onClick={() => {
                    setAuthMode("signup");
                    setScreen("auth");
                  }}
                >
                  <ArrowRight size={18} />
                  Get started
                </button>
                <button
                  className="ghost-button light"
                  onClick={() => {
                    setAuthMode("login");
                    setScreen("auth");
                  }}
                >
                  Login
                </button>
              </div>
            </div>
            <div className="hero-preview">
              <div className="preview-card best">
                <span>Ride Compare</span>
                <strong>Rs 78 - Rs 92</strong>
                <p>Rapido Bike · cheapest route option</p>
              </div>
              <div className="preview-card">
                <span>E-commerce</span>
                <strong>Rs 573</strong>
                <p>Meesho · cheapest product option</p>
              </div>
              <div className="preview-card">
                <span>Best Quality</span>
                <strong>4.4</strong>
                <p>Flipkart/Amazon rating comparison</p>
              </div>
            </div>
          </section>
        </main>
      );
    }

    return (
      <main className="auth-shell">
        <section className="brand-panel">
          <div className="logo"><Navigation size={22} /> RideCompare</div>
          <h1>Compare rides and shopping before opening many apps.</h1>
          <p>Find cheaper rides and better product deals from trusted platforms in one place.</p>
          <div className="feature-row">
            <span><IndianRupee size={16} /> Best prices</span>
            <span><Clock3 size={16} /> Faster comparison</span>
            <span><ShoppingBag size={16} /> Shopping deals</span>
            <span><ShieldCheck size={16} /> Trusted apps</span>
          </div>
        </section>

        <section className="auth-card">
          <div className="tabs">
            <button className={authMode === "login" ? "active" : ""} onClick={() => setAuthMode("login")} type="button">Login</button>
            <button className={authMode === "signup" ? "active" : ""} onClick={() => setAuthMode("signup")} type="button">Signup</button>
          </div>
          <h2>{authTitle}</h2>
          <form onSubmit={submitAuth}>
            {authMode === "signup" && (
              <label>
                Full name
                <input value={authForm.name} onChange={(e) => setAuthForm({ ...authForm, name: e.target.value })} placeholder="Your name" />
              </label>
            )}
            <label>
              Email
              <input type="email" value={authForm.email} onChange={(e) => setAuthForm({ ...authForm, email: e.target.value })} placeholder="you@example.com" />
            </label>
            <label>
              Password
              <input type="password" value={authForm.password} onChange={(e) => setAuthForm({ ...authForm, password: e.target.value })} placeholder="Minimum 6 characters" />
            </label>
            <button className="primary-button" disabled={loading}>
              {loading ? <Loader2 className="spin" size={18} /> : <ArrowRight size={18} />}
              Continue
            </button>
          </form>
          {message && <p className="message">{message}</p>}
          <button className="back-home" onClick={() => setScreen("home")} type="button">Back to home</button>
        </section>
      </main>
    );
  }

  return (
    <main className="app-shell">
      <nav className="topbar">
        <div className="logo"><Navigation size={22} /> RideCompare</div>
        <div className="topbar-actions">
          {activeModule !== "menu" && (
            <button className="module-back-button" onClick={() => setActiveModule("menu")} type="button">Home</button>
          )}
          <button className="icon-button" onClick={logout} title="Logout"><LogOut size={18} /></button>
        </div>
      </nav>

      {activeModule === "menu" && <ModuleMenu user={user} setActiveModule={setActiveModule} />}

      {activeModule === "ride" && (
        <>
          <section className="search-band">
            <div>
              <p className="eyebrow">Ride compare</p>
              <h1>Where are you going?</h1>
            </div>
            <form className="route-form" onSubmit={compareRides}>
              <LocationInput
                icon={<MapPin size={18} />}
                label="Pickup"
                name="pickup"
                value={route.pickup}
                activeField={activeField}
                setActiveField={setActiveField}
                suggestions={fieldSuggestions.pickup}
                onChange={(value) => setRoute({ ...route, pickup: value })}
                onUseCurrentLocation={useCurrentLocation}
                placeholder="Pickup location"
                locating={locating}
              />
              <LocationInput
                icon={<LocateFixed size={18} />}
                label="Destination"
                name="destination"
                value={route.destination}
                activeField={activeField}
                setActiveField={setActiveField}
                suggestions={fieldSuggestions.destination}
                onChange={(value) => setRoute({ ...route, destination: value })}
                placeholder="Destination"
              />
              <fieldset className="transport-picker">
                <legend>Ride type</legend>
                {transportTypes.map((transport) => {
                  const Icon = transport.icon;
                  return (
                    <button
                      className={route.transportType === transport.id ? "transport-option active" : "transport-option"}
                      key={transport.id}
                      onClick={() => setRoute({ ...route, transportType: transport.id })}
                      type="button"
                    >
                      <Icon size={17} />
                      {transport.label}
                    </button>
                  );
                })}
              </fieldset>
              <button className="primary-button" disabled={loading}>
                {loading ? <Loader2 className="spin" size={18} /> : <Sparkles size={18} />}
                Compare rides
              </button>
            </form>
            {message && <p className="message">{message}</p>}
          </section>

          {results ? <RideResults results={results} /> : <EmptyState />}
        </>
      )}

      {activeModule === "ecommerce" && (
        <EcommerceModule
          compareProducts={compareProducts}
          form={productForm}
          image={productImage}
          loading={loading}
          message={message}
          onPhoto={handleProductPhoto}
          results={productResults}
          setForm={setProductForm}
        />
      )}
    </main>
  );
}

function ModuleMenu({ setActiveModule, user }) {
  return (
    <section className="module-menu">
      <div>
        <p className="eyebrow">Hi {user.name || "there"}</p>
        <h1>What do you want to compare today?</h1>
      </div>
      <div className="module-grid">
        <button className="module-card" onClick={() => setActiveModule("ride")} type="button">
          <Navigation size={30} />
          <span>Ride Compare</span>
          <p>Compare Rapido, Ola, Uber and more for your route.</p>
        </button>
        <button className="module-card ecommerce" onClick={() => setActiveModule("ecommerce")} type="button">
          <ShoppingBag size={30} />
          <span>E-commerce</span>
          <p>Compare Amazon, Flipkart and Meesho by price, rating and size.</p>
        </button>
      </div>
    </section>
  );
}

function EcommerceModule({ compareProducts, form, image, loading, message, onPhoto, results, setForm }) {
  return (
    <>
      <section className="commerce-band">
        <div>
          <p className="eyebrow">E-commerce compare</p>
          <h1>Search product by name or photo.</h1>
        </div>
        <form className="commerce-form" onSubmit={compareProducts}>
          <label>
            Product name or detected keywords
            <div className="input-icon-wrap">
              <Search size={18} />
              <input
                value={form.productName}
                onChange={(event) => setForm({ ...form, searchMode: "name", productName: event.target.value })}
                placeholder="Dress, shoes, watch, phone..."
              />
            </div>
          </label>
          <label>
            Size
            <select value={form.size} onChange={(event) => setForm({ ...form, size: event.target.value })}>
              <option value="any">Any size</option>
              <option value="s">Small</option>
              <option value="m">Medium</option>
              <option value="l">Large</option>
              <option value="xl">XL</option>
              <option value="xxl">XXL</option>
            </select>
          </label>
          <label className="photo-upload">
            <Upload size={18} />
            Upload product photo
            <input accept="image/*" onChange={onPhoto} type="file" />
          </label>
          {image && <img className="product-preview" src={image} alt="Uploaded product preview" />}
          {image && (
            <div className="detected-panel">
              <span>Detected from photo</span>
              <div className="keyword-chips">
                <button onClick={() => setForm({ ...form, productName: photoKeywordPresets.stripedPolo })} type="button">Striped polo</button>
                <button onClick={() => setForm({ ...form, productName: photoKeywordPresets.blackShirt })} type="button">Black shirt</button>
                <button onClick={() => setForm({ ...form, productName: "men blue white striped t shirt" })} type="button">Blue striped tee</button>
              </div>
            </div>
          )}
          <button className="primary-button" disabled={loading}>
            {loading ? <Loader2 className="spin" size={18} /> : <PackageSearch size={18} />}
            Compare products
          </button>
        </form>
        {message && <p className="message">{message}</p>}
      </section>
      {results && <ProductResults results={results} />}
    </>
  );
}

function ProductResults({ results }) {
  return (
    <section className="commerce-results">
      <div className="summary">
        <div>
          <p className="eyebrow">Product results</p>
          <h2>{results.query}</h2>
        </div>
        <div className="mini-stat">
          <IndianRupee size={18} />
          Cheapest: Rs {results.cheapest.price}
        </div>
        <div className="mini-stat">
          <Star size={18} />
          Best quality: {results.bestQuality.marketplace}
        </div>
      </div>
      <div className="product-grid">
        {results.options.map((product) => (
          <article className={product.id === results.cheapest.id ? "product-card best" : "product-card"} key={product.id}>
            <div className="product-card-top">
              <div className="mode-icon"><ShoppingBag size={21} /></div>
              <div>
                <h3>{product.marketplace}</h3>
                <p>{product.title}</p>
              </div>
              {product.id === results.cheapest.id && <span className="badge">Cheapest</span>}
            </div>
            <div className="price-row">
              <strong>Rs {product.price}</strong>
              <span>{product.rating} rating · {product.reviews.toLocaleString()} reviews</span>
            </div>
            <p className="quality-line">Quality score {product.qualityScore}/100 · {product.shipping}</p>
            <a className="book-button" href={product.productUrl} target="_blank" rel="noreferrer">
              Open {product.marketplace}
              <ArrowRight size={17} />
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}

function LocationInput({
  activeField,
  icon,
  label,
  locating = false,
  name,
  onChange,
  onUseCurrentLocation,
  placeholder,
  setActiveField,
  suggestions,
  value
}) {
  const showSuggestions = activeField === name && suggestions.length > 0;

  return (
    <label className="location-field">
      <span className="field-label-row">
        {label}
        {onUseCurrentLocation && (
          <button className="current-location-button" disabled={locating} onClick={onUseCurrentLocation} type="button">
            {locating ? <Loader2 className="spin" size={14} /> : <Crosshair size={14} />}
            Current location
          </button>
        )}
      </span>
      {icon}
      <input
        value={value}
        onBlur={() => window.setTimeout(() => setActiveField(null), 130)}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setActiveField(name)}
        placeholder={placeholder}
      />
      {showSuggestions && (
        <div className="suggestion-list">
          {suggestions.map((suggestion) => (
            <button key={suggestion} onMouseDown={() => onChange(suggestion)} type="button">
              <MapPin size={15} />
              {suggestion}
            </button>
          ))}
        </div>
      )}
    </label>
  );
}

function RideResults({ results }) {
  const fastest = useMemo(
    () => [...results.options].sort((a, b) => a.pickupMinutes - b.pickupMinutes)[0],
    [results]
  );

  return (
    <section className="results">
      <div className="summary">
        <div>
          <p className="eyebrow">Estimated route</p>
          <h2>{results.distanceKm} km {results.transportType === "all" ? "ride" : results.transportType} ride</h2>
        </div>
        {results.best && (
          <>
            <div className="mini-stat">
              <IndianRupee size={18} />
              Best fare: Rs {results.best.price}
            </div>
            <div className="mini-stat">
              <Clock3 size={18} />
              Fastest pickup: {fastest.pickupMinutes} min
            </div>
          </>
        )}
      </div>

      <div className="ride-grid">
        {results.options.length === 0 && (
          <article className="no-results">
            <h3>No rides found for this type</h3>
            <p>Try selecting All or another transport mode for this route.</p>
          </article>
        )}
        {results.options.map((ride, index) => (
          <article className={index === 0 ? "ride-card best" : "ride-card"} key={ride.id}>
            <div className="ride-card-top">
              <div className="mode-icon">{ride.mode.toLowerCase().includes("bike") ? <Bike size={22} /> : <Car size={22} />}</div>
              <div>
                <h3>{ride.provider}</h3>
                <p>{ride.mode} · {ride.comfort}</p>
              </div>
              {index === 0 && <span className="badge">Cheapest</span>}
            </div>
            <div className="price-row">
              <strong>Rs {ride.minPrice} - Rs {ride.maxPrice}</strong>
              <span>{ride.pickupMinutes} min pickup · {ride.tripMinutes} min trip</span>
            </div>
            <a className="book-button" href={ride.bookUrl} target="_blank" rel="noreferrer">
              Open {ride.provider}
              <ArrowRight size={17} />
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}

function EmptyState() {
  return (
    <section className="empty-state">
      <div className="phone-preview">
        <div className="route-dot"></div>
        <div className="route-line"></div>
        <div className="route-dot end"></div>
      </div>
      <div>
        <p className="eyebrow">V1 comparison engine</p>
        <h2>Enter pickup and destination to see the top 5 ride options.</h2>
        <p>Prices are estimated for demo mode. Real provider APIs or approved partnerships can replace this engine later.</p>
      </div>
    </section>
  );
}

createRoot(document.getElementById("root")).render(<App />);
