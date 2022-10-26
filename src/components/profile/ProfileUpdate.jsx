import React, { useState } from "react";
import { useContext } from "react";
import UserContext from "../../contexts/UserContext";
import DesignContext from "../../contexts/DesignContext";
import Button from "../UI/button/Button";


const ProfileUpdate = () => {
  const { profileUpdate, inputHandler, genre, instrument, handleCheck } = useContext(UserContext);
  const { darkMode } = useContext(DesignContext)

  const [genreDropdown, setGenreDropdown] = useState(false);
  const [instrumentDropdown, setInstrumentDropdown] = useState(false);
  // const [isChecked, setIsChecked] = useState(false);

  function toggleGenreButton(e) {
    e.preventDefault()
    setGenreDropdown(!genreDropdown)
  }
  function toggleInstrumentsButton(e) {
    e.preventDefault()
    setInstrumentDropdown(!instrumentDropdown)
  }

  const closeDropdown = () => {
    setGenreDropdown(false)
    setInstrumentDropdown(false)
  }

  const genres = ["pop",
    "rock",
    "hip hop",
    "latin",
    "edm",
    "r&b",
    "country",
    "folk",
    "classical",
    "jazz",
    "metal",
    "easy listening",
    "new age",
    "blues",
    "world",
    "electronic",
    "techno",
    "house",
  ]

  const instruments = [
    "guitar",
    "piano",
    "drums",
    "percussion",
    "bass",
    "synths",
    "vocals",
    "violin",
    "saxophone",
    "cello",
    "double bass",
    "clarinet",
    "trumpet",
    "flute",
    "harp",
  ]

  return (
    <div className={ darkMode }>

      <form className="updateForm">
        {/* <p>new username</p>
        <input
          type="text"
          name="username"
          placeholder="new username"
          onChange={ inputHandler }
        /> */}
        <p>set your genres</p>

        <div className="dropdown-container">
          <Button onClick={ toggleGenreButton } name="genre" />
          { genreDropdown && <div className="dropdown-background" onClick={ closeDropdown }>
            <div className="dropdown-menu" onClick={ e => e.stopPropagation() }>

              { genres.map(genreItem => <div className={ 'dropdown-list-item' }>
                <label htmlFor={ genreItem }>{ genreItem }</label>
                <div className={ `styled-checkbox ${genre.includes(genreItem) ? 'checked' : 'unchecked'}` } onClick={ handleCheck }>
                  <input id={ genreItem } value={ genreItem } type='checkbox' name='genre' defaultChecked={ genre.includes(genreItem) ? true : false } onClick={ handleCheck } />
                </div>
              </div>

              ) }

            </div>
          </div> }
        </div>
        <p>set your instruments</p>
        <div className="dropdown-container">
          <Button onClick={ toggleInstrumentsButton } name="instruments" />
          { instrumentDropdown && <div className="dropdown-background" onClick={ closeDropdown }>
            <div className="dropdown-menu" onClick={ e => e.stopPropagation() }>

              { instruments.map(instrumentItem => <div className={ 'dropdown-list-item' }>
                <label htmlFor={ instrumentItem }>{ instrumentItem }</label>
                <div className={ `styled-checkbox ${instrument.includes(instrumentItem) ? 'checked' : 'unchecked'}` } onClick={ handleCheck }>
                  <input id={ instrumentItem } value={ instrumentItem } type='checkbox' name='instruments' defaultChecked={ instrument.includes(instrumentItem) ? true : false } onClick={ handleCheck } />
                </div>
              </div>

              ) }

            </div>
          </div> }
        </div>
        <Button type="submit" value="submit" name="submit" onClick={ profileUpdate } />
      </form>

    </div >
  );
};

export default ProfileUpdate;
