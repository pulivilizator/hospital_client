import React, {useContext} from "react";
import {Button, ButtonGroup, Container, Image, Nav, Navbar} from "react-bootstrap";
import routes from "../../routes";
import {LinkContainer} from "react-router-bootstrap";
import {useLocation} from "react-router-dom";
import {NavProps} from "./types";
import {AuthContext} from "../../contexsts/authContext/AuthContext";

const Header: React.FC = () => {
    const authContext = useContext(AuthContext)

    const handleLogout = () => {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        authContext && authContext.setLoggedIn(false)
    }

    return (
        <header className={'mb-4'}>
            <Navbar expand="sm" className="bg-body-tertiary">
                <Container>
                    <LinkContainer to={routes.MAIN()}>
                        <Navbar.Brand href="#home"><Image width={60} height={60} fluid={true} src={'/logo.svg'}></Image></Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                          <NavLink to={routes.LOGIN()}>Найти врача</NavLink>
                          <NavLink to={routes.LOGIN()}>Пациентам и посетителям</NavLink>
                          <NavLink to={routes.LOGIN()}>Платные услуги</NavLink>
                          <NavLink to={routes.LOGIN()}>Контакты</NavLink>

                        </Nav>
                        {authContext && authContext.isLoggedIn
                            ? <ButtonGroup>
                                <Button><NavLink to={routes.PROFILE()}>Профиль</NavLink></Button>
                                <Button onClick={handleLogout}>Выйти</Button>
                            </ButtonGroup>
                            : <Button><NavLink to={routes.LOGIN()}>Войти</NavLink></Button>}
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

const NavLink: React.FC<NavProps> = ({ to, children }) => {
    const location = useLocation();
    const isActive = to === location.pathname;

    return (
        <LinkContainer to={to}>
            <Nav.Link disabled={isActive}>{children}</Nav.Link>
        </LinkContainer>
    );
};

export default Header;