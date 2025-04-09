import { Yacht } from "@/types/yatch";

export default function YachtDetails({ yacht }: { yacht: Yacht }) {
  if (!yacht) {
    return null;
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <span className="font-bold">Name:</span>
        <span>{yacht?.name}</span>
      </div>
      <div className="flex flex-col gap-2">
        <span className="font-bold">Previous Names:</span>
        <span>{yacht?.previous_names?.join(", ")}</span>
      </div>
      <div className="flex flex-col gap-2">
        <span className="font-bold">Build Year:</span>
        <span>{yacht?.build_year}</span>
      </div>
    </div>
  );
}
