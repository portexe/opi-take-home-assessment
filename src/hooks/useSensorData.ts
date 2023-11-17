import { useEffect, useState } from "react";
import type { Reading, Sensor } from "../types";
import { sortedReadingsByTime } from "../shared";

export function useSensorData() {
  const [error, setError] = useState("");
  const [sensors, setSensors] = useState<Sensor[]>([]);
  const [readings, setReadings] = useState<Reading[]>([]);

  useEffect(() => {
    fetch("/sensors.json")
      .then((res) => res.json())
      .then((data) => setSensors(data))
      .catch(() => {
        setError("Server error, please try again soon.");
      });

    // It should be the responsibility of the API
    // to return the data in the correct order.
    // However since this a take-home assessment
    // we will do it here.
    fetch("/readings.json")
      .then((res) => res.json())
      .then((data) => setReadings(sortedReadingsByTime(data)))
      .catch(() => {
        setError("Server error, please try again soon.");
      });
  }, []);

  return { error, sensors, readings };
}
