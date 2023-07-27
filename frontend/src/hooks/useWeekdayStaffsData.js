import { useContext, useMemo } from 'react';
import { DAYS } from '../constants/staff.constant';
import { AppContext } from '../contexts/AppContext';

export const useWeekdayStaffsData = (StaffsData) => {
  // "currentDayIdx" is set in app level, and shared across staff pages.
  const { currentDayIdx, setCurrentDayIdx } = useContext(AppContext);

  const weekdayStaffsData = useMemo(() => {
    if (StaffsData) {
      return StaffsData[DAYS[currentDayIdx]];
    }
  }, [StaffsData, currentDayIdx]);

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
    weekdayStaffsData,
    handlePrevDay,
    handleNextDay,
    currentDay: DAYS[currentDayIdx],
    isPrevDisabled: currentDayIdx === 0,
    isNextDisabled: currentDayIdx === DAYS.length - 1,
  };
};
