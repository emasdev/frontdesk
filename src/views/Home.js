import { useAuth } from '../hooks/useAuth';
import Login from './Login';
import Main from '../components/Main';

export default function Home() {
  const auth = useAuth();

  return <div>{auth.user ? <Main /> : <Login />}</div>;
}
