import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const showSchema = new Schema({
  movieId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie',
    required: true,
  },
  seats: {
    type: Number,
    required: true,
  },
  availableSeats: {
    type: Number,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  timings: {
    type: [String],
    required: true,
  },
  movieType: {
    type: [String],
    required: true,
  },
  
  typePrice: {
    type: [Number],
    required: true,
  },
  
});

const Show = mongoose.models.Show || mongoose.model('Show', showSchema);

export default Show;