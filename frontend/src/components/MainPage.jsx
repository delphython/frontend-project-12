import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Spinner } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import Channels from './Channels.jsx';
import Messages from './Messages.jsx';

import { useAuth } from '../hooks/index.js';
import { apiRoutes } from '../routes.js';
import getModal from './modals/index.js';

import { actions as channelsActions } from '../slices/channelsSlice.js';
import { actions as messagesActions } from '../slices/messagesSlice.js';

const MainPage = () => {
  const auth = useAuth();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const modalType = useSelector((state) => state.modals.modalType);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        apiRoutes.dataPath(),
        { headers: { Authorization: `Bearer ${auth.getToken()}` } },
      );

      const { channels, currentChannelId, messages } = response.data;

      dispatch(channelsActions.addChannels(channels));
      dispatch(channelsActions.setCurrentChannelId(currentChannelId));
      dispatch(messagesActions.addMessages(messages));
    };
    fetchData();
  }, [auth, dispatch]);

  const renderModal = (type) => {
    if (!type) {
      return null;
    }
    const Modal = getModal(type);
    return <Modal />;
  };

  return (
      <Container className="h-100 my-4 overflow-hidden rounded shadow">
        <Row className="h-100 bg-white flex-md-row">
          <Channels />
          <Messages />
        </Row>
        {renderModal(modalType)}
      </Container>
    );
};

export default MainPage;
