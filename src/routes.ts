import Header from './components/Headers/Header';
import Blog from './views/Blog';
import ChangePassword from './views/ChangePassword';
import CreateGame from './views/CreateGame';
import Discover from './views/Discover';
import Game from './views/Game';
import GameUI from './views/GameUi';
import Login from './views/Login';
import Profile from './views/Profile';
import Register from './views/Register';
let routes = [
  {
    path: '/index',
    name: 'Home Page',
    icon: 'ni ni-tv-2 text-primary',
    component: Header,
    layout: '/admin',
  },
  {
    path: '/discover',
    name: 'Discover Page',
    icon: 'ni ni-atom text-primary',
    component: Discover,
    layout: '/admin',
  },
  {
    path: '/game',
    name: 'Game',
    icon: 'ni ni-controller text-primary',
    component: Game,
    layout: '/admin',
  },
  {
    path: '/gameUi',
    name: 'GameUi',
    icon: 'ni ni-controller text-primary',
    component: GameUI,
    layout: '/admin',
  },
  {
    path: '/user-profile',
    name: 'User Profile',
    icon: 'ni ni-single-02 text-yellow',
    component: Profile,
    layout: '/admin',
  },
  {
    path: '/changePassword',
    name: 'Change Password',
    icon: 'ni ni-key-25 text-info',
    component: ChangePassword,
    layout: '/admin',
  },
  {
    path: '/login',
    name: 'Login',
    icon: 'ni ni-key-25 text-info',
    component: Login,
    layout: '/auth',
  },
  {
    path: '/register',
    name: 'Register',
    icon: 'ni ni-circle-08 text-pink',
    component: Register,
    layout: '/auth',
  },
  {
    path: '/create-game',
    name: 'Create Game',
    icon: 'ni ni-controller text-primary',
    component: CreateGame,
    layout: '/admin',
  },
  {
    path: '/blog/:title/:id',
    name: 'Blog',
    icon: 'ni ni-controller text-primary',
    component: Blog,
    layout: '/admin',
  },
];
export default routes;
