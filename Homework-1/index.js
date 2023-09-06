//? 1. Define 5 different REST Resources - JSON
//*  - users.json, books.json, cars.json, locations.json, products.json
//? 2. CRUD for ONE of the models (use readData and writeData)

const fs = require("fs");

//! Citanje na fajl
const readData = (source) => {
  return new Promise((success, fail) => {
    fs.readFile(`${source}.json`, "utf-8", (err, data) => {
      if (err) return fail(err);
      const out = JSON.parse(data); //* gi parsirame podatocite od json format vo js format
      return success(out); //* vrakjame uspesnost so parsiranite podatoci
    });
  });
};

//! JSON.stringify(value, replacer, space)
//* prviot parametar e vrednosta sto sakame da ja stringificirame
//* vtoriot parametar e zamenata, vo nasiot slucaj null oznacuva deka ne se koristi zamena i ke se koristi standardniot proces na stringifikacija
//* tretiot parametar e prostorot, vo nasiot slucaj 2 koj sto mu kazuva da koristi dve prazni mesta
//? Na ovoj nacin JSON nizata ke ja napraveme pocitliva i polesna za razbiranje

//! Pishuvanje na fajl
const writeData = (data, destination) => {
  return new Promise((success, fail) => {
    const out = JSON.stringify(data, null, 2); //* gi stringificirame podatocite nazad vo json format
    fs.writeFile(`${destination}.json`, out, (err) => {
      if (err) return fail(err);
      return success();
    });
  });
};

//? CRUD

//! Create
const addMovie = async (id, title, director, genre, release_year, rating, language) => {
  try {
    const newMovie = {
      id,
      title,
      director,
      genre,
      release_year,
      rating,
      language
    };
    let data = await readData("./movies");
    data.push(newMovie);
    await writeData(data, "./movies");
  } catch (err) {
    throw err;
  }
};

//! Update
const updateMovie = async (id, newMovieData) => {
  try {
    //* gi citame podatocite
    let data = await readData("./movies");
    //* go pronaogjame filmot sto sakame da go azurirame preku negovoto id
    const movie = data.find(film => film.id === id);
    const newMovie = {
      ...movie, //* gi prefrlame site postoecki podatoci
      ...newMovieData //* gi prefrlame site novi podatoci
    };
    //* so data.filter go otstranuvame toj film sto sakame da go azurirame
    data = data.filter(movie => movie.id !== id);
    //* so data.push go dodavame noviot film so azuriranite podatoci
    data.push(newMovie);
    //* gi zapisuvame novite podatoci vo nizata
    await writeData(data, "./movies");
  } catch (err) {
    throw err;
  }
};

//! Remove
const removeMovie = async (id) => {
  try {
    const data = await readData("./movies");
    const movies = data.filter(movie => movie.id !== id);
    await writeData(movies, "./movies");
  } catch (err) {
    throw err;
  }
};

(async function() {
  await addMovie(11, "Pulp Fiction", "Quentin Tarantino", "Crime", 1994, 8.9, "English");
  await updateMovie(1, { rating: 7.5 });
  await removeMovie(6);
})();