import {atom} from 'jotai';

import {UserModel} from 'core';

export const userAtom = atom<UserModel | undefined>(undefined);
