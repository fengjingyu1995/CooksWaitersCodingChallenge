import StaffPage from '../../components/StaffsPage';
import { WAITERS } from '../../constants/staff.constant';
import useFetchData from '../../hooks/useFetchData';

const WaitersPage = () => {
  const { data: waitersData } = useFetchData('GetWaiters');
  return <StaffPage staffsType={WAITERS} StaffsData={waitersData} />;
};

export default WaitersPage;
