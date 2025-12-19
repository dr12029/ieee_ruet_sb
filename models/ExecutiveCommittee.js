import mongoose from 'mongoose';

const ExecutiveCommitteeSchema = new mongoose.Schema({
  // Basic Information
  name: {
    type: String,
    required: [true, 'Please provide a name for this member.'],
    maxlength: [100, 'Name cannot be more than 100 characters'],
  },
  position: {
    type: String,
    required: [true, 'Please provide a position for this member.'],
    maxlength: [100, 'Position cannot be more than 100 characters'],
  },
  organization: {
    type: String,
    required: [true, 'Please specify the organization (e.g., IEEE RUET SB, IEEE RUET IAS SB Chapter).'],
    enum: [
      'IEEE RUET SB',
      'IEEE RUET IAS SB Chapter',
      'IEEE RUET RAS SB Chapter',
      'IEEE CS RUET SB Chapter',
      'IEEE RUET WIE SB AG',
      'IEEE RUET SPS SB Chapter',
    ],
  },
  
  // Session/Year Information
  session: {
    type: String,
    required: [true, 'Please provide the session year (e.g., 2024-25).'],
    index: true,
  },
  
  // Academic/Professional Information
  designation: {
    type: String, // e.g., Professor, Associate Professor
  },
  department: {
    type: String,
  },
  university: {
    type: String,
    default: 'Rajshahi University of Engineering & Technology',
  },
  
  // Contact Information
  email: {
    type: String,
    lowercase: true,
  },
  phone: {
    type: String,
  },
  
  // Social Media & Web Links
  linkedin: {
    type: String,
  },
  facebook: {
    type: String,
  },
  website: {
    type: String,
  },
  
  // Media
  image: {
    type: String,
  },
  
  // Display Order
  displayOrder: {
    type: Number,
    default: 0,
  },
  
  // Featured Status
  featured_member: {
    type: Boolean,
    default: false,
  },
  
  // Active Status (for current vs hall of fame)
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

// Indexes for efficient queries
ExecutiveCommitteeSchema.index({ session: 1, organization: 1 });
ExecutiveCommitteeSchema.index({ isActive: 1 });

// Virtual field to get current session
ExecutiveCommitteeSchema.virtual('isCurrent').get(function() {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();
  
  // IEEE session typically runs from July to June
  // So 2024-25 means July 2024 to June 2025
  let sessionYear;
  if (currentMonth >= 6) { // July onwards
    sessionYear = `${currentYear}-${(currentYear + 1).toString().slice(2)}`;
  } else {
    sessionYear = `${currentYear - 1}-${currentYear.toString().slice(2)}`;
  }
  
  return this.session === sessionYear;
});

export default mongoose.models.ExecutiveCommittee || mongoose.model('ExecutiveCommittee', ExecutiveCommitteeSchema);
