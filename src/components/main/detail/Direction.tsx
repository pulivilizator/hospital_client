import {useParams} from "react-router-dom";
import React from "react";
import {Container, Row, Col} from "react-bootstrap";
import {DoctorCard, ServiceCard} from "../search/Cards";
import {useDetailQuery} from "./hooks";
import apiUrls from "../../../apiUrls";
import {RingLoader} from "react-spinners";

const Direction = () => {
    const {slug} = useParams()
    const {data, isLoading} = useDetailQuery('direction', slug, apiUrls.directions)

    return (
        <>
        {isLoading && <Container className={'d-flex flex-grow-1 justify-content-center align-items-center'}>
                <RingLoader color={'blue'} loading={isLoading}/>
            </Container>}
        {data && 'doctors' in data && <Container className="mt-5">
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
            <Row className={'mt-4'}>
                <h2>Услуги:</h2>
                <Col>
                    {data.services.map((service) => <ServiceCard service={service} />)}
                </Col>
            </Row>
            <Row className={'mt-4'}>
                <h2>Врачи:</h2>
                <Col>
                    {data.doctors.map((doctor) => <DoctorCard doctor={doctor} />)}
                </Col>
            </Row>
        </Container>}
        </>
    );
}

export default Direction;