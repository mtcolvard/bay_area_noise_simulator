import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react';
import { Routes, Route, Link, Navigate, Outlet, useNavigate, } from 'react-router-dom';

const ProtectedRoute = ({
  user,
  auth,
  redirectPath = '/landing',
  children,
}) => {
  if (user['password'] != auth['password']) {
    return <Navigate to={redirectPath} replace />;
  }
  // else {
  //   return <Navigate to={loginPath} replace/>
  // }
  return <Outlet />
}

const App = () => {

  const [auth, setAuth] = useState({ username: 'Lee Brenner', password: 'Lee' })
  const [user, setUser] = useState({username: null, password: null})
  const navigate = useNavigate()
  const submitUser = (data) => {
    setUser(data)
    navigate('/home')
  }
  const handleLogin = () => setUser({ username: 'Lee Brenner', password: 'lee' })
  const handleLogout = () => setUser(null)
  console.log(auth, 'auth')
  console.log(user, 'user')
  console.log(Boolean(user['username'] == auth['username']), 'boolean')

  return (
    <>
      <h1>Lee Brenner's Noise Abatement Simulator</h1>
      <Routes>
        <Route index element={<Landing />} />
        <Route
          path="landing"
          element={<Landing submitUser={submitUser}/>} />
        <Route
          element={<ProtectedRoute user={user} auth={auth} />}>
          <Route path="home" element={<Home />} />
        </Route>
        <Route path="*" element={<p>There's nothing here: 404!</p>} />
      </Routes>
    </>
  );
};

const Navigation = () => (
  <nav>
    <Link to="/landing">Landing</Link>
    <Link to="/home">Home</Link>
  </nav>
);



const Landing = ({submitUser}) => {
  const [formData, setFormData] = useState(null)
  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    submitUser(formData)
  }

  return(
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label className="label">Welcome Lee. Please enter your password:</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  name="password"
                  placeholder="eg: ••••••••"
                  onChange={handleChange}
                />
              </div>
            <div className="control">
              <button className="button is-link">Submit</button>
            </div>
          </div>
        </form>
      </div>
    </div>

)
};

const Home = () => {
  return(
    <div>
      <h2>Select noise source:</h2>
      <h2>Select dB reduction:</h2>
    </div>

  )
}

export default App;
