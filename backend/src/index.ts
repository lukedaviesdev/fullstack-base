import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import authRouter from './routes/auth'


const app = express()
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}))

app.use(express.json())
app.use('/auth', authRouter)


const port = process.env.PORT || 3000

app.get('/health', (req, res) => {
    res.json({ 'status': 'ok' })
})


// ... listen here
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
