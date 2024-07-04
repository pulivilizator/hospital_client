import {useLocation} from "react-router-dom";
import {useQuery, UseQueryResult} from "react-query";
import axios from "axios";
import {Filter, SearchResult} from "./types";

export function useQueryParams() {
    return new URLSearchParams(useLocation().search)
}

export function useSearchQuery(filterData: Filter, url: string): UseQueryResult<[SearchResult]> {
    return useQuery(
        [`search`, filterData],
        async () => {
            const response = await axios.get(url, {params: filterData});
            return response.data;
        }
    )
}