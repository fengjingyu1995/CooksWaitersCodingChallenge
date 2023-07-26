import { useContext, useState, useEffect, useMemo } from 'react';
import { DAYS, WAITERS, COOKS } from '../constants/staff.constant';
import { AppContext } from '../contexts/AppContext';

const apiUrl = import.meta.env.VITE_API_URL;

export const useWeekdayStaffData = (staffType) => {
  const [data, setData] = useState(null);
  const { currentDayIdx, setCurrentDayIdx } = useContext(AppContext);

  // get data from api
  useEffect(() => {
    let urlEndpoint;

    if (staffType === WAITERS) {
      urlEndpoint = 'GetWaiters';
    } else if (staffType === COOKS) {
      urlEndpoint = 'GetCooks';
    }
    if (urlEndpoint) {
      fetch(`${apiUrl}/${urlEndpoint}`)
        .then((response) => response.json())
        .then((data) => setData(data));
    }
  }, []);

  const staffData = useMemo(() => {
    if (data) {
      return data[DAYS[currentDayIdx]];
    }
  }, [data, currentDayIdx]);

  const handlePrevDay = () => {
    if (currentDayIdx > 0) {
      setCurrentDayIdx(currentDayIdx - 1);
    }
  };

  const handleNextDay = () => {
    if (currentDayIdx < DAYS.length - 1) {
      setCurrentDayIdx(currentDayIdx + 1);
    }
  };
  return {
    staffData,
    handlePrevDay,
    handleNextDay,
    currentDay: DAYS[currentDayIdx],
    isPrevDisabled: currentDayIdx === 0,
    isNextDisabled: currentDayIdx === DAYS.length - 1,
  };
};
