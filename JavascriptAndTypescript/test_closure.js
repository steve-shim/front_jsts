var counter = (function() {
    var privateCounter = 0;
    function changeBy(val) {
      privateCounter += val;
    }
    return {
      increment: function() {
        changeBy(1);
      },
      decrement: function() {
        changeBy(-1);
      },
      value: function() {
        return privateCounter;
      }
    };
  })();

console.log(counter)
console.log(counter.value()); // logs 0 
counter.increment();
counter.increment();
console.log(counter.value()); // logs 2
counter.decrement();
console.log(counter.value()); // logs 1


var makeCounter = function() {
    var privateCounter = 0;
    function changeBy(val) {
      privateCounter += val;
    }
    return {
      increment: function() {
        changeBy(1);
      },
      decrement: function() {
        changeBy(-1);
      },
      value: function() {
        return privateCounter;
      }
    }
  };

var counter1 = makeCounter();
var counter2 = makeCounter();
console.log(counter1)
console.log(counter1.value()); // logs 0 
counter1.increment();
counter1.increment();
counter2.decrement();
counter2.decrement();
console.log(counter1.value()); // logs 2
console.log(counter2.value()); // logs -2
counter1.decrement();
console.log(counter1.value()); // logs 1

//   console.log(counter())
//   console.log(counter().value());
//   counter().increment();
//   console.log(counter().value());
//   counter().increment();
//   console.log(counter().value()); // logs 0