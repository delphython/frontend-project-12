import React, { useMemo } from 'react';
import {
  Provider as StoreProvider,
  useDispatch,
  useSelector,
} from 'react-redux';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import store from './slices/index.js';
import App from './components/App.jsx';
import { SocketContext } from './contexts/index.js';
import { actions as messagesActions } from './slices/messagesSlice.js';
import { actions as channelsActions } from './slices/channelsSlice';
import resources from './locales/index.js';

const SocketProvider = ({ socket, children }) => {
  const dispatch = useDispatch();

  const currentChannelId = useSelector((state) => state.channels.currentChannelId);

  socket.on('newMessage', (payload) => {
    dispatch(messagesActions.addMessage(payload));
  });

  socket.on('newChannel', (payload) => {
    dispatch(channelsActions.addChannel(payload));
  });

  socket.on('removeChannel', (payload) => {
    dispatch(channelsActions.removeChannel(payload));
    if (payload.id === currentChannelId) {
      dispatch(channelsActions.setCurrentChannelId(1));
    } else {
      dispatch(channelsActions.setCurrentChannelId(currentChannelId));
    }
  });

  socket.on('renameChannel', (payload) => {
    const { name, id } = payload;
    dispatch(channelsActions.changeChannelName({
      id,
      changes: {
        name,
      },
    }));
  });

  const obj = useMemo(() => {
    const addNewMessage = (message) => socket.emit('newMessage', message, (response) => {
      if (response.status !== 'ok') {
        console.log(response.status);
      }
    });

    const addNewChannel = (channel) => socket.emit('newChannel', channel, (response) => {
      if (response.status === 'ok') {
        const { id } = response.data;
        dispatch(channelsActions.setCurrentChannelId(id));
      } else {
        console.log(response.status);
      }
    });

    const removeChannel = (id) => socket.emit('removeChannel', { id }, (response) => {
      if (response.status !== 'ok') {
        console.log(response.status);
      }
    });

    const renameChannel = (renamedChannel) => socket.emit('renameChannel', renamedChannel, (response) => {
      if (response.status !== 'ok') {
        console.log(response.status);
      }
    });

    return {
      addNewMessage,
      addNewChannel,
      removeChannel,
      renameChannel,
    };
  }, []);

  return (
    <SocketContext.Provider 
      value={obj}
    >
      {children}
    </SocketContext.Provider>
  );
};

const rollbarConfig = {
  accessToken: process.env.REACT_APP_ROLLBAR_TOKEN,
  environment: 'production',
  captureUncaught: true,
  captureUnhandledRejections: true,
};

const init = async (socket) => {
  const i18n = i18next.createInstance();

  await i18n
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'ru',
    });

  return (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <StoreProvider store={store}>
          <SocketProvider socket={socket}>
            <I18nextProvider i18n={i18n}>
              <App />
            </I18nextProvider>
          </SocketProvider>
        </StoreProvider>
      </ErrorBoundary>
    </RollbarProvider>
  );
};

export default init;
