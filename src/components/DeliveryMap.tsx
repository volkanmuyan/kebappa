'use client';
import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { RESTAURANT, DELIVERY_RADIUS_KM, distanceKm, type Coords } from '@/lib/geo';

// Lightweight Leaflet map: restaurant pin + 5 km delivery circle, plus the
// customer's geocoded location. Uses circleMarkers so there are no external
// marker image assets to bundle.
export default function DeliveryMap({ customer }: { customer?: Coords | null }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const customerRef = useRef<L.CircleMarker | null>(null);

  // Init once.
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, {
      center: [RESTAURANT.lat, RESTAURANT.lon],
      zoom: 13,
      scrollWheelZoom: false,
      attributionControl: true,
    });
    mapRef.current = map;

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap',
      maxZoom: 19,
    }).addTo(map);

    // 5 km delivery zone.
    L.circle([RESTAURANT.lat, RESTAURANT.lon], {
      radius: DELIVERY_RADIUS_KM * 1000,
      color: '#EC6603',
      weight: 1.5,
      fillColor: '#EC6603',
      fillOpacity: 0.08,
    }).addTo(map);

    // Restaurant marker.
    L.circleMarker([RESTAURANT.lat, RESTAURANT.lon], {
      radius: 7,
      color: '#ffffff',
      weight: 2,
      fillColor: '#EC6603',
      fillOpacity: 1,
    })
      .addTo(map)
      .bindPopup(RESTAURANT.label);

    // Leaflet can mis-measure size when mounted inside a drawer; nudge it.
    setTimeout(() => map.invalidateSize(), 0);

    return () => {
      map.remove();
      mapRef.current = null;
      customerRef.current = null;
    };
  }, []);

  // Update / fit to the customer's location.
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    if (customerRef.current) {
      customerRef.current.remove();
      customerRef.current = null;
    }

    if (!customer) {
      map.setView([RESTAURANT.lat, RESTAURANT.lon], 13);
      return;
    }

    const inZone = distanceKm(RESTAURANT, customer) <= DELIVERY_RADIUS_KM;
    customerRef.current = L.circleMarker([customer.lat, customer.lon], {
      radius: 7,
      color: '#ffffff',
      weight: 2,
      fillColor: inZone ? '#22c55e' : '#ef4444',
      fillOpacity: 1,
    }).addTo(map);

    map.fitBounds(
      L.latLngBounds(
        [RESTAURANT.lat, RESTAURANT.lon],
        [customer.lat, customer.lon]
      ).pad(0.4),
      { maxZoom: 15 }
    );
  }, [customer]);

  return <div ref={containerRef} className="h-44 w-full rounded-lg overflow-hidden" />;
}
