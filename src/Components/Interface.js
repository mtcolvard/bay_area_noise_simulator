import React, {useState, useEffect} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faStop } from '@fortawesome/free-solid-svg-icons'

const Interface = () => {

  const [play, setPlay] = useState(false)
  return (
    <div style={{ fontSize: 50 }}>
      <div className="level is-mobile">
        <div className="level-left">
          <div className="level-item">
            <div  className='playbutton' onClick={() => setPlay(true)}><FontAwesomeIcon icon={faPlay}/>
            </div>
          </div>
          <div className="level-item">
            <div  className='stopButton' onClick={() => setPlay(false)}><FontAwesomeIcon icon={faStop}/>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
  }

export default Interface
