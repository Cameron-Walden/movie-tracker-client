import { useContext, useEffect, useRef } from "react";
import { FilmContext } from "../../context/FilmContext";
import Dropzone from "dropzone";
import Header from "../Header";
import Films from "../films/Films";
import Pages from "../pages/Pages";
import "./Settings.css";

export default function Settings() {
  const { search, setMovies, totalResults, hasUserSearched } =
    useContext(FilmContext);

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
        </>
      )}
    </div>
  );
}
