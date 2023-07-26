import { useState, useEffect, useMemo } from 'react';
import { DAYS } from '../../constants/constants';

const apiUrl = import.meta.env.VITE_API_URL;

const Waiters = () => {
  const [data, setData] = useState(null);
  // TODO: should be saved in app level using context
  const [currentDayIdx, setCurrentDayIdx] = useState(0);

  // get data from api
  useEffect(() => {
    fetch(`${apiUrl}/GetWaiters`)
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  const waiters = useMemo(() => {
    if (data) {
      return data[DAYS[currentDayIdx]];
    }
  }, [data, currentDayIdx]);

  if (data == null) {
    return <div>loading...</div>;
  }

  const handlePrev = () => {
    if (currentDayIdx > 0) {
      setCurrentDayIdx(currentDayIdx - 1);
    }
  };

  const handleNext = () => {
    if (currentDayIdx < DAYS.length - 1) {
      setCurrentDayIdx(currentDayIdx + 1);
    }
  };

  const currentDay = DAYS[currentDayIdx];

  return (
    <>
      <h1 className='p-5 text-2xl text-center'>Waiters</h1>

      <h2 className='p-2'>
        Current Day: <span className='capitalize'>{currentDay}</span>
      </h2>
      <ul className='flex flex-col items-center min-h-[60vh]'>
        {waiters.map((waiter) => (
          // Assuming waiter's name is unique
          <li className='p-2' key={waiter}>
            {waiter}
          </li>
        ))}
      </ul>

      <div className='flex justify-between '>
        <button
          className='px-8 py-3 m-2 bg-blue-600 rounded disabled:opacity-25'
          onClick={handlePrev}
          disabled={currentDayIdx === 0}
        >
          prev
        </button>
        <button
          className='px-8 py-3 m-2 bg-blue-600 rounded disabled:opacity-25'
          onClick={handleNext}
          disabled={currentDayIdx === DAYS.length - 1}
        >
          next
        </button>
      </div>
    </>
  );
};

export default Waiters;
