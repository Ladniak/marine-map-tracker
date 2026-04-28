import GaugeComponent from "react-gauge-component";

export default function CompassGauge({ angle = 0 }) {
  return (
    <div style={{ width: "120px", margin: "0 auto" }}>
      <GaugeComponent
        type="radial"
        value={angle}
        minValue={0}
        maxValue={360}
        labels={{
          valueLabel: {
            formatTextValue: (value) => `${Math.round(value)}°`,
            style: { fontSize: "14px" },
          },
          tickLabels: {
            type: "outer",
            ticks: [
              { value: 0 },
              { value: 90 },
              { value: 180 },
              { value: 270 },
            ],
          },
        }}
        arc={{
          width: 0.08,
          padding: 0.02,
          subArcs: [
            { limit: 90, color: "#4caf50" },
            { limit: 180, color: "#ff9800" },
            { limit: 270, color: "#f44336" },
            { limit: 360, color: "#2196f3" },
          ],
        }}
        pointer={{
          type: "needle",
          length: 0.7,
          width: 10,
        }}
      />
    </div>
  );
}
