// import mongoose from 'mongoose';

// const jobSchema = new mongoose.Schema(
//   {
//     title: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     description: {
//       type: String,
//       required: true,
//     },
//     location: {
//       type: String,
//       default: 'Remote',
//     },
//     salary: {
//       type: String,
//       default: 'Not disclosed',
//     },
//     requirements: {
//       type: String,
//       default: '',
//     },
//     postedBy: {
//   type: mongoose.Schema.Types.ObjectId,
//   ref: 'User',
//   required: false, // ✅ make it optional
// },

//     status: {
//       type: String,
//       enum: ['Open', 'Closed'],
//       default: 'Open',
//     },
//   },
//   { timestamps: true }
// );

// export default mongoose.model('Job', jobSchema);
import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    location: { type: String, default: 'Remote' },
    salary: { type: String, default: 'Not disclosed' },
    requirements: { type: String, default: '' },
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
    status: { type: String, enum: ['Open', 'Closed'], default: 'Open' },
    applicants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // new
  },
  { timestamps: true }
);

export default mongoose.model('Job', jobSchema);
