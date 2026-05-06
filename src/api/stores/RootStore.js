import { TrackingStore } from "./TrackingStore";

export class RootStore {
  constructor() {
    this.trackingStore = new TrackingStore(this);
  }
}

export const rootStore = new RootStore();
