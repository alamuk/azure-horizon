import { useUser } from "../features/authentication/useUser.js";
import Spinner from "./Spinner.jsx";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const FullPage = styled.div`
    height: 100vh;
    background-color: var(--color-grey-50);
    display: flex;
    align-items: center;
    justify-content: center;
`;
// eslint-disable-next-line react/prop-types
export function ProtectedRoute({ children }) {
    const navigate = useNavigate();
    const { isLoading, isAuthenticated } = useUser();
    useEffect(
        function () {
            if (!isAuthenticated && !isLoading) navigate("/login");
        },
        [isAuthenticated, isLoading, navigate]
    );

    if (isLoading)
        return (
            <FullPage>
                <Spinner />
            </FullPage>
        );

    if (isAuthenticated) return children;
}

export default ProtectedRoute;

//  Steps to follow for this ??
// 1. Load the Authenticated user
//   ?? need to make a function in service Api to connect with supabase with
//   current user

// 2. while loading, show a spinner

// 3. if there is NO authenticated user, Re-direct to the /login ( most
// important)
// note: navigate function is only be use in a Callback Function
// /or/ useEffect()
// 4. if there IS a user, render the app
