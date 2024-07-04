import {useQueryParams, useSearchQuery} from "./hooks";
import {Filter} from "./types";
import apiUrls from "../../../apiUrls";
import SearchField from "../homepage/SearchField";
import {Container} from "react-bootstrap";
import {RingLoader} from "react-spinners";
import React from "react";
import {ServiceCard} from "./Cards";

const ServiceList = () => {
    const params = useQueryParams()
    const filterData: Filter = {
        direction: params.get('direction'),
        name: params.get('name')
    }
    const {data, isLoading} = useSearchQuery(filterData, apiUrls.services)

   return (
        <>
            <SearchField />
            {isLoading && <Container className={'d-flex flex-grow-1 justify-content-center align-items-center'}>
                <RingLoader color={'blue'} loading={isLoading}/>
            </Container>}
            {data && data.map(service => 'name' in service && <ServiceCard service={service} />)}
        </>
    )
}

export default ServiceList;