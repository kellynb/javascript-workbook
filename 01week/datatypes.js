// display the current day and time
const currentTimeDate= () => {
    return new Date();
  }
  console.log(currentTimeDate());
  
  // Convert a number to a string
  
  const transformToString = (numbertype) => {
    return numbertype.toString();
  }
  console.log(transformToString(57));
  
  // Convert a string to a number
  const transformToNumber = (someString) => {
    return parseInt(someString, 10);
  }
  console.log(transformToNumber('76px'));
  
  //Determine datatype of an input
  const findDataType = (dataType) => {
    return (typeof dataType);
  }
  console.log(findDataType());
  
  // Adds two number together
  const addTwoNumbers = (num1,num2) => {
    return num1 + num2
  }
  console.log(addTwoNumbers(2,4));
  
  // Runs when 2 things are true
  const twoTrueInputs = (input1, input2) => {
    if (input1 && input2) {
      return "Both inputs are true...its running";
    } else {
      return;
    }
  }
  console.log(twoTrueInputs(3,-5));
  
  // Program runs when 1 of 2 things are true
  
  const oneTrueInputs = (inputA, inputB) => {
    if ((inputA && !inputB) || (!inputA && inputB)) {
      return "One input is true...its running";
    } else {
      return;
    }
  }
  console.log(oneTrueInputs(0, 'sixteen'));
  
  // Program when 2 things not true
  
  const noTrueInputs = (inputA, inputB) => {
    if (!inputA && !inputB) {
      return "Both inputs are false...its running";
    } else {
      return;
    }
  }
  console.log(noTrueInputs(0, 'twenty'));