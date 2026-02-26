import mongoose from 'mongoose';

const MemberSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      unique: true,
    },
    role: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Member || mongoose.model('Member', MemberSchema);
