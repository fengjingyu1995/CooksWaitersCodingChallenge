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

  return (
    <>
      <h1 className='p-5 text-2xl text-center'>Waiters</h1>

      <h2>
        Current Day: <span className='capitalize'>{currentDay}</span>
      </h2>
      <ul>
        {waiters.map((waiter) => (
          // Assuming waiter's name is unique
          <li key={waiter}>{waiter}</li>
        ))}
      </ul>

      <button className='p-3 m-2 bg-blue-400 '>prev</button>
      <button className='p-3 m-2 bg-blue-400 '>next</button>
    </>
  );
};

export default Waiters;
