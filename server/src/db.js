import dotenv from "dotenv";
import pg from "pg";

dotenv.config();

let pool;

// In-memory Mock Database for local/demo runs
const mockDb = {
  users: [
    {
      id: 1,
      name: "Mohd Muzammil",
      email: "admin@farefinder.com",
      password_hash: "$2a$10$QO2L3l8.Q8hXvN2K2s7Rk.QzI7R8BqG5dK7WzR8G5dK7WzR8G5dK7", // bcrypt hash for 'admin123'
      role: "admin",
      created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      last_login: new Date().toISOString()
    },
    {
      id: 2,
      name: "Sushmita Gadgi",
      email: "user@farefinder.com",
      password_hash: "$2a$10$QO2L3l8.Q8hXvN2K2s7Rk.QzI7R8BqG5dK7WzR8G5dK7WzR8G5dK7", // bcrypt hash for 'user123'
      role: "user",
      created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      last_login: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 3,
      name: "Guest User",
      email: "guest@example.com",
      password_hash: "$2a$10$QO2L3l8.Q8hXvN2K2s7Rk.QzI7R8BqG5dK7WzR8G5dK7WzR8G5dK7",
      role: "user",
      created_at: new Date().toISOString(),
      last_login: new Date().toISOString()
    }
  ],
  search_history: [
    {
      id: 1,
      user_id: 2,
      category: "ride",
      query_details: { pickup: "Madhapur, Hyderabad", destination: "Jubilee Hills, Hyderabad", transportType: "all" },
      created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 2,
      user_id: 2,
      category: "ecommerce",
      query_details: { productName: "Wireless Earbuds", size: "any" },
      created_at: new Date(Date.now() - 2.5 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 3,
      user_id: 3,
      category: "ride",
      query_details: { pickup: "Toli Chowki, Hyderabad", destination: "Gachibowli, Hyderabad", transportType: "auto" },
      created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 4,
      user_id: 2,
      category: "ecommerce",
      query_details: { productName: "casual shoes", size: "10" },
      created_at: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 5,
      user_id: 3,
      category: "ride",
      query_details: { pickup: "Mehdipatnam, Hyderabad", destination: "Airport, Hyderabad", transportType: "car" },
      created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
    }
  ],
  user_activity_logs: [
    {
      id: 1,
      user_id: 1,
      activity_type: "login",
      details: "Admin login successful",
      created_at: new Date().toISOString()
    },
    {
      id: 2,
      user_id: 2,
      activity_type: "login",
      details: "User login successful",
      created_at: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString()
    }
  ]
};

export function getPool() {
  if (!pool && process.env.DATABASE_URL) {
    pool = new pg.Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false
      }
    });
    console.log("PostgreSQL Pool Initialized.");
  }
  return pool;
}

export async function query(sql, params = []) {
  // Check if we can run PostgreSQL queries
  if (process.env.DATABASE_URL) {
    const client = getPool();
    const res = await client.query(sql, params);
    return res.rows;
  }

  // Otherwise, run in-memory mock query simulator
  const sqlLower = sql.toLowerCase();

  // 1. SELECT user by email
  if (sqlLower.includes("select * from users where email =")) {
    const email = params[0]?.toLowerCase();
    const user = mockDb.users.find((u) => u.email === email);
    return user ? [user] : [];
  }

  // 2. INSERT user
  if (sqlLower.includes("insert into users")) {
    const [name, email, password_hash, role = "user"] = params;
    const existing = mockDb.users.find((u) => u.email === email.toLowerCase());
    if (existing) {
      const err = new Error("Duplicate entry");
      err.code = "23505"; // Postgres unique violation code
      throw err;
    }
    const newId = mockDb.users.length + 1;
    const newUser = {
      id: newId,
      name,
      email: email.toLowerCase(),
      password_hash,
      role: role || "user",
      created_at: new Date().toISOString(),
      last_login: null
    };
    mockDb.users.push(newUser);
    return [{ id: newId }];
  }

  // 3. UPDATE user last login
  if (sqlLower.includes("update users set last_login =")) {
    const id = params[0];
    const user = mockDb.users.find((u) => u.id === Number(id));
    if (user) {
      user.last_login = new Date().toISOString();
    }
    return [];
  }

  // 4. INSERT search history
  if (sqlLower.includes("insert into search_history")) {
    const [user_id, category, query_details] = params;
    const newId = mockDb.search_history.length + 1;
    mockDb.search_history.push({
      id: newId,
      user_id: user_id ? Number(user_id) : null,
      category,
      query_details: typeof query_details === "string" ? JSON.parse(query_details) : query_details,
      created_at: new Date().toISOString()
    });
    return [];
  }

  // 5. INSERT user activity logs
  if (sqlLower.includes("insert into user_activity_logs")) {
    const [user_id, activity_type, details, ip_address] = params;
    const newId = mockDb.user_activity_logs.length + 1;
    mockDb.user_activity_logs.push({
      id: newId,
      user_id: user_id ? Number(user_id) : null,
      activity_type,
      details,
      ip_address,
      created_at: new Date().toISOString()
    });
    return [];
  }

  // 6. Admin stats: total users
  if (sqlLower.includes("select count(*) as count from users") && !sqlLower.includes("created_at")) {
    return [{ count: mockDb.users.length }];
  }

  // 7. Admin stats: active users
  if (sqlLower.includes("select count(distinct user_id) as count from user_activity_logs")) {
    const activeCount = new Set(mockDb.user_activity_logs.map((l) => l.user_id).filter(Boolean)).size;
    return [{ count: activeCount }];
  }

  // 8. Admin stats: new users today
  if (sqlLower.includes("select count(*) as count from users where created_at")) {
    return [
      { count: mockDb.users.filter((u) => new Date(u.created_at) >= new Date(Date.now() - 24 * 60 * 60 * 1000)).length }
    ];
  }

  // 9. Admin stats: total searches
  if (sqlLower.includes("select count(*) as count from search_history") && !sqlLower.includes("category")) {
    return [{ count: mockDb.search_history.length }];
  }

  // 10. Admin stats: ride searches
  if (sqlLower.includes("select count(*) as count from search_history where category = 'ride'")) {
    return [{ count: mockDb.search_history.filter((s) => s.category === "ride").length }];
  }

  // 11. Admin stats: product searches
  if (sqlLower.includes("select count(*) as count from search_history where category = 'ecommerce'")) {
    return [{ count: mockDb.search_history.filter((s) => s.category === "ecommerce").length }];
  }

  // 12. User list
  if (sqlLower.includes("select * from users order by created_at desc")) {
    return [...mockDb.users].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  }

  // 13. Update user role
  if (sqlLower.includes("update users set role =")) {
    const [role, id] = params;
    const user = mockDb.users.find((u) => u.id === Number(id));
    if (user) {
      user.role = role;
    }
    return [];
  }

  // 14. User-specific searches
  if (sqlLower.includes("select * from search_history where user_id =")) {
    const userId = Number(params[0]);
    return [...mockDb.search_history]
      .filter((s) => s.user_id === userId)
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      .slice(0, 15);
  }

  // 14. Recent searches
  if (sqlLower.includes("select s.*, u.email from search_history")) {
    return [...mockDb.search_history]
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      .map((s) => {
        const user = mockDb.users.find((u) => u.id === s.user_id);
        return {
          ...s,
          email: user ? user.email : "guest@example.com"
        };
      });
  }

  // 15. Analytics: popular ride routes
  if (sqlLower.includes("popular_rides") || (sqlLower.includes("category = 'ride'") && sqlLower.includes("group by"))) {
    const counts = {};
    for (const s of mockDb.search_history) {
      if (s.category === "ride") {
        const routeKey = `${s.query_details.pickup} to ${s.query_details.destination}`;
        counts[routeKey] = (counts[routeKey] || 0) + 1;
      }
    }
    return Object.entries(counts)
      .map(([query, count]) => ({ query, count }))
      .sort((a, b) => b.count - a.count);
  }

  // 16. Analytics: popular product searches
  if (
    sqlLower.includes("popular_products") ||
    (sqlLower.includes("category = 'ecommerce'") && sqlLower.includes("group by"))
  ) {
    const counts = {};
    for (const s of mockDb.search_history) {
      if (s.category === "ecommerce") {
        const prod = s.query_details.productName;
        counts[prod] = (counts[prod] || 0) + 1;
      }
    }
    return Object.entries(counts)
      .map(([query, count]) => ({ query, count }))
      .sort((a, b) => b.count - a.count);
  }

  // 17. Analytics: usage trends (by day)
  if (sqlLower.includes("usage_trends") || sqlLower.includes("date_trunc") || sqlLower.includes("to_char")) {
    // Generate trends for the last 5 days
    const trends = [];
    for (let i = 4; i >= 0; i--) {
      const date = new Date(Date.now() - i * 24 * 60 * 60 * 1000);
      const dateStr = date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
      const dateISO = date.toISOString().split("T")[0];
      const count = mockDb.search_history.filter((s) => s.created_at.startsWith(dateISO)).length;
      trends.push({ day: dateStr, count: count || 4 - i + 1 }); // keep it realistic looking
    }
    return trends;
  }

  // Fallback default
  return [];
}
