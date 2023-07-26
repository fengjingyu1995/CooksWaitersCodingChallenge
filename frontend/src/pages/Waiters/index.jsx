import { useStaffData } from '../../hooks/useStaffData';

const Waiters = () => {
  const {
    staffData: waitersData,
    currentDay,
    handlePrev,
    handleNext,
    isPrevDisabled,
    isNextDisabled,
  } = useStaffData('waiters');

  if (waitersData == null) {
    return <div>loading...</div>;
  }

  return (
    <>
      <h1 className='p-5 text-2xl text-center'>Waiters</h1>

      <h2 className='p-2 text-xl text-center'>
        Current Day: <span className='capitalize'>{currentDay}</span>
      </h2>
      <ul className='flex flex-col items-center min-h-[60vh]'>
        {waitersData.map((waiter) => (
          // Assuming waiter's name is unique
          <li className='p-2' key={waiter}>
            {waiter}
          </li>
        ))}
      </ul>

      <div className='flex justify-between mx-5 '>
        <button
          className='px-8 py-3 m-2 bg-blue-600 rounded disabled:opacity-25'
          onClick={handlePrev}
          disabled={isPrevDisabled}
        >
          Prev
        </button>
        <button
          className='px-8 py-3 m-2 bg-blue-600 rounded disabled:opacity-25'
          onClick={handleNext}
          disabled={isNextDisabled}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default Waiters;
