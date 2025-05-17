
import { useEffect, useRef } from "react";
import { FARM_LOCATIONS } from "@/lib/constants";

// We need to declare the global Leaflet type
declare global {
  interface Window {
    L: any;
  }
}

type MapProps = {
  highlightedFarmId?: number;
  interactive?: boolean;
  height?: string;
  className?: string;
};

const Map = ({
  highlightedFarmId,
  interactive = true,
  height = "400px",
  className = "",
}: MapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadMap = async () => {
      try {
        // Check if Leaflet is available
        if (typeof window.L === "undefined") {
          // Load Leaflet CSS and JS dynamically
          const cssLink = document.createElement("link");
          cssLink.rel = "stylesheet";
          cssLink.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
          document.head.appendChild(cssLink);

          const script = document.createElement("script");
          script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
          script.async = true;

          script.onload = initializeMap;
          document.body.appendChild(script);
        } else {
          initializeMap();
        }
      } catch (error) {
        console.error("Error loading map:", error);
      }
    };

    // Initialize map with Leaflet
    const initializeMap = () => {
      if (!mapContainer.current) return;
      
      // Ensure L is defined
      if (typeof window.L === "undefined") return;
      
      const L = window.L;

      // Create map centered on Vichada, Colombia
      const map = L.map(mapContainer.current).setView([4.5, -70.1], 9);

      // Add OpenStreetMap tile layer
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      // Disable scroll zoom if not interactive
      if (!interactive) {
        map.scrollWheelZoom.disable();
        map.dragging.disable();
      }

      // Add markers for each farm location
      FARM_LOCATIONS.forEach((farm) => {
        // Create marker with custom icon if highlighted
        const isHighlighted = farm.id === highlightedFarmId;

        const marker = L.marker([farm.lat, farm.lng], {
          title: farm.name,
        }).addTo(map);

        // Add popup with farm information
        marker.bindPopup(`
          <div class="farm-popup">
            <h3 class="font-bold">${farm.name}</h3>
            <p>Hectáreas totales: ${farm.hectares}</p>
            <p>Disponibles: ${farm.available} hectáreas</p>
            ${
              isHighlighted
                ? '<p class="text-green-600 font-bold">¡Tu inversión está aquí!</p>'
                : ""
            }
          </div>
        `);

        // Open popup if highlighted
        if (isHighlighted) {
          marker.openPopup();
        }
      });

      return () => {
        map.remove();
      };
    };

    loadMap();
  }, [highlightedFarmId, interactive]);

  return (
    <div
      ref={mapContainer}
      style={{ height }}
      className={`w-full rounded-lg shadow-md border border-gray-200 ${className}`}
    />
  );
};

export default Map;
