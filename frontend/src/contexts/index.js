import { createContext } from 'react';
import leoProfanity from 'leo-profanity';

leoProfanity.clearList();
leoProfanity.add(leoProfanity.getDictionary('en'));
leoProfanity.add(leoProfanity.getDictionary('ru'));

export const ProfanityContext = createContext(leoProfanity);

export const AuthContext = createContext({});

export const SocketContext = createContext({});
