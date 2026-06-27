import { query } from "./db.js";

const marketplaces = [
  {
    name: "Meesho",
    ratingBoost: 0.1,
    priceFactor: 0.78,
    shipping: "Low delivery fee",
    url: "https://www.meesho.com/search?q="
  },
  {
    name: "Flipkart",
    ratingBoost: 0.18,
    priceFactor: 0.92,
    shipping: "Fast delivery",
    url: "https://www.flipkart.com/search?q="
  },
  {
    name: "Amazon",
    ratingBoost: 0.22,
    priceFactor: 1.18,
    shipping: "Prime options",
    url: "https://www.amazon.in/s?k="
  }
];

const productCatalog = {
  "nike shoes": {
    "Amazon": {
      title: "Nike Revolution 7 Men's Road Running Shoes",
      price: 3695,
      rating: 4.3,
      reviews: 2450,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
      shipping: "Prime Delivery - Free",
      link: "https://www.amazon.in/s?k=Nike+Revolution+7"
    },
    "Flipkart": {
      title: "Nike Revolution 7 Sports Shoes for Men",
      price: 3499,
      rating: 4.2,
      reviews: 3120,
      image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=400",
      shipping: "Free Delivery by Tomorrow",
      link: "https://www.flipkart.com/search?q=Nike+Revolution+7"
    },
    "Meesho": {
      title: "Premium Nike Styled Mesh Running Shoes",
      price: 1199,
      rating: 3.8,
      reviews: 9540,
      image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400",
      shipping: "Low Delivery Fee - Rs 49",
      link: "https://www.meesho.com/search?q=Nike+Shoes"
    }
  },
  "iphone 16": {
    "Amazon": {
      title: "Apple iPhone 16 (128 GB) - Black",
      price: 79900,
      rating: 4.7,
      reviews: 850,
      image: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=400",
      shipping: "Prime Delivery - Free",
      link: "https://www.amazon.in/s?k=iPhone+16"
    },
    "Flipkart": {
      title: "Apple iPhone 16 (Black, 128 GB)",
      price: 79900,
      rating: 4.6,
      reviews: 1200,
      image: "https://images.unsplash.com/photo-1592890288564-766d8a041268?w=400",
      shipping: "Free Delivery by Tomorrow",
      link: "https://www.flipkart.com/search?q=iPhone+16"
    },
    "Meesho": {
      title: "iPhone 16 Premium Silicone Case & Glass Bundle",
      price: 699,
      rating: 4.1,
      reviews: 45,
      image: "https://images.unsplash.com/photo-1601784551148-73474a7ae86d?w=400",
      shipping: "Low Delivery Fee - Free",
      link: "https://www.meesho.com/search?q=iPhone+16"
    }
  },
  "samsung galaxy": {
    "Amazon": {
      title: "Samsung Galaxy S24 Ultra 5G (Titanium Gray, 256GB)",
      price: 129999,
      rating: 4.6,
      reviews: 920,
      image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400",
      shipping: "Prime Delivery - Free",
      link: "https://www.amazon.in/s?k=Samsung+Galaxy+S24+Ultra"
    },
    "Flipkart": {
      title: "SAMSUNG Galaxy S24 Ultra 5G (Titanium Gray, 256 GB)",
      price: 124999,
      rating: 4.5,
      reviews: 1420,
      image: "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=400",
      shipping: "Free Delivery by Tomorrow",
      link: "https://www.flipkart.com/search?q=Samsung+Galaxy+S24+Ultra"
    },
    "Meesho": {
      title: "Samsung Galaxy S24 Ultra Acrylic Back Cover",
      price: 299,
      rating: 4.0,
      reviews: 12,
      image: "https://images.unsplash.com/photo-1565630916779-e303be97b6f5?w=400",
      shipping: "Low Delivery Fee - Free",
      link: "https://www.meesho.com/search?q=Samsung+Galaxy+S24+Cover"
    }
  },
  "laptop": {
    "Amazon": {
      title: "HP Laptop 15s, AMD Ryzen 5 5500U, 15.6-inch, 16GB DDR4, 512GB SSD",
      price: 42990,
      rating: 4.2,
      reviews: 3400,
      image: "https://images.unsplash.com/photo-1496181130204-7552cc14ac1a?w=400",
      shipping: "Prime Delivery - Free",
      link: "https://www.amazon.in/s?k=HP+Laptop+15s"
    },
    "Flipkart": {
      title: "HP Ryzen 5 Hexa Core 5500U - (16 GB/512 GB SSD/Windows 11 Home)",
      price: 41990,
      rating: 4.1,
      reviews: 2890,
      image: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=400",
      shipping: "Free Delivery by Tomorrow",
      link: "https://www.flipkart.com/search?q=HP+Laptop+15s"
    },
    "Meesho": {
      title: "Multi-functional Foldable Laptop Table with Cooling Fan",
      price: 749,
      rating: 3.8,
      reviews: 120,
      image: "https://images.unsplash.com/photo-1585776245991-cf89dd7fc73a?w=400",
      shipping: "Low Delivery Fee - Rs 30",
      link: "https://www.meesho.com/search?q=Laptop+Table"
    }
  },
  "headphones": {
    "Amazon": {
      title: "Sony WH-1000XM4 Wireless Active Noise Cancelling Headphones",
      price: 19990,
      rating: 4.6,
      reviews: 14200,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
      shipping: "Prime Delivery - Free",
      link: "https://www.amazon.in/s?k=Sony+WH-1000XM4"
    },
    "Flipkart": {
      title: "SONY WH-1000XM4 Bluetooth Headset with Mic",
      price: 19990,
      rating: 4.5,
      reviews: 18520,
      image: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400",
      shipping: "Free Delivery by Tomorrow",
      link: "https://www.flipkart.com/search?q=Sony+WH-1000XM4"
    },
    "Meesho": {
      title: "boAt Rockerz 450 Styled Bluetooth Wireless Headphones",
      price: 899,
      rating: 3.9,
      reviews: 4520,
      image: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=400",
      shipping: "Low Delivery Fee - Free",
      link: "https://www.meesho.com/search?q=Bluetooth+Headphones"
    }
  },
  "shoes": {
    "Amazon": {
      title: "Puma Men's Smash Suede Sneakers",
      price: 2499,
      rating: 4.2,
      reviews: 6520,
      image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400",
      shipping: "Prime Delivery - Free",
      link: "https://www.amazon.in/s?k=Puma+Shoes"
    },
    "Flipkart": {
      title: "PUMA Smash v2 Sneakers For Men",
      price: 2399,
      rating: 4.1,
      reviews: 11200,
      image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400",
      shipping: "Free Delivery by Tomorrow",
      link: "https://www.flipkart.com/search?q=Puma+Shoes"
    },
    "Meesho": {
      title: "Trendy Comfortable Men's Running Shoes",
      price: 499,
      rating: 3.9,
      reviews: 18540,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
      shipping: "Low Delivery Fee - Rs 40",
      link: "https://www.meesho.com/search?q=Running+Shoes"
    }
  },
  "shirt": {
    "Amazon": {
      title: "Aero Men's Slim Fit Cotton Casual Shirt",
      price: 899,
      rating: 4.1,
      reviews: 4200,
      image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=400",
      shipping: "Prime Delivery - Free",
      link: "https://www.amazon.in/s?k=Men+Casual+Shirt"
    },
    "Flipkart": {
      title: "Roadster Men's Regular Fit Checked Casual Shirt",
      price: 749,
      rating: 4.0,
      reviews: 6120,
      image: "https://images.unsplash.com/photo-1589310243389-96a5483213a8?w=400",
      shipping: "Free Delivery by Tomorrow",
      link: "https://www.flipkart.com/search?q=Men+Casual+Shirt"
    },
    "Meesho": {
      title: "Trendy Fashionable Men's Cotton Casual Shirt",
      price: 349,
      rating: 3.9,
      reviews: 11200,
      image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400",
      shipping: "Low Delivery Fee - Rs 30",
      link: "https://www.meesho.com/search?q=Men+Shirt"
    }
  },
  "dress": {
    "Amazon": {
      title: "Harpa Women's A-Line Polyester Knee-Length Dress",
      price: 1199,
      rating: 4.2,
      reviews: 1200,
      image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400",
      shipping: "Prime Delivery - Free",
      link: "https://www.amazon.in/s?k=Women+Dress"
    },
    "Flipkart": {
      title: "Tokyo Talkies Women A-Line Multicolor Dress",
      price: 999,
      rating: 4.1,
      reviews: 2400,
      image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400",
      shipping: "Free Delivery by Tomorrow",
      link: "https://www.flipkart.com/search?q=Women+Dress"
    },
    "Meesho": {
      title: "Voguish Fashionable Crepe Women's Western Dress",
      price: 299,
      rating: 3.8,
      reviews: 8520,
      image: "https://images.unsplash.com/photo-1612336307429-8a898d10e223?w=400",
      shipping: "Low Delivery Fee - Free",
      link: "https://www.meesho.com/search?q=Women+Dress"
    }
  },
  "watch": {
    "Amazon": {
      title: "Fire-Boltt Phoenix Smart Watch with Bluetooth Calling",
      price: 1799,
      rating: 4.3,
      reviews: 24100,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
      shipping: "Prime Delivery - Free",
      link: "https://www.amazon.in/s?k=Smartwatch"
    },
    "Flipkart": {
      title: "Noise ColorFit Icon Buzz Smartwatch",
      price: 1599,
      rating: 4.2,
      reviews: 42800,
      image: "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?w=400",
      shipping: "Free Delivery by Tomorrow",
      link: "https://www.flipkart.com/search?q=Smartwatch"
    },
    "Meesho": {
      title: "Latest Styled Metal Smartwatch with Silicon Strap",
      price: 699,
      rating: 3.8,
      reviews: 1420,
      image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=400",
      shipping: "Low Delivery Fee - Free",
      link: "https://www.meesho.com/search?q=Smartwatch"
    }
  },
  "bag": {
    "Amazon": {
      title: "Skybags Brat Black Casual Backpack",
      price: 1299,
      rating: 4.2,
      reviews: 6500,
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400",
      shipping: "Prime Delivery - Free",
      link: "https://www.amazon.in/s?k=Backpack"
    },
    "Flipkart": {
      title: "Safari Seek 45L Overnighter Backpack",
      price: 1199,
      rating: 4.1,
      reviews: 8900,
      image: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=400",
      shipping: "Free Delivery by Tomorrow",
      link: "https://www.flipkart.com/search?q=Backpack"
    },
    "Meesho": {
      title: "Unisex School & College Travel Backpack",
      price: 349,
      rating: 3.9,
      reviews: 14500,
      image: "https://images.unsplash.com/photo-1581605405669-fcdf81165afa?w=400",
      shipping: "Low Delivery Fee - Free",
      link: "https://www.meesho.com/search?q=Backpack"
    }
  }
};

function productBasePrice(productName) {
  const product = productName.toLowerCase();

  if (product.includes("dress") || product.includes("kurti") || product.includes("saree")) return 549;
  if (
    product.includes("shirt") ||
    product.includes("t shirt") ||
    product.includes("tshirt") ||
    product.includes("polo")
  )
    return 399;
  if (product.includes("shoe") || product.includes("sneaker") || product.includes("footwear")) return 650;
  if (product.includes("watch")) return 699;
  if (product.includes("phone") || product.includes("mobile")) return 12999;
  if (product.includes("bag") || product.includes("backpack")) return 799;

  const score = Array.from(product).reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return 399 + (score % 900);
}

function normalizePhotoQuery(productName, imageName, searchMode) {
  const rawQuery = productName.trim();
  const rawImageName = imageName.trim().toLowerCase();
  const badImageName =
    rawImageName.includes("whatsapp image") ||
    rawImageName.includes("img_") ||
    rawImageName.includes("image") ||
    rawImageName.length < 4;

  if (rawQuery && !rawQuery.toLowerCase().includes("whatsapp image")) {
    return rawQuery;
  }

  if (searchMode === "photo" || badImageName) {
    return "men navy blue white brown striped polo t shirt";
  }

  return imageName || "dress";
}

function generateFallbackProducts(queryVal, size) {
  const cleanName = queryVal.trim();
  const sizeStr = size && size !== "any" ? ` - Size ${size.toUpperCase()}` : "";
  
  let image = "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400";
  const lowerQuery = cleanName.toLowerCase();
  
  if (lowerQuery.includes("shoe") || lowerQuery.includes("sneaker") || lowerQuery.includes("footwear")) {
    image = "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400";
  } else if (lowerQuery.includes("phone") || lowerQuery.includes("mobile") || lowerQuery.includes("samsung") || lowerQuery.includes("iphone")) {
    image = "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400";
  } else if (lowerQuery.includes("laptop") || lowerQuery.includes("computer") || lowerQuery.includes("macbook")) {
    image = "https://images.unsplash.com/photo-1496181130204-7552cc14ac1a?w=400";
  } else if (lowerQuery.includes("headphone") || lowerQuery.includes("earbuds") || lowerQuery.includes("earphone") || lowerQuery.includes("buds")) {
    image = "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400";
  } else if (lowerQuery.includes("watch")) {
    image = "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400";
  } else if (lowerQuery.includes("bag") || lowerQuery.includes("backpack")) {
    image = "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400";
  } else if (lowerQuery.includes("shirt") || lowerQuery.includes("tshirt") || lowerQuery.includes("polo") || lowerQuery.includes("tee")) {
    image = "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=400";
  } else if (lowerQuery.includes("dress") || lowerQuery.includes("kurti") || lowerQuery.includes("saree") || lowerQuery.includes("clothing") || lowerQuery.includes("suit")) {
    image = "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400";
  }

  const basePrice = productBasePrice(cleanName);
  
  return {
    "Amazon": {
      title: `${cleanName}${sizeStr} on Amazon`,
      price: Math.round(basePrice * 1.15),
      rating: Math.min(4.9, Number((4.2 + (cleanName.length % 5) * 0.1).toFixed(1))),
      reviews: 1200 + cleanName.length * 153,
      image,
      shipping: "Prime Delivery - Free",
      link: `https://www.amazon.in/s?k=${encodeURIComponent(cleanName)}`
    },
    "Flipkart": {
      title: `${cleanName}${sizeStr} on Flipkart`,
      price: Math.round(basePrice * 1.02),
      rating: Math.min(4.8, Number((4.1 + (cleanName.length % 4) * 0.1).toFixed(1))),
      reviews: 1800 + cleanName.length * 97,
      image,
      shipping: "Free Delivery by Tomorrow",
      link: `https://www.flipkart.com/search?q=${encodeURIComponent(cleanName)}`
    },
    "Meesho": {
      title: `Budget ${cleanName}${sizeStr} on Meesho`,
      price: Math.round(basePrice * 0.72),
      rating: Math.min(4.5, Number((3.6 + (cleanName.length % 6) * 0.15).toFixed(1))),
      reviews: 3500 + cleanName.length * 210,
      image,
      shipping: "Low Delivery Fee - Rs 45",
      link: `https://www.meesho.com/search?q=${encodeURIComponent(cleanName)}`
    }
  };
}

export async function compareProducts(req, res) {
  const { productName = "", size = "any", searchMode = "name", imageName = "" } = req.body;
  const queryVal = normalizePhotoQuery(productName, imageName, searchMode);

  if (!queryVal) {
    return res.status(400).json({ message: "Enter a product name or upload a product photo." });
  }

  const normalizedQuery = queryVal.toLowerCase().trim();
  
  let matchedCatalogKey = null;
  for (const key of Object.keys(productCatalog)) {
    if (normalizedQuery.includes(key) || key.includes(normalizedQuery)) {
      matchedCatalogKey = key;
      break;
    }
  }

  let productsMap;
  if (matchedCatalogKey) {
    productsMap = productCatalog[matchedCatalogKey];
  } else {
    productsMap = generateFallbackProducts(queryVal, size);
  }

  const options = marketplaces.map((marketplace) => {
    const catalogItem = productsMap[marketplace.name] || {};
    
    const price = catalogItem.price || Math.round(productBasePrice(queryVal) * marketplace.priceFactor);
    const rating = catalogItem.rating || Math.min(4.9, Number((4.1 + marketplace.ratingBoost + (queryVal.length % 5) * 0.08).toFixed(1)));
    const reviews = catalogItem.reviews || (1200 + queryVal.length * 137);
    const title = catalogItem.title || `${queryVal} on ${marketplace.name}`;
    const image = catalogItem.image || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400";
    const shipping = catalogItem.shipping || marketplace.shipping;
    const productUrl = catalogItem.link || `${marketplace.url}${encodeURIComponent(queryVal)}`;

    const qualityScore = Math.round(rating * 18 + (reviews > 3000 ? 8 : 4) - (price / productBasePrice(queryVal)) * 5);

    return {
      id: marketplace.name.toLowerCase(),
      marketplace: marketplace.name,
      title,
      price,
      rating,
      reviews,
      qualityScore,
      image,
      shipping,
      size,
      productUrl
    };
  });

  const prices = options.map(o => o.price);
  const ratings = options.map(o => o.rating);
  
  const minPrice = Math.min(...prices);
  const maxRating = Math.max(...ratings);
  const maxQuality = Math.max(...options.map(o => o.qualityScore));

  const optionsWithBadges = options.map((o) => {
    return {
      ...o,
      isCheapest: o.price === minPrice,
      isHighestRating: o.rating === maxRating,
      isFastestDelivery: o.marketplace === "Flipkart" || o.marketplace === "Amazon",
      isBestValue: o.qualityScore === maxQuality
    };
  }).sort((a, b) => a.price - b.price);

  const bestQuality = [...optionsWithBadges].sort((a, b) => b.qualityScore - a.qualityScore)[0];

  try {
    await query("INSERT INTO search_history (user_id, category, query_details) VALUES ($1, $2, $3)", [
      req.user?.id || null,
      "ecommerce",
      JSON.stringify({ productName: queryVal, size, searchMode, imageName })
    ]);
  } catch (error) {
    console.error("Failed to log product search to history:", error);
  }

  return res.json({
    query: queryVal,
    searchMode,
    size,
    currency: "INR",
    cheapest: optionsWithBadges[0],
    bestQuality,
    options: optionsWithBadges
  });
}
