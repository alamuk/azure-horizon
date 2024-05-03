import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings.js";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants.js";

export function useBookings() {
    const queryClient = useQueryClient();
    const [searchParams] = useSearchParams();

    // 1. FILTER //
    const filterValue = searchParams.get("status");

    const firstCheck = !filterValue || filterValue === "all";
    const secondCheck = { field: "status", value: filterValue };

    const filter = firstCheck ? null : secondCheck;
    // !filterValue || filterValue === "all" ? null : { field: "status", value: filterValue };

    // { field: "totalPrice", value: 5000, method: "gte" };

    // 2. SORT BY //

    const sortByRaw = searchParams.get("sortBy") || "startDate-desc";
    const [field, direction] = sortByRaw.split("-");
    const sortBy = { field: field, direction: direction };

    // 3. PAGINATION //
    const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

    const {
        isLoading,
        data: { data: bookings, count } = {},
        // initially data will not exist in that case we will {} object run
        // the database
        // const { auction: { auction: { end_time = null } = {} } = {} } = this.props || {};
        error,
    } = useQuery({
        queryKey: ["bookings", filter, sortBy, page],
        queryFn: () => getBookings({ filter, sortBy, page }),
    });

    // 4.PRE-FETCHING  // learn infinite query later
    const pageCount = Math.ceil(count / PAGE_SIZE);
    if (page < pageCount)
        queryClient.prefetchQuery({
            queryKey: ["bookings", filter, sortBy, page + 1],
            queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
        });

    if (page < 1)
        queryClient.prefetchQuery({
            queryKey: ["bookings", filter, sortBy, page - 1],
            queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
        });

    return { isLoading, error, bookings, count };
}
