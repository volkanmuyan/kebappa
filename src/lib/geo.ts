// Delivery zone helpers — geocoding via OpenStreetMap Nominatim (free, no API key).
// Nominatim usage policy: <=1 req/sec, a valid identifying User-Agent is required.

export const RESTAURANT = {
  lat: 50.8626,
  lon: 4.3655,
  label: 'KEBAPPA — Rue de Brabant 232, 1030 Schaerbeek',
};

// Max delivery radius in kilometers.
export const DELIVERY_RADIUS_KM = 5;

export type Coords = { lat: number; lon: number };
export type AddressInput = { street: string; number: string; zip: string; city: string };

// Great-circle distance between two points, in kilometers.
export function distanceKm(a: Coords, b: Coords): number {
  const R = 6371;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLon = toRad(b.lon - a.lon);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

// Geocode a structured address to coordinates. Returns null when not found.
export async function geocodeAddress(
  addr: AddressInput,
  signal?: AbortSignal
): Promise<Coords | null> {
  const params = new URLSearchParams({
    street: `${addr.number} ${addr.street}`.trim(),
    city: addr.city.trim(),
    postalcode: addr.zip.trim(),
    country: 'Belgium',
    format: 'jsonv2',
    limit: '1',
  });

  const res = await fetch(`https://nominatim.openstreetmap.org/search?${params}`, {
    headers: { 'User-Agent': 'Kebappa-Order-App/1.0 (https://kebappa.be)' },
    signal,
  });
  if (!res.ok) return null;

  const data = (await res.json()) as Array<{ lat: string; lon: string }>;
  if (!data.length) return null;
  return { lat: parseFloat(data[0].lat), lon: parseFloat(data[0].lon) };
}

// Geocode + check distance against the delivery radius.
// Returns { ok, distanceKm } — ok is false when out of zone or address not found.
export async function checkDeliveryZone(
  addr: AddressInput,
  signal?: AbortSignal
): Promise<{ ok: boolean; found: boolean; distanceKm?: number; coords?: Coords }> {
  const coords = await geocodeAddress(addr, signal);
  if (!coords) return { ok: false, found: false };
  const d = distanceKm(RESTAURANT, coords);
  return { ok: d <= DELIVERY_RADIUS_KM, found: true, distanceKm: d, coords };
}
