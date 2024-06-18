import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstname: {
    type: String,
    require: false,
  },
  lastname: {
    type: String,
    require: false,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: false,
  },
  date: {
    type: String,
    default: () => new Date().toISOString(),
  },
});

const User = mongoose.models.users || mongoose.model('users', userSchema);

export default User;