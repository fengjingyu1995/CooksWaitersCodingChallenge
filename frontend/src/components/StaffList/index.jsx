import PropTypes from 'prop-types';

const StaffList = ({ currentDayStaffsData }) => {
  if (currentDayStaffsData == null || currentDayStaffsData.length === 0) {
    return <p className='p-5 text-2xl text-center'>No staff found</p>;
  }
  return (
    <ul className='flex flex-col items-center'>
      {currentDayStaffsData.map((staff) => (
        // Assuming staff's name is unique, should use a better unique identifier
        <li className='p-2' key={staff}>
          {staff}
        </li>
      ))}
    </ul>
  );
};
StaffList.propTypes = {
  currentDayStaffsData: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default StaffList;
