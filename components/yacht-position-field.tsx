import { useMemo, useRef } from "react";
import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";

function LocationMarker({ position, onChange }: { position: { lat: number, lng: number }, onChange: (lat: number, lon: number) => void }) {
    const markerRef = useRef<L.Marker | null>(null)
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current
        if (marker != null) {
          onChange(marker.getLatLng().lat, marker.getLatLng().lng)
        }
      },
    }),
    [onChange],
  )

    const map = useMapEvents({
    click() {
      map.locate()
    },
    locationfound(e) {
      onChange(e.latlng.lat, e.latlng.lng)
      map.flyTo(e.latlng, 10)
    },
  })
  
    return (
      <Marker position={position} draggable ref={markerRef} eventHandlers={eventHandlers}>
      </Marker>
    )
  }

export default function YachtPositionField({ position, onChange }: { position: { lat: number, lng: number }, onChange: (lat: number, lon: number) => void }) {
  return (
    <MapContainer center={[position.lat, position.lng]} zoom={1} style={{ height: "200px", width: "100%" }}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <LocationMarker position={position} onChange={onChange} />
  </MapContainer>
  );
}