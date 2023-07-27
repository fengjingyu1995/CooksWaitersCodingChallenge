import PropTypes from 'prop-types';
import useCurrentDayStaffsData from '../../hooks/useCurrentDayStaffsData';
import Button from '../Button';
import Loading from '../Loading';
import StaffList from '../StaffList';

// staffsType should be one of "waiters" and "cooks"

const StaffsPage = ({ staffsType, StaffsData }) => {
  const {
    currentDayStaffsData,
    currentDay,
    handlePrevDay,
    handleNextDay,
    isPrevDisabled,
    isNextDisabled,
  } = useCurrentDayStaffsData(StaffsData);

  if (currentDayStaffsData == null) {
    return <Loading />;
  }

  return (
    <div className='mx-5 my-8'>
      <div className='flex justify-between'>
        <Button onClickHandler={handlePrevDay} disabled={isPrevDisabled}>
          Prev Day
        </Button>
        <Button onClickHandler={handleNextDay} disabled={isNextDisabled}>
          Next Day
        </Button>
      </div>

      <h1 className='p-4 text-2xl font-bold text-center capitalize'>
        {staffsType}
      </h1>

      <h2 className='px-2 py-4 text-xl text-center'>
        Current Day: <span className='capitalize'>{currentDay}</span>
      </h2>
      <StaffList currentDayStaffsData={currentDayStaffsData} />
    </div>
  );
};

StaffsPage.propTypes = {
  staffsType: PropTypes.oneOf(['waiters', 'cooks']).isRequired,
  StaffsData: PropTypes.shape({
    monday: PropTypes.arrayOf(PropTypes.string),
    tuesday: PropTypes.arrayOf(PropTypes.string),
    wednesday: PropTypes.arrayOf(PropTypes.string),
    thursday: PropTypes.arrayOf(PropTypes.string),
    friday: PropTypes.arrayOf(PropTypes.string),
  }),
};

export default StaffsPage;
