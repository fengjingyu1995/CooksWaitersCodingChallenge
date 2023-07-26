import { useContext, useState, useEffect, useMemo } from 'react';
import { DAYS, WAITERS, COOKS } from '../constants/staff.constant';
import { AppContext } from '../contexts/AppContext';

const apiUrl = import.meta.env.VITE_API_URL;

export const useWeekdayStaffData = (staffType) => {
  const [data, setData] = useState(null);

  // "currentDayIdx" is set in app level, and shared across staff pages.
  const { currentDayIdx, setCurrentDayIdx } = useContext(AppContext);

  // Fetching staff data from the API based on the selected staff type
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
    // Note: The "Prev Day" button should be disabled when currentDayIdx is 0 (Monday).
  };

  const handleNextDay = () => {
    if (currentDayIdx < DAYS.length - 1) {
      setCurrentDayIdx(currentDayIdx + 1);
    }
    // Note: The "Next Day" button should be disabled when currentDayIdx is the last day (Friday).
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
