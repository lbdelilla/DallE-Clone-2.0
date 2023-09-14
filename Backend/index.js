import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './mongodb/connect.js'
import postRoutes from './routes/postRoutes.js'
import dalleRoutes from './routes/dalleRoutes.js'
import ImageCount from './mongodb/models/imageCount.js'

dotenv.config()

const app = express()

app.use(cors())

app.use(express.json({ limit: '50mb' }))

const checkRateLimit = async (req, res, next) => {
  const ip = req.ip

  try {
    let imageCount = await ImageCount.findOne({ ip })

    if (!imageCount) {
      imageCount = await ImageCount.create({ ip })
    }

    imageCount.count++
    await imageCount.save()

    if (imageCount.count > 5) {
      res.status(429).send('Too many images generated. Please try again later.')
    } else {
      next()
    }
  } catch (error) {
    console.error('Error checking rate limit:', error)
    res.status(500).send('Internal Server Error')
  }
}

app.use('/api/v1/posts', postRoutes)
app.use('/api/v1/dalle', checkRateLimit, dalleRoutes)

app.get('/api/v1/rate-limit', async (req, res) => {
  try {
    const ip = req.ip
    const imageCount = await ImageCount.findOne({ ip })

    if (imageCount) {
      res.json({ count: imageCount.count })
    } else {
      res.json({ count: 0 })
    }
  } catch (error) {
    console.error('Error fetching rate limit:', error)
    res.status(500).send('Internal Server Error')
  }
})

app.get('/', async (req, res) => {
  res.send('Hello From DALL-E!')
})

const startServer = async () => {
  try {
    connectDB(process.env.MONGO_URL)
    app.listen(process.env.PORT, async () => {
      console.log(`Server running on port ${process.env.PORT}`)
    })
  } catch (error) {
    console.log(error)
  }
}

startServer()
