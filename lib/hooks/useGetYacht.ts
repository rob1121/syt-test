import { getYacht } from "@/services/query";
import { useQuery } from "react-query";
import { toast } from "sonner";

export default function useGetYacht({search}: {search: string}) {
    const {data, isLoading, error} = useQuery({
        queryKey: ['yacht', search],
        queryFn: () => getYacht({search}),
        refetchOnWindowFocus: false,
        retry: 1,
        cacheTime: 1000 * 60 * 60 * 24, // 1 day in milliseconds
        staleTime: 1000 * 60 * 60 * 24, // 1 day in milliseconds
        onError: (error) => {
            console.error("Failed to fetch yacht data", error);
            toast.error("Failed to fetch yacht data");
        },
    });
    return { data, isLoading, error };
}