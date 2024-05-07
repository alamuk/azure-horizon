import styled from "styled-components";
import { useRecentBookings } from "./useRecentsBookings.js";
import Spinner from "../../ui/Spinner.jsx";
import { useRecentStays } from "./useRecentStays.js";
import Stats from "./Stats.jsx";
import { useCabin } from "../cabins/useCabin.js";

const StyledDashboardLayout = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: auto 34rem auto;
    gap: 2.4rem;
`;

export function DashboardLayout() {
    const { isLoading, bookings } = useRecentBookings();
    const {
        isLoading: staysLoading,
        confirmedStays,
        stays,
        numDays,
    } = useRecentStays();
    const { cabins, isLoading: cabinsLoading } = useCabin();
    console.log(cabins);
    if (isLoading || staysLoading || cabinsLoading) return <Spinner />;
    console.log(bookings);

    return (
        <StyledDashboardLayout>
            <Stats
                bookings={bookings}
                confirmedStays={confirmedStays}
                numDays={numDays}
                cabinCount={cabins.length}
            />
            <div>activities</div>
            <div>stay duration</div>
            <div>Charts</div>
        </StyledDashboardLayout>
    );
}
