import { useState, useEffect } from 'react';

interface Battery {
  charging: boolean;
  level: number;
  dischargingTime: number;
}

export function useBattery(): Battery {
  const [battery, setBattery] = useState<Battery>({} as Battery);

  useEffect(() => {
    if ('getBattery' in navigator) {
      navigator.getBattery().then((battery: any) => {
        setBattery(battery);
        battery.addEventListener('chargingchange', handleChargeChange);
        battery.addEventListener('levelchange', handleLevelChange);
        battery.addEventListener(
          'dischargingtimechange',
          handleDischargeChange,
        );
        return () => {
          battery.removeEventListener('chargingchange', handleChargeChange);
          battery.removeEventListener('levelchange', handleLevelChange);
          battery.removeEventListener(
            'dischargingtimechange',
            handleDischargeChange,
          );
        };
      });
    }
  }, []);

  function handleChargeChange() {
    setBattery(battery);
  }
  function handleLevelChange() {
    setBattery(battery);
  }
  function handleDischargeChange() {
    setBattery(battery);
  }

  return battery;
}
