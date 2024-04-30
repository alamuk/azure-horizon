import styled, { css } from "styled-components";
import { useSearchParams } from "react-router-dom";

const StyledFilter = styled.div`
    border: 1px solid var(--color-grey-100);
    background-color: var(--color-grey-0);
    box-shadow: var(--shadow-sm);
    border-radius: var(--border-radius-sm);
    padding: 0.4rem;
    display: flex;
    gap: 0.4rem;
`;

const FilterButton = styled.button`
    background-color: var(--color-grey-0);
    border: none;

    ${(props) =>
        props.active &&
        css`
            background-color: var(--color-brand-600);
            color: var(--color-brand-50);
        `}

    border-radius: var(--border-radius-sm);
    font-weight: 500;
    font-size: 1.4rem;
    /* To give the same height as select */
    padding: 0.44rem 0.8rem;
    transition: all 0.3s;

    &:hover:not(:disabled) {
        background-color: var(--color-brand-600);
        color: var(--color-brand-50);
    }
`;

// eslint-disable-next-line react/prop-types
function Filter({ filterFieldName, valueOptions }) {
    const [searchParams, setSearchParams] = useSearchParams();
    // eslint-disable-next-line react/prop-types
    const currentFilter = searchParams.get(filterFieldName) || valueOptions.at(0).value;

    function handleClick(value) {
        searchParams.set(filterFieldName, value);
        setSearchParams(searchParams);
    }

    return (
        <StyledFilter>
            {/* eslint-disable-next-line react/prop-types */}
            {valueOptions.map((eachBtnData) => (
                <FilterButton
                    key={eachBtnData.value}
                    onClick={() => handleClick(eachBtnData.value)}
                    active={eachBtnData.value === currentFilter}
                >
                    {eachBtnData.label}
                </FilterButton>
            ))}
        </StyledFilter>
    );
}

export default Filter;
