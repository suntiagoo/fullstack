interface Values {
  goal: number;
  days: number[];
}

interface statisticalData {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const arguments = (args: string[]): Values => {
  if (args.length < 4) throw new Error("Not enough arguments");
  let hoursByDay: number[] = [];

  for (let i = 2; i < args.length - 1; i++) {
    //console.log(`el indice ${i} tiene ${args[i]}`);
    if (isNaN(Number(args[i]))) {
      throw new Error("Not enough arguments");
    }
    hoursByDay.push(Number(args[i + 1]));
  }
  return {
    goal: Number(args[2]),
    days: hoursByDay,
  };
};

const statistical = (value: Values): statisticalData => {
  const average: number =
    value.days.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0,
    ) / value.days.length;
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
    periodLength: value.days.length,
    trainingDays: value.days.filter((item) => item !== 0).length,
    success,
    rating,
    ratingDescription,
    target: value.goal,
    average: average,
  };
};

const values = arguments(process.argv);
statistical(values);
//console.log(arguments(process.argv));
console.log(statistical(values));
