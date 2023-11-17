import { Readings } from "..";
import type { Reading, Sensor } from "../../types";
import { getDisplayTime, toTwoDecimals } from "../../shared";

interface Props {
  sensor: Sensor;
  readings?: Reading[];
}

export function Hygrometer({ sensor, readings }: Props) {
  if (!readings?.length) return <Readings header={sensor.name} history={[]} />;

  const currentReading = readings[0];

  const readingHistory = readings.slice(1);

  const latest = `${currentReading.value}${sensor.units} @ ${getDisplayTime(
    currentReading.time
  )}`;

  const history = readingHistory.map(
    (val) =>
      `${toTwoDecimals(val.value)}${sensor.units} @ ${getDisplayTime(val.time)}`
  );

  return <Readings header={sensor.name} latest={latest} history={history} />;
}
