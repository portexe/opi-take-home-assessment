import type { Reading, Sensor } from "../../types";

import styles from "./styles.module.css";

interface Props {
  sensor: Sensor;
  reading?: Reading;
}

export function Thermostat({ reading, sensor }: Props) {
  if (!reading) {
    return null;
  }

  return (
    <div>
      <h3>{sensor.name}</h3>

      <h5>Latest</h5>

      <p>
        {reading.value} {sensor.units}
      </p>

      <div className={styles.history}></div>
    </div>
  );
}
