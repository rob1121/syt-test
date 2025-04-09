import useYachtPosition from "@/lib/hooks/seYachtPosition";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";

export default function YachtPastPosition({ yachtLikeId }: { yachtLikeId: number }) {
    const { data, isLoading } = useYachtPosition({ yachtLikeId });

    if(isLoading) {
        return <div>Loading...</div>;
    }

    if(!data?.positions?.length) {
        return <div>No positions found</div>;
    }
    
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Latitude</TableHead>
            <TableHead>Longitude</TableHead>
            <TableHead>Notes</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.positions?.map((position) => (
            <TableRow key={position._id}>
              <TableCell>{position.date_time}</TableCell>
              <TableCell>{position.lat}</TableCell>
              <TableCell>{position.lon}</TableCell>
              <TableCell>{position.notes}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}