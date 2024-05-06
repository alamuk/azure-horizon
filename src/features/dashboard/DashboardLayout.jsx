import styled from "styled-components";

const StyledDashboardLayout = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: auto 34rem auto;
    gap: 2.4rem;
`;

export function DashboardLayout() {
    return (
        <StyledDashboardLayout>
            <div>Dashboard</div>
            <div>activities</div>
            <div>stay duration</div>
            <div>Charts</div>
        </StyledDashboardLayout>
    );
}
