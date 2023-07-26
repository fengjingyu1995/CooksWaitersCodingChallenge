import PropTypes from 'prop-types';
import { useWeekdayStaffData } from '../../hooks/useWeekdayStaffData';
import Button from '../Button';
import Loading from '../Loading';
import StaffList from '../StaffList';

const StaffPage = ({ staffType }) => {
  const {
    staffData,
    currentDay,
    handlePrevDay,
    handleNextDay,
    isPrevDisabled,
    isNextDisabled,
  } = useWeekdayStaffData(staffType);

  if (staffData == null) {
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

      <h1 className='p-5 text-2xl text-center capitalize'>{staffType}</h1>

      <h2 className='p-2 text-xl text-center'>
        Current Day: <span className='capitalize'>{currentDay}</span>
      </h2>
      <StaffList staffData={staffData} />
    </div>
  );
};

StaffPage.propTypes = {
  staffType: PropTypes.oneOf(['waiters', 'cooks']).isRequired,
};

export default StaffPage;
