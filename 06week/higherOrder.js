'use strict';

const assert = require('assert');
// forEach callback
function forEach(arr, callback) {
  for (let i=0; i<arr.length; i++) {
    const count = callback(i);
    console.log(count);
  }
}
  
  const diffArr =["Katie","Christ","Wilson","Kellyn","Bj","Birdman"];
  const newForEach = forEach(diffArr, (item) => {
    return item+1;
  });

  console.log(newForEach);

// map callback
function map(arr, callback) {
    const newArr = [];
    for(let i = 0 ; i< arr.length ; i++ ){
      const formattedItem=callback(arr[i])
      newArr.push(formattedItem)
    }
    return newArr
}

const nameArr = ["Katie","Christ","Wilson","Kellyn","Bj","Birdman"];  
const nameArrUpperCase = map(nameArr, function(str1) {return str1.toLowerCase();})
console.log(nameArrUpperCase);

// filter callback
function filter(arr, callback) {
  const newArr = [];
  for(let i=0; i<arr.length; i++) {
    const newArrItem = callback(arr[i]);
    if (newArrItem) {
    newArr.push(arr[i]);
    }
  }
  return newArr;
}

const manyNumbers = [1, 3, 6, 8, 11, 18];

const isDivisibleByTwo = filter(manyNumbers, (number) => {
  return number % 2 === 0;
});

console.log(isDivisibleByTwo);

//  some callback
function some(arr, callback) {
  let count = 0;

  for (let i=0; i<arr.length; i++) {
    const isItemEven = callback(arr[i]);
    if (isItemEven) {
      count ++;
      return true;
    }
  }

  if (count == 0) {
    return false;
  }

}

const arrNums = [12, 51, 9, 11, 25, 31];
const areNumsEven = some(arrNums, numbers => {
  return numbers %2 === 0;
})

console.log(areNumsEven);

//  every callback
function every(arr, callback) {
  let count = 0;

  for (let i=0; i<arr.length; i++) {
    const isItemEven = callback(arr[i]);
    if (isItemEven) {
      count ++;
    } else {
      return false;
    }
  }

  return count === arr.length;

}

const everyNums = [12, 50, 90, 110, 26, 32];

const areAllNumsEven = every(everyNums, nums => {
  return nums %2 === 0;
})

console.log(areAllNumsEven);

if (typeof describe === 'function') {

  describe('#forEach()', () => {
    it('should call the callback the array.length number of times', () => {
      let count = 0;
      forEach([1, 2, 3], () => {
        count++;
      });
      assert.equal(count, 3);
    });
  });

  describe('#map()', () => {
    const arr = [1, 2, 3];
    const mapped = map(arr, (num) => {
      return num * num;
    });
    it('should return new array with mapped items', () => {
      assert.deepEqual(mapped, [1, 4, 9]);
    });
    it('should not affect the original array', () => {
      assert.deepEqual(arr, [1, 2, 3]);
    })
  });

  describe('#filter()', () => {
    it('should return an array of items that pass the predicate test', () => {
      const filtered = filter([1, 2, 3], (num) => {
        return num % 2 === 0;
      });
      assert.deepEqual(filtered, [2]);
    });
  });

  describe('#some()', () => {
    let count = 0;
    const somed = some([1, 2, 3, 4], (num) => {
      count++;
      return num % 2 === 0;
    });
    it('should return true if at least one item passes the predicate test', () => {
      assert.equal(somed, true);
    });
    it('should stop at the first item that passes the predicate test', () => {
      assert.equal(count, 2);
    });
    it('should return false if no items pass the predicate test', () => {
      const somed = some([1, 3, 5], (num) => {
        return num % 2 === 0;
      });
      assert.equal(somed, false);
    });
  });

  describe('#every()', () => {
    it('should return true if at all passes the predicate test', () => {
      const everied = every([2, 4, 6], (num) => {
        return num % 2 === 0;
      });
      assert.equal(everied, true);
    });
    let count = 0;
    const everied = every([2, 3, 4, 5], (num) => {
      count++;
      return num % 2 === 0;
    });
    it('should return false if any item fails the predicate test', () => {
      assert.equal(everied, false);
    });
    it('should stop at the first item that fails the predicate test', () => {
      assert.equal(count, 2);
    });
  });

} else {

  console.log('Only run the tests on this one!')

}
