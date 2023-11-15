interface MultiplyValues {
  target: number
  dailyExercise: number[]
}

const parseArguments = (args: string[]): MultiplyValues => {
  if (args.length < 4) throw new Error('Not enough arguments')

  const exercise: number[] = []
  for (let i = 3; i < args.length; i++) {
    if (isNaN(Number(args[2])) && isNaN(Number(args[3]))) {
      throw new Error('provided value were not numbers')
    } else {
      exercise.push(Number(args[i]))
    }
  }

  const target = Number(args[2])

  return {
    target,
    dailyExercise: exercise,
  }
}

type Return = {
  periodLength: number
  trainingDays: number
  success: boolean
  rating: number
  ratingDescription: string
  target: number
  average: number
}

export function calculateExercises(
  targetAmount: number,
  dailyExercise: number[]
): Return {
  const periodLength = dailyExercise.length
  const trainingDays = dailyExercise.filter((daily) => daily !== 0).length
  const daysWithTarget = dailyExercise.filter(
    (daily) => daily >= targetAmount
  ).length
  const success = daysWithTarget >= periodLength
  const rating =
    daysWithTarget >= periodLength - 2 ? 3 : daysWithTarget < 2 ? 1 : 2
  const ratingDescription =
    rating === 3
      ? 'Great!'
      : rating === 2
      ? 'not too bad but could be better'
      : 'Bad, maybe next week will be better'
  const average =
    dailyExercise.reduce((acc, cur) => acc + cur, 0) / periodLength

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target: targetAmount,
    average,
  }
}

// console.log(calculateExercises(2, [3, 0, 2, 4.5, 0, 3, 1]))

try {
  const { target, dailyExercise } = parseArguments(process.argv)
  console.log(calculateExercises(target, dailyExercise))
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.'
  if (error instanceof Error) {
    errorMessage += `Error: ` + error.message
  }
  console.log(errorMessage)
}
export {}
