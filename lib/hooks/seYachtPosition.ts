import { addYachtPosition } from "@/services/mutation";
import { getPositionById } from "@/services/query";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "sonner";

export default function useYachtPosition({yachtLikeId}: {yachtLikeId: number}) {
  const queryClient = useQueryClient();
  const {data, isLoading, error} = useQuery({
    queryKey: ['yacht-position', yachtLikeId],
    queryFn: () => getPositionById({yachtLikeId}),
    refetchOnWindowFocus: false,
    retry: 1,
    cacheTime: 1000 * 60 * 60 * 24, // 1 day in milliseconds
    staleTime: 1000 * 60 * 60 * 24, // 1 day in milliseconds
    onError: (error) => {
      console.error("Failed to fetch yacht data", error);
      toast.error("Failed to fetch yacht data");
    },
  });

  const addPositionMutation = useMutation({
    mutationFn: addYachtPosition,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['yacht-position', yachtLikeId] });
      toast.success("Yacht position added successfully");
    },
    onError: (error) => {
      console.error("Failed to add yacht position", error);
      toast.error("Failed to add yacht position");
    },
  })
  return { data, isLoading, error, addPositionMutation };
}