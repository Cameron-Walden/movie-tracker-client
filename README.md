# MovieTracker

MovieTracker is a feature-rich web application built using JavaScript, React, NodeJS and Express that allows users to search for movies, save them to their "saved films" or "watchlist" lists, and rate and review movies they have watched. Movies are stored in [MongoDB](https://www.mongodb.com/). This app uses the [TMDB API](https://www.themoviedb.org/) and [Axios](https://axios-http.com/) for fetching movie data and [MUI](https://mui.com/) for styling. I wanted to build this app, because for years I have kept track of all movies I've watched in the notes of my phone and I thought this would be a more interactive way for me to do so, on top of it being a fun project to build.

Currently on the landing page, movies shown are the movies that are popular for that week. They are updated weekly. To search for movies, type a movie into the search field. You can then either select the movie icon to add a movie to your saved films list, or select the eye icon to add the movie to oyur watchlist. If you select the movie icon, you will first be prompted to add a review, 5 star rating and the date you watched the film. Depending on what you selected, you can then navigate to your saved films or watchlist from the dropdown menu in the navbar. Users can also browse films by genre by selecting a genre from the dropdown (with functionality for browsing by year, rating and popularity coming soon).

---

## Getting Started

To get started with MovieTracker, you can clone this repository to your local machine and run the following command to install the necessary dependencies:

`npm i`

---

Next, you'll want to sign up for an account at TMDB(https://www.themoviedb.org/) to get your own api key. Once you have that, create your .env file at the root of your project (make sure to add it to your .gitignore so it doensn't get pushed up) and add it as the value of the environment variable like:

`REACT_APP_MOVIE_API=<your api key here>`

Next, make sure to clone down the [server](https://github.com/Cameron-Walden/movie-tracker-server)
and install all dependancies. Next, you'll want to head to [MongoDB](https://www.mongodb.com/) to get your own connection string. Once you have it, you'll want to add it along with your TMDB api key to your .env file (again, make sure to first add your .env file to your .gitignore) like:

`MOVIE_API_KEY=<your TMDB api key here>`\
`DB_URL=<your mongodb connection string here>`

You can then run the server on a port of your choosing, or by default it will run on 3001

Once the dependencies have been installed, you can run the following command to start the app:

`npm start`

The app should then be accessible on http://localhost:3000/.

---

## Contributing
If you're interested in contributing to MovieTracker, I welcome and encourage your contributions! Here are a few ways you can contribute:

- Reporting bugs: If you encounter any bugs or issues with the app, please let me know by submitting an issue on the GitHub repository. Be sure to include as much detail as possible so I can understand and replicate the issue.

- Suggesting new features: If you have an idea for a new feature or enhancement to the app, please let me know by submitting an issue on the GitHub repository. I'd love to hear your ideas and feedback!

- Submitting code contributions: If you're interested in contributing code to the project, please create a fork of the repository and submit a pull request with your changes. I'll review your changes and merge them into the main branch if everything looks good.

--- 

This is  a project I'm working on in my spare time, so I know there are many bugs to work out, it's just a matter of trying to find the time! Thanks for checking it out!