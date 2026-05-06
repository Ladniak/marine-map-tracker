import module from "./CompassGauge.module.css";

export default function CompassGauge({ angle = 0 }) {
  const normalizedAngle = Number.isFinite(angle) ? angle : 0;

  return (
    <div className={module.compassGauge}>
      <svg viewBox="0 0 140 140" className={module.compassGaugeSvg}>
        <circle cx="70" cy="70" r="58" className={module.compassGaugeOuter} />

        <circle cx="70" cy="70" r="42" className={module.compassGaugeInner} />

        <circle cx="70" cy="70" r="4" className={module.compassGaugeCenter} />

        <line
          x1="70"
          y1="12"
          x2="70"
          y2="24"
          className={module.compassGaugeMark}
        />

        <line
          x1="70"
          y1="116"
          x2="70"
          y2="128"
          className={module.compassGaugeMark}
        />

        <line
          x1="12"
          y1="70"
          x2="24"
          y2="70"
          className={module.compassGaugeMark}
        />

        <line
          x1="116"
          y1="70"
          x2="128"
          y2="70"
          className={module.compassGaugeMark}
        />

        <text
          x="70"
          y="18"
          textAnchor="middle"
          className={`${module.compassGaugeLabel} ${module.compassGaugeNorth}`}
        >
          N
        </text>

        <text
          x="122"
          y="74"
          textAnchor="middle"
          className={module.compassGaugeLabel}
        >
          E
        </text>

        <text
          x="70"
          y="130"
          textAnchor="middle"
          className={module.compassGaugeLabel}
        >
          S
        </text>

        <text
          x="18"
          y="74"
          textAnchor="middle"
          className={module.compassGaugeLabel}
        >
          W
        </text>

        <g
          style={{
            transform: `rotate(${normalizedAngle}deg)`,
            transformOrigin: "70px 70px",
          }}
        >
          <polygon
            points="70,22 64,72 70,66 76,72"
            className={module.compassGaugeNeedleNorth}
          />

          <polygon
            points="70,118 64,68 70,74 76,68"
            className={module.compassGaugeNeedleSouth}
          />
        </g>
      </svg>

      <div className={module.compassGaugeAngle}>
        {normalizedAngle.toFixed(1)}°
      </div>
    </div>
  );
}
