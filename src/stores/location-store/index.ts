import { create } from "zustand"

interface LocationState {
  fromLocation: [number, number] | null
  toLocation: [number, number] | null
  setFromLocation: (location: [number, number]) => void
  setToLocation: (location: [number, number]) => void
}

export const useLocationStore = create<LocationState>((set) => ({
  fromLocation: null,
  toLocation: null,
  setFromLocation: (location) => set({ fromLocation: location }),
  setToLocation: (location) => set({ toLocation: location }),
}))
