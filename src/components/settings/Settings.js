import { useState, useContext, useEffect, useRef } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { FilmContext } from "../../context/FilmContext";
import Dropzone from "dropzone";
import Header from "../Header";
import Films from "../films/Films";
import Pages from "../pages/Pages";
import "./Settings.css";

export default function Settings() {
  const [newUser, setNewUser] = useState({});
  const { search, setMovies, totalResults, hasUserSearched } =
    useContext(FilmContext);

  const { user } = useAuth0();

  console.log(user, "user in settings");

  const dropzoneRef = useRef(false);

  useEffect(() => {
    Dropzone.autoDiscover = false;

    const myDropzone = new Dropzone(dropzoneRef.current, {
      url: "target", //need to specify url for file upload
      acceptedFiles: "image/*",
      maxFiles: 1,
      maxFilesize: 2,
    });

    myDropzone.on("addedfile", (file) => {
      console.log("file added:", file);
    });

    return () => {
      myDropzone.destroy();
    };
  }, []);

  const handleUpdateProfilePic = async () => {
    try {
      const { name, email, picture } = user; // Extract necessary user data

      console.log(user, "user in settings");

      dropzoneRef.current.click();

      let userResponse = await axios.post("http://localhost:3001/user", {
        name,
        email,
        picture,
      });

      console.log(userResponse, "userResponse");
      setNewUser(userResponse);
    } catch (error) {
      console.error("Error updating profile picture:", error);
    }
  };

  return (
    <div>
      <Header />
      {hasUserSearched ? (
        <>
          <Films />
          <Pages
            search={search}
            setMovies={setMovies}
            totalResults={totalResults}
          />
        </>
      ) : (
        <>
          <div className="settings-title">
            {" "}
            <h1>Account Settings</h1>
          </div>
          <h1 className="avatar-title">Avatar</h1>
          <div className="dropzone" ref={dropzoneRef}>
            <div className="dz-text">
              Drag and drop an image file here, or click to select a file
            </div>
          </div>
          <button onClick={handleUpdateProfilePic}>
            Update Profile Picture
          </button>
        </>
      )}
    </div>
  );
}
