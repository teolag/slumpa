# Slumpa

## Example

```ts
import { Slumpa } from 'slumpa'

const random = new Slumpa()
const min = 3
const max = 5
console.log(`Ett slumpat heltal mellan ${min} och ${max}: ${random.integer(min, max)}`)
console.log(`Ett slumpat flyttal mellan ${min} och ${max}: ${random.float(min, max)}`)
console.log(`Ett slumpat djur: ${random.item(['Häst', 'Katt', 'Noshörning', 'Tiger'])}`)
console.log(`Slumpat tärning: ${random.die()}`)
console.log(`5 slumpade tärningskast: ${random.dice(5)}`)
console.log(`Slumpad boolean: ${random.boolean()}`)
console.log(`10 slumpad booleaner: ${random.booleans(10)}`)
console.log(`Slumpa ordningen på löksorter: ${random.shuffle(['Gul lök', 'Vitlök', 'Scharlottenlök', 'Rödlök', 'Gräslök', 'Purjolök']).join(', ')}`)
console.log(`Plocka ut 10 bokstäver i alfabetet: ${random.items(10, 'ABCDEFGHIJKLMNOPQRSTUVWXYZÅÄÖ'.split('')).join(', ')}`)
console.log(`Skapa en hemlig fuskkod till ett spel: ${random.items(8, ['Upp', 'Ner', 'Vänster', 'Höger', 'A', 'B'], true).join(', ')}`)
console.log(`Skapa lösenord med 18 tecken: ${random.string(18)}`)

const startDate = new Date('2021-01-10')
const endDate = new Date('2021-01-11')
const toISODate = (date: Date) => `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`

console.log(`Slumpat datum mellan ${toISODate(startDate)} och ${toISODate(endDate)}: ${toISODate(random.date(startDate, endDate))}`)
```
