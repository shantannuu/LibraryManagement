import './stylesheets/alignments.css'
import './stylesheets/custom-components.css'
import './stylesheets/form-elements.css'
import './stylesheets/sizes.css'
import './stylesheets/theme.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login'
import Register from './pages/Register'
import ProtectedRoutes from './components/ProtectedRoutes'
import { useSelector } from 'react-redux'
import Loader from './components/Loader'
import Profile from './pages/Profile'
import BookDescription from './pages/BookDescription'

function App() {

  const { loading } = useSelector((state) => state.loaders);

  return (
    <div>
      {loading && <Loader/>}
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<ProtectedRoutes><Home /></ProtectedRoutes>}></Route>
          <Route path='/book/:id' element={<ProtectedRoutes><BookDescription /></ProtectedRoutes>}></Route>
          <Route path='/profile' element={<ProtectedRoutes><Profile /></ProtectedRoutes>}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/register' element={<Register />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
