import PropTypes from 'prop-types';

const StaffList = ({ weekdayStaffsData }) => {
  if (weekdayStaffsData == null || weekdayStaffsData.length === 0) {
    return <p className='p-5 text-2xl text-center'>No staff found</p>;
  }
  return (
    <ul className='flex flex-col items-center'>
      {weekdayStaffsData.map((staff) => (
        // Assuming staff's name is unique, should use a better unique identifier
        <li className='p-2' key={staff}>
          {staff}
        </li>
      ))}
    </ul>
  );
};
StaffList.propTypes = {
  weekdayStaffsData: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default StaffList;
