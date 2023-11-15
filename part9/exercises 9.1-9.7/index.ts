import express from 'express'
import calculateBmi from './bmiCalculator'
import { calculateExercises } from './exerciseCalculator'
const app = express()

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!')
})

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height)
  const weight = Number(req.query.weight)

  if (isNaN(weight) || isNaN(height)) {
    res.send({ error: 'malformatted parameters' }).status(400)
  }
  const bmi = calculateBmi(height, weight)

  const object = {
    weight,
    height,
    bmi,
  }
  res.send(object)
})

app.get('/exercises', (req, res) => {
  const { target, dailyExercises } = req.body

  if (!target || !dailyExercises) {
    res.status(400).send({ error: 'parameters missing' })
  }

  if (isNaN(target) || dailyExercises.some(isNaN)) {
    res.status(400).send({ error: 'malformatted parameters' })
  }

  try {
    const result = calculateExercises(target, dailyExercises)

    res.send({ result }).status(200)
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send({ error: error.message })
    }

    res.status(400).send({ error: 'something went wrong' })
  }
})

const PORT = 3003

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
