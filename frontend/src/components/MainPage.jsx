import axios from 'axios';
import React, { useEffect } from 'react';
import useAuth from '../hooks/index.js';
import routes from '../routes.js';
import { Container, Row } from 'react-bootstrap';
import Channels from './Channels.jsx';
import Messages from './Messages.jsx';

const MainPage = () => {

    const { getAuthHeader } = useAuth();
    
    useEffect(() => {
      const fetchData = async () => {
        const response = await axios.get(routes.dataPath(), { headers: getAuthHeader() });
        console.log(response.data);
      };
      fetchData();
    }, [getAuthHeader]);
  
    return (
      <Container className="h-100 my-4 overflow-hidden rounded shadow">
        <Row className="h-100 bg-white flex-md-row">
          <Channels />
          <Messages />
        </Row>
      </Container>
    );
  };

export default MainPage;
