import React from "react";
import {Doctor, Service} from "./types";
import {Card, Col, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import routes from "../../../routes";

export const DoctorCard: React.FC<{ doctor: Doctor }> = ({doctor}) => {
    return (
        <Card className="my-3 p-3">
            <Row noGutters>
                <Col md={2} className="d-flex align-items-center">
                    <Card.Img
                        variant="top"
                        src={doctor.image}
                        alt="Photo"
                        className="img-fluid rounded"
                        style={{width: '100px', height: '100px', objectFit: 'cover'}}
                    />
                </Col>
                <Col md={8} className="d-flex flex-column justify-content-center">
                    <Card.Body>
                        <Link to={routes.DOCTOR_DETAIL(doctor.slug)} className={'text-decoration-none'}>
                            <Card.Title>
                                {doctor.user.surname} {doctor.user.name} {doctor.user.patronymic}
                            </Card.Title>
                        </Link>
                        <Card.Text>{doctor.specialty}</Card.Text>
                    </Card.Body>
                </Col>
                <Col md={2} className="d-flex align-items-center justify-content-end">
                    <Link to={routes.DOCTOR_DETAIL(doctor.slug)}>Подробнее</Link>
                </Col>
            </Row>
        </Card>
    );
};
export const ServiceCard: React.FC<{ service: Service }> = ({service}) => {
    return (
        <Card className="my-3 p-3">
            <Row>
                <Col md={10}>
                    <Card.Body>
                        <Link to={routes.SERVICE_DETAIL(service.slug)} className={'text-decoration-none'}>
                            <Card.Title>{service.name}</Card.Title>
                        </Link>
                        <Card.Text>{service.description.slice(0, 200) + '....'}</Card.Text>
                    </Card.Body>
                </Col>
                <Col md={2} className="d-flex flex-column justify-content-between align-items-end p-3">
                    <div>{Number(service.price)} руб.</div>
                    <Link to={routes.SERVICE_DETAIL(service.slug)}>Подробнее</Link>
                </Col>
            </Row>
        </Card>
    );
}