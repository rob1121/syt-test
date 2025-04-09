"use client";

import useGetYacht from "@/lib/hooks/useGetYacht";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { useDebounce } from "use-debounce";
import { Yacht } from "@/types/yatch";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Dialog, DialogContent, DialogHeader } from "./ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import YachtDetails from "./yatch-tab/yacht-details";
import YachtTab from "./yatch-tab";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import YachtDialog from "./yacht-dialog";

export default function YachtList() {
  const [text, setText] = useState("");
  const [search] = useDebounce(text, 500);
  const [selectedYacht, setSelectedYacht] = useState<Yacht | null>(null);
  const { data, isLoading, error } = useGetYacht({ search });

  return (
    <>
      <div className="flex flex-col gap-8 w-full">
        <Input
          type="text"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setText(e.target.value);
          }}
          placeholder="Search by yacht name, previous name, or build year..."
        />
        <div className="border-b" />
        {isLoading && <div className="flex justify-center">Loading...</div>}
        {((!isLoading && data?.yacht_likes?.length === 0) || !!error) && (
          <div className="flex justify-center">No yacht found</div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data?.yacht_likes?.map((yacht: Yacht) => (
            <Card key={yacht.id} onClick={() => setSelectedYacht(yacht)} className="cursor-pointer">
              <CardHeader>
                <CardTitle>{yacht.name}</CardTitle>
                <CardDescription>
                  {yacht.previous_names?.join(", ")}
                </CardDescription>
                <CardDescription>{yacht.build_year}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
      <YachtDialog yacht={selectedYacht} open={!!selectedYacht} onClose={() => setSelectedYacht(null)} />
    </>
  );
}
