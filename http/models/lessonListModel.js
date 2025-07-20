import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema({});

const Activity = mongoose.model('Activity', activitySchema);

export default Activity;
