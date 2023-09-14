import mongoose from 'mongoose'

const connectDB = (url) => {
  mongoose.set('strictQuery', true)

  mongoose
    .connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log('MongoDB connected...'))
    .catch((err) => console.error('MongoDB connection error:', err))
}

export default connectDB
