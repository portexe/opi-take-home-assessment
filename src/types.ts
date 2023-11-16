// These are the 2 units provided. It would make more
// sense to me if the units were "Temperature" and "Percentage"
// However since this is the API we have been given, we will
// treat "Celsius" as "Temperature" even if the user chooses
// to view the reading data in Fahrenheit.
export type SensorUnit = "%" | "Celsius";

export type TemperatureUnit = "Celsius" | "Fahrenheit";

export enum SensorType {
  Humidity = "Humidity Sensor",
  Temperature = "Temperature Sensor",
}

export interface Reading {
  time: string;
  value: number;
  sensorId: number;
}

export interface Sensor {
  id: number;
  name: string;
  type: SensorType;
  createdAt: string;
  units: SensorUnit;
}
