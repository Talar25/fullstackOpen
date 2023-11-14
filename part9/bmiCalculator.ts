interface MultiplyValues {
  height: number
  mass: number
}

const parseArguments = (args: string[]): MultiplyValues => {
  if (args.length < 4) throw new Error('Not enough arguments')
  if (args.length > 4) throw new Error('Too many arguments')

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      mass: Number(args[3]),
    }
  } else {
    throw new Error('Provided values were not numbers!')
  }
}

function calculateBmi(height: number, mass: number): string {
  const bmi = mass / (((height / 100) * height) / 100)

  if (bmi <= 18.4) return 'Underweight (not healthy)'
  if (bmi <= 24.9) return 'Normal (healthy weight)'
  if (bmi <= 29.9) return 'Overweight (not healthy)'
  else return 'Obese (really unhealthy)'
}

try {
  const { height, mass } = parseArguments(process.argv)
  console.log(calculateBmi(height, mass))
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.'
  if (error instanceof Error) {
    errorMessage += `Error: ` + error.message
  }
  console.log(errorMessage)
}

export {}
