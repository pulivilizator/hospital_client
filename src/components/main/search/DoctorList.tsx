import {useQueryParams, useSearchQuery} from "./hooks";
import {Filter} from "./types";
import apiUrls from "../../../apiUrls";
import {Container} from 'react-bootstrap';
import React from "react";
import SearchField from "../homepage/SearchField";
import {RingLoader} from "react-spinners";
import {DoctorCard} from "./Cards";

const DoctorList = () => {
    const params = useQueryParams()
    const filterData: Filter = {
        specialty: params.get('specialty'),
        name: params.get('name')
    }
    const {data, isLoading} = useSearchQuery(filterData, apiUrls.doctors)
    return (
        <>
            <SearchField />
            {isLoading && <Container className={'d-flex flex-grow-1 justify-content-center align-items-center'}>
                <RingLoader color={'blue'} loading={isLoading}/>
            </Container>}
            {data && data.map(doctor => <p>{'user' in doctor && <DoctorCard doctor={doctor} />}</p>)}
        </>
    )
}

export default DoctorList;