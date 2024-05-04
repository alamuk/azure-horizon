import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "./useBooking.js";
import Spinner from "../../ui/Spinner.jsx";
import { HiArrowDownOnSquare, HiArrowUpOnSquare } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import useCheckout from "../check-in-out/useCheckout.js";

const HeadingGroup = styled.div`
    display: flex;
    gap: 2.4rem;
    align-items: center;
`;

function BookingDetail() {
    const { isLoading, booking } = useBooking();
    const { checkout, isCheckingOut } = useCheckout();
    const navigate = useNavigate();
    const moveBack = useMoveBack();

    // const booking = {};
    // const status = "checked-in";
    // const status = "checked-in";

    if (isLoading) return <Spinner />;
    const { status, id: bookingId } = booking;

    const statusToTagName = {
        unconfirmed: "blue",
        "checked-in": "green",
        "checked-out": "silver",
    };

    return (
        <>
            <Row type="horizontal">
                <HeadingGroup>
                    <Heading as="h1">{bookingId}</Heading>
                    <Tag type={statusToTagName[status]}>
                        {status.replace("-", " ")}
                    </Tag>
                </HeadingGroup>
                <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
            </Row>

            <BookingDataBox booking={booking} />

            <ButtonGroup>
                {status === "unconfirmed" && (
                    <Button
                        icon={<HiArrowDownOnSquare />}
                        onClick={() => navigate(`/checkin/${bookingId}`)}
                    >
                        Check in
                    </Button>
                )}

                {status === "checked-in" && (
                    <Button
                        icon={<HiArrowUpOnSquare />}
                        onClick={() => checkout(bookingId)}
                        disabled={isCheckingOut}
                    >
                        Check Out
                    </Button>
                )}
                <Button variation="secondary" onClick={moveBack}>
                    Back
                </Button>
            </ButtonGroup>
        </>
    );
}

export default BookingDetail;
