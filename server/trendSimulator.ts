/**
 * Simulated trend data generator
 * This creates realistic-looking trend indicators without calling external APIs
 * Based on product position, category, and randomization for variety
 */

export interface TrendData {
  keyword: string;
  popularityScore: number; // 0-100
  trend: 'up' | 'down' | 'stable';
  trendPercentage: number; // -100 to +100
}

// Seed for consistent but varied results
function simpleHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
}

/**
 * Generate simulated trend data for a product
 * Products ranked 1-20 tend to be "trending up"
 * Products ranked 21-60 are "stable"
 * Products ranked 61-100 might be "trending down"
 */
export function generateTrendData(productName: string, productId: number): TrendData {
  const hash = simpleHash(productName);
  
  // Base popularity on ranking (lower ID = higher popularity)
  let popularityScore: number;
  if (productId <= 20) {
    popularityScore = 75 + (hash % 25); // 75-100
  } else if (productId <= 60) {
    popularityScore = 50 + (hash % 30); // 50-80
  } else {
    popularityScore = 25 + (hash % 40); // 25-65
  }
  
  // Determine trend based on position
  let trend: 'up' | 'down' | 'stable';
  let trendPercentage: number;
  
  if (productId <= 20) {
    trend = 'up';
    trendPercentage = 15 + (hash % 35); // +15% to +50%
  } else if (productId <= 60) {
    const variation = (hash % 3);
    if (variation === 0) {
      trend = 'up';
      trendPercentage = 5 + (hash % 15); // +5% to +20%
    } else if (variation === 1) {
      trend = 'down';
      trendPercentage = -(5 + (hash % 15)); // -5% to -20%
    } else {
      trend = 'stable';
      trendPercentage = -5 + (hash % 10); // -5% to +5%
    }
  } else {
    const variation = (hash % 4);
    if (variation === 0) {
      trend = 'up';
      trendPercentage = 5 + (hash % 10); // +5% to +15%
    } else if (variation <= 2) {
      trend = 'down';
      trendPercentage = -(10 + (hash % 25)); // -10% to -35%
    } else {
      trend = 'stable';
      trendPercentage = -5 + (hash % 10); // -5% to +5%
    }
  }
  
  return {
    keyword: productName,
    popularityScore: Math.min(100, Math.max(0, popularityScore)),
    trend,
    trendPercentage: Math.round(trendPercentage),
  };
}

/**
 * Generate trend data for multiple products
 */
export function generateBatchTrendData(products: Array<{ id: number; name: string }>): Record<string, TrendData> {
  const results: Record<string, TrendData> = {};
  
  for (const product of products) {
    results[product.name] = generateTrendData(product.name, product.id);
  }
  
  return results;
}
