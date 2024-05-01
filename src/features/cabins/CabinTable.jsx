import Spinner from "../../ui/Spinner.jsx";
import CabinRow from "./CabinRow.jsx";
import { useCabin } from "./useCabin.js";
import Table from "../../ui/Table.jsx";
import Menus from "../../ui/Menus.jsx";
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty.jsx";

export function CabinTable() {
    const { isLoading, cabins } = useCabin();
    const [searchParam] = useSearchParams();

    if (isLoading) return <Spinner />;
    if (!cabins.length) return <Empty resourceName="cabins" />;
    console.log(cabins);

    /// 1) FILTER ///
    // eslint-disable-next-line no-unused-vars
    const filterValueName = searchParam.get("discount") || "all";
    let filterCabins;
    if (filterValueName === "all") filterCabins = cabins;
    if (filterValueName === "no-discount")
        filterCabins = cabins.filter((cabin) => cabin.discount === 0);
    if (filterValueName === "with-discount")
        filterCabins = cabins.filter((cabin) => cabin.discount > 0);
    if (isLoading) return <Spinner />;

    /// 2) SORT BY ///
    const sortBy = searchParam.get("sortBy") || "startDate-asc";
    const [field, direction] = sortBy.split("-");
    const modifier = direction === "asc" ? 1 : -1;
    const sortedCabins = filterCabins.sort(
        (a, b) => (a[field] - b[field]) * modifier
    );
    // console.log(modifier, sortedCabins);
    return (
        <Menus>
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
                    data={sortedCabins}
                    render={(cabin) => (
                        <CabinRow cabin={cabin} key={cabin.id} />
                    )}
                ></Table.Body>
            </Table>
        </Menus>
    );
}

export default CabinTable;
