import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ticketSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  showId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Show',
    required: true,
  },
  seatNumbers: {
    type: [String],
    required: true,
  },
  bookingDate: {
    type: String,
    default: () => new Date().toISOString(),
  },
  showType: {
    type: String,
    enum: ['2D', '3D', '4D'],
    required: true,
  },
});

const Ticket = mongoose.models.Ticket || mongoose.model('Ticket', ticketSchema);

export default Ticket;