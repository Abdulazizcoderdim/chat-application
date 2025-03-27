import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import $axios from '../axios/axios';
import Sidebar from '../components/sidebar';
import { logout, setUser, UserState } from '../redux/userSlice';
import logo from '/logo.png';

const Home = () => {
  const user = useSelector((state: { user: UserState }) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const fetchUserDetails = async () => {
    try {
      const res = await $axios({
        url: '/api/user-details',
      });

      dispatch(setUser(res.data.data));

      if (res.data.data.logout) {
        dispatch(logout());
        navigate('/email');
      }
      console.log('current user details', res);
    } catch (error) {
      console.log('error home.tsx', error);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const basePath = location.pathname === '/';

  return (
    <div className="grid lg:grid-cols-[300px,1fr] h-screen max-h-screen">
      <section className={`bg-white ${!basePath && 'hidden'} lg:block`}>
        <Sidebar />
      </section>

      {/**message component**/}
      <section className={`${basePath && 'hidden'}`}>
        <Outlet />
      </section>

      <div
        className={`justify-center items-center flex-col gap-2 hidden ${
          !basePath ? 'hidden' : 'lg:flex'
        }`}
      >
        <div>
          <img src={logo} width={250} alt="logo" />
        </div>
        <p className="text-lg mt-2 text-slate-500">
          Select user to send message
        </p>
      </div>
    </div>
  );
};

export default Home;
