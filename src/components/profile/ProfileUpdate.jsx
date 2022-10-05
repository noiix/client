import React, { useState } from "react";
import { useContext } from "react";
import UserContext from "../../contexts/UserContext";

const ProfileUpdate = () => {
  const { profileUpdate, inputHandler, genre, instrument, handleCheck } = useContext(UserContext);

  const [toggleGenre, setToggleGenre] = useState(false)
  const [toggleInstruments, setToggleInstruments] = useState(false)

  function toggleGenreButton() {
    setToggleGenre(!toggleGenre)
  }
  function toggleInstrumentsButton() {
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

      <form className="updateForm" onSubmit={ profileUpdate }>
        <input
          type="text"
          name="username"
          placeholder="new username"
          onChange={ inputHandler }
        />
        <br />

        <br />
        <div onClick={ toggleGenreButton }>genre:</div><br />
        { toggleGenre && <>
          <fieldset>

            { genres.map(genreItem => <>
              {
                genre.includes(genreItem) ?
                  <input id={ genreItem } value={ genreItem } type='checkbox' name='genre' defaultChecked={ true } onChange={ handleCheck } />
                  :
                  <input id={ genreItem } value={ genreItem } type='checkbox' name='genre' onChange={ handleCheck } />

              }
              <label htmlFor={ genreItem }>{ genreItem }</label> <br />
            </>

            ) }

          </fieldset>
        </> }

        <div onClick={ toggleInstrumentsButton }>instruments:</div><br />
        { toggleInstruments && <>
          <fieldset>

            { instruments.map(instrumentsItem => <>
              {
                genre.includes(instrumentsItem) ?
                  <input id={ instrumentsItem } value={ instrumentsItem } type='checkbox' name='instruments' defaultChecked={ true } onChange={ handleCheck } />
                  :
                  <input id={ instrumentsItem } value={ instrumentsItem } type='checkbox' name='instruments' onChange={ handleCheck } />

              }
              <label htmlFor={ instrumentsItem }>{ instrumentsItem }</label> <br />
            </>

            ) }

          </fieldset>
        </>
        }


        <br />
        <input type="submit" value="submit" />
      </form>

    </div >
  );
};

export default ProfileUpdate;
