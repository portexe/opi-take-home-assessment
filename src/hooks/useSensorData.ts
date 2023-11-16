import { useEffect, useState } from "react";
import type { Reading, Sensor } from "../types";

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

    fetch("/readings.json")
      .then((res) => res.json())
      .then((data) => setReadings(data))
      .catch(() => {
        setError("Server error, please try again soon.");
      });
  }, []);

  return { error, sensors, readings };
}
