import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../../services/apiBookings.js";
import { useParams } from "react-router-dom";

export function useBooking() {
    //  we give the param name in router in app.js as :bookingId
    const { bookingId } = useParams();

    const { isLoading, data: booking } = useQuery({
        queryKey: ["booking", bookingId],
        queryFn: () => getBooking(bookingId),
        retry: false,
    });
    console.log(bookingId);

    return { isLoading, booking };
}
