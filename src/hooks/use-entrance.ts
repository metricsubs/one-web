import {createContext, useContext} from 'react';

import {Entrances} from '../@entrances';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const EntrancesContext = createContext<Entrances>(undefined!);

export function useEntrances(): Entrances {
  return useContext(EntrancesContext);
}
