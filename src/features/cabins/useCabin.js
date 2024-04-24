import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins.js";

export function useCabin() {
    const {
        isLoading,
        data: cabins,
        // eslint-disable-next-line no-unused-vars
        error,
    } = useQuery({
        queryKey: ["cabins"],
        queryFn: getCabins,
    });

    return { isLoading, cabins };
}
