import { useContext } from "react";
import { FilmContext } from "../../context/FilmContext";
import Header from "../Header";
import Films from "../films/Films";
import Pages from "../pages/Pages";
import placeholder from "./assets/Placeholder.jpg";
import "./Welcome.css";

export default function Welcome() {
  const { search, setMovies, totalResults, hasUserSearched } =
    useContext(FilmContext);

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
        <div className="welcome-wrapper" style={{ color: "white" }}>
          <div className="welcome-container">
            <h1>Start tracking...</h1>
            <p>
              Sign in or register to begin. We are your destination for
              tracking, rating, and reviewing films. You can create a watchlist
              of titles you want to see and find lists and inspiration. Our
              platform also serves as a comprehensive cast and crew database and
              features an activity stream of passionate film criticism,
              discussion and discovery.
            </p>
          </div>
          <div className="intro-container">
            <h2>How Movie Tracker works</h2>
          </div>
          <div className="seen-container">
            <h3>Tell us what you've seen</h3>
            <div className="seen-content-wrapper">
              <p>
                To start tracking films, visit our Popular section and mark the
                films you've watched. Click the eye icon on any film poster to
                indicate that you've tracked it (add a heart if you liked it,
                and consider leaving a review or rating!). All watched titles
                will be added to your Tracked tab, where you can explore reviews
                containing spoilers (usually hidden) and other exciting content.
              </p>
                <img
                  className="placeholder-img"
                  src={placeholder}
                  alt="placeholder"
                />
            </div>
          </div>
          <div className="browse-container">
            <h3>Browse your watched films</h3>
            <p>
              Once you've tracked some films, you can find them in the Tracked
              tab of your profile. As you add more content, your profile will
              reflect your taste. You can also browse the films of other members
              or the community by activating the "Hide watched films" option to
              discover more great movies.
            </p>
          </div>
          <div className="save-container">
            <h3>Save films to track later</h3>
            <p>
              One of our most beloved features is the Watchlist, which allows
              you to keep a list of films you want to track. Begin by exploring
              the and marking the films you're eager to watch. You can use the
              clock icon on a film or review page or access the options menu on
              any poster(shown opposite *to come soon*). If you later log or
              mark a film as watched, we'll move it from your Watchlist to your
              Films (and add it to your Tracked tab if you provide a date).
            </p>
          </div>
          <div className="account-container">
            <h3>Your account, profile and settings</h3>
            <p>
              To access the main sections of your account, simply click the
              dropdown menu at the top of each page. Your Profile, Tracked
              films, and Watchlist are accessible from there.
            </p>
          </div>
          <div className="track-container">
            <h3>Track a film</h3>
            <p>
              When you track a film, you inform us that you've watched it on a
              specific date and can attach a rating and/or review. All films you
              track with a date will be included in your Tracked list.
            </p>
          </div>
          <div className="follow-container">
            <h3>Following and activity **To Come**</h3>
            <p>
              The best way to find members to follow is by reading reviews of
              films you enjoy, allowing you to identify the voices and opinions
              you resonate with. Our Members page showcases popular accounts. As
              you follow more people, we curate a personalized Activity stream
              that features reviews and recommendations from these members
              (you'll likely discover new individuals to follow through the
              Likes included here).
            </p>
          </div>
          <div className="discover-container">
            <h2>Here’s what you’ll find in our main sections…</h2>
            <div className="column-container">
              <div className="column">
                <h3>Homepage</h3>
                <p>
                  If you're signed in, you'll find a selection of popular films,
                  reviews, and lists from Movie Tracker members. As you follow
                  more people, this page will be personalized to display what's
                  popular within your network.
                </p>
              </div>
              <div className="column">
                <h3>Films</h3>
                <p>
                  This section displays the films that our members are watching
                  and reviewing the most. It also serves as your starting point
                  for browsing the entire database by decade/year, genre,
                  popularity, rating, streaming service, and more.
                </p>
              </div>
              <div className="column">
                <h3>Lists</h3>
                <p>
                  In this section, you can explore our highly popular lists and
                  discover recently added content. It's the perfect place to
                  create your own list, browse through more popular lists, or
                  explore content based on the tags assigned by their creators.
                </p>
              </div>
              <div className="column">
                <h3>Members</h3>
                <p>
                  Here, you'll discover creators whose content is greatly
                  appreciated by our community. Feel free to click through and
                  see if their style resonates with you, or connect with your
                  real-life friends on Twitter and Facebook who are also Movie
                  Tracker users.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
