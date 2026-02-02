interface ValueArg {
  mass: number;
  height: number;
}

const parseArguments = (args: string[]): ValueArg => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      mass: Number(args[2]),
      height: Number(args[3]),
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

const imc = (mass: number, height: number) => {
  let imcValue = mass / (height / 100) ** 2;
  const Thinness = 18.5;

  if (imcValue < 18.5) {
    console.log(`Thinness Low weight`);
  } else if (18.5 <= imcValue && imcValue <= 24.99) {
    console.log(mass / (height / 100) ** 2);
    console.log(`Normal healthy weight`);
  } else {
    console.log(`Normal healthy weight`);
  }
};

try {
  const { mass, height } = parseArguments(process.argv);
  imc(mass, height);
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}
