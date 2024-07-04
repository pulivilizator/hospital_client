import {useQuery, UseQueryResult} from "react-query";
import axios from "axios";
import apiUrls from "../../../apiUrls";
import {Directions} from "./types";

export function useHomepageServices(): UseQueryResult<Directions> {
    return useQuery(
        `homepageServices`,
        async () => {
            const response = await axios.get(apiUrls.homepageDirections);
            return response.data;
        }
    )
}

export function useDoctorsSpecialties(): UseQueryResult<[{specialty: string}]> {
    return useQuery(
        `homepageDoctorsSpecialties`,
        async () => {
            const response = await axios.get(apiUrls.homepageDoctorsSpecialties);
            return response.data;
        }
    )
}

export function useDirections(): UseQueryResult<[{name: string}]> {
    return useQuery(
        `homepageDirections`,
        async () => {
            const response = await axios.get(apiUrls.directions);
            return response.data;
        }
    )
}