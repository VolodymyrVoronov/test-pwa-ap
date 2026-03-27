import { produce } from "immer";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import type { ITrack } from "@/types";

export interface IAppStoreState {
  tracks: ITrack[];
}

export interface IAppStoreActions {
  setTracks: (tracks: ITrack[]) => void;
}

const initialStoreState: IAppStoreState = {
  tracks: [],
};

export const useAppStore = create(
  immer<IAppStoreState & IAppStoreActions>((set, get) => ({
    ...initialStoreState,

    setTracks: (tracks) => {
      set(
        produce((draft) => {
          const { tracks: oldTracks } = get();

          draft.tracks = [...oldTracks, ...tracks];
        }),
      );
    },
  })),
);
