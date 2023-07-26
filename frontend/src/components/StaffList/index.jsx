import PropTypes from 'prop-types';

const StaffList = ({ staffData }) => {
  return (
    <ul className='flex flex-col items-center min-h-[60vh]'>
      {staffData.map((waiter) => (
        // Assuming waiter's name is unique
        <li className='p-2' key={waiter}>
          {waiter}
        </li>
      ))}
    </ul>
  );
};
StaffList.propTypes = {
  staffData: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default StaffList;
