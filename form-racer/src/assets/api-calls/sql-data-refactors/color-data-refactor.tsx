type ColorDataFromBackendType = {
  color_question_data_id: number;
  first_color: string;
  second_color: string;
};

const hexToDeximalPairConvertor = (hexNumberPair: string[]) => {
  let runningTotal = 0;
  for (let indexOfPair = 0; indexOfPair < 2; indexOfPair++) {
    const acceptableValues = [
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
    ];
    if (acceptableValues.includes(hexNumberPair[indexOfPair])) {
      switch (hexNumberPair[indexOfPair]) {
        case "A":
          runningTotal = runningTotal + 10;
          break;
        case "B":
          runningTotal = runningTotal + 11;
          break;
        case "C":
          runningTotal = runningTotal + 12;
          break;
        case "D":
          runningTotal = runningTotal + 13;
          break;
        case "E":
          runningTotal = runningTotal + 14;
          break;
        case "F":
          runningTotal = runningTotal + 15;
          break;
        default:
          runningTotal = runningTotal + +hexNumberPair[indexOfPair];
      }
    }
  }

  return runningTotal;
};

const hexColorToArrayConverter = (colorString: string) => {
  const splitColorString = colorString.split("");
  console.log(splitColorString);
  if (splitColorString.length === 7) {
    const colorDigitArray: number[] = [0, 0, 0];
    splitColorString.splice(0, 1);
    console.log(splitColorString);

    const firstColorDigitPair = splitColorString.slice(0, 2);
    colorDigitArray[0] = hexToDeximalPairConvertor(firstColorDigitPair);

    const secondColorDigitPair = splitColorString.slice(2, 4);
    colorDigitArray[1] = hexToDeximalPairConvertor(secondColorDigitPair);
    const thirdColorDigitPair = splitColorString.slice(4, 6);
    colorDigitArray[2] = hexToDeximalPairConvertor(thirdColorDigitPair);
    return colorDigitArray;
  } else {
    return [0, 0, 0];
  }
};

const colorChannelMixer = (
  colorChannelA: number,
  colorChannelB: number,
  amountToMix: number
) => {
  const channelA = colorChannelA * amountToMix;
  const channelB = colorChannelB * (1 - amountToMix);
  return channelA + channelB;
};
//rgbA and rgbB are arrays, amountToMix ranges from 0.0 to 1.0
//example (red): rgbA = [255,0,0]
const colorMixer = (rgbA: number[], rgbB: number[], amountToMix: number) => {
  const r = colorChannelMixer(rgbA[0], rgbB[0], amountToMix);
  const g = colorChannelMixer(rgbA[1], rgbB[1], amountToMix);
  const b = colorChannelMixer(rgbA[2], rgbB[2], amountToMix);

  return { r, g, b };
};

export const colorDataRefactor = (
  retrievedData: ColorDataFromBackendType[]
) => {
  return retrievedData.map((dataEntry, index) => {
    const convertedColorOne = hexColorToArrayConverter(dataEntry.first_color);
    const convertedColorTwo = hexColorToArrayConverter(dataEntry.second_color);

    const resultColor = colorMixer(convertedColorOne, convertedColorTwo, 1);
    const lowerResultColor = {
      r: resultColor.r - 5 < 0 ? 0 : resultColor.r - 5,
      g: resultColor.g - 5 < 0 ? 0 : resultColor.g - 5,
      b: resultColor.b - 5 < 0 ? 0 : resultColor.b - 5,
    };
    const higherResultColor = {
      r: resultColor.r + 5,
      g: resultColor.g + 5,
      b: resultColor.b + 5,
    };

    return {
      firstColor: dataEntry.first_color,
      secondColor: dataEntry.second_color,
      resultColor: `rgb(${resultColor.r},${resultColor.g},${resultColor.b})`,
      resultRangeStartColor: `rgb(${lowerResultColor.r},${lowerResultColor.g},${lowerResultColor.b})`,
      resultRangeEndColor: `rgb(${higherResultColor.r},${higherResultColor.g},${higherResultColor.b})`,
      questionType: "color",
      id: `color-question-${index}`,
    };
  });
};
