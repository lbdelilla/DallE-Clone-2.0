import mongoose from 'mongoose'

const imageCountSchema = new mongoose.Schema({
  ip: {
    type: String,
    required: true,
  },
  count: {
    type: Number,
    default: 0,
  },
})

const ImageCount = mongoose.model('ImageCount', imageCountSchema)

export default ImageCount
