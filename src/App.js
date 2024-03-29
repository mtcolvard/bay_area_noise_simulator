import React, { useState } from 'react';
import { Routes, Route, Link, Navigate, Outlet, useNavigate, } from 'react-router-dom';
import useSound  from 'use-sound'
import noiseSprite from './Assets/noiseSprite4.mp3'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faStop } from '@fortawesome/free-solid-svg-icons'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import './App.scss';

import Login from './Components/Login.js'

const ProtectedRoute = ({
  user,
  auth,
  redirectPath = '/login',
  children,
}) => {
  if (user['password'] !== auth['password']) {
    return <Navigate to={redirectPath} replace />;
  }
  return <Outlet />
}


const App = () => {

  const [auth, setAuth] = useState({ username: 'Lee Brenner', password: process.env.REACT_APP_PASS })
  const [user, setUser] = useState({ username: null, password: null })
  const navigate = useNavigate()
  const submitUser = (data) => {
    setUser(data)
    navigate('/home')
  }

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
  const [decibleReduction, setDecibleReduction] = useState(0)
  const [percentGain, setPercentGain] = useState(1)
  const [selectedSound, setSelectedSound] = useState({ value: 'noisyRestaurant', label: 'Noisy Restaurant' })

  const soundOptions = [
    {value: 'noisyRestaurant', label: 'Noisy Restaurant'},
    {value: 'dragonDancing', label: 'Dragon Dancing Parade'},
    {value: 'fastMovingFreeway', label: 'Ambient Freeway'},
    {value: 'honkingTraffic', label: 'Honking Traffic'},
    {value: 'loudBar', label: 'Loud Bar'},
    {value: 'peopleShouting', label: 'Large Crowd, Shouting'},
    {value: 'poundingCeiling', label: 'Pounding on Ceiling'},
    {value: 'clarinet', label: 'Classical Musician Neighbor'},
  ]
  const defaultOption = selectedSound


  const [play, { stop, sound }] = useSound(noiseSprite, {
    loop: true,
    volume: percentGain,
    sprite: {
      noisyRestaurant: [0, 30000],
      dragonDancing: [30000, 60000],
      fastMovingFreeway: [60000, 90000],
      honkingTraffic: [90000, 120000],
      loudBar: [120000, 130000],
      peopleShouting: [130000, 140000],
      poundingCeiling: [140000, 150000],
      clarinet: [150000,1610000]
    }
  })

  const handleStop = () => {
    stop()
  }

  const handlePlay = () => {
    stop()
    play({ id: selectedSound.value })
  }

  const handleDropdownSelection = (option) => {
    stop()
    setSelectedSound(option)
    play({ id: option.value })
    console.log('you selectedSound', option.value)
  }

  // const handleSubmit = (e) => {
  //   e.preventDefault()
  // }

  const handleDecibleReduction = (e) => {
    const targetValue = (-1 * e.target.value) ?? 0
    setDecibleReduction(targetValue)
    setPercentGain((Math.pow(10, (targetValue / 20))).toFixed(2))
  }

  const arrowClosed = ( <span className="arrow-closed" /> )
  const arrowOpen = ( <span className="arrow-open" /> )

  return(
    <div>
    <section className="section">
      <div className="container">
        <div className="columns">
          <div className="column">
            <h1 className="title is-size-1-tablet is-size-3-mobile">Lee Brenner's Noise Abatement Simulator</h1>
            <h2 className="is-size-3">Select noise source:</h2>
            <div className="columns">
              <div className="column">
                <div className="select">
                  <Dropdown
                    arrowClassName="dropdownArrow"
                    Dropdown-Menu="Dropdown-Menu"
                    menuClassName="dropdown-options"
                    arrowClosed={arrowClosed}
                    arrowOpen={arrowOpen}
                    options={soundOptions}
                    onChange={handleDropdownSelection}
                    value={defaultOption}
                    placeholder="Select an option"
                  />
                </div>
              </div>
              <div className="column">
                <div style={{ fontSize: 50 }}>
                  <div className="level is-mobile">
                    <div className="level-left">
                      <div className="level-item">
                        <div  className='playButton' onClick={handlePlay}><FontAwesomeIcon icon={faPlay}/>
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
              <label>Transmission Loss (Enter -dB amount):<span> </span>
                <input
                  className="control-dbl"
                  id="dbl"
                  type="number"
                  max="6"
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

export default App;
