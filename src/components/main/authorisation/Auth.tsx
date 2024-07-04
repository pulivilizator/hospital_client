import React, {ReactNode} from "react";
import {Col, Container, Nav} from "react-bootstrap";

import routes from "../../../routes";
import {LinkContainer} from "react-router-bootstrap";
import {useLocation} from "react-router-dom";


const Auth: React.FC<{component: ReactNode}> = ({component}) => {
    const {pathname} = useLocation()
    const isRegistrationActive = pathname === routes.REGISTRATION()
    const isLoginActive = pathname === routes.LOGIN()

    return (
            <Container className={'d-flex justify-content-center align-items-center flex-column flex-grow-1'}>
                <Col lg={3}>
                  <Nav variant="pills" className="nav-justified mb-3">
                    <Nav.Item>
                        <LinkContainer to={routes.LOGIN()}>
                            <Nav.Link active={isLoginActive}>
                                Вход
                            </Nav.Link>
                        </LinkContainer>
                    </Nav.Item>
                    <Nav.Item>
                        <LinkContainer to={routes.REGISTRATION()}>
                            <Nav.Link active={isRegistrationActive}>
                                Регистрация
                            </Nav.Link>
                        </LinkContainer>
                    </Nav.Item>
                  </Nav>

                  <Container>
                      {component}
                  </Container>
                </Col>
            </Container>
    )
}

export default Auth;