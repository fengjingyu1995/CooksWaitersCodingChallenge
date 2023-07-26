import PropTypes from 'prop-types';

const Button = ({ onClickHandler, children, ...restProps }) => {
  return (
    <button
      className='px-8 py-3 m-2 bg-blue-600 rounded disabled:opacity-25'
      onClick={onClickHandler}
      {...restProps}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  onClickHandler: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Button;
