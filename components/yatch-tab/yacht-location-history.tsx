import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import useYachtPosition from "@/lib/hooks/seYachtPosition";

export default function YachtLocationHistory({
  yachtLikeId,
}: {
  yachtLikeId: number;
}) {
  const { data, isLoading, error } = useYachtPosition({ yachtLikeId });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Failed to load yacht location history</div>;
  }
  return (
    <div>
      {data?.positions?.length > 0 && (
        <div className="h-[600px]">
          <MapContainer
            center={[0, 0]}
            zoom={1}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {data?.positions?.map((position) => (
              <Marker
                key={position._id}
                position={[Number(position.lat), Number(position.lon)]}
              />
            ))}
          </MapContainer>
        </div>
      )}
    </div>
  );
}
