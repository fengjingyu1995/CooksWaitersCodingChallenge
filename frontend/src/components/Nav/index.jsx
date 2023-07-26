import { Link, useLocation } from 'react-router-dom';

const Nav = () => {
  const { pathname } = useLocation();
  return (
    <nav className='w-full h-16 bg-blue-600 '>
      <ul className='flex flex-row w-full'>
        <li className='flex items-center justify-center'>
          <Link
            to='/Waiters'
            className={`h-full p-5 text-center hover:bg-blue-800 ${
              pathname === '/Waiters' ? 'bg-white' : ''
            }`}
          >
            Waiters
          </Link>
        </li>
        <li className='flex items-center justify-center'>
          <Link
            to='/Cooks'
            className={`h-full p-5 text-center hover:bg-blue-800 ${
              pathname === '/Cooks' ? 'bg-white' : ''
            }`}
          >
            Cooks
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
