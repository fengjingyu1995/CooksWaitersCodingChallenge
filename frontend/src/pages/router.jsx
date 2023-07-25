import { Route, Routes } from 'react-router-dom';
import Cooks from './Cooks';
import Waiters from './Waiters';

const Router = () => {
  return (
    <Routes>
      <Route exact path={'/Waiters'} element={<Waiters />}></Route>
      <Route exact path={'/Cooks'} element={<Cooks />}></Route>
    </Routes>
  );
};

export default Router;
