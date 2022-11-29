#! /usr/bin/env node

console.log(
  "This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0.a9azn.mongodb.net/local_library?retryWrites=true"
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/

import async from "async";

import { Developer } from "./models/developer.js";
import { Game } from "./models/game.js";
import { Genre } from "./models/genre.js";
import { Tag } from "./models/tag.js";

import mongoose from "mongoose";
const mongoDB = userArgs[0];
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

const developers = [];
const games = [];
const genres = [];
const tags = [];

function gameCreate(name, release_date, finished_date, rating, developer, genre, tag, cb) {
  const data = { name, release_date, developer, genre };
  if (finished_date !== false) data.finished_date = finished_date;
  if (rating !== false) data.rating = rating;
  if (tag !== false) data.tag = tag;

  const game = new Game(data);

  game.save((err) => {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New game: " + game);
    games.push(game);
    cb(null, game);
  });
}

function developerCreate(name, country, date_founded, cb) {
  const data = { name, country, date_founded };

  const developer = new Developer(data);

  developer.save((err) => {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New developer: " + developer);
    developers.push(developer);
    cb(null, developer);
  });
}

function genreCreate(name, cb) {
  const data = { name };

  const genre = new Genre(data);

  genre.save((err) => {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New genre: " + genre);
    genres.push(genre);
    cb(null, genre);
  });
}

function tagCreate(name, cb) {
  const data = { name };

  const tag = new Tag(data);

  tag.save((err) => {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New tag: " + tag);
    tags.push(tag);
    cb(null, tag);
  });
}

function createDevelopersGenresTags(cb) {
  async.series(
    [
      // developers
      (callback) => {
        developerCreate("Obsidian Entertainment", "USA", "2003-06-12", callback);
      },
      (callback) => {
        developerCreate("Rockstar Games", "USA", "1998-12-01", callback);
      },
      (callback) => {
        developerCreate("Mojang Studios", "Sweden", "2009-01-01", callback);
      },
      (callback) => {
        developerCreate("Blizzard Entertainment", "USA", "1991-02-01", callback);
      },
      (callback) => {
        developerCreate("Valve Corporation", "USA", "1996-08-24", callback);
      },
      // genres
      (callback) => {
        genreCreate("Action", callback);
      },
      (callback) => {
        genreCreate("Sandbox", callback);
      },
      (callback) => {
        genreCreate("MMO", callback);
      },
      (callback) => {
        genreCreate("Free to Play", callback);
      },
      // tags
      (callback) => {
        tagCreate("RPG", callback);
      },
      (callback) => {
        tagCreate("Open World", callback);
      },
      (callback) => {
        tagCreate("Post-apocalyptic", callback);
      },
      (callback) => {
        tagCreate("Crime", callback);
      },
      (callback) => {
        tagCreate("Classic", callback);
      },
      (callback) => {
        tagCreate("Action", callback);
      },
      (callback) => {
        tagCreate("Free to Play", callback);
      },
      (callback) => {
        tagCreate("Hero Shooter", callback);
      },
      (callback) => {
        tagCreate("Multiplayer", callback);
      },
      (callback) => {
        tagCreate("FPS", callback);
      },
      (callback) => {
        tagCreate("Adventure", callback);
      },
      (callback) => {
        tagCreate("Sandbox", callback);
      },
      (callback) => {
        tagCreate("Survival", callback);
      },
      (callback) => {
        tagCreate("Massively Multiplayer", callback);
      },
      (callback) => {
        tagCreate("Shooter", callback);
      }
    ],
    // optional callback
    cb
  );
}

function createGames(cb) {
  async.parallel(
    [
      (callback) => {
        gameCreate(
          "Fallout: New Vegas",
          "2010-10-19",
          "2013-01-01",
          "5",
          developers[0],
          genres[0],
          [tags[0], tags[1], tags[2]],
          callback
        );
      },
      (callback) => {
        gameCreate(
          "Grand Theft Auto: San Andreas",
          "2007-10-26",
          "2011-01-01",
          "5",
          developers[1],
          genres[0],
          [tags[1], tags[3], tags[4], tags[5]],
          callback
        );
      },
      (callback) => {
        gameCreate(
          "Minecraft",
          "2011-11-18",
          "2012-01-01",
          "5",
          developers[2],
          genres[1],
          [tags[1], tags[10], tags[11], tags[12]],
          callback
        );
      },
      (callback) => {
        gameCreate(
          "World of Warcraft",
          "2004-11-23",
          "2011-01-01",
          "5",
          developers[3],
          genres[2],
          [tags[0], tags[1], tags[13]],
          callback
        );
      },
      (callback) => {
        gameCreate(
          "Team Fortress 2",
          "2007-10-10",
          "2012-01-01",
          "5",
          developers[4],
          genres[3],
          [tags[4], tags[6], tags[7], tags[8], tags[9]],
          callback
        );
      }
    ],
    // optional callback
    cb
  );
}

async.series(
  [createDevelopersGenresTags, createGames],
  // Optional callback
  (err) => {
    if (err) {
      console.log("FINAL ERR: " + err);
    } else {
      console.log("Success!");
    }
    // All done, disconnect from database
    mongoose.connection.close();
  }
);
