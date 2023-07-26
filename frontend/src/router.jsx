import { Route, Routes } from 'react-router-dom';
import Cooks from './pages/Cooks';
import Waiters from './pages/Waiters';
import { ROUTES } from './constants/route.constant';

const Router = () => {
  return (
    <Routes>
      <Route exact path={ROUTES.WAITERS.path} element={<Waiters />}></Route>
      <Route exact path={ROUTES.COOKS.path} element={<Cooks />}></Route>
    </Routes>
  );
};

export default Router;
