import { useAuth } from '../hooks/useAuth';
import Loading from './Loading';
import Dashboard from './Dashboard';

export default function Main() {
  const auth = useAuth();

  return <>{auth.isLoading ? <Loading /> : <Dashboard />}</>;
}
