import styled from "styled-components";
import { format, isToday } from "date-fns";

import Tag from "../../ui/Tag";
import Table from "../../ui/Table";

import { formatCurrency } from "../../utils/helpers";
import { formatDistanceFromNow } from "../../utils/helpers";
import Menus from "../../ui/Menus.jsx";
import { HiArrowUp, HiEye } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { HiArrowDownOnSquare, HiArrowUpOnSquare } from "react-icons/hi2";
import useCheckout from "../check-in-out/useCheckout.js";

const Cabin = styled.div`
    font-size: 1.6rem;
    font-weight: 600;
    color: var(--color-grey-600);
    font-family: "Sono";
`;

const Stacked = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.2rem;

    & span:first-child {
        font-weight: 500;
    }

    & span:last-child {
        color: var(--color-grey-500);
        font-size: 1.2rem;
    }
`;

const Amount = styled.div`
    font-family: "Sono";
    font-weight: 500;
`;

function BookingRow({
    // eslint-disable-next-line react/prop-types
    booking: {
        // eslint-disable-next-line react/prop-types
        id: bookingId,
        // eslint-disable-next-line react/prop-types
        created_at,
        // eslint-disable-next-line react/prop-types
        startDate,
        // eslint-disable-next-line react/prop-types
        endDate,
        // eslint-disable-next-line react/prop-types
        numNights,
        // eslint-disable-next-line react/prop-types
        numGuests,
        // eslint-disable-next-line react/prop-types
        totalPrice,
        // eslint-disable-next-line react/prop-types
        status,
        // eslint-disable-next-line react/prop-types
        guests: { fullName: guestName, email },
        // eslint-disable-next-line react/prop-types
        cabins: { name: cabinName },
    },
}) {
    const navigate = useNavigate();
    const { checkout, isCheckingOut } = useCheckout();
    const statusToTagName = {
        unconfirmed: "blue",
        "checked-in": "green",
        "checked-out": "silver",
    };

    return (
        <Table.Row>
            <Cabin>{cabinName}</Cabin>

            <Stacked>
                <span>{guestName}</span>
                <span>{email}</span>
            </Stacked>

            <Stacked>
                <span>
                    {isToday(new Date(startDate))
                        ? "Today"
                        : formatDistanceFromNow(startDate)}{" "}
                    &rarr; {numNights} night stay
                </span>
                <span>
                    {format(new Date(startDate), "MMM dd yyyy")} &mdash;{" "}
                    {format(new Date(endDate), "MMM dd yyyy")}
                </span>
            </Stacked>
            {/*eslint-disable-next-line react/prop-types*/}
            <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>

            <Amount>{formatCurrency(totalPrice)}</Amount>

            <Menus.Menu>
                <Menus.Toggle id={bookingId} />
                <Menus.List id={bookingId}>
                    <Menus.Button
                        icon={<HiEye />}
                        onClick={() => navigate(`/bookings/${bookingId}`)}
                    >
                        See details
                    </Menus.Button>

                    {status === "checked-in" && (
                        <Menus.Button
                            icon={<HiArrowUpOnSquare />}
                            onClick={() => checkout(bookingId)}
                            disabled={isCheckingOut}
                        >
                            Check out
                        </Menus.Button>
                    )}

                    {status === "unconfirmed" && (
                        <Menus.Button
                            icon={<HiArrowDownOnSquare />}
                            onClick={() => navigate(`/checkin/${bookingId}`)}
                        >
                            Check in
                        </Menus.Button>
                    )}
                </Menus.List>
            </Menus.Menu>
        </Table.Row>
    );
}

export default BookingRow;
