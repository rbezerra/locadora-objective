const Movie = require("../../entities/Movie");

class MovieMemoryRepository {
  constructor() {
    this.movies = [
      {
        movieId: "4353f46f-54bf-435e-b2ce-4187a26097a5",
        name: "Interstellar",
        synopsis:
          "Um grupo de exploradores espaciais tenta salvar a humanidade encontrando um novo planeta habitável.",
        rating: 9.2,
        isAvailable: true,
      },
      {
        movieId: "bff5e0e3-01ef-47ec-ac39-c72b88b8a3bf",
        name: "Inception",
        synopsis:
          "Um ladrão especializado em invadir os sonhos das pessoas é contratado para realizar uma tarefa impossível.",
        rating: 8.7,
        isAvailable: true,
      },
      {
        movieId: "0692b98b-4318-40ed-8377-114793683da4",
        name: "The Shawshank Redemption",
        synopsis:
          "Um banqueiro é condenado por um crime que não cometeu e faz amizade com outros presos ao longo dos anos.",
        rating: 9.3,
        isAvailable: true,
      },
      {
        movieId: "1fab39be-2e51-4804-9a08-517f92d464fc",
        name: "The Dark Knight",
        synopsis:
          "Batman enfrenta o Coringa, um criminoso psicótico que busca semear o caos em Gotham City.",
        rating: 9.0,
        isAvailable: true,
      },
      {
        movieId: "88457d39-1f35-4b2d-a00d-f63f4a6e9501",
        name: "Pulp Fiction",
        synopsis:
          "Histórias interligadas de criminosos, gangsters e personagens peculiares em Los Angeles.",
        rating: 8.9,
        isAvailable: true,
      },
      {
        movieId: "8034adce-33ee-4da0-8e0b-80fbcaa9b00a",
        name: "The Godfather",
        synopsis:
          "A saga de uma família mafiosa italiana e o patriarca que tenta transferir o controle para seu filho mais novo.",
        rating: 9.5,
        isAvailable: true,
      },
      {
        movieId: "da051cd1-8f6e-4bce-97c7-1eae8a96b6dd",
        name: "Forrest Gump",
        synopsis:
          "A história da vida de Forrest Gump, um homem comum que viveu uma vida extraordinária.",
        rating: 8.8,
        isAvailable: true,
      },
      {
        movieId: "b6ee0e2a-3b22-4940-97b7-4f18d5253c05",
        name: "Avatar",
        synopsis:
          "Um ex-fuzileiro naval é enviado a Pandora, um planeta alienígena, como parte de um programa para explorar seus recursos.",
        rating: 8.7,
        isAvailable: true,
      },
      {
        movieId: "695e00a3-5221-4914-9a50-76fbfca97c6b",
        name: "The Matrix",
        synopsis:
          "Um hacker descobre a verdade sobre a realidade e se junta a um grupo de rebeldes para lutar contra as máquinas que controlam a humanidade.",
        rating: 8.9,
        isAvailable: true,
      },
      {
        movieId: "2d7b23f1-2ba3-480b-85f3-fab0c6fb3a874",
        name: "Eternal Sunshine of the Spotless Mind",
        synopsis:
          "Um homem decide apagar as memórias de um relacionamento passado, apenas para perceber que algumas lembranças são inesquecíveis.",
        rating: 8.6,
        isAvailable: false,
      },
    ];
  }

  async save(movie) {
    this.movies.push(movie);
  }

  async update(movie) {
    const movieToUpdateIndex = await this.movies.findIndex(
      (m) => m.movieId === movie.movieId
    );
    if (movieToUpdateIndex < 0) throw new Error("Movie not found");
    this.movies[movieToUpdateIndex] = movie;
  }

  async getById(movieId) {
    const movie = this.movies.find((movie) => movie.movieId === movieId);
    return Promise.resolve(movie);
  }

  async list(limit = 10, offset = 0) {
    const list = this.movies
      .filter((movie) => movie.isAvailable)
      .slice(offset, offset + limit);
    return Promise.resolve(list);
  }
}

module.exports = MovieMemoryRepository;
