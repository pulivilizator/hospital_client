import {Col, Container, Row, Image } from "react-bootstrap";
import React from "react";
import {useParams} from "react-router-dom";
import {useDetailQuery} from "./hooks";
import apiUrls from "../../../apiUrls";
import {RingLoader} from "react-spinners";
import {DoctorCard, ServiceCard} from "../search/Cards";
import {Doctor as DoctorType} from "../search/types";

const Doctor = () => {
    const {slug} = useParams()
    const {data, isLoading} = useDetailQuery('doctor', slug, apiUrls.doctors)
    return (<>
        {isLoading && <Container className={'d-flex flex-grow-1 justify-content-center align-items-center'}>
                <RingLoader color={'blue'} loading={isLoading}/>
            </Container>}
        {data && 'user' in data && <Container>
            <Row className="mt-5">
                <Col md={3}>
                    <Image src={data.image} roundedCircle fluid />
                </Col>
                <Col md={9}>
                    <h1>{data.user.surname} {data.user.name} {data.user.patronymic}</h1>
                    <p>{data.description}</p>
                </Col>
            </Row>
            <DoctorRelatedInfo direction={data.direction} doctor={data} key={data.id}/>
        </Container>}
        </>
    )
}

const DoctorRelatedInfo: React.FC<{direction: string, doctor: DoctorType}> = ({direction, doctor}) => {
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
                        <h2>Услуги:</h2>
                        {data.services.map((service) => <ServiceCard service={service} key={service.id}/>)}
                    </Col>
                </Row>
                {data.doctors.length > 1 && <Row className="mt-4">
                    <Col>
                        <h2>Другие врачи:</h2>
                        {data.doctors.filter((currentDoctor) => doctorsFilter(currentDoctor, doctor)).map((doctor) => <DoctorCard doctor={doctor} key={doctor.id}/>)}
                    </Col>
                </Row>}
            </>}
        </>
    )
}

function doctorsFilter(currentDoctor: DoctorType, doctor: DoctorType) {
    return JSON.stringify(currentDoctor) !== JSON.stringify(doctor)
}

export default Doctor;