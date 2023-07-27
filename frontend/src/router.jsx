import { Route, Routes, Navigate } from 'react-router-dom';
import { ROUTES } from './constants/route.constant';
import WaitersPage from './pages/WaitersPage';
import CooksPage from './pages/CooksPage';

const Router = () => {
  return (
    <Routes>
      <Route exact path={ROUTES.WAITERS.path} element={<WaitersPage />}></Route>
      <Route exact path={ROUTES.COOKS.path} element={<CooksPage />}></Route>
      <Route path='/' element={<Navigate replace to={ROUTES.WAITERS.path} />} />
    </Routes>
  );
};

export default Router;
