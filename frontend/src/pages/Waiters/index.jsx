import { useState, useMemo } from 'react';

const DAYS = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];

const DATA = {
  monday: ['Howard', 'Martin', 'Michael', 'Bert'],
  tuesday: ['Roy', 'Herbert', 'Jacob', 'Tom', 'Elmer', 'Carl', 'Lee'],
  wednesday: ['Peter', 'Benjamin', 'Frederick', 'Willie', 'Alfred', 'Sam'],
  thursday: ['Will', 'Jesse', 'Oscar', 'Lewis'],
  friday: [
    'Herman',
    'Jim',
    'Francis',
    'Harvey',
    'Earl',
    'Eugene',
    'Ralph',
    'Ed',
  ],
};

const Waiters = () => {
  // TODO: fetch data from server
  const [data, setData] = useState(DATA);
  // TODO: should be saved in app level using context
  const [currentDayIdx, setCurrentDayIdx] = useState(0);

  const currentDay = DAYS[currentDayIdx];
  const waiters = useMemo(() => {
    return data[DAYS[currentDayIdx]];
  }, [data, currentDayIdx]);

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
