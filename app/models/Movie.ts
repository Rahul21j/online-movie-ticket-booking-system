import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const movieSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  imdb_rating: {
    type: Number,
    required: true,
  },
  directors: {
    type: [String],
    required: true,
  },
  cast: {
    type: [String],
    required: true,
  },
  poster: {
    type: String,
    required: true,
  },
  fullplot: {
    type: String,
    required: true,
  },
  languages: {
    type: [String],
    required: true,
  },
  released: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  genres: {
    type: [String],
    required: true,
  }
});

const Movie = mongoose.models.Movie || mongoose.model('Movie', movieSchema);

export default Movie;