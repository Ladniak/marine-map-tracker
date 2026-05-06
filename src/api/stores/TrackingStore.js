import { makeAutoObservable, runInAction } from "mobx";
import { getStations } from "../stationsApi";
import { getSignals } from "../signalsApi";
import { getTrackedObjects } from "../trackedObjectsApi";

function normalizeAngle(angle) {
  return (angle + 360) % 360;
}

function angleDifference(a, b) {
  const diff = Math.abs(normalizeAngle(a) - normalizeAngle(b));
  return Math.min(diff, 360 - diff);
}

function calculateBearing(fromLat, fromLng, toLat, toLng) {
  const avgLatRad = (((fromLat + toLat) / 2) * Math.PI) / 180;

  const y = toLat - fromLat;
  const x = (toLng - fromLng) * Math.cos(avgLatRad);

  return normalizeAngle((Math.atan2(x, y) * 180) / Math.PI);
}

export class TrackingStore {
  stations = [];
  signals = [];
  objects = [];

  selectedObjectId = null;

  loading = false;
  error = null;

  constructor() {
    makeAutoObservable(this);
  }

  get adaptedStations() {
    return this.stations.map((station) => ({
      id: station.id,
      latitude: station.latitude,
      longitude: station.longitude,
      magneticCorrection: station.magneticCorrection ?? 0,
    }));
  }

  get adaptedSignals() {
    return this.signals.map((signal) => {
      const station = signal.station;

      const azimuth =
        typeof signal.azimuth === "number"
          ? Number(signal.azimuth.toFixed(1))
          : null;

      const correctedAzimuth =
        typeof signal.azimuth === "number"
          ? Number(
              (signal.azimuth + (station?.magneticCorrection ?? 0)).toFixed(1),
            )
          : null;

      return {
        id: signal.id,
        stationId: station?.id ?? null,
        azimuth,
        correctedAzimuth,
        timestamp: signal.receivedAt,
        receivedAt: signal.receivedAt,
        strength: signal.strength,
        processed: signal.processed,
        station,
        objectIds: this.getRelatedObjectIdsForSignal(signal),
      };
    });
  }

  get adaptedObjects() {
    return this.objects.map((objectItem) => ({
      id: objectItem.id,
      latitude: objectItem.latitude,
      longitude: objectItem.longitude,
      speed: objectItem.estimatedSpeed,
      direction: objectItem.estimatedDirection,
      detectedAt: objectItem.lastSeen,
      lastSeen: objectItem.lastSeen,
      firstSeen: objectItem.firstSeen,
      detectionCount: objectItem.detectionCount,
      confidence: objectItem.confidence,
      status: objectItem.status,
      signals: this.getRelatedSignalIdsForObject(objectItem),
    }));
  }

  get selectedObject() {
    return this.adaptedObjects.find(
      (objectItem) => objectItem.id === this.selectedObjectId,
    );
  }

  get mapSignals() {
    if (!this.selectedObject) return [];

    return this.adaptedSignals.filter((signal) =>
      signal.objectIds.includes(this.selectedObject.id),
    );
  }

  get sensorSignals() {
    if (!this.selectedObject) return this.adaptedSignals;

    return this.mapSignals;
  }

  get visibleStations() {
    if (!this.selectedObject) return this.adaptedStations;

    return this.adaptedStations.filter((station) =>
      this.sensorSignals.some(
        (signal) => String(signal.stationId) === String(station.id),
      ),
    );
  }

  setSelectedObjectId = (id) => {
    this.selectedObjectId = id;
  };

  clearSelection = () => {
    this.selectedObjectId = null;
  };

  loadInitialData = async () => {
    this.loading = true;
    this.error = null;

    try {
      await this.refreshData();

      runInAction(() => {
        this.loading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.error = error.message;
        this.loading = false;
      });
    }
  };

  refreshData = async () => {
    const [stations, signals, objects] = await Promise.all([
      getStations(),
      getSignals(),
      getTrackedObjects(),
    ]);

    runInAction(() => {
      this.stations = Array.isArray(stations) ? stations : [];
      this.signals = Array.isArray(signals) ? signals : [];
      this.objects = Array.isArray(objects) ? objects : [];
    });
  };

  getRelatedObjectIdsForSignal(signal) {
    if (!signal.station || this.objects.length === 0) return [];

    const correctedAzimuth =
      signal.azimuth + (signal.station.magneticCorrection ?? 0);

    return this.objects
      .filter((objectItem) => {
        const bearingToObject = calculateBearing(
          signal.station.latitude,
          signal.station.longitude,
          objectItem.latitude,
          objectItem.longitude,
        );

        return angleDifference(correctedAzimuth, bearingToObject) <= 12;
      })
      .map((objectItem) => objectItem.id);
  }

  getRelatedSignalIdsForObject(objectItem) {
    return this.signals
      .filter((signal) => {
        if (!signal.station) return false;

        const correctedAzimuth =
          signal.azimuth + (signal.station.magneticCorrection ?? 0);

        const bearingToObject = calculateBearing(
          signal.station.latitude,
          signal.station.longitude,
          objectItem.latitude,
          objectItem.longitude,
        );

        return angleDifference(correctedAzimuth, bearingToObject) <= 12;
      })
      .map((signal) => signal.id);
  }

  handleSelectStation = (stationId) => {
    const stationSignals = this.adaptedSignals.filter(
      (signal) => String(signal.stationId) === String(stationId),
    );

    const firstRelatedObjectId = stationSignals
      .flatMap((signal) => signal.objectIds)
      .at(0);

    if (firstRelatedObjectId) {
      this.setSelectedObjectId(firstRelatedObjectId);
    }
  };
}
