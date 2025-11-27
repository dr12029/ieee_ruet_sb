import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema({
  id: {
    type: String,
    required: [true, 'Please provide a unique ID for this event.'],
    unique: true,
  },
  name: {
    type: String,
    required: [true, 'Please provide a name for this event.'],
    maxlength: [100, 'Name cannot be more than 100 characters'],
  },
  date: {
    type: Date,
    required: [true, 'Please provide a date for this event.'],
  },
  year: {
    type: Number,
  },
  image: {
    type: String,
    required: [true, 'Please provide an image URL for this event.'],
  },
  featured: {
    type: Boolean,
    default: false,
  },
  upcoming: {
    type: Boolean,
    default: true,
  },
  description: {
    type: String,
    required: [true, 'Please provide a description for this event.'],
  },
  details: {
    type: Map,
    of: String,
  },
}, {
  timestamps: true,
});

// Pre-save hook to extract year from date
EventSchema.pre('save', function() {
  if (this.date) {
    this.year = new Date(this.date).getFullYear();
  }
});

export default mongoose.models.Event || mongoose.model('Event', EventSchema);
