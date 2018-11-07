// loop thru cars with a for loop
const carsInReverse = ['honda', 'ford', 'toyota', 'fiat'];
 for (let i =0; i<carsInReverse.length; i++) {
    console.log(carsInReverse[i]);
  }

// for in loop displaying object persons keys and a birthdate value
const persons = {
    firstName: 'Jane',
    lastName: 'Doe',
    birthDate: "Jan 5, 1925",
    gender: "female"
}
    
for (let property in persons){
    console.log(property);
    }
    
for(let property in persons) {
    if(property == 'birthDate') {
    console.log(persons[property])
    }
}
//  while and do while loops for numbers up to 1000. To shorten increased by 100
    let i = 0;
    
    while (i<=1000) {
      console.log(i);
      i+=100;
    }
    
    do {
      i+=100;
      console.log(i);
    } while (i<1000);
    
    // a for loop is better than a while loop when you know how many times the loop will iterate. A for loop is not very readable - the variable, condition, and expression to be executed are all declared next to each other.  The while loop to me is slightly more readable. The loop variable, conditional statement, and expression to be executed are separated.
    
    // a for..in loop iterates over enumerable properties mostly in Objects but also in arrays, and strings.  It is straight forward in looping thru an object's keys and values.
    
    // a while loop first establishes if the expression evaluates to true or false and runs code if true. The do...while loop first runs the code then evaluates if the condition is true or false.  
   