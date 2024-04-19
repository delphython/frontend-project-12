import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Container, Row } from 'react-bootstrap';
import Channels from './Channels.jsx';
import Messages from './Messages.jsx';
import { useAuth } from '../hooks/index.js';
import { apiRoutes } from '../routes.js';
import getModal from './modals/index.js';
import { actions as channelsActions } from '../slices/channelsSlice.js';
import { actions as messagesActions } from '../slices/messagesSlice.js';

const MainPage = () => {
  const [modalType, setModalType] = useState(null);
  const [itemId, setItemId] = useState(null);

  const auth = useAuth();
  const dispatch = useDispatch();

  const showModal = (type, id = null) => {
    setModalType(type);
    setItemId(id);
  };

  const hideModal = () => {
    setModalType(null);
    setItemId(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        apiRoutes.dataPath(),
        { headers: { Authorization: `Bearer ${auth.getToken()}` } }
      );

      const { channels, currentChannelId, messages } = response.data;

      dispatch(channelsActions.addChannels(channels));
      dispatch(channelsActions.setCurrentChannelId(currentChannelId));
      dispatch(messagesActions.addMessages(messages));
    };
    fetchData();
  }, [auth, dispatch]);

  const renderModal = (type, hide, id) => {
    if (!type) {
      return null;
    }
    const Modal = getModal(type);
    return <Modal onHide={hide} id={id} />;
  };

  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white flex-md-row">
        <Channels showModal={showModal} />
        <Messages />
      </Row>
      {renderModal(modalType, hideModal, itemId)}
    </Container>
  );
};

export default MainPage;
