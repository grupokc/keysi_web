import { create, type StateCreator } from 'zustand';

export interface AppVersionState {
  version: string;
  setVersion: (version: string) => void;
}

const INITIAL_VERSION = "3.1.18";

const appVersionCreator: StateCreator<AppVersionState> = (set) => ({
  version: INITIAL_VERSION,
  setVersion: (newVersion: string) => set({ version: newVersion }),
});

export const useAppVersionStore = create<AppVersionState>(appVersionCreator);
  
