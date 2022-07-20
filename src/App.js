import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react';
import { Routes, Route, Link, Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({
  user,
  auth,
  redirectPath = '/landing',
  loginPath = '/home',
  children,
}) => {
  if (user['password'] != auth['password']) {
    return <Navigate to={redirectPath} replace />;
  }
  // else {
  //   return <Navigate to={loginPath} replace/>
  // }
  return children ? children : <Outlet />;
};

const App = () => {

  const [auth, setAuth] = useState({ username: 'Lee Brenner', password: 'Lee' })
  const [user, setUser] = useState({username: null, password: null})
  console.log(auth, 'auth')
  console.log(user, 'user')
  console.log(Boolean(user['username'] == auth['username']), 'boolean')

  const submitUser = (data) => {
    setUser(data)
  }
  const handleLogin = () => setUser({ username: 'Lee Brenner', password: 'lee' })
  const handleLogout = () => setUser(null)

  return (
    <>
      <h1>React Router</h1>

      <Navigation />

      {user == auth ? (
        <button onClick={handleLogout}>Sign Out</button>
      ) : (
        <button onClick={handleLogin}>Sign In</button>
      )}

      <Routes>
        <Route index element={<Landing />} />
        <Route path="landing" element={<Landing submitUser={submitUser}/>} />
        <Route element={
          <ProtectedRoute
            user={user}
            auth={auth} />}>
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
      <h2>Lee Brenner's Noise Abatement Simulator</h2>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label className="label">Username</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  name="username"
                  placeholder="Lee Brenner"
                  onChange={handleChange}
                />
              </div>
            <label className="label">Password</label>
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
  return <h2>Home (Protected: authenticated user required)</h2>;
};

export default App;
