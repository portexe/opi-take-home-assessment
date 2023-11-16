import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";

import styles from "./styles.module.css";

import { Navigation } from "swiper/modules";

import { Thermostat } from "..";
import { useSensorData } from "../../hooks";

import { Sensor, SensorType } from "../../types";

export function App() {
  const { error, sensors, readings } = useSensorData();

  if (error) return <main>{error}</main>;

  function SensorComponentMapper({ sensor }: { sensor: Sensor }) {
    switch (sensor.type) {
      case SensorType.Humidity: {
        return <>I am a Humidity Sensor</>;
      }

      case SensorType.Temperature: {
        return (
          <Thermostat
            sensor={sensor}
            reading={readings.find((r) => r.sensorId === sensor.id)}
          />
        );
      }
    }
  }

  return (
    <main>
      <Swiper navigation modules={[Navigation]}>
        {sensors.map((sensor) => (
          <SwiperSlide key={sensor.id}>
            <div className={styles.slide}>
              <SensorComponentMapper sensor={sensor} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </main>
  );
}
