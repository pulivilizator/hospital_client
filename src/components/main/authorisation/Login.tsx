import {Button, Form, Row, Container, Alert} from 'react-bootstrap';
import React, {useContext, useEffect, useState} from "react";
import {useLogin} from "./hooks";
import {AxiosError} from "axios";
import {Link, useNavigate} from "react-router-dom";
import routes from "../../../routes";
import {AuthContext} from "../../../contexsts/authContext/AuthContext";
import {Trash} from "react-bootstrap-icons";

const Login: React.FC = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()
    const {mutate,
        isError,
        isSuccess,
        data,
        error} = useLogin()

    const loginSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      mutate({email, password})
    }
    const authContext = useContext(AuthContext)
    authContext && authContext.isLoggedIn && navigate(routes.MAIN())

    useEffect(() => {
        if (data) {
            localStorage.setItem('refreshToken', data.refresh)
            localStorage.setItem('accessToken', data.access)
        }
            if (isSuccess) {
                authContext && authContext.setLoggedIn(true)
                navigate(routes.MAIN())
            }
        }, [isSuccess, data, navigate, authContext]
    )

    return (
        <Container>
            <Form>
              <Form.Group className="mb-4" controlId="loginEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email"
                              placeholder="Введите Email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-4" controlId="loginPassword">
                <Form.Label>Пароль</Form.Label>
                <Form.Control type="password"
                              placeholder="Введите пароль"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              <Row className="mb-4">
                    <Link to={routes.RESET_PASSWORD()}>
                        Забыли пароль?
                    </Link>
              </Row>

              <Button type="submit" variant="primary" className="btn-block mb-4 w-100" onClick={loginSubmit}>Войти</Button>

            </Form>
            {isError && (
              <Alert variant="danger" className="mt-4">
                {error && getErrorMessage(error)}
              </Alert>
            )}
        </Container>
    );
};

function getErrorMessage(error: AxiosError): string {
  const status = error.response?.status
  switch (status) {
    case 400: return 'Не указан логин или пароль'
    case 401: return 'Неверный логин или пароль'
    default: return error.message
  }
}

export default Login;
