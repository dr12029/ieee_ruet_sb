import mongoose from 'mongoose';

const GallerySchema = new mongoose.Schema(
  {
    eventId: {
      type: String,
      default: null,
      index: true,
    },
    year: {
      type: String,
      required: true,
      index: true,
    },
    eventSlug: {
      type: String,
      required: true,
      index: true,
    },
    eventName: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      default: [],
    },
    displayOrder: {
      type: Number,
      default: 0,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Compound index for year + eventSlug (unique combination)
GallerySchema.index({ year: 1, eventSlug: 1 }, { unique: true });

const Gallery = mongoose.models.Gallery || mongoose.model('Gallery', GallerySchema);

export default Gallery;
