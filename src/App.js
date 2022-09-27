import useSound from 'use-sound'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faStop } from '@fortawesome/free-solid-svg-icons'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

import logo from './logo.svg';
import peopleTalking from './Assets/people_talking.mp3'
import dragonDancing from './Assets/dragon_dancing.mp3'
import noiseSprite from './Assets/noiseSprite1.mp3'
import './App.scss';
import React, {useState, useEffect} from 'react';
import Login from './Components/Login.js'
import Interface from './Components/Interface.js'
import { Routes, Route, Link, Navigate, Outlet, useNavigate, } from 'react-router-dom';

const ProtectedRoute = ({
  user,
  auth,
  redirectPath = '/login',
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

  const [auth, setAuth] = useState({ username: 'Lee Brenner', password: 'Lara' })
  const [user, setUser] = useState({ username: null, password: null })
  const navigate = useNavigate()
  const submitUser = (data) => {
    setUser(data)
    navigate('/home')
  }
  const handleLogin = () => setUser({ username: 'Lee Brenner', password: 'Lara' })
  const handleLogout = () => setUser(null)
  console.log(auth, 'auth')
  console.log(user, 'user')
  console.log(Boolean(user['password'] == auth['password']), 'boolean')

  return (
    <>
      <Routes>
        <Route
          index
          element={<Login submitUser={submitUser}/>} />
        <Route
          path="login"
          element={<Login submitUser={submitUser}/>} />
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
    <Link to="/login">Login</Link>
    <Link to="/home">Home</Link>
  </nav>
);

const Home = () => {
  const [percentGain, setPercentGain] = useState(1)
  const [decibleReduction, setDecibleReduction] = useState(0)

  const handleDecibleReduction = (e) => {
    setDecibleReduction(e.target.value)
    setPercentGain((Math.pow(10, (e.target.value / 20))).toFixed(2))
  }
  // const [play, { stop, sound }] = useSound(peopleTalking, {loop: true, volume: percentGain,})
  const [play, { stop, sound }] = useSound(noiseSprite, {
    loop: true,
    volume: percentGain,
    sprite: {
      peopleTalking: [0, 60000],
      dragonDancing: [60000, 120000]
    }
  })
  const handlePlay = () => { play({id: selectedSound.value}) }
  const handleStop = () => { stop() }

  const [selectedSound, setSelectedSound] = useState({value: 'peopleTalking', label: 'People Talking'})

  const handleDropdownSelection = (option) => {
    handleStop()
    setSelectedSound(option)
    console.log('you selectedSound', option.value)
  }



  // const handleDropdownSelect = () => {
  //   console.log(value)
  // }

  const spriteMap = {
    peopleTalking: [0, 60000],
    dragonDancing: [60000, 120000]
  }

  const soundOptions = [{value: 'peopleTalking', label: 'People Talking'}, {value: 'dragonDancing', label: 'Dragon Dancing'}]
  const defaultOption = selectedSound



  return(
    <div>
    <section className="section">
      <div className="container">
        <div className="columns">
          <div className="column">
            <h1 className="title is-size-1">Lee Brenner's Noise Abatement Simulator</h1>
            <h2 className="is-size-3">Select noise source:</h2>
            <div className="columns">
              <div className="column">
                <div className="select">
                  <Dropdown
                    options={soundOptions}
                    onChange={handleDropdownSelection}
                    value={defaultOption}
                    placeholder="Select an option"
                  />
                </div>
              </div>
              <div className="column">
                <div style={{ fontSize: 50 }}>
                  <div className="level">
                    <div className="level-left">
                      <div className="level-item">
                        <div  className='playbutton' onClick={handlePlay}><FontAwesomeIcon icon={faPlay}/>
                        </div>
                      </div>
                      <div className="level-item">
                        <div  className='stopButton' onClick={handleStop}><FontAwesomeIcon icon={faStop}/>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <h2 className="is-size-3">Enter dB reduction:</h2>
            <div>
              <label>Transmission Loss (dB):<span> </span>
                <input
                  className="control-dbl"
                  id="dbl"
                  type="number"
                  max="12"
                  value={decibleReduction}
                  onChange={handleDecibleReduction} />
              </label>
            </div>
          </div>
        </div>
      </div>
    </section>
    </div>

  )
}

// <select id="noiseSource" addeventlistener={handleDropdownSelect}>
//   <option value="">-Please select a noise source-</option>
//   <option value="peopleTalking"> Crowded Restaurant </option>
//   <option value="dragonDancing"> Dragon Dancing </option>
// </select>

export default App;
