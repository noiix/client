import React, { useState } from "react";
import { useContext } from "react";
import UserContext from "../../contexts/UserContext";
import Button from "../UI/button/Button";

const ProfileUpdate = () => {
  const { profileUpdate, inputHandler, genre, instrument, handleCheck } = useContext(UserContext);

  const [toggleGenre, setToggleGenre] = useState(false)
  const [toggleInstruments, setToggleInstruments] = useState(false)

  function toggleGenreButton(e) {
  e.preventDefault()
    setToggleGenre(!toggleGenre)
  }
  function toggleInstrumentsButton(e) {
    e.preventDefault()
    setToggleInstruments(!toggleInstruments)
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
    <div>

      <form className="updateForm">
        <p>new username</p>
        <input
          type="text"
          name="username"
          placeholder="new username"
          onChange={ inputHandler }
        />
        <p>set your genres</p>
        <Button onClick={ toggleGenreButton } name="genre"/>
        { toggleGenre && <>
          <fieldset>
            { genres.map(genreItem => <>
              {
                genre.includes(genreItem) ?
                  <input id={ genreItem } value={ genreItem } type='checkbox' name='genre' defaultChecked={ true } onChange={ handleCheck } />
                  :
                  <input id={ genreItem } value={ genreItem } type='checkbox' name='genre' onChange={ handleCheck } />

              }
              <label htmlFor={ genreItem }>{ genreItem }</label> 
            </>

            ) }

          </fieldset>
        </> }
        <p>set your instruments</p>
        <Button onClick={ toggleInstrumentsButton } name="instruments"/>
        { toggleInstruments && <>
          <fieldset>

            { instruments.map(instrumentsItem => <>
              {
                instrument.includes(instrumentsItem) ?
                  <input id={ instrumentsItem } value={ instrumentsItem } type='checkbox' name='instruments' defaultChecked={ true } onChange={ handleCheck } />
                  :
                  <input id={ instrumentsItem } value={ instrumentsItem } type='checkbox' name='instruments' onChange={ handleCheck } />

              }
              <label htmlFor={ instrumentsItem }>{ instrumentsItem }</label> 
            </>

            ) }

          </fieldset>
        </>
        }
        <Button type="submit" value="submit" name="submit" onClick={ profileUpdate }/>
      </form>

    </div >
  );
};

export default ProfileUpdate;
