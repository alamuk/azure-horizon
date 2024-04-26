import styled from "styled-components";
import { HiXMark } from "react-icons/hi2";
import { createPortal } from "react-dom";
import { cloneElement, createContext, useContext, useState } from "react";
import { useOutsideClick } from "../hooks/useOutsideClick.js";

const StyledModal = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: var(--color-grey-0);
    border-radius: var(--border-radius-lg);
    box-shadow: var(--shadow-lg);
    padding: 3.2rem 4rem;
    transition: all 0.5s;
`;
// eslint-disable-next-line no-unused-vars
const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: var(--backdrop-color);
    backdrop-filter: blur(4px);
    z-index: 1000;
    transition: all 0.5s;
`;

// eslint-disable-next-line no-unused-vars
const Button = styled.button`
    background: none;
    border: none;
    padding: 0.4rem;
    border-radius: var(--border-radius-sm);
    transform: translateX(0.8rem);
    transition: all 0.2s;
    position: absolute;
    top: 1.2rem;
    right: 1.9rem;

    &:hover {
        background-color: var(--color-grey-100);
    }

    & svg {
        width: 2.4rem;
        height: 2.4rem;
        /* Sometimes we need both */
        /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
        color: var(--color-grey-500);
    }
`;
// ----------------
//  Recipe for the COMPOUND COMPONENT Pattern:
// --------------------------------------------
// 1. create context with the name of the variable
// -------------
// 2. create parent component: use context.provide with value
// * <CounterContext.Provider value={{count, increase, decrease}}>
// which function export default
// --------------

// 3. create child component to help implement the common tasks of this overall compound component:
// make all the child function by using-- useContext(CounterContext) -- hook
// --------------
// 4. add child component as  properties to the parent component (optional)

// ----------------------------------------------------
// eslint-disable-next-line react/prop-types
const ModalContext = createContext();

// eslint-disable-next-line react/prop-types
function Modal({ children }) {
    const [openModal, setOpenModal] = useState("");

    const close = () => setOpenModal("");
    const open = setOpenModal;

    return (
        <ModalContext.Provider value={{ openModal, open, close }}>
            {children}
        </ModalContext.Provider>
    );
}

function OpenComp({ children, opens: openWindowName }) {
    const { open } = useContext(ModalContext);

    return cloneElement(children, { onClick: () => open(openWindowName) });
}

// eslint-disable-next-line react/prop-types
function WindowComp({ children, name }) {
    const { openModal, close } = useContext(ModalContext);
    const ref = useOutsideClick(close);
    if (name !== openModal) return null;

    return createPortal(
        <Overlay>
            <StyledModal ref={ref}>
                <Button onClick={close}>
                    <HiXMark />
                </Button>
                <div> {cloneElement(children, { onCloseModal: close })} </div>
            </StyledModal>
        </Overlay>,
        document.body
    );
}

Modal.OpenComp = OpenComp;
Modal.WindowComp = WindowComp;
export default Modal;
