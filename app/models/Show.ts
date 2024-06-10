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
  time: {
    type: String,
    required: true,
  },
  movieType: {
    type: String,
    enum: ['2D', '3D', '4D'],
    required: true,
  },
});

const Show = mongoose.models.Show || mongoose.model('Show', showSchema);

export default Show;