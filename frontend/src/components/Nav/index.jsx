import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <nav className='w-full h-16 bg-gray-300'>
      <ul className='flex flex-row w-full'>
        <li className='flex items-center justify-center'>
          <Link to='/Waiters' className='h-full p-5 text-center hover:bg-white'>
            Waiters
          </Link>
        </li>
        <li className='flex items-center justify-center'>
          <Link to='/Cooks' className='h-full p-5 text-center hover:bg-white '>
            Cooks
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
