import { useAuth } from '../hooks/useAuth';
import Loading from './Loading';
import Home from './Home';

export default function Main() {
  const auth = useAuth();

  return <>{auth.isLoading ? <Loading /> : <Home />}</>;
}
