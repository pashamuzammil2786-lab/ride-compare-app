import { describe, expect, it } from "vitest";
import { estimateRides } from "./rides.js";

describe("estimateRides", () => {
  it("returns sorted ride options with a best fare", async () => {
    const result = await estimateRides("Toli Chowki, Hyderabad", "Madhapur, Hyderabad", "all");

    expect(result.best).toBeTruthy();
    expect(result.options.length).toBeGreaterThan(0);
    expect(result.options[0].price).toBeLessThanOrEqual(result.options[result.options.length - 1].price);
  });
});
