import PropTypes from 'prop-types';
import { useStaffData } from '../../hooks/useStaffData';
import Button from '../Button';
import StaffList from '../StaffList';

const StaffPage = ({ staffType }) => {
  const {
    staffData,
    currentDay,
    handlePrevDay,
    handleNextDay,
    isPrevDisabled,
    isNextDisabled,
  } = useStaffData(staffType);

  if (staffData == null) {
    return <div>loading...</div>;
  }

  return (
    <>
      <h1 className='p-5 text-2xl text-center capitalize'>{staffType}</h1>

      <h2 className='p-2 text-xl text-center'>
        Current Day: <span className='capitalize'>{currentDay}</span>
      </h2>
      <StaffList staffData={staffData} />
      <div className='flex justify-between mx-5 '>
        <Button onClickHandler={handlePrevDay} disabled={isPrevDisabled}>
          Prev
        </Button>
        <Button onClickHandler={handleNextDay} disabled={isNextDisabled}>
          Next
        </Button>
      </div>
    </>
  );
};

StaffPage.propTypes = {
  staffType: PropTypes.oneOf(['waiters', 'cooks']).isRequired,
};

export default StaffPage;
