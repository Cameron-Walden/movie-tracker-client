# MovieTracker

MovieTracker is a feature-rich web application built using JavaScript, React, NodeJS, Express and MongoDB that allows users to search for movies, save them to their "saved films" or "watchlist" lists, and rate and review movies they have watched. Movies are stored in [MongoDB](https://www.mongodb.com/). This app uses the [TMDB API](https://www.themoviedb.org/) and [Axios](https://axios-http.com/) for fetching movie data as well as some [MUI](https://mui.com/) components for styling. I wanted to build this app, because for years I have kept track of all movies I've watched in the notes of my phone and I thought this would be a more interactive way for me to do so, on top of it being a fun project to build.

Currently on the landing page, movies shown are the movies that are popular for that week. They are updated weekly. To search for movies, type a movie into the search field. You can then either select the movie icon to add a movie to your saved films list, or select the eye icon to add the movie to oyur watchlist. If you select the movie icon, you will first be prompted to add a review, 5 star rating and the date you watched the film. Depending on what you selected, you can then navigate to your saved films or watchlist from the dropdown menu in the navbar. Users can also browse films by genre by selecting a genre from the dropdown (with functionality for browsing by year, rating and popularity coming soon).

This is  a project I'm working on in my spare time, so I know there are many bugs to work out, it's just a matter of trying to find the time! Thanks for checking it out!

---

## Getting Started

To get started with MovieTracker, you can clone this repository to your local machine and run the following command to install the necessary dependencies:

`npm i`

---

Next, you'll want to sign up for an account at [TMDB](https://www.themoviedb.org/) to get your own api key. You can do so by following these steps:

- Head to [TMDB](https://www.themoviedb.org) and click on the "Join TMDB" button in the top right corner of the page.

- Fill out the registration form with your personal information, including your full name, email address, and desired password. You will also need to agree to the terms of service and the privacy policy.

- Once you've registered, log in to your account and navigate to the API section of the TMDB website by clicking on "API" in the main navigation menu.

- Select the type of API key that you want to generate. TMDb offers two types of API keys: a read-only key, which allows you to access TMDB's database of movie and TV show information, and a read/write key, which allows you to modify and add data to the database (for this project, you'll want the first option).

- Fill out the API key request form, providing details about your project and how you plan to use the API. TMDb will review your application and may require additional information before granting you an API key.

- Once your API key has been approved, you will receive an email with instructions on how to access and use the key in your project. You can also view your API key on the TMDB website by logging in to your account and navigating to the API section.

Once you have your API key, create your .env file at the root of your project (make sure to add it to your .gitignore so it doesn't get pushed up) and add it as the value of the environment variable like:

`REACT_APP_MOVIE_API=<your api key here>`

Next, make sure to clone down the [server](https://github.com/Cameron-Walden/movie-tracker-server)
and install all dependancies. Next, you'll want to head to [MongoDB](https://www.mongodb.com/) to get your own connection string.  Youc an follow these steps to do :

- First, you'll need to create a MongoDB account on their website if you haven't already done so.

- Once you have an account, log in to the MongoDB Atlas dashboard.

- Click the "Create a New Project" button and follow the prompts to create a new project. If you already have a project, you can skip this step.

- Click on the "Clusters" tab in the left-hand navigation menu.

- Click the "Build a New Cluster" button to create a new MongoDB cluster.

- Follow the prompts to create your new cluster, including selecting the region where you want it to be hosted and selecting the size and type of cluster you want.

- Once your cluster is created, click the "Connect" button next to it.

- Select "Connect Your Application" from the dropdown menu.

- Select your driver and version, then copy the connection string provided.

Once you have it, you'll want to add it along with your TMDB api key to your .env file (again, make sure to first add your .env file to your .gitignore) like:

`MOVIE_API_KEY=<your TMDB api key here>`\
`DB_URL=<your mongodb connection string here>`

- Make sure to  replace the placeholder values with your actual MongoDB account information and credentials.

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
