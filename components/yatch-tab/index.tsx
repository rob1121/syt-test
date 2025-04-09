import { Yacht } from "@/types/yatch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import YachtDetails from "./yacht-details";
import YachtPastPosition from "./yacht-past-position";
import dynamic from "next/dynamic";

const YachtLocationHistory = dynamic(() => import("./yacht-location-history"), {
    ssr: false
});

export default function YachtTab({ yacht }: { yacht: Yacht }) {
  if (!yacht) {
    return null;
  }

  return (
    <Tabs defaultValue="past-locations" className="w-full min-h-[200px]">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="past-locations">Past Locations</TabsTrigger>
        <TabsTrigger value="past-positions">Past Positions</TabsTrigger>
        <TabsTrigger value="yacht-details">Yacht Details</TabsTrigger>
      </TabsList>
      <TabsContent value="past-locations">
        <YachtLocationHistory yachtLikeId={yacht.yacht_like_id} />
      </TabsContent>
      <TabsContent value="past-positions">
        <YachtPastPosition yachtLikeId={yacht.yacht_like_id} />
      </TabsContent>
      <TabsContent value="yacht-details">
        <YachtDetails yacht={yacht} />
      </TabsContent>
    </Tabs>
  );
}
