
import React, {useState} from 'react';

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
        <section className="section">
          <div className="container">
            <div className="columns">
              <div className="column">
                <h1 className="title is-size-1">Lee Brenner's Noise Abatement Simulator</h1>
                <h3 className="is-size-3">The use of this site is restricted to authorized users.</h3>
                <h3 className="is-size-3">Please enter valid credentials to continue.</h3>
                <div className="block"></div>
                <div className="columns">
                  <div className="column is-one-third">
                    <form onSubmit={handleSubmit}>
                      <div className="field">
                        <label className="label">Password:</label>
                          <div className="control">
                            <input
                              className="input"
                              type="text"
                              name="password"
                              placeholder="eg: ••••••••"
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="field">
                          <div className="control">
                            <button className="button is-link">Submit</button>
                          </div>
                        </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

  )
  };
export default Landing
