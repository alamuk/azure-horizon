import Select from "./Select.jsx";
import { useSearchParams } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export function SortBy({ options }) {
    const [searchParams, setSearchParams] = useSearchParams();
    const sortBy = searchParams.get("sortBy") || "";

    function handleChange(e) {
        searchParams.set("sortBy", e.target.value);
        setSearchParams(searchParams);
    }

    return <Select options={options} type="white" value={sortBy} onChange={handleChange} />;
}

export default SortBy;
