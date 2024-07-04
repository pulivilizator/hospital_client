import React from 'react';
import { Container, Col, Nav } from 'react-bootstrap';
import {Github, Telegram, Whatsapp} from 'react-bootstrap-icons';

const Footer = () => {
  return (
      <Container fluid className={'border-top my-3'} as='footer'>
        <Container className='d-flex flex-wrap justify-content-between align-items-center p-1'>
            <Col md={4} className='d-flex align-items-center'>
              <span className='mb-3 mb-md-0 text-muted'>© 2024 Hospital</span>
            </Col>

            <Nav as='ul' className='col-md-4 justify-content-end list-unstyled d-flex'>
              <Nav.Item as='li' className='ms-3'>
                <Nav.Link href='https://github.com/pulivilizator' className='text-muted'>
                  <Github width={24} height={24} />
                </Nav.Link>
              </Nav.Item>
              <Nav.Item as='li' className='ms-3'>
                <Nav.Link href='https://t.me/telejkatupa' className='text-muted'>
                  <Telegram width={24} height={24} />
                </Nav.Link>
              </Nav.Item>
              <Nav.Item as='li' className='ms-3'>
                <Nav.Link href='https://wa.me/+79190500287' className='text-muted'>
                  <Whatsapp width={24} height={24} />
                </Nav.Link>
              </Nav.Item>
            </Nav>
        </Container>
      </Container>
  );
};

export default Footer;
