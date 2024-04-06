import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import { Request, Response } from 'express'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())


const simulatedLongPollingCalls= [false, false, false, true]

app.get('/', (req: Request, res: Response) => {
  res.send('Qué onda compadre!')
})

app.get('/short-polling', async (req: Request, res: Response) => {
    const randomIndex = Math.floor(Math.random() * simulatedLongPollingCalls.length)
    const randomValue = simulatedLongPollingCalls[randomIndex]
    if (randomValue) {
        res.send({
            message: 'Long polling request was successful',
            status: "success",
            data: {
                randomValue
            }
        
        })
    } else {
        res.send({
            message: 'Long polling request was unsuccessful',
            status: "failed",
            data: {
                randomValue
            }
        })
    }
})

app.get('/long-polling', (req: Request, res: Response) => {
    setTimeout(() => {
        res.send({
            message: 'Long polling request was successful',
            status: "success",
            data: {
                randomValue: true
            }
        })
    }, 1000 * 60 * 0.5)
})



app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`)
})



console.log(process.env.PORT)
