import {Alert, Button, Container, Form} from "react-bootstrap";
import React, {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useRegister} from "./hooks";
import routes from "../../../routes";
import {FieldError, RegisterData} from "./types";
import {AuthContext} from "../../../contexsts/authContext/AuthContext";


function Registration() {
    const [agreement, setAgreement] = useState(false)
    const [registerData, setRegisterData] = useState<RegisterData>(
        {
            email: '',
            password: '',
            name: '',
            surname: '',
            patronymic: '',
            phone: '',
            patient: {role: "patient"},
        })
    const [field_error, setError] = useState<FieldError | null>(null)
    const [passwords, setPasswords] = useState({password1: '', password2: ''})

    const navigate = useNavigate()
    const {mutate,
          isSuccess,
          data,
          error} = useRegister()
    const authContext = useContext(AuthContext)
    authContext && authContext.isLoggedIn && navigate(routes.MAIN())

    const registerSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (validatePasswords() && agreement) {
            setRegisterData({...registerData, password: passwords.password1})
            mutate(registerData)
        }
    }


    const changeRegisterData = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
        setRegisterData(prevState => ({
            ...prevState,
            [key]: e.target.value
        }));
    }

    useEffect(() => {
        if (error && error.response) {
            setError(error as FieldError)
        }
        if (isSuccess) {
            navigate(routes.LOGIN())
        }
        }, [isSuccess, data, navigate, error]
    )

    const validatePasswords = () => passwords.password1 === passwords.password2
    return (
        <Container>
            <Form>
                <Form.Group className="mb-4">
                    <Form.Label>Имя</Form.Label>
                    <Form.Control className={'mb-2'} type="text" placeholder="Введите имя"
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => changeRegisterData(e, 'name')}/>

                    {field_error && field_error.response.data.error.name && <Alert variant={'danger'} className={'mt-4'}>
                        {field_error.response.data.error.name}
                    </Alert>}
                    <Form.Label>Фамилия</Form.Label>
                    <Form.Control className={'mb-2'} type="text" placeholder="Введите фамилию"
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => changeRegisterData(e, 'surname')}/>

                    {field_error && field_error.response.data.error.surname && <Alert variant={'danger'} className={'mt-4'}>
                        {field_error.response.data.error.surname}
                    </Alert>}

                    <Form.Label>Отчество</Form.Label>
                    <Form.Control className={'mb-2'} type="text" placeholder="Введите отчество"
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => changeRegisterData(e, 'patronymic')}/>

                    <Form.Label>Номер телефона</Form.Label>
                    <Form.Control className={'mb-2'} type="tel" placeholder="+79199090909"
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => changeRegisterData(e, 'phone')}/>

                    {field_error && field_error.response.data.error.phone && <Alert variant={'danger'} className={'mt-4'}>
                        {field_error.response.data.error.phone}
                    </Alert>}

                    <Form.Label>Дата рождения</Form.Label>
                    <Form.Control type="date"
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => changeRegisterData(e, 'birthday')}/>
                </Form.Group>


                <Form.Group className="mb-4">
                    <Form.Label>Email</Form.Label>
                    <Form.Control className={'mb-2'} type="email" placeholder="Введите email"
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => changeRegisterData(e, 'email')}/>

                    {field_error && field_error.response.data.error.email && <Alert variant={'danger'} className={'mt-4'}>
                        {field_error.response.data.error.email}
                    </Alert>}

                    <Form.Label>Пароль</Form.Label>
                    <Form.Control className={'mb-2'} type="password" placeholder="Введите пароль"
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                setPasswords({...passwords, password1: e.target.value});
                                setRegisterData({...registerData, password: e.target.value});
                            }

                    }/>

                    {field_error && field_error.response.data.error.password && <Alert variant={'danger'} className={'mt-4'}>
                        {field_error.response.data.error.password}
                    </Alert>}

                    <Form.Label>Повторите пароль</Form.Label>
                    <Form.Control className={'mb-2'} type="password" placeholder="Повторите пароль"
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                setPasswords({...passwords, password2: e.target.value});
                            }
                    }/>
                    {!validatePasswords() && <Alert variant={'danger'} className={'mt-4'}>
                        Пароли не совпадают
                    </Alert>}
                </Form.Group>

                <Form.Check type="checkbox"
                            label="Я даю согласие на обработку персональных данных"
                            id="registerCheck"
                            defaultChecked={agreement}
                            onChange={() => setAgreement(!agreement)}
                />

                <Button type="submit" variant="primary" className="btn-block mt-4 w-100" onClick={registerSubmit}>Зарегистрироваться</Button>
            </Form>
            {
                !agreement &&
                <Alert variant="danger" className="mt-4">
                    Необходимо дать согласие на обработку персональных данных
                </Alert>
            }
        </Container>
    )
}

export default Registration;