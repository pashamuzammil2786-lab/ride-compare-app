import { query } from "./db.js";

export async function getStats(req, res) {
  try {
    const totalUsersResult = await query("SELECT COUNT(*) as count FROM users");
    const activeUsersResult = await query(
      "SELECT COUNT(DISTINCT user_id) as count FROM user_activity_logs WHERE activity_type = 'login' AND created_at >= NOW() - INTERVAL '1 day'"
    );
    const newUsersResult = await query(
      "SELECT COUNT(*) as count FROM users WHERE created_at >= NOW() - INTERVAL '1 day'"
    );
    const totalSearchesResult = await query("SELECT COUNT(*) as count FROM search_history");
    const rideSearchesResult = await query("SELECT COUNT(*) as count FROM search_history WHERE category = 'ride'");
    const productSearchesResult = await query(
      "SELECT COUNT(*) as count FROM search_history WHERE category = 'ecommerce'"
    );

    const totalUsers = Number.parseInt(totalUsersResult[0]?.count || 0);
    const activeUsers = Number.parseInt(activeUsersResult[0]?.count || 0);
    const newUsersToday = Number.parseInt(newUsersResult[0]?.count || 0);
    const totalSearches = Number.parseInt(totalSearchesResult[0]?.count || 0);
    const rideSearches = Number.parseInt(rideSearchesResult[0]?.count || 0);
    const productSearches = Number.parseInt(productSearchesResult[0]?.count || 0);

    return res.json({
      totalUsers,
      activeUsers: activeUsers || 1, // ensure at least 1 active user is shown for the logged-in admin
      newUsersToday,
      totalSearches,
      rideSearches,
      productSearches,
      systemHealth: "healthy"
    });
  } catch (error) {
    console.error("Error fetching admin stats:", error);
    return res.status(500).json({ message: "Failed to load system statistics." });
  }
}

export async function getUsers(req, res) {
  try {
    const users = await query(
      "SELECT id, name, email, role, created_at, last_login FROM users ORDER BY created_at DESC"
    );
    return res.json({ users });
  } catch (error) {
    console.error("Error fetching users list:", error);
    return res.status(500).json({ message: "Failed to load user management list." });
  }
}

export async function updateUserRole(req, res) {
  const { id } = req.params;
  const { role } = req.body;

  if (role !== "admin" && role !== "user") {
    return res.status(400).json({ message: "Invalid role. Role must be 'admin' or 'user'." });
  }

  try {
    await query("UPDATE users SET role = $1 WHERE id = $2", [role, id]);

    // Log this admin operation
    await query("INSERT INTO user_activity_logs (user_id, activity_type, details) VALUES ($1, $2, $3)", [
      req.user.id,
      "admin_action",
      `Changed role of user ID ${id} to ${role}`
    ]);

    return res.json({ message: "User role updated successfully." });
  } catch (error) {
    console.error("Error updating user role:", error);
    return res.status(500).json({ message: "Failed to update user role." });
  }
}

export async function getSearches(req, res) {
  try {
    const searches = await query(
      "SELECT s.id, s.user_id, s.category, s.query_details, s.created_at, u.email FROM search_history s LEFT JOIN users u ON s.user_id = u.id ORDER BY s.created_at DESC LIMIT 100"
    );
    return res.json({ searches });
  } catch (error) {
    console.error("Error fetching searches history:", error);
    return res.status(500).json({ message: "Failed to load search logs." });
  }
}

export async function getAnalytics(req, res) {
  try {
    // 1. Popular ride routes (group by pickup/destination jsonb values)
    const popularRides = await query(
      "SELECT query_details->>'pickup' as pickup, query_details->>'destination' as destination, COUNT(*) as count FROM search_history WHERE category = 'ride' GROUP BY query_details->>'pickup', query_details->>'destination' ORDER BY count DESC LIMIT 5"
    );

    // 2. Popular product searches (group by productName jsonb values)
    const popularProducts = await query(
      "SELECT query_details->>'productName' as query, COUNT(*) as count FROM search_history WHERE category = 'ecommerce' GROUP BY query_details->>'productName' ORDER BY count DESC LIMIT 5"
    );

    // 3. Daily usage trends (total searches per day for the last 7 days)
    const usageTrends = await query(
      "SELECT to_char(created_at, 'Mon DD') as day, COUNT(*) as count FROM search_history WHERE created_at >= NOW() - INTERVAL '7 days' GROUP BY to_char(created_at, 'Mon DD'), date_trunc('day', created_at) ORDER BY date_trunc('day', created_at) ASC"
    );

    return res.json({
      popularRides: popularRides.map((r) => ({
        query: `${r.pickup || "Unknown"} ➔ ${r.destination || "Unknown"}`,
        count: Number.parseInt(r.count || 0)
      })),
      popularProducts: popularProducts.map((p) => ({
        query: p.query || "Unknown Product",
        count: Number.parseInt(p.count || 0)
      })),
      usageTrends: usageTrends.map((t) => ({
        day: t.day,
        count: Number.parseInt(t.count || 0)
      }))
    });
  } catch (error) {
    console.error("Error fetching analytics data:", error);
    return res.status(500).json({ message: "Failed to load analytics dashboard data." });
  }
}
