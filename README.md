# Slumpa

## Installation

### As a node module
```
npm install --save slumpa
``` 
```
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

### Generate random decimal between a and b (min default=0)
```javascript
slumpa.float(a, [b=0])
```

### Generate random boolean (probability default = 0.5)
```javascript
slumpa.bool([probability])
```

### Return random item from array
```javascript
slumpa.item(arr)
```

### Return random items from array, optional putback to allow multiple of same
```javascript
slumpa.items(arr, n, [putback=false])
```

### Return the same array shuffled
```javascript
slumpa.shuffle(arr)
```

### Return a shuffled copy of an array
```javascript
slumpa.shuffleCopy(arr)
```

