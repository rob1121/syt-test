import { Yacht } from "@/types/yatch";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import YachtTab from "./yatch-tab";
import { useEffect, useState } from "react";
import YachtPositionForm from "./yacht-position-form";

export default function YachtDialog({
  yacht,
  open,
  onClose,
}: {
  yacht: Yacht | null;
  open: boolean;
  onClose: () => void;
}) {
  const [mode, setMode] = useState<"add" | "view">("view");
  const handleClose = () => {
    setMode("view");
  };

  useEffect(() => {
    if (!open) {
      setMode("view");
    }
  }, [open]);

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        if (!open) {
          onClose();
        }
      }}
    >
      {yacht && (
        <DialogContent className="min-w-[800px]">
          <DialogHeader>
            <div className="flex gap-4 items-center">
              <DialogTitle className="text-2xl">{yacht?.name}</DialogTitle>
              {mode === "view" && (
                <Button
                  onClick={() => {
                    setMode("add");
                  }}
                >
                  <Plus />
                </Button>
              )}
            </div>
          </DialogHeader>
          {mode === "view" && <YachtTab yacht={yacht!} />}
          {mode === "add" && (
            <YachtPositionForm
              yachtLikeId={yacht!.yacht_like_id}
              onClose={handleClose}
            />
          )}
        </DialogContent>
      )}
    </Dialog>
  );
}
