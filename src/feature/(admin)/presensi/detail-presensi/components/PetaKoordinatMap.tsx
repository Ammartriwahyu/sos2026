"use client";

import { useMemo } from "react";
import { divIcon, LatLngBounds } from "leaflet";
import { MapContainer, Marker, TileLayer, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export interface TitikPresensi {
  nim: string;
  nama: string;
  latitude: number;
  longitude: number;
}

interface PetaKoordinatMapProps {
  titik: TitikPresensi[];
}

const FALLBACK_CENTER: [number, number] = [-7.9526, 112.6142];

const pinIcon = divIcon({
  className: "",
  html: `<span class="block h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-primary-normal shadow-md"></span>`,
  iconSize: [16, 16],
  iconAnchor: [8, 8],
});

const gmapsUrl = (latitude: number, longitude: number) =>
  `https://www.google.com/maps?q=${latitude},${longitude}`;

const PetaKoordinatMap = ({ titik }: PetaKoordinatMapProps) => {
  const bounds = useMemo(() => {
    if (titik.length === 0) return null;
    return new LatLngBounds(
      titik.map((item) => [item.latitude, item.longitude] as [number, number]),
    );
  }, [titik]);

  return (
    <MapContainer
      bounds={bounds ?? undefined}
      center={bounds ? undefined : FALLBACK_CENTER}
      zoom={bounds ? undefined : 15}
      boundsOptions={{ padding: [40, 40], maxZoom: 17 }}
      scrollWheelZoom={false}
      className="h-full w-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {titik.map((item) => (
        <Marker
          key={item.nim}
          position={[item.latitude, item.longitude]}
          icon={pinIcon}
          alt={`Lokasi presensi ${item.nama}`}
          eventHandlers={{
            click: () =>
              window.open(
                gmapsUrl(item.latitude, item.longitude),
                "_blank",
                "noopener,noreferrer",
              ),
          }}
        >
          <Tooltip direction="top" offset={[0, -10]}>
            <span className="font-semibold">{item.nama}</span>
            <br />
            {item.nim}
          </Tooltip>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default PetaKoordinatMap;
