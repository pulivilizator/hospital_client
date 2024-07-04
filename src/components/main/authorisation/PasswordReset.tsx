import {Alert, Button, Container, Form} from "react-bootstrap";
import {useEffect, useState} from "react";
import {usePasswordReset} from "./hooks";
import {FadeLoader} from "react-spinners";

const PasswordReset = () => {
    const [posted, setPosted] = useState(false)
    const [email, setEmail] = useState('')
    const {mutate, data, error, isLoading} = usePasswordReset()

    const sendEmail = () => {
        mutate(email)
    }

    useEffect(() => {
        if (data && !error) {
            setPosted(true)
        }
    }, [data, error])
    return (
        !posted
        ?
        (<Container className={'d-flex justify-content-center align-items-center flex-grow-1 w-50 flex-column'}>
            <Form.Label>Введите Email привязанный к аккаунту</Form.Label>
            <Form.Control placeholder={'Введите ваш Email'} type={'email'} name={'email'} onChange={(e) => setEmail(e.target.value)}></Form.Control>
            <Button variant={'primary'} className={'mt-4 w-100'} onClick={sendEmail}>Отправить письмо</Button>
            {error?.response?.status === 400 && <Alert className={'mt-4'} variant={'danger'}>
                Пользователь с таким email не найден
            </Alert>}
            <FadeLoader className={'mt-4'} color={'#36d7b7'} loading={isLoading}/>
        </Container>)
        :
        (<Container className={'d-flex justify-content-center align-items-center flex-grow-1'}>
            Для продолжения перейдите по ссылке в сообщении отправленном на указанную почту
        </Container>)
    )
}

export default PasswordReset;