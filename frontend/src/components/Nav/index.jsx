import { Link, useLocation } from 'react-router-dom';
import { ROUTES } from '../../constants/route.constant';

const Nav = () => {
  const { pathname } = useLocation();
  return (
    <nav className='w-full h-16 bg-blue-600'>
      <ul className='flex flex-row w-full'>
        <li className='flex items-center justify-center'>
          <Link
            to={ROUTES.WAITERS.path}
            className={`h-full p-5 text-center text-white ${
              pathname === ROUTES.WAITERS.path
                ? 'bg-gray-100 text-black'
                : 'hover:bg-blue-800'
            }`}
          >
            Waiters
          </Link>
        </li>
        <li className='flex items-center justify-center'>
          <Link
            to={ROUTES.COOKS.path}
            className={`h-full p-5 text-center text-white  ${
              pathname === ROUTES.COOKS.path
                ? 'bg-gray-100 text-black'
                : 'hover:bg-blue-800'
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
