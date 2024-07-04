import React from 'react';
import { Container, Card } from 'react-bootstrap';

import './homepage.css'
import {useHomepageServices} from "./hooks";
import routes from "../../../routes";
import {LinkContainer} from "react-router-bootstrap";

const DirectionCards = () => {
  const {data} = useHomepageServices()
  return (
    <Container className={'mt-4 d-flex flex-wrap justify-content-start gap-4'}>
      {data && data.map((card) => {
        return <CardItem title={card.name} text={card.description.slice(0, 250) + '...'} link={card.slug} key={card.id}/>
      })}
    </Container>
  );
};

const CardItem = ({title, text, link}: {title: string, text: string, link: string}) => {
  return (
      <Card className={'mb-4 card-item'}>
        <Card.Body className={'d-flex flex-column justify-content-between'}>
          <Card.Title style={{color: '#00ABEB'}}>{title}</Card.Title>
          <Card.Text>
            {text}
          </Card.Text>
          <LinkContainer to={routes.DIRECTION_DETAIL(link)}><Card.Link>Подробнее</Card.Link></LinkContainer>
        </Card.Body>
    </Card>
  )
}

export default DirectionCards;
