import { useState } from "react";
import Switch from "react-switch";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Hygrometer, Thermostat } from "..";
import { useSensorData } from "../../hooks";
import { blue, getAssociatedReadings, red } from "../../shared";
import { type Sensor, SensorType, TemperatureUnit } from "../../types";

import styles from "./styles.module.css";

export function App() {
  const [units, setUnits] = useState<TemperatureUnit>(TemperatureUnit.Celsius);

  const { error, sensors, readings } = useSensorData();

  if (error) return <main>{error}</main>;

  function unitChange() {
    setUnits((u) =>
      u === TemperatureUnit.Celsius
        ? TemperatureUnit.Fahrenheit
        : TemperatureUnit.Celsius
    );
  }

  function SensorComponentMapper({ sensor }: { sensor: Sensor }) {
    switch (sensor.type) {
      case SensorType.Humidity: {
        return (
          <Hygrometer
            sensor={sensor}
            readings={getAssociatedReadings(sensor, readings)}
          />
        );
      }

      case SensorType.Temperature: {
        return (
          <Thermostat
            units={units}
            sensor={sensor}
            readings={getAssociatedReadings(sensor, readings)}
          />
        );
      }
    }
  }

  const checkedIcon = <div className={styles.switcherIcon}>F</div>;
  const uncheckedIcon = <div className={styles.switcherIcon}>C</div>;

  return (
    <main>
      <div className={styles.unitSwitch}>
        <Switch
          onColor={red}
          offColor={blue}
          onChange={unitChange}
          checkedIcon={checkedIcon}
          uncheckedIcon={uncheckedIcon}
          checked={units === TemperatureUnit.Fahrenheit}
        />
      </div>

      <Swiper
        navigation
        modules={[Pagination, Navigation]}
        pagination={{ dynamicBullets: true }}
      >
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
