import React, { useState } from "react";
import { useContext } from "react";
import UserContext from "../../contexts/UserContext";

const ProfileUpdate = () => {
  const { profileUpdate, inputHandler, genre, handleCheck } = useContext(UserContext);

  const [toggleBtn, setToggleBtn] = useState(false)
  function togglebutton() {
    setToggleBtn(!toggleBtn)
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
        <div onClick={ togglebutton }>genre:</div><br />
        { toggleBtn ? <>
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
        </> : <></> }



        <br />
        <input type="submit" value="submit" />
      </form>

    </div>
  );
};

export default ProfileUpdate;
