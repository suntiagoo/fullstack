interface Values {
  target: number;
  daily_exercises: number[];
}
export type daily_list = number[];
interface statisticalData {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const VaalueArguments = (args: string[]): Values => {
  if (args.length < 4) throw new Error("Not enough arguments");
  const hoursByDay: number[] = [];

  for (let i = 2; i < args.length - 1; i++) {
    //console.log(`el indice ${i} tiene ${args[i]}`);
    if (isNaN(Number(args[i]))) {
      throw new Error("Not enough arguments");
    }
    hoursByDay.push(Number(args[i + 1]));
  }
  return {
    target: Number(args[2]),
    daily_exercises: hoursByDay,
  };
};

export const statistical = (value: Values): statisticalData => {
  const average: number =
    value.daily_exercises.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0,
    ) / value.daily_exercises.length;
  let rating: number = 0;
  let success: boolean = false;
  let ratingDescription: string = "";
  if (average > 2) {
    rating = 3;
    success = true;
    ratingDescription = " good work";
  } else if (average < 2 && average > 1.5) {
    rating = 2;
    ratingDescription = "not too bad but could be better";
  } else {
    rating = 1;
    ratingDescription = "you need improve";
  }
  return {
    periodLength: value.daily_exercises.length,
    trainingDays: value.daily_exercises.filter((item) => item !== 0).length,
    success,
    rating,
    ratingDescription,
    target: value.target,
    average: average,
  };
};

const mainExerciseCalculate = (args: string[]) => {
  const values = VaalueArguments(args);
  statistical(values);
  //console.log(arguments(process.argv));
  console.log(statistical(values));
};

export default mainExerciseCalculate;
