import { Reading, Sensor } from "../types";

export function celsiusToFahrenheit(celsius: number) {
  const fahrenheit = (celsius * 9) / 5 + 32;

  return toTwoDecimals(fahrenheit);
}

export function toTwoDecimals(temperature: number) {
  return Number.parseFloat(temperature.toFixed(2));
}

export function sortedReadingsByTime(readings: Reading[]) {
  return readings.sort(
    (a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()
  );
}

export function getDisplayTime(timestamp: string) {
  return new Date(timestamp).toLocaleString();
}

export function getAssociatedReadings(sensor: Sensor, readings: Reading[]) {
  return readings.filter((r) => r.sensorId === sensor.id);
}
