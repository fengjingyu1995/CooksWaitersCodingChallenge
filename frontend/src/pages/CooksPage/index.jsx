import StaffPage from '../../components/StaffsPage';
import { COOKS } from '../../constants/staff.constant';
import useFetchData from '../../hooks/useFetchData';

const CooksPage = () => {
  const { data: cooksData } = useFetchData('GetCooks');
  return <StaffPage staffsType={COOKS} StaffsData={cooksData} />;
};

export default CooksPage;
