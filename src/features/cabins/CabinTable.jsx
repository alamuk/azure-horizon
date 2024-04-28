// import styled from "styled-components";
import Spinner from "../../ui/Spinner.jsx";
import CabinRow from "./CabinRow.jsx";
import { useCabin } from "./useCabin.js";
import Table from "../../ui/Table.jsx";

// const Table = styled.div`
//     border: 1px solid var(--color-grey-200);
//
//     font-size: 1.4rem;
//     background-color: var(--color-grey-0);
//     border-radius: 7px;
//     overflow: hidden;
// `;
export function CabinTable() {
    const { isLoading, cabins } = useCabin();
    if (isLoading) return <Spinner />;

    return (
        <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
            <Table.Header>
                <div> </div>
                <div> Cabin </div>
                <div> Capacity</div>
                <div> Price </div>
                <div> Discount </div>
                <div> </div>
            </Table.Header>
            <Table.Body
                data={cabins}
                render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
            ></Table.Body>
        </Table>
    );
}

export default CabinTable;
