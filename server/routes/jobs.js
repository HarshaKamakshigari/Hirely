// import express from 'express';
// import Job from '../models/job.js';

// const jobRouter = express.Router();

// /**
//  * @desc Create a new job (No auth)
//  * @route POST /api/jobs/post
//  */
// jobRouter.post('/post', async (req, res) => {
//   try {
//     const { title, description, location, salary, requirements } = req.body;

//     if (!title || !description) {
//       return res.status(400).json({ error: 'Title and description are required' });
//     }

//     const job = await Job.create({
//       title,
//       description,
//       location,
//       salary,
//       requirements,
//       postedBy: "null", // since no auth
//     });

//     res.status(201).json(job);
//   } catch (err) {
//     console.error('Error creating job:', err);
//     res.status(500).json({ error: 'Failed to create job' });
//   }
// });

// /**
//  * @desc Remove an existing job by ID
//  * @route POST /api/jobs/remove
//  */
// jobRouter.post('/remove', async (req, res) => {
//   try {
//     const { jobId } = req.body;

//     if (!jobId) {
//       return res.status(400).json({ error: 'Job ID is required' });
//     }

//     const deletedJob = await Job.findByIdAndDelete(jobId);

//     if (!deletedJob) {
//       return res.status(404).json({ error: 'Job not found' });
//     }

//     res.json({ message: 'Job removed successfully', job: deletedJob });
//   } catch (err) {
//     console.error('Error removing job:', err);
//     res.status(500).json({ error: 'Failed to remove job' });
//   }
// });

// export default jobRouter;

import express from 'express';
import Job from '../models/job.js';

const jobRouter = express.Router();

// Get all jobs
jobRouter.get('/', async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    console.error('Error fetching jobs:', err);
    res.status(500).json({ error: 'Failed to fetch jobs' });
  }
});

// Create a new job
jobRouter.post('/post', async (req, res) => {
  try {
    const { title, description, location, salary, requirements } = req.body;

    if (!title || !description) {
      return res.status(400).json({ error: 'Title and description are required' });
    }

    const job = await Job.create({
      title,
      description,
      location,
      salary,
      requirements,
      postedBy: null, // temporary
    });

    res.status(201).json(job);
  } catch (err) {
    console.error('Error creating job:', err);
    res.status(500).json({ error: 'Failed to create job' });
  }
});

// Remove job by ID
jobRouter.post('/remove', async (req, res) => {
  try {
    const { jobId } = req.body;

    if (!jobId) {
      return res.status(400).json({ error: 'Job ID is required' });
    }

    const deletedJob = await Job.findByIdAndDelete(jobId);

    if (!deletedJob) {
      return res.status(404).json({ error: 'Job not found' });
    }

    res.json({ message: 'Job removed successfully', job: deletedJob });
  } catch (err) {
    console.error('Error removing job:', err);
    res.status(500).json({ error: 'Failed to remove job' });
  }
});

// Apply to a job
jobRouter.post('/apply', async (req, res) => {
  try {
    const { jobId, userId } = req.body;
    if (!jobId || !userId) return res.status(400).json({ error: 'Job ID and User ID are required' });

    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ error: 'Job not found' });

    // Prevent duplicate applications
    if (job.applicants.includes(userId)) {
      return res.status(400).json({ error: 'You have already applied to this job' });
    }

    job.applicants.push(userId);
    await job.save();

    res.status(200).json({ message: 'Application submitted successfully' });
  } catch (err) {
    console.error('Error applying to job:', err);
    res.status(500).json({ error: 'Failed to apply for job' });
  }
});


export default jobRouter;
