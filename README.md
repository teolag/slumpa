# Slumpa

## Installation

### As a node module
```bash
npm install --save slumpa
``` 
```javascript
const slumpa = require("slumpa");
let randomInt = slumpa.int(0,100);
```

### In client browser
```html
<script src="slumpa.js"></script>
<script>
  let randomInt = slumpa.int(0,100);
</script>
```


## API

### setSeed(seed)
Set the initial seed value. Can be both numeric or a string.
```javascript
slumpa.setSeed(21345);
```

### getSeed()
Get the initial seed value
```javascript
slumpa.getSeed(); //21345
```

### int(a, [b=0])
Generate a random integer between a and b. The a-value is required but the b value is optional and defaults to 0.
```javascript
let a = slumpa.int(10); // 0 <= a <= 10
let b = slumpa.int(5, 20); // 5 <= b <= 20
let c = slumpa.int(50, 10); // 10 <= c <= 50
```

### float([a=1], [b=0])
Generate random decimal between a and b (default min=0, max=1)
```javascript
let a = slumpa.float(); // 0 < a < 1
let b = slumpa.float(5); // 0 < b < 5
let c = slumpa.float(20, 10); // 10 < c < 20
```

### bool([probability])
Generate random boolean. Set probability to change the chance of true. (default = 1/2)
```javascript
slumpa.bool(); // 50% true, 50% false
slumpa.bool(1/4); // 25% true, 75% false
```

### item(arr)
Return a random value from an array
```javascript
slumpa.item(["apelsin", "äpple", "banan"]); // äpple 
slumpa.item(["apelsin", "äpple", "banan"]); // banan 
```

### items(arr, n, [putback=false])
Return n random items from array, optional putback to allow multiple of same
```javascript
slumpa.items([1, 2, 3, 4], 2); // [3, 1]
slumpa.items([1, 2, 3], 5, true); // [3, 2, 1, 3, 1]
```

### shuffle(arr)
Shuffle an array and return the same one
```javascript
let arr = [1, 2, 3, 4]; 
let a = slumpa.shuffle(arr); // [3, 2, 4, 1]
arr; // [3, 2, 4, 1]
```

### shuffleCopy(arr)
Return a shuffled copy of an array
```javascript
let arr = [1, 2, 3, 4]; 
let a = slumpa.shuffleCopy(arr); // [3, 2, 4, 1]
arr; // [1, 2, 3, 4]
```

