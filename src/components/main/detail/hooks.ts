import {useQuery, UseQueryResult} from "react-query";
import {Direction} from "./types";
import axios from "axios";
import {Doctor, Service} from "../search/types";
import apiUrls from "../../../apiUrls";

export function useDetailQuery(key:string, slug: string | undefined, url: string): UseQueryResult<Direction | Doctor | Service> {
    return useQuery(
        [key, slug],
        async () => {
            const response = await axios.get(`${url}/${slug}`);
            return response.data;
        }
    )
}

export function useDoctorServices(name: string): UseQueryResult<Service[]> {
    return useQuery(
        [`doctorServices`, name],
        async () => {
            const response = await axios.get(`${apiUrls.services}?name=${name}`);
            return response.data;
        }
    )
}