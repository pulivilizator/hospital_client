import {useParams} from "react-router-dom";
import {useDetailQuery} from "./hooks";
import apiUrls from "../../../apiUrls";
import {Col, Container, Row} from "react-bootstrap";
import {RingLoader} from "react-spinners";
import {DoctorCard, ServiceCard} from "../search/Cards";
import React from "react";
import {Service as ServiceType} from "../search/types";

const Service = () => {
    const {slug} = useParams()
    const {data, isLoading} = useDetailQuery('direction', slug, apiUrls.services)
    console.log(data)
    return (
        <>
        {isLoading && <Container className={'d-flex flex-grow-1 justify-content-center align-items-center'}>
                <RingLoader color={'blue'} loading={isLoading}/>
            </Container>}
        {data && 'price' in data && <Container className="mt-5">
            <Row>
                <Col className="text-center">
                    <h1>{data.name}</h1>
                </Col>
            </Row>
            <Row>
                <Col className="text-center mt-3">
                    <p>{data.description}</p>
                </Col>
            </Row>
            <ServiceRelatedInfo direction={data.direction_slug} service={data} />
        </Container>}
        </>
    );
}

const ServiceRelatedInfo: React.FC<{direction: string, service: ServiceType}> = ({direction, service}) => {
    const {data, isLoading} = useDetailQuery('direction', direction, apiUrls.directions)
    return (
        <>
        {isLoading && <Container className={'d-flex flex-grow-1 justify-content-center align-items-center'}>
                <RingLoader color={'blue'} loading={isLoading}/>
        </Container>}
        {data && 'doctors' in data &&
            <>
                <Row className="mt-4">
                    <Col>
                        <h2>Врачи:</h2>
                        {data.doctors.map((doctor) => <DoctorCard doctor={doctor} key={doctor.id}/>)}
                    </Col>
                </Row>
                {data.services.length > 1 && <Row className="mt-4">
                    <Col>
                        <h2>Другие услуги:</h2>
                        {data.services.filter((currentService) => servicesFilter(currentService, service)).map((service) => <ServiceCard service={service} key={service.id}/>)}
                    </Col>
                </Row>}
            </>}
        </>
    )
}

function servicesFilter(currentService: ServiceType, service: ServiceType) {
    return JSON.stringify(currentService) !== JSON.stringify(service)
}

export default Service;