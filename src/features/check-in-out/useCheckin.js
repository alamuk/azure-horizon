import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings.js";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useCheckin() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { mutate: checkin, isLoading: isCheckingIn } = useMutation({
        mutationFn: (bookingId) =>
            updateBooking(bookingId, {
                status: "checked-in",
                isPaid: true,
            }),

        onSuccess: (data) => {
            toast.success(`Booking # ${data.id}successfully checked in!`);
            queryClient.invalidateQueries({ active: true });
            navigate("/");
        },
        onError: () => toast.error("There was an error while check in"),
    });

    return { checkin, isCheckingIn };
}

export default useCheckin;
