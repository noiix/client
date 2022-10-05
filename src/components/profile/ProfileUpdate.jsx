import React, { useState } from "react";
import { useContext } from "react";
import UserContext from "../../contexts/UserContext";

const ProfileUpdate = () => {
  const { profileUpdate, inputHandler, genre } = useContext(UserContext);

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
              <input type='checkbox' name='genre' value={ genreItem } />
              <label htmlFor={ genreItem }>{ genreItem }</label> <br />
            </>

            ) }
            {/* <input type="checkbox" defaultChecked={ true } name="genre" value='pop' />
            <label htmlFor="pop">pop</label><br />
            <input type="checkbox" name="genre[]" value='rock' />
            <label htmlFor="rock">rock</label><br />
            <input type="checkbox" name="genre[]" value='hip hop' />
            <label htmlFor="hip hop">hip hop</label><br />
            <input type="checkbox" name="genre[]" value='latin' />
            <label htmlFor="latin">latin</label><br />
            <input type="checkbox" name="genre[]" value='edm' />
            <label htmlFor="edm">edm</label><br />
            <input type="checkbox" name="genre[]" value='country' />
            <label htmlFor="country">country</label><br />
            <input type="checkbox" name="genre[]" value='folk' />
            <label htmlFor="folk">folk</label><br />
            <input type="checkbox" name="genre[]" value='classical' />
            <label htmlFor="classical">classical</label><br />
            <input type="checkbox" name="genre[]" value='jazz' />
            <label htmlFor="jazz">jazz</label><br />
            <input type="checkbox" name="genre[]" value='metal' />
            <label htmlFor="metal">metal</label><br />
            <input type="checkbox" name="genre[]" value='easy listening' />
            <label htmlFor="easy listening">easy listening</label><br />
            <input type="checkbox" name="genre[]" value='new age' />
            <label htmlFor="new age">new age</label><br />
            <input type="checkbox" name="genre[]" value='blues' />
            <label htmlFor="blues">blues</label><br />
            <input type="checkbox" name="genre[]" value='world' />
            <label htmlFor="world">world</label><br />
            <input type="checkbox" name="genre[]" value='electronic' />
            <label htmlFor="electronic">electronic</label><br />
            <input type="checkbox" name="genre[]" value='techno' />
            <label htmlFor="techno">techno</label><br />
            <input type="checkbox" name="genre[]" value='house' />
            <label htmlFor="house">house</label> */}
          </fieldset>
        </> : <></> }



        <br />
        <input type="submit" value="submit" />
      </form>

    </div>
  );
};

export default ProfileUpdate;
