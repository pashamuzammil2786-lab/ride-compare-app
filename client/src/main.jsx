import {
  ArrowRight,
  Bike,
  Car,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
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
  Settings,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Star,
  TrendingUp,
  Upload,
  Zap
} from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const API_URL = "https://ride-compare-app.onrender.com/api";

const translations = {
  en: {
    features: "Features",
    trySimulator: "Try Simulator",
    faqs: "FAQs",
    login: "Login",
    signup: "Signup",
    heroBadge: "Two-in-One Comparison Platform",
    heroTitle: "Compare rides and online shopping in one smart app.",
    heroDesc:
      "Check ride options from Rapido, Ola, and Uber, or compare product prices, ratings, and sizes across Amazon, Flipkart, and Meesho. Save time and money with one search.",
    getStarted: "Get started",
    rideCompare: "Ride Compare",
    ecommerce: "E-commerce",
    bestQuality: "Best Quality",
    cheapest: "Cheapest",
    cheapestRoute: "Rapido Bike · cheapest route option",
    cheapestProduct: "Meesho · cheapest product option",
    topRatedMerchant: "Top-rated merchant comparison",
    averageRideSavings: "Average Ride Savings",
    lowerProductPrices: "Lower Product Prices",
    insteadOfApps: "Instead of 6 separate apps",
    tryItNow: "Try it now",
    simulateComparison: "Simulate a comparison instantly",
    experiencePower: "Experience the power of comparison without creating an account.",
    compareRides: "Compare Rides",
    compareProducts: "Compare Products",
    pickup: "Pickup",
    destination: "Destination",
    searchProduct: "Search Product",
    runSimulator: "Run Simulator",
    comparing: "Comparing...",
    simulatingResults: "Showing simulated results for:",
    wantRealTime: "Want real-time quotes, custom location autocomplete, and photo uploads?",
    createAccount: "Create Free Account",
    twoPowerfulEngines: "Two powerful comparison engines, one interface.",
    rideHailingComp: "Ride Hailing Comparison",
    rideHailingDesc:
      "Compare fares, pickup times, and comfort modes across multiple ride aggregators like Uber, Ola, and Rapido.",
    autoBikeCar: "Auto, Bike, and Car options",
    accurateTravel: "Accurate travel duration details",
    hyderabadAutocomplete: "Hyderabad location autocomplete",
    directRedirect: "Direct redirect to ride providers",
    ecommerceDeals: "E-Commerce Deals Finder",
    ecommerceDesc:
      "Find the lowest prices for items across Amazon, Flipkart, and Meesho. Support for keyword search and photo upload.",
    photoDetection: "Photo-based product detection",
    filterSize: "Filter options by size (S - XXL)",
    sideMerchant: "Side-by-side merchant ratings",
    accurateShipping: "Accurate shipping and quality scores",
    faqTitle: "Frequently Asked Questions",
    footerDesc: "Compare prices, ratings, and booking availability for rides and e-commerce.",
    footerSavings: "Built for smart savings.",
    welcomeBack: "Welcome back",
    createAccountTitle: "Create account",
    fullName: "Full name",
    email: "Email",
    password: "Password",
    continue: "Continue",
    backHome: "Back to home",
    hiText: "Hi",
    whatCompare: "What do you want to compare today?",
    compareAggregators: "Compare Rapido, Ola, Uber and more for your route.",
    compareMarketplaces: "Compare Amazon, Flipkart and Meesho by price, rating and size.",
    whereGoing: "Where are you going?",
    compareRidesBtn: "Compare rides",
    estimatedRoute: "Estimated route",
    bestFare: "Best fare",
    fastestPickup: "Fastest pickup",
    searchProductName: "Product name or detected keywords",
    size: "Size",
    anySize: "Any size",
    uploadPhoto: "Upload product photo",
    compareProductsBtn: "Compare products",
    cheapestProductBadge: "Cheapest",
    qualityScore: "Quality score",
    openMarketplace: "Open",
    currentLocation: "Current location",
    destinationPlaceholder: "Destination",
    pickupPlaceholder: "Pickup location",
    productPlaceholder: "Dress, shoes, watch, phone...",
    aiInsights: "SmartCompare AI Insights",
    getAiAnalysis: "Get AI Analysis",
    aiSettings: "AI Configuration",
    aiProvider: "AI Provider",
    localAI: "Local AI (Ollama)",
    byok: "Bring Your Own Key (OpenAI)",
    fallbackAI: "Smart Fallback",
    localUrlLabel: "Local Ollama URL",
    modelLabel: "Model Name",
    apiKeyLabel: "OpenAI API Key",
    saveConfig: "Save Configuration",
    analysisLoading: "Analyzing comparison data with AI...",
    slide1Title: "Compare Rides Instantly",
    slide1Desc: "Check prices and pickup times across Rapido, Ola, and Uber to get the cheapest and fastest ride.",
    slide1Stats: "Save up to 30% on daily commutes",
    slide2Title: "Find E-Commerce Deals",
    slide2Desc: "Search products by name or photo and compare prices across Amazon, Flipkart, and Meesho instantly.",
    slide2Stats: "Compare across 3 major marketplaces",
    slide3Title: "All-in-One Smart Hub",
    slide3Desc:
      "Stop opening 10 different apps. Search once, compare ratings & price, and open directly to book or buy.",
    slide3Stats: "Over 50,000+ comparisons daily",
    faqQ1: "How does SmartCompare find the cheapest options?",
    faqA1:
      "We aggregate price estimates, pickup times, and quality ratings from multiple platforms (like Rapido, Ola, Uber, Amazon, Flipkart, and Meesho) in real-time to show you the best deals side-by-side.",
    faqQ2: "Do I need separate accounts for all these apps?",
    faqA2:
      "No! You can browse and compare everything inside SmartCompare. Once you choose the best ride or product, we provide a direct link to open the respective app and complete your booking or purchase.",
    faqQ3: "Is photo-based shopping search accurate?",
    faqA3:
      "Yes, our e-commerce module converts uploaded product photos into descriptive keywords and compares exact matches across Meesho, Flipkart, and Amazon."
  },
  hi: {
    features: "विशेषताएं",
    trySimulator: "सिम्युलेटर आज़माएं",
    faqs: "अक्सर पूछे जाने वाले प्रश्न",
    login: "लॉगिन",
    signup: "साइन अप",
    heroBadge: "टू-इन-वन तुलना प्लेटफॉर्म",
    heroTitle: "एक ही स्मार्ट ऐप में राइड और ऑनलाइन शॉपिंग की तुलना करें।",
    heroDesc:
      "रैपिडो, ओला और उबर से राइड के विकल्प देखें, या अमेज़न, फ्लिपकार्ट और मीशो पर उत्पादों की कीमतों, रेटिंग और आकारों की तुलना करें। एक ही सर्च से समय और पैसा बचाएं।",
    getStarted: "शुरू करें",
    rideCompare: "राइड तुलना",
    ecommerce: "ई-कॉमर्स",
    bestQuality: "सर्वोत्तम गुणवत्ता",
    cheapest: "सबसे सस्ता",
    cheapestRoute: "रैपिडो बाइक · सबसे सस्ता विकल्प",
    cheapestProduct: "मीशो · सबसे सस्ता उत्पाद विकल्प",
    topRatedMerchant: "टॉप-रेटेड मर्चेंट तुलना",
    averageRideSavings: "औसत राइड बचत",
    lowerProductPrices: "कम उत्पाद कीमतें",
    insteadOfApps: "6 अलग ऐप्स के बजाय",
    tryItNow: "अभी आज़माएं",
    simulateComparison: "तुरंत तुलना का अनुभव करें",
    experiencePower: "बिना अकाउंट बनाए तुरंत तुलना करने की शक्ति का अनुभव करें।",
    compareRides: "राइड की तुलना करें",
    compareProducts: "उत्पादों की तुलना करें",
    pickup: "पिकअप स्थान",
    destination: "गंतव्य स्थान",
    searchProduct: "उत्पाद खोजें",
    runSimulator: "सिम्युलेटर चलाएं",
    comparing: "तुलना की जा रही है...",
    simulatingResults: "सिम्युलेटेड परिणाम देखें:",
    wantRealTime: "क्या आप लाइव कीमतें, कस्टम स्थान और फोटो अपलोड सुविधा चाहते हैं?",
    createAccount: "मुफ़्त खाता बनाएं",
    twoPowerfulEngines: "दो शक्तिशाली तुलना इंजन, एक ही इंटरफ़ेस।",
    rideHailingComp: "राइड बुकिंग तुलना",
    rideHailingDesc: "उबर, ओला और रैपिडो जैसे कई राइड प्रदाताओं के किराए, पिकअप समय और कम्फर्ट मोड की तुलना करें।",
    autoBikeCar: "ऑटो, बाइक और कार विकल्प",
    accurateTravel: "सटीक यात्रा अवधि विवरण",
    hyderabadAutocomplete: "हैदराबाद स्थान ऑटोकंप्लीट",
    directRedirect: "राइड प्रदाताओं पर सीधा रीडायरेक्ट",
    ecommerceDeals: "ई-कॉमर्स डील्स खोजें",
    ecommerceDesc:
      "अमेज़न, फ्लिपकार्ट और मीशो पर उत्पादों की सबसे कम कीमतें खोजें। कीवर्ड और फोटो अपलोड दोनों समर्थित हैं।",
    photoDetection: "फोटो-आधारित उत्पाद पहचान",
    filterSize: "आकार (S - XXL) फ़िल्टर विकल्प",
    sideMerchant: "मर्चेंट रेटिंग की तुलना",
    accurateShipping: "सटीक शिपिंग और गुणवत्ता स्कोर",
    faqTitle: "अक्सर पूछे जाने वाले प्रश्न",
    footerDesc: "राइड और ई-कॉमर्स की कीमतों, रेटिंग और बुकिंग की उपलब्धता की तुलना करें।",
    footerSavings: "स्मार्ट बचत के लिए बनाया गया है।",
    welcomeBack: "आपका स्वागत है",
    createAccountTitle: "खाता बनाएं",
    fullName: "पूरा नाम",
    email: "ईमेल",
    password: "पासवर्ड",
    continue: "आगे बढ़ें",
    backHome: "होम पर वापस जाएं",
    hiText: "नमस्ते",
    whatCompare: "आज आप किस चीज़ की तुलना करना चाहते हैं?",
    compareAggregators: "अपने मार्ग के लिए रैपिडो, ओला, उबर और अधिक की तुलना करें।",
    compareMarketplaces: "मूल्य, रेटिंग और आकार के आधार पर अमेज़न, फ्लिपकार्ट और मीशो की तुलना करें।",
    whereGoing: "आप कहाँ जा रहे हैं?",
    compareRidesBtn: "राइड की तुलना करें",
    estimatedRoute: "अनुमानित मार्ग",
    bestFare: "सर्वोत्तम किराया",
    fastestPickup: "सबसे तेज़ पिकअप",
    searchProductName: "उत्पाद का नाम या पहचाने गए कीवर्ड",
    size: "आकार",
    anySize: "कोई भी आकार",
    uploadPhoto: "उत्पाद की फोटो अपलोड करें",
    compareProductsBtn: "उत्पादों की तुलना करें",
    cheapestProductBadge: "सबसे सस्ता",
    qualityScore: "गुणवत्ता स्कोर",
    openMarketplace: "खोलें",
    currentLocation: "वर्तमान स्थान",
    destinationPlaceholder: "गंतव्य स्थान",
    pickupPlaceholder: "पिकअप स्थान",
    productPlaceholder: "ड्रेस, जूते, घड़ी, फोन...",
    aiInsights: "स्मार्टकम्पेयर एआई विश्लेषण",
    getAiAnalysis: "एआई विश्लेषण प्राप्त करें",
    aiSettings: "एआई कॉन्फ़िगरेशन",
    aiProvider: "एआई प्रदाता",
    localAI: "स्थानीय एआई (Ollama)",
    byok: "अपना एपीआई की लाएं (OpenAI)",
    fallbackAI: "स्मार्ट फ़ालबैक",
    localUrlLabel: "स्थानीय ओलामा यूआरएल",
    modelLabel: "मॉडल का नाम",
    apiKeyLabel: "ओपनएआई एपीआई की",
    saveConfig: "कॉन्फ़िगरेशन सहेजें",
    analysisLoading: "तुलना डेटा का विश्लेषण किया जा रहा है...",
    slide1Title: "तुरंत राइड्स की तुलना करें",
    slide1Desc: "रैपिडो, ओला और उबर पर कीमतों और पिकअप समय की जांच करके सबसे सस्ती और तेज़ राइड प्राप्त करें।",
    slide1Stats: "दैनिक आवागमन पर 30% तक बचाएं",
    slide2Title: "ई-कॉमर्स सौदे खोजें",
    slide2Desc: "नाम या फोटो द्वारा उत्पादों की खोज करें और अमेज़न, फ्लिपकार्ट और मीशो पर तुरंत कीमतों की तुलना करें।",
    slide2Stats: "3 प्रमुख बाजारों में तुलना करें",
    slide3Title: "ऑल-इन-वन स्मार्ट हब",
    slide3Desc:
      "10 अलग-अलग ऐप खोलना बंद करें। एक बार खोजें, रेटिंग और कीमत की तुलना करें, और बुक या खरीदने के लिए सीधे खोलें।",
    slide3Stats: "50,000+ से अधिक दैनिक तुलनाएं",
    faqQ1: "स्मार्टकम्पेयर सबसे सस्ते विकल्प कैसे ढूंढता है?",
    faqA1:
      "हम वास्तविक समय में कई प्लेटफार्मों से मूल्य अनुमान, पिकअप समय और गुणवत्ता रेटिंग एकत्र करते हैं ताकि आपको सबसे अच्छे सौदे दिखा सकें।",
    faqQ2: "क्या मुझे इन सभी ऐप्स के लिए अलग-अलग खातों की आवश्यकता है?",
    faqA2:
      "नहीं! आप स्मार्टकम्पेयर के अंदर सब कुछ ब्राउज़ और तुलना कर सकते हैं। एक बार जब आप सबसे अच्छा विकल्प चुन लेते हैं, तो हम बुकिंग पूरी करने के लिए एक सीधा लिंक प्रदान करते हैं।",
    faqQ3: "क्या फोटो-आधारित उत्पाद खोज सटीक है?",
    faqA3:
      "हाँ, हमारा ई-कॉमर्स मॉड्यूल अपलोड की गई उत्पाद तस्वीरों को कीवर्ड में परिवर्तित करता है और मीशो, फ्लिपकार्ट और अमेज़न पर सटीक मिलान की तुलना करता है।"
  },
  te: {
    features: "ఫీచర్లు",
    trySimulator: "సిమ్యులేటర్ ప్రయత్నించండి",
    faqs: "సందేహాలు (FAQs)",
    login: "లాగిన్",
    signup: "సైన్ అప్",
    heroBadge: "టూ-ఇన్-వన్ పోలిక ప్లాట్‌ఫారమ్",
    heroTitle: "ఒకే స్మార్ట్ యాప్‌లో రైడ్‌లు మరియు ఆన్‌లైన్ షాపింగ్‌ను పోల్చండి.",
    heroDesc:
      "ర్యాపిడో, ఓలా మరియు ఉబెర్ నుండి రైడ్ ఎంపికలను తనిఖీ చేయండి లేదా అమెజాన్, ఫ్లిప్‌కార్ట్ మరియు మీషోలో ఉత్పత్తుల ధరలు, రేటింగ్‌లు మరియు సైజులను పోల్చండి. ఒకే శోధనతో సమయం మరియు డబ్బు ఆదా చేసుకోండి.",
    getStarted: "ప్రారంభించండి",
    rideCompare: "రైడ్ పోలిక",
    ecommerce: "ఈ-కామర్స్",
    bestQuality: "ఉత్తమ నాణ్యత",
    cheapest: "అతి చౌకైనది",
    cheapestRoute: "ర్యాపిడో బైక్ · చౌకైన మార్గం ఎంపిక",
    cheapestProduct: "మీషో · చౌకైన ఉత్పత్తి ఎంపిక",
    topRatedMerchant: "టాప్-రేటెడ్ వ్యాపారి పోలిక",
    averageRideSavings: "సగటు రైడ్ పొదుపు",
    lowerProductPrices: "తక్కువ ఉత్పత్తి ధరలు",
    insteadOfApps: "6 ప్రత్యేక యాప్‌లకు బదులుగా",
    tryItNow: "ఇప్పుడే ప్రయత్నించండి",
    simulateComparison: "తక్షణమే పోలికను అనుకరించండి",
    experiencePower: "ఖాతా సృష్టించకుండానే పోలికల ప్రయోజనాన్ని అనుభవించండి.",
    compareRides: "రైడ్‌లను పోల్చండి",
    compareProducts: "ఉత్పత్తులను పోల్చండి",
    pickup: "పికప్ స్థానం",
    destination: "గమ్యస్థానం",
    searchProduct: "ఉత్పత్తిని శోధించండి",
    runSimulator: "సిమ్యులేటర్ రన్ చేయండి",
    comparing: "పోలుస్తోంది...",
    simulatingResults: "అనుకరించిన ఫలితాలు:",
    wantRealTime: "మీకు రియల్ టైమ్ ధరలు, లొకేషన్ సూచనలు మరియు ఫోటో అప్‌లోడ్ ఫీచర్లు కావాలా?",
    createAccount: "ఉచిత ఖాతాను సృష్టించండి",
    twoPowerfulEngines: "రెండు శక్తివంతమైన పోలిక ఇంజన్లు, ఒకే ఇంటర్‌ఫేస్.",
    rideHailingComp: "రైడ్ పోలిక ఇంజిన్",
    rideHailingDesc:
      "ఉబెర్, ఓలా మరియు ర్యాపిడో వంటి బహుళ రైడ్ సర్వీసుల ధరలు, పికప్ సమయాలను మరియు కంఫర్ట్‌లను పోల్చండి.",
    autoBikeCar: "ఆటో, బైక్ మరియు కార్ ఎంపికలు",
    accurateTravel: "ఖచ్చితమైన ప్రయాణ సమయ వివరాలు",
    hyderabadAutocomplete: "హైదరాబాద్ లొకేషన్ సూచనలు",
    directRedirect: "రైడ్ సర్వీసులకు నేరుగా వెళ్లండి",
    ecommerceDeals: "ఈ-కామర్స్ డీల్స్ శోధన",
    ecommerceDesc:
      "అమెజాన్, ఫ్లిప్‌కార్ట్ మరియు మీషోలలో అత్యంత తక్కువ ధరలను కనుగొనండి. కీవర్డ్ మరియు ఫోటో అప్‌లోడ్ సపోర్ట్ ఉంది.",
    photoDetection: "ఫోటో ద్వారా ఉత్పత్తి గుర్తింపు",
    filterSize: "సైజుల వారీగా ఫిల్టర్ (S - XXL)",
    sideMerchant: "పక్కపక్కనే వ్యాపారుల రేటింగ్‌లు",
    accurateShipping: "ఖచ్చితమైన షిప్పింగ్ మరియు నాణ్యత స్కోర్లు",
    faqTitle: "తరచుగా అడిగే ప్రశ్నలు (FAQs)",
    footerDesc: "రైడ్‌లు మరియు ఈ-కామర్స్ ధరలు, రేటింగ్‌లు మరియు లభ్యతను పోల్చండి.",
    footerSavings: "స్మార్ట్ ఆదాల కోసం సృష్టించబడింది.",
    welcomeBack: "తిరిగి స్వాగతం",
    createAccountTitle: "ఖాతాను సృష్టించండి",
    fullName: "పూర్తి పేరు",
    email: "ఈమెయిల్",
    password: "పాస్‌వర్డ్",
    continue: "కొనసాగించండి",
    backHome: "హోమ్‌కు తిరిగి వెళ్లండి",
    hiText: "హాయ్",
    whatCompare: "ఈరోజు మీరు దేనిని పోల్చాలనుకుంటున్నారు?",
    compareAggregators: "మీ ప్రయాణ మార్గం కోసం రాపిడో, ఓలా, ఉబెర్ మరియు మరిన్నింటిని పోల్చండి.",
    compareMarketplaces: "ధర, రేటింగ్ మరియు సైజుల వారీగా అమెజాన్, ఫ్లిప్‌కార్ట్ మరియు మీషోలను పోల్చండి.",
    whereGoing: "మీరు ఎక్కడికి వెళ్తున్నారు?",
    compareRidesBtn: "రైడ్‌లను పోల్చండి",
    estimatedRoute: "అంచనా వేసిన మార్గం",
    bestFare: "ఉత్తమ ధర",
    fastestPickup: "అత్యంత వేగవంతమైన పికప్",
    searchProductName: "ఉత్పత్తి పేరు లేదా గుర్తించబడిన కీవర్డ్స్",
    size: "సైజు",
    anySize: "ఏదైనా సైజు",
    uploadPhoto: "ఉత్పత్తి ఫోటోను అప్‌లోడ్ చేయండి",
    compareProductsBtn: "ఉత్పత్తులను పోల్చండి",
    cheapestProductBadge: "అతి చౌకైనది",
    qualityScore: "నాణ్యత స్కోరు",
    openMarketplace: "ఓపెన్ చేయండి",
    currentLocation: "ప్రస్తుత స్థానం",
    destinationPlaceholder: "గమ్యస్థానం",
    pickupPlaceholder: "పికప్ స్థానం",
    productPlaceholder: "డ్రెస్, షూస్, వాచ్, ఫోన్...",
    aiInsights: "స్మార్ట్ పోలిక AI విశ్లేషణ",
    getAiAnalysis: "AI విశ్లేషణను పొందండి",
    aiSettings: "AI కాన్ఫిగరేషన్",
    aiProvider: "AI సర్వీస్ ప్రొవైడర్",
    localAI: "స్థానిక AI (Ollama)",
    byok: "మీ స్వంత కీని ఉపయోగించండి (OpenAI)",
    fallbackAI: "స్మార్ట్ ఫాల్‌బ్యాక్",
    localUrlLabel: "స్థానిక Ollama URL",
    modelLabel: "మోడల్ పేరు",
    apiKeyLabel: "OpenAI API కీ",
    saveConfig: "కాన్ఫిగరేషన్ సేవ్ చేయండి",
    analysisLoading: "AI తో పోలికల డేటాను విశ్లేషిస్తోంది...",
    slide1Title: "రైడ్‌లను తక్షణమే పోల్చండి",
    slide1Desc: "అతి తక్కువ మరియు వేగవంతమైన రైడ్ కోసం రాపిడో, ఓలా మరియు ఉబెర్ లలో ధరలను, పికప్ సమయాలను తనిఖీ చేయండి.",
    slide1Stats: "రోజువారీ ప్రయాణాలపై 30% వరకు ఆదా చేయండి",
    slide2Title: "ఈ-కామర్స్ డీల్స్ కనుగొనండి",
    slide2Desc:
      "ఉత్పత్తులను పేరు లేదా ఫోటో ద్వారా శోధించండి మరియు అమెజాన్, ఫ్లిప్‌కార్ట్ మరియు మీషోలలో తక్షణమే ధరలను పోల్చండి.",
    slide2Stats: "3 ప్రధాన మార్కెట్లలో పోల్చండి",
    slide3Title: "ఆల్-イン-వన్ స్మార్ట్ హబ్",
    slide3Desc:
      "10 వేర్వేరు యాప్‌లను తెరవడం ఆపండి. ఒకసారి శోధించండి, రేటింగ్‌లు & ధరలను పోల్చండి మరియు నేరుగా బుక్ చేయడానికి లేదా కొనడానికి తెరవండి.",
    slide3Stats: "రోజువారీ 50,000+ కంటే ఎక్కువ పోలికలు",
    faqQ1: "స్మార్ట్ పోలిక అత్యంత చౌకైన ఎంపికలను ఎలా కనుగొంటుంది?",
    faqA1: "మేము నిజ-సమయంలో వివిధ ప్లాట్‌ఫారమ్‌ల ధరలు, పికప్ సమయాలు మరియు నాణ్యత రేటింగ్‌లను సేకరిస్తాము.",
    faqQ2: "ఈ అన్ని యాప్‌ల కోసం నాకు ప్రత్యేక ఖాతాలు అవసరమా?",
    faqA2:
      "లేదు! మీరు స్మార్ట్ పోలిక లోపల ప్రతిదీ బ్రౌజ్ చేయవచ్చు మరియు పోల్చవచ్చు. నేరుగా బుక్ చేయడానికి లింక్ అందించబడుతుంది.",
    faqQ3: "ఫోటో ఆధారిత షాపింగ్ శోధన ఖచ్చితమైనదేనా?",
    faqA3:
      "అవును, మా ఈ-కామర్స్ మాడ్యూల్ అప్‌లోడ్ చేసిన ఉత్పత్తి ఫోటోను కీవర్డ్స్‌గా మారుస్తుంది మరియు మీషో, ఫ్లిప్‌కార్ట్ మరియు అమెజాన్‌లలో పోలుస్తుంది."
  }
};

function LanguageToggle({ lang, setLang }) {
  return (
    <div className="language-toggle-bar">
      <button className={lang === "en" ? "lang-btn active" : "lang-btn"} onClick={() => setLang("en")} type="button">
        EN
      </button>
      <button className={lang === "hi" ? "lang-btn active" : "lang-btn"} onClick={() => setLang("hi")} type="button">
        हिन्दी
      </button>
      <button className={lang === "te" ? "lang-btn active" : "lang-btn"} onClick={() => setLang("te")} type="button">
        తెలుగు
      </button>
    </div>
  );
}

function Logo() {
  return (
    <div className="logo-container">
      <div className="logo-icon-box">
        <Navigation className="logo-icon ride" size={18} />
        <ShoppingBag className="logo-icon shop" size={18} />
      </div>
      <span className="logo-text">SmartCompare</span>
    </div>
  );
}

function AiInsightsPanel({ results, type, aiConfig, token, t }) {
  const [insight, setInsight] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getAiRecommendation = async () => {
    setLoading(true);
    setInsight("");
    setError("");

    try {
      const response = await fetch(`${API_URL}/ai/recommend`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          provider: aiConfig.provider,
          localUrl: aiConfig.localUrl,
          model: aiConfig.model,
          apiKey: aiConfig.apiKey,
          context: {
            module: type,
            query: type === "ride" ? `${results.distanceKm}km ride` : results.query,
            options: results.options.map((o) => {
              if (type === "ride") {
                return {
                  provider: o.provider,
                  mode: o.mode,
                  priceRange: `Rs ${o.minPrice} - ${o.maxPrice}`,
                  pickup: `${o.pickupMinutes} min`
                };
              }
              return {
                marketplace: o.marketplace,
                title: o.title,
                price: `Rs ${o.price}`,
                rating: o.rating,
                quality: o.qualityScore
              };
            })
          }
        })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to fetch recommendation");
      setInsight(data.suggestion);
    } catch (err) {
      setError(err.message || "Something went wrong fetching AI recommendation.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ai-insights-panel">
      <div className="ai-insights-header">
        <Sparkles size={18} className="ai-spark-icon" />
        <h3>{t("aiInsights")}</h3>
      </div>
      <p className="ai-insights-sub">
        {aiConfig.provider === "local" && `Using Local AI (${aiConfig.model})`}
        {aiConfig.provider === "byok" && `Using BYOK OpenAI (${aiConfig.model})`}
        {aiConfig.provider === "fallback" && "Using Smart Fallback AI"}
      </p>

      {insight ? (
        <div className="ai-insight-content animate-fade-in">
          <p>{insight}</p>
        </div>
      ) : (
        <button className="primary-button ai-btn" onClick={getAiRecommendation} disabled={loading} type="button">
          {loading ? <Loader2 className="spin" size={16} /> : <Zap size={16} />}
          {loading ? t("analysisLoading") : t("getAiAnalysis")}
        </button>
      )}
      {error && <p className="ai-error-message">{error}</p>}
    </div>
  );
}

const mockRideSimulation = {
  pickup: "Madhapur, Hyderabad",
  destination: "Jubilee Hills, Hyderabad",
  options: [
    {
      provider: "Rapido",
      mode: "Bike",
      price: "Rs 45",
      time: "3 min pickup",
      cheapest: true
    },
    {
      provider: "Uber",
      mode: "UberAuto",
      price: "Rs 72",
      time: "5 min pickup"
    },
    {
      provider: "Ola",
      mode: "Mini Car",
      price: "Rs 110",
      time: "6 min pickup"
    }
  ]
};

const mockProductSimulation = {
  query: "Wireless Earbuds",
  options: [
    {
      marketplace: "Meesho",
      title: "BassBuds Wireless Earbuds",
      price: "Rs 349",
      rating: "4.1 ⭐",
      cheapest: true
    },
    {
      marketplace: "Flipkart",
      title: "boAt Airdopes 131",
      price: "Rs 899",
      rating: "4.2 ⭐"
    },
    {
      marketplace: "Amazon",
      title: "boAt Airdopes 131 Pro",
      price: "Rs 999",
      rating: "4.3 ⭐"
    }
  ]
};

const faqs = [
  {
    q: "How does SmartCompare find the cheapest options?",
    a: "We aggregate price estimates, pickup times, and quality ratings from multiple platforms (like Rapido, Ola, Uber, Amazon, Flipkart, and Meesho) in real-time to show you the best deals side-by-side."
  },
  {
    q: "Do I need separate accounts for all these apps?",
    a: "No! You can browse and compare everything inside SmartCompare. Once you choose the best ride or product, we provide a direct link to open the respective app and complete your booking or purchase."
  },
  {
    q: "Is photo-based shopping search accurate?",
    a: "Yes, our e-commerce module converts uploaded product photos into descriptive keywords and compares exact matches across Meesho, Flipkart, and Amazon."
  }
];

const authSlides = [
  {
    title: "Compare Rides Instantly",
    desc: "Check prices and pickup times across Rapido, Ola, and Uber to get the cheapest and fastest ride.",
    icon: Navigation,
    bg: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80",
    stats: "Save up to 30% on daily commutes"
  },
  {
    title: "Find E-Commerce Deals",
    desc: "Search products by name or photo and compare prices across Amazon, Flipkart, and Meesho instantly.",
    icon: ShoppingBag,
    bg: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=1200&q=80",
    stats: "Compare across 3 major marketplaces"
  },
  {
    title: "All-in-One Smart Hub",
    desc: "Stop opening 10 different apps. Search once, compare ratings & price, and open directly to book or buy.",
    icon: Sparkles,
    bg: "https://images.unsplash.com/photo-1531219572328-a0171b4448a3?auto=format&fit=crop&w=1200&q=80",
    stats: "Over 50,000+ comparisons daily"
  }
];

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

  return hyderabadFallbackPlaces.filter((place) => place.toLowerCase().includes(search)).slice(0, 6);
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
  const [authForm, setAuthForm] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [route, setRoute] = useState({
    pickup: "",
    destination: "",
    transportType: "all"
  });
  const [activeField, setActiveField] = useState(null);
  const [fieldSuggestions, setFieldSuggestions] = useState({
    pickup: [],
    destination: []
  });
  const [locating, setLocating] = useState(false);
  const [results, setResults] = useState(null);
  const [productForm, setProductForm] = useState({
    productName: "",
    size: "any",
    searchMode: "name",
    imageName: ""
  });
  const [productImage, setProductImage] = useState("");
  const [productResults, setProductResults] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // i18n and AI configuration states
  const [lang, setLang] = useState(() => localStorage.getItem("lang") || "en");
  const [aiConfig, setAiConfig] = useState(() => {
    const saved = localStorage.getItem("aiConfig");
    return saved
      ? JSON.parse(saved)
      : {
          provider: "fallback",
          localUrl: "http://localhost:11434",
          model: "llama3.2",
          apiKey: ""
        };
  });
  const [showAiSettings, setShowAiSettings] = useState(false);

  const handleSetLang = (newLang) => {
    setLang(newLang);
    localStorage.setItem("lang", newLang);
  };

  const handleSaveAiConfig = (config) => {
    setAiConfig(config);
    localStorage.setItem("aiConfig", JSON.stringify(config));
    setShowAiSettings(false);
  };

  const t = (key) => {
    const langDict = translations[lang] || translations.en;
    return langDict[key] || translations.en[key] || key;
  };

  // Landing page / home simulation states
  const [simTab, setSimTab] = useState("ride"); // 'ride' or 'shop'
  const [simQuery, setSimQuery] = useState({
    pickup: "Madhapur",
    destination: "Jubilee Hills",
    product: "Wireless Earbuds"
  });
  const [simLoading, setSimLoading] = useState(false);
  const [simResults, setSimResults] = useState(null);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const [carouselIndex, setCarouselIndex] = useState(0);

  useEffect(() => {
    if (screen !== "auth") return undefined;
    const interval = setInterval(() => {
      setCarouselIndex((prev) => (prev + 1) % authSlides.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [screen]);

  const runSimulation = (e) => {
    if (e) e.preventDefault();
    setSimLoading(true);
    setSimResults(null);
    setTimeout(() => {
      setSimLoading(false);
      if (simTab === "ride") {
        setSimResults({
          pickup: simQuery.pickup,
          destination: simQuery.destination,
          options: mockRideSimulation.options
        });
      } else {
        setSimResults({
          query: simQuery.product,
          options: mockProductSimulation.options
        });
      }
    }, 1200);
  };

  const authTitle = authMode === "login" ? "Welcome back" : "Create account";

  useEffect(() => {
    if (!activeField) return undefined;

    const value = route[activeField];
    const timeoutId = window.setTimeout(async () => {
      const suggestions = await searchHyderabadPlaces(value);
      setFieldSuggestions((current) => ({
        ...current,
        [activeField]: suggestions
      }));
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
      productName: inferredQuery
    }));
    setProductImage(URL.createObjectURL(file));
    setProductResults(null);
    setMessage(
      "Photo uploaded. I detected it as a striped polo/t-shirt. Click Compare products now, or edit the detected keywords first."
    );
    event.target.value = "";
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
            setMessage(
              "Current location may be approximate. If it shows Attapur instead of Paramount Hills, type your exact pickup manually."
            );
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

  const authSlidesTranslated = [
    {
      title: t("slide1Title"),
      desc: t("slide1Desc"),
      icon: Navigation,
      bg: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80",
      stats: t("slide1Stats")
    },
    {
      title: t("slide2Title"),
      desc: t("slide2Desc"),
      icon: ShoppingBag,
      bg: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=1200&q=80",
      stats: t("slide2Stats")
    },
    {
      title: t("slide3Title"),
      desc: t("slide3Desc"),
      icon: Sparkles,
      bg: "https://images.unsplash.com/photo-1531219572328-a0171b4448a3?auto=format&fit=crop&w=1200&q=80",
      stats: t("slide3Stats")
    }
  ];

  const faqsListTranslated = [
    {
      q: t("faqQ1"),
      a: t("faqA1")
    },
    {
      q: t("faqQ2"),
      a: t("faqA2")
    },
    {
      q: t("faqQ3"),
      a: t("faqA3")
    }
  ];

  if (!user) {
    if (screen === "home") {
      return (
        <main className="home-shell">
          <nav className="home-nav">
            <Logo />
            <div className="home-nav-links">
              <a href="#features">{t("features")}</a>
              <a href="#simulator">{t("trySimulator")}</a>
              <a href="#faqs">{t("faqs")}</a>
            </div>
            <div className="home-nav-right">
              <LanguageToggle lang={lang} setLang={handleSetLang} />
              <div className="home-actions">
                <button
                  className="ghost-button"
                  onClick={() => {
                    setAuthMode("login");
                    setScreen("auth");
                  }}
                  type="button"
                >
                  {t("login")}
                </button>
                <button
                  className="primary-button compact"
                  onClick={() => {
                    setAuthMode("signup");
                    setScreen("auth");
                  }}
                  type="button"
                >
                  {t("signup")}
                </button>
              </div>
            </div>
          </nav>

          <section className="home-hero">
            <div className="hero-text-content">
              <div className="hero-badge">
                <Sparkles size={14} /> <span>{t("heroBadge")}</span>
              </div>
              <h1>{t("heroTitle")}</h1>
              <p>{t("heroDesc")}</p>
              <div className="hero-actions">
                <button
                  className="primary-button"
                  onClick={() => {
                    setAuthMode("signup");
                    setScreen("auth");
                  }}
                  type="button"
                >
                  {t("getStarted")}
                  <ArrowRight size={18} />
                </button>
                <a className="secondary-button" href="#simulator">
                  {t("trySimulator")}
                </a>
              </div>
            </div>
            <div className="hero-preview">
              <div className="preview-card best">
                <div className="card-badge-row">
                  <span className="pill ride">{t("rideCompare")}</span>
                  <span className="best-tag">{t("cheapest")}</span>
                </div>
                <strong>Rs 78 - Rs 92</strong>
                <p>{t("cheapestRoute")}</p>
              </div>
              <div className="preview-card">
                <div className="card-badge-row">
                  <span className="pill shop">{t("ecommerce")}</span>
                  <span className="best-tag">{t("cheapest")}</span>
                </div>
                <strong>Rs 573</strong>
                <p>{t("cheapestProduct")}</p>
              </div>
              <div className="preview-card">
                <div className="card-badge-row">
                  <span className="pill quality">{t("bestQuality")}</span>
                  <span className="rating-tag">
                    <Star size={12} fill="#ffb400" stroke="#ffb400" /> 4.4
                  </span>
                </div>
                <strong>Flipkart</strong>
                <p>{t("topRatedMerchant")}</p>
              </div>
            </div>
          </section>

          {/* Stats Section */}
          <section className="stats-banner">
            <div className="stat-item">
              <h3>22%</h3>
              <p>{t("averageRideSavings")}</p>
            </div>
            <div className="stat-item border-x">
              <h3>15%</h3>
              <p>{t("lowerProductPrices")}</p>
            </div>
            <div className="stat-item">
              <h3>1 Search</h3>
              <p>{t("insteadOfApps")}</p>
            </div>
          </section>

          {/* Interactive Simulator Section */}
          <section id="simulator" className="simulator-section">
            <div className="section-header">
              <p className="eyebrow">{t("tryItNow")}</p>
              <h2>{t("simulateComparison")}</h2>
              <p className="sub">{t("experiencePower")}</p>
            </div>

            <div className="simulator-container">
              <div className="simulator-tabs">
                <button
                  className={simTab === "ride" ? "sim-tab active" : "sim-tab"}
                  onClick={() => {
                    setSimTab("ride");
                    setSimResults(null);
                  }}
                  type="button"
                >
                  <Navigation size={18} /> {t("compareRides")}
                </button>
                <button
                  className={simTab === "shop" ? "sim-tab active" : "sim-tab"}
                  onClick={() => {
                    setSimTab("shop");
                    setSimResults(null);
                  }}
                  type="button"
                >
                  <ShoppingBag size={18} /> {t("compareProducts")}
                </button>
              </div>

              <div className="simulator-form">
                {simTab === "ride" ? (
                  <div className="sim-form-group">
                    <div className="sim-input-row">
                      <div className="sim-field">
                        <label>{t("pickup")}</label>
                        <select
                          value={simQuery.pickup}
                          onChange={(e) => setSimQuery({ ...simQuery, pickup: e.target.value })}
                        >
                          <option value="Madhapur">Madhapur, Hyderabad</option>
                          <option value="Toli Chowki">Toli Chowki, Hyderabad</option>
                          <option value="Mehdipatnam">Mehdipatnam, Hyderabad</option>
                        </select>
                      </div>
                      <div className="sim-field">
                        <label>{t("destination")}</label>
                        <select
                          value={simQuery.destination}
                          onChange={(e) =>
                            setSimQuery({
                              ...simQuery,
                              destination: e.target.value
                            })
                          }
                        >
                          <option value="Jubilee Hills">Jubilee Hills, Hyderabad</option>
                          <option value="Gachibowli">Gachibowli, Hyderabad</option>
                          <option value="Airport">RGIA Airport, Hyderabad</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="sim-form-group">
                    <div className="sim-field">
                      <label>{t("searchProduct")}</label>
                      <select
                        value={simQuery.product}
                        onChange={(e) => setSimQuery({ ...simQuery, product: e.target.value })}
                      >
                        <option value="Wireless Earbuds">Wireless Earbuds</option>
                        <option value="Casual shoes">Casual Shoes</option>
                        <option value="Smart watch">Smart Watch</option>
                      </select>
                    </div>
                  </div>
                )}

                <button
                  className="primary-button run-sim-btn"
                  onClick={runSimulation}
                  disabled={simLoading}
                  type="button"
                >
                  {simLoading ? <Loader2 className="spin" size={18} /> : <Zap size={18} />}
                  {simLoading ? t("comparing") : t("runSimulator")}
                </button>
              </div>

              {simLoading && (
                <div className="sim-loading-area">
                  <Loader2 className="spin" size={32} />
                  <p>{t("comparing")}</p>
                </div>
              )}

              {simResults && (
                <div className="sim-results-area animate-fade-in">
                  <h4>
                    {t("simulatingResults")}{" "}
                    <strong>
                      {simTab === "ride" ? `${simResults.pickup} to ${simResults.destination}` : simResults.query}
                    </strong>
                  </h4>
                  <div className="sim-cards-grid">
                    {simResults.options.map((option, idx) => (
                      <div className={option.cheapest ? "sim-card cheapest" : "sim-card"} key={idx}>
                        <div className="sim-card-header">
                          <div className="sim-card-brand">
                            {simTab === "ride" ? (
                              <>
                                <span className="provider-name">{option.provider}</span>
                                <span className="mode-name">{option.mode}</span>
                              </>
                            ) : (
                              <>
                                <span className="provider-name">{option.marketplace}</span>
                                <span className="mode-name">{option.rating}</span>
                              </>
                            )}
                          </div>
                          {option.cheapest && <span className="sim-badge">{t("cheapest")}</span>}
                        </div>
                        <div className="sim-card-body">
                          {simTab === "shop" && <p className="product-title">{option.title}</p>}
                          <strong className="sim-price">{option.price}</strong>
                          <span className="sim-subtext">{simTab === "ride" ? option.time : "Free Shipping"}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="sim-promo">
                    <p>{t("wantRealTime")}</p>
                    <button
                      className="primary-button compact"
                      onClick={() => {
                        setAuthMode("signup");
                        setScreen("auth");
                      }}
                      type="button"
                    >
                      {t("createAccount")}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Features Section */}
          <section id="features" className="features-section">
            <div className="section-header">
              <p className="eyebrow">{t("features")}</p>
              <h2>{t("twoPowerfulEngines")}</h2>
            </div>

            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon ride">
                  <Navigation size={24} />
                </div>
                <h3>{t("rideHailingComp")}</h3>
                <p>{t("rideHailingDesc")}</p>
                <ul>
                  <li>
                    <CheckCircle2 size={16} /> {t("autoBikeCar")}
                  </li>
                  <li>
                    <CheckCircle2 size={16} /> {t("accurateTravel")}
                  </li>
                  <li>
                    <CheckCircle2 size={16} /> {t("hyderabadAutocomplete")}
                  </li>
                  <li>
                    <CheckCircle2 size={16} /> {t("directRedirect")}
                  </li>
                </ul>
              </div>

              <div className="feature-card">
                <div className="feature-icon shop">
                  <ShoppingBag size={24} />
                </div>
                <h3>{t("ecommerceDeals")}</h3>
                <p>{t("ecommerceDesc")}</p>
                <ul>
                  <li>
                    <CheckCircle2 size={16} /> {t("photoDetection")}
                  </li>
                  <li>
                    <CheckCircle2 size={16} /> {t("filterSize")}
                  </li>
                  <li>
                    <CheckCircle2 size={16} /> {t("sideMerchant")}
                  </li>
                  <li>
                    <CheckCircle2 size={16} /> {t("accurateShipping")}
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section id="faqs" className="faq-section">
            <div className="section-header">
              <p className="eyebrow">{t("faqs")}</p>
              <h2>{t("faqTitle")}</h2>
            </div>
            <div className="faq-list">
              {faqsListTranslated.map((faq, index) => {
                const isOpen = openFaqIndex === index;
                return (
                  <div className={isOpen ? "faq-item open" : "faq-item"} key={index}>
                    <button
                      className="faq-question"
                      onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                      type="button"
                    >
                      <span>{faq.q}</span>
                      {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </button>
                    {isOpen && (
                      <div className="faq-answer">
                        <p>{faq.a}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* Footer */}
          <footer className="home-footer">
            <div className="footer-content">
              <Logo />
              <p>{t("footerDesc")}</p>
              <span className="copyright">© 2026 SmartCompare. {t("footerSavings")}</span>
            </div>
          </footer>
        </main>
      );
    }

    const CurrentSlideIcon = authSlidesTranslated[carouselIndex].icon;

    return (
      <main className="auth-shell">
        <section
          className="brand-panel"
          style={{
            backgroundImage: `linear-gradient(180deg, rgba(13, 24, 18, 0.45), rgba(13, 24, 18, 0.9)), url(${authSlidesTranslated[carouselIndex].bg})`
          }}
        >
          <div className="brand-header-row">
            <Logo />
            <LanguageToggle lang={lang} setLang={handleSetLang} />
          </div>

          <div className="slideshow-container">
            <div className="slide animate-slide-in" key={carouselIndex}>
              <div className="slide-icon-wrapper">
                <CurrentSlideIcon size={28} />
              </div>
              <h2>{authSlidesTranslated[carouselIndex].title}</h2>
              <p>{authSlidesTranslated[carouselIndex].desc}</p>
              <div className="slide-stats">
                <TrendingUp size={16} /> <span>{authSlidesTranslated[carouselIndex].stats}</span>
              </div>
            </div>
          </div>

          <div className="carousel-dots">
            {authSlidesTranslated.map((_, idx) => (
              <button
                key={idx}
                className={idx === carouselIndex ? "dot active" : "dot"}
                onClick={() => setCarouselIndex(idx)}
                type="button"
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <div className="feature-row">
            <span>
              <IndianRupee size={16} /> {t("bestPrices") || "Best prices"}
            </span>
            <span>
              <Clock3 size={16} /> {t("fasterComparison") || "Faster comparison"}
            </span>
            <span>
              <ShoppingBag size={16} /> {t("shoppingDeals") || "Shopping deals"}
            </span>
            <span>
              <ShieldCheck size={16} /> {t("trustedApps") || "Trusted apps"}
            </span>
          </div>
        </section>

        <section className="auth-card">
          <div className="tabs">
            <button className={authMode === "login" ? "active" : ""} onClick={() => setAuthMode("login")} type="button">
              {t("login")}
            </button>
            <button
              className={authMode === "signup" ? "active" : ""}
              onClick={() => setAuthMode("signup")}
              type="button"
            >
              {t("signup")}
            </button>
          </div>
          <h2>{authTitle}</h2>
          <form onSubmit={submitAuth}>
            {authMode === "signup" && (
              <label>
                {t("fullName")}
                <input
                  value={authForm.name}
                  onChange={(e) => setAuthForm({ ...authForm, name: e.target.value })}
                  placeholder="Your name"
                />
              </label>
            )}
            <label>
              {t("email")}
              <input
                type="email"
                value={authForm.email}
                onChange={(e) => setAuthForm({ ...authForm, email: e.target.value })}
                placeholder="you@example.com"
              />
            </label>
            <label>
              {t("password")}
              <input
                type="password"
                value={authForm.password}
                onChange={(e) => setAuthForm({ ...authForm, password: e.target.value })}
                placeholder="Minimum 6 characters"
              />
            </label>
            <button className="primary-button" disabled={loading}>
              {loading ? <Loader2 className="spin" size={18} /> : <ArrowRight size={18} />}
              {t("continue")}
            </button>
          </form>
          {message && <p className="message">{message}</p>}
          <button className="back-home" onClick={() => setScreen("home")} type="button">
            {t("backHome")}
          </button>
        </section>
      </main>
    );
  }

  return (
    <main className="app-shell">
      <nav className="topbar">
        <Logo />
        <div className="topbar-actions">
          {activeModule !== "menu" && (
            <button className="module-back-button" onClick={() => setActiveModule("menu")} type="button">
              Home
            </button>
          )}
          <LanguageToggle lang={lang} setLang={handleSetLang} />
          <button className="icon-button" onClick={() => setShowAiSettings(true)} title="AI Settings">
            <Settings size={18} />
          </button>
          <button className="icon-button" onClick={logout} title="Logout">
            <LogOut size={18} />
          </button>
        </div>
      </nav>

      {activeModule === "menu" && <ModuleMenu user={user} setActiveModule={setActiveModule} />}

      {activeModule === "ride" && (
        <>
          <section className="search-band">
            <div>
              <p className="eyebrow">{t("rideCompare")}</p>
              <h1>{t("whereGoing")}</h1>
            </div>
            <form className="route-form" onSubmit={compareRides}>
              <LocationInput
                icon={<MapPin size={18} />}
                label={t("pickup")}
                name="pickup"
                value={route.pickup}
                activeField={activeField}
                setActiveField={setActiveField}
                suggestions={fieldSuggestions.pickup}
                onChange={(value) => setRoute({ ...route, pickup: value })}
                onUseCurrentLocation={useCurrentLocation}
                placeholder={t("pickupPlaceholder")}
                locating={locating}
              />
              <LocationInput
                icon={<LocateFixed size={18} />}
                label={t("destination")}
                name="destination"
                value={route.destination}
                activeField={activeField}
                setActiveField={setActiveField}
                suggestions={fieldSuggestions.destination}
                onChange={(value) => setRoute({ ...route, destination: value })}
                placeholder={t("destinationPlaceholder")}
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
                {t("compareRidesBtn")}
              </button>
            </form>
            {message && <p className="message">{message}</p>}
          </section>

          {results ? <RideResults results={results} aiConfig={aiConfig} token={token} t={t} /> : <EmptyState />}
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
          aiConfig={aiConfig}
          token={token}
          t={t}
        />
      )}

      {/* AI Settings Modal */}
      {showAiSettings && (
        <div className="ai-settings-modal-backdrop">
          <div className="ai-settings-modal">
            <h2>{t("aiSettings")}</h2>
            <div className="ai-settings-form">
              <label>
                {t("aiProvider")}
                <select
                  value={aiConfig.provider}
                  onChange={(e) => setAiConfig({ ...aiConfig, provider: e.target.value })}
                >
                  <option value="fallback">{t("fallbackAI")}</option>
                  <option value="local">{t("localAI")}</option>
                  <option value="byok">{t("byok")}</option>
                </select>
              </label>

              {aiConfig.provider === "local" && (
                <>
                  <label>
                    {t("localUrlLabel")}
                    <input
                      type="text"
                      value={aiConfig.localUrl}
                      onChange={(e) => setAiConfig({ ...aiConfig, localUrl: e.target.value })}
                      placeholder="http://localhost:11434"
                    />
                  </label>
                  <label>
                    {t("modelLabel")}
                    <input
                      type="text"
                      value={aiConfig.model}
                      onChange={(e) => setAiConfig({ ...aiConfig, model: e.target.value })}
                      placeholder="llama3.2"
                    />
                  </label>
                </>
              )}

              {aiConfig.provider === "byok" && (
                <>
                  <label>
                    {t("apiKeyLabel")}
                    <input
                      type="password"
                      value={aiConfig.apiKey}
                      onChange={(e) => setAiConfig({ ...aiConfig, apiKey: e.target.value })}
                      placeholder="sk-proj-..."
                    />
                  </label>
                  <label>
                    {t("modelLabel")}
                    <input
                      type="text"
                      value={aiConfig.model}
                      onChange={(e) => setAiConfig({ ...aiConfig, model: e.target.value })}
                      placeholder="gpt-4o-mini"
                    />
                  </label>
                </>
              )}

              <div className="modal-actions">
                <button className="primary-button" onClick={() => handleSaveAiConfig(aiConfig)} type="button">
                  {t("saveConfig")}
                </button>
                <button className="ghost-button" onClick={() => setShowAiSettings(false)} type="button">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
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

function EcommerceModule({
  compareProducts,
  form,
  image,
  loading,
  message,
  onPhoto,
  results,
  setForm,
  aiConfig,
  token,
  t
}) {
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
                onChange={(event) =>
                  setForm({
                    ...form,
                    searchMode: "name",
                    productName: event.target.value
                  })
                }
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
              <span>Detected from photo: {form.productName}</span>
              <div className="keyword-chips">
                <button
                  onClick={() =>
                    setForm({
                      ...form,
                      searchMode: "photo",
                      productName: photoKeywordPresets.stripedPolo
                    })
                  }
                  type="button"
                >
                  Striped polo
                </button>
                <button
                  onClick={() =>
                    setForm({
                      ...form,
                      searchMode: "photo",
                      productName: photoKeywordPresets.blackShirt
                    })
                  }
                  type="button"
                >
                  Black shirt
                </button>
                <button
                  onClick={() =>
                    setForm({
                      ...form,
                      searchMode: "photo",
                      productName: "men blue white striped t shirt"
                    })
                  }
                  type="button"
                >
                  Blue striped tee
                </button>
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
      {results && <ProductResults results={results} aiConfig={aiConfig} token={token} t={t} />}
    </>
  );
}

function ProductResults({ results, aiConfig, token, t }) {
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
          <article
            className={product.id === results.cheapest.id ? "product-card best" : "product-card"}
            key={product.id}
          >
            <div className="product-card-top">
              <div className="mode-icon">
                <ShoppingBag size={21} />
              </div>
              <div>
                <h3>{product.marketplace}</h3>
                <p>{product.title}</p>
              </div>
              {product.id === results.cheapest.id && <span className="badge">Cheapest</span>}
            </div>
            <div className="price-row">
              <strong>Rs {product.price}</strong>
              <span>
                {product.rating} rating · {product.reviews.toLocaleString()} reviews
              </span>
            </div>
            <p className="quality-line">
              Quality score {product.qualityScore}/100 · {product.shipping}
            </p>
            <a className="book-button" href={product.productUrl} target="_blank" rel="noreferrer">
              Open {product.marketplace}
              <ArrowRight size={17} />
            </a>
          </article>
        ))}
      </div>
      <AiInsightsPanel results={results} type="ecommerce" aiConfig={aiConfig} token={token} t={t} />
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

function RideResults({ results, aiConfig, token, t }) {
  const fastest = useMemo(() => [...results.options].sort((a, b) => a.pickupMinutes - b.pickupMinutes)[0], [results]);

  return (
    <section className="results">
      <div className="summary">
        <div>
          <p className="eyebrow">Estimated route</p>
          <h2>
            {results.distanceKm} km {results.transportType === "all" ? "ride" : results.transportType} ride
          </h2>
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
              <div className="mode-icon">
                {ride.mode.toLowerCase().includes("bike") ? <Bike size={22} /> : <Car size={22} />}
              </div>
              <div>
                <h3>{ride.provider}</h3>
                <p>
                  {ride.mode} · {ride.comfort}
                </p>
              </div>
              {index === 0 && <span className="badge">Cheapest</span>}
            </div>
            <div className="price-row">
              <strong>
                Rs {ride.minPrice} - Rs {ride.maxPrice}
              </strong>
              <span>
                {ride.pickupMinutes} min pickup · {ride.tripMinutes} min trip
              </span>
            </div>
            <a className="book-button" href={ride.bookUrl} target="_blank" rel="noreferrer">
              Open {ride.provider}
              <ArrowRight size={17} />
            </a>
          </article>
        ))}
      </div>
      <AiInsightsPanel results={results} type="ride" aiConfig={aiConfig} token={token} t={t} />
    </section>
  );
}

function EmptyState() {
  return (
    <section className="empty-state">
      <div className="phone-preview">
        <div className="route-dot" />
        <div className="route-line" />
        <div className="route-dot end" />
      </div>
      <div>
        <p className="eyebrow">V1 comparison engine</p>
        <h2>Enter pickup and destination to see the top 5 ride options.</h2>
        <p>
          Prices are estimated for demo mode. Real provider APIs or approved partnerships can replace this engine later.
        </p>
      </div>
    </section>
  );
}

createRoot(document.getElementById("root")).render(<App />);
