import styled from "styled-components";
import Logout from "../features/authentication/Logout.jsx";
import HeaderMenu from "./HeaderMenu.jsx";
import { UserAvatar } from "../features/authentication/UserAvatar.jsx";

const StyleHeader = styled.header`
    background-color: var(--color-grey-0);
    padding: 1.2rem 4.8rem;
    border-bottom: 1px solid var(--color-grey-100);

    display: flex;
    gap: 2.4rem;
    align-items: center;
    justify-content: flex-end;
`;

export function Header() {
    return (
        <StyleHeader>
            <UserAvatar />
            <HeaderMenu />
        </StyleHeader>
    );
}

export default Header;
