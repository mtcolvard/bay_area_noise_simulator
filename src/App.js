import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react';
import { Routes, Route, Link, Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({
  user,
  redirectPath = '/landing',
  children,
}) => {
  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }
  return children ? children : <Outlet />;
};

const App = () => {
  const [user, setUser] = useState(null)
  const handleLogin = () => setUser({ id: '1', name: 'robin' })
  const handleLogout = () => setUser(null)

  return (
    <>
      <h1>React Router</h1>

      <Navigation />

      {user ? (
        <button onClick={handleLogout}>Sign Out</button>
      ) : (
        <button onClick={handleLogin}>Sign In</button>
      )}

      <Routes>
        <Route index element={<Landing />} />
        <Route path="landing" element={<Landing />} />
        <Route element={<ProtectedRoute user={user} />}>
          <Route path="home" element={<Home />} />
          <Route path="dashboard" element={<Dashboard />} />
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
    <Link to="/dashboard">Dashboard</Link>

  </nav>
);



const Landing = (props) => {

  const [formData, setFormData] = useState(null)
  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    formData == user ? this.props.history.push('/home') : this.props.history.push('/landing')
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
              {this.state.error && <small className="help is-danger">{this.state.error}</small>}
            <div class="control">
              <button class="button is-link">Submit</button>
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

const Dashboard = () => {
  return <h2>Dashboard (Protected: authenticated user required)</h2>;
};


export default App;
