interface ValueArg {
  mass: number;
  height: number;
}

interface Bmi {
  weight: number;
  height: number;
  bmi: string;
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

export const imc = (mass: number, height: number): Bmi => {
  let imcValue = mass / (height / 100) ** 2;
  let bmi: string = "";

  if (imcValue < 18.5) {
    console.log(`Thinness Low weight`);
    bmi = `Thinness Low weight`;
  } else if (18.5 <= imcValue && imcValue <= 24.99) {
    console.log(mass / (height / 100) ** 2);
    console.log(`Normal healthy weight`);
    bmi = `Normal healthy weight`;
  } else {
    console.log(`overweight`);
    bmi = `overweight`;
  }

  return {
    weight: mass,
    height: height,
    bmi,
  };
};

const mainImc = (args: string[]) => {
  try {
    const { mass, height } = parseArguments(args);
    imc(mass, height);
  } catch (error: unknown) {
    let errorMessage = "Something bad happened.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    console.log(errorMessage);
  }
};

export default { mainImc };
