import { useEffect, useState } from "react";

import {
  toTwoDecimals,
  getDisplayTime,
  celsiusToFahrenheit,
} from "../../shared";
import { Readings } from "..";
import { type Reading, type Sensor, TemperatureUnit } from "../../types";

interface Props {
  sensor: Sensor;
  readings?: Reading[];
  units: TemperatureUnit;
}

export function Thermostat({ readings, sensor, units }: Props) {
  const [adjustedValues, setAdjustedValues] = useState<Reading[]>([]);

  useEffect(() => {
    if (!readings?.length) return;

    if (units === TemperatureUnit.Celsius) {
      setAdjustedValues(
        readings.map((eachReading) => ({
          ...eachReading,
          value: toTwoDecimals(eachReading.value),
        }))
      );
    } else {
      setAdjustedValues(
        readings.map((eachReading) => ({
          ...eachReading,
          value: celsiusToFahrenheit(eachReading.value),
        }))
      );
    }
  }, [readings, units]);

  if (!adjustedValues.length)
    return <Readings header={sensor.name} history={[]} />;

  const currentReading = adjustedValues[0];

  const readingHistory = adjustedValues.slice(1);

  const latest = `${currentReading.value} ${units} @ ${getDisplayTime(
    currentReading.time
  )}`;

  const history = readingHistory.map(
    (adjVal) => `${adjVal.value} ${units} @ ${getDisplayTime(adjVal.time)}`
  );

  return <Readings header={sensor.name} latest={latest} history={history} />;
}
