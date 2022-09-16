import dotenv from 'dotenv'
import app from './app'

dotenv.config()

const PORT = Number(process.env.PORT)

app.listen(PORT, () => console.log(`server is up on port ${PORT}`))
