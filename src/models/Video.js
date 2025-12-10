import mongoose from "mongoose";

export const VIDEO_DIMENSIONS = {
  width: 1080,
  height: 1920,
};

const VideoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    videoUrl: { type: String, required: true },
    thumbnailUrl: { type: String, required: true },
    controls: { type: Boolean, default: true },
    transformation: {
      width: { type: Number, default: VIDEO_DIMENSIONS.width },
      height: { type: Number, default: VIDEO_DIMENSIONS.height },
      crop: { type: String, default: "fill" },
      quality: { type: Number, min: 1, max: 100 },
    },
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

const Video = mongoose.models.Video || mongoose.model("Video", VideoSchema);
export default Video;
