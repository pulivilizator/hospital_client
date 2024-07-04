import React, { useState } from 'react';
import { Form, Button, ButtonGroup, ToggleButton, Row, Col } from 'react-bootstrap';
import {SearchButtonProps, SearchType} from "./types";
import {useDirections, useDoctorsSpecialties} from "./hooks";
import {useNavigate} from "react-router-dom";
import routes from "../../../routes";

const SearchField = () => {
    const [searchType, setSearchType] = useState<SearchType>('doctor');
    const [inputText, setInputText] = useState('');
    const [specialty, setSpecialty] = useState('');
    const [service, setService] = useState('');
    const navigate = useNavigate()

    const handleSearchTypeChange = (e: any) => {
        setSearchType(e.currentTarget.value);
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const params = new URLSearchParams();
        params.append('name', inputText)
        if (specialty) {
            params.append('specialty', specialty)
            navigate(`${routes.DOCTOR_LIST()}?${params.toString()}`)
        } else if (service) {
            params.append('direction', service)
            navigate(`${routes.SERVICE_LIST()}?${params.toString()}`)
        }
    };


    return (
        <Form onSubmit={handleSubmit}>
            <h2>Я хочу найти</h2>
            <ButtonGroup className="mb-3">
                <SearchTypeButton searchType={'doctor'} newSearchType={searchType} onChange={handleSearchTypeChange} key={'doctor'}>
                    Врача
                </SearchTypeButton>
                <SearchTypeButton searchType={'service'} newSearchType={searchType} onChange={handleSearchTypeChange} key={'service'}>
                    Услугу
                </SearchTypeButton>
            </ButtonGroup>

            <Row>
                <Col>
                    <Form.Group controlId="formSearchTypeName">
                        <Form.Control
                            type="text"
                            placeholder={getSearchPlaceholder(searchType)}
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                        />
                    </Form.Group>
                </Col>
                {searchType !== 'site' && <Col>
                    {searchType === 'doctor' && <SearchTypeFormSpecialtyMenu specialty={specialty} setSpecialty={setSpecialty} />}
                    {searchType === 'service' && <SearchTypeFormServiceMenu service={service} setService={setService} />}
                </Col>}
                <Col xs="auto">
                    <Button type="submit" onClick={handleSubmit}>Найти</Button>
                </Col>
            </Row>
        </Form>
    );
};

const SearchTypeButton: React.FC<SearchButtonProps> = ({searchType, newSearchType, onChange, children}) => {
    return (
        <ToggleButton
                    id={searchType}
                    type="radio"
                    variant="outline-primary"
                    name="searchType"
                    value={searchType}
                    checked={searchType === newSearchType}
                    onChange={onChange}
                >
            {children}
        </ToggleButton>
    )
}

const SearchTypeFormSpecialtyMenu = (
    {specialty, setSpecialty}: {specialty: string,
                                setSpecialty: React.SetStateAction<any>}
    ) => {
    const {data} = useDoctorsSpecialties()
    return (
        <Form.Group controlId="formSpecialty">
            <Form.Control
                as="select"
                value={specialty}
                onChange={(e) => setSpecialty(e.target.value)}
            >
                <option value="">{'Выберите специальность'}</option>
                {data && data.map((value) => <option value={value.specialty}>{value.specialty}</option>)}
            </Form.Control>
        </Form.Group>
    )
}

const SearchTypeFormServiceMenu = (
    {service, setService}: {service: string,
                            setService: React.SetStateAction<any>}
    ) => {
    const {data} = useDirections()
    return (
        <Form.Group controlId="formDirection">
            <Form.Control
                as="select"
                value={service}
                onChange={(e) => setService(e.target.value)}
            >
                <option value="">{'Выберите направление'}</option>
                {data && data.map((value) => <option value={value.name}>{value.name}</option>)}
            </Form.Control>
        </Form.Group>
    )
}

const getSearchPlaceholder = (searchType: SearchType) => {
    switch (searchType) {
        case 'doctor': return "Введите фамилию врача"
        case 'service': return "Введите название услуги"
        case 'site': return "Введите запрос"
    }
}

export default SearchField;
