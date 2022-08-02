export type StringSettings =
  | {
      useUppercase?: boolean
      useLowercase?: boolean
      useNumbers?: boolean
      useSpecials?: boolean
    }
  | undefined

export class Slumpa {
  #initialSeed: number | string
  #seed: number

  constructor(seed: number | string = Math.random() * Number.MAX_SAFE_INTEGER) {
    this.#initialSeed = seed
    this.#seed = this.#ensureNumberSeed(seed)
  }

  public setSeed(seed: number | string) {
    this.#seed = this.#ensureNumberSeed(seed)
  }

  public getInitialSeed(): number | string {
    return this.#initialSeed
  }

  public getCurrentSeed(): number {
    return this.#seed
  }

  public integer(min: number, max: number): number {
    return Math.floor(this.#mulberry32() * (max - min + 1)) + min
  }
  public integers(quantity: number, min: number, max: number): number[] {
    return Slumpa.#setOf(quantity, this.integer.bind(this), min, max)
  }

  public float(min = 0, max = 1): number {
    return this.#mulberry32() * (max - min + 1) + min
  }
  public floats(quantity: number, min = 0, max = 1): number[] {
    return Slumpa.#setOf(quantity, this.integer.bind(this), min, max)
  }

  public item<T>(items: T[]): T {
    const index = this.integer(0, items.length - 1)
    return items[index]
  }

  public items<T>(quantity: number, items: T[], putBack = false): T[] {
    if (putBack) {
      return Slumpa.#setOf(quantity, this.item.bind(this), items)
    } else {
      return this.shuffle(items).slice(0, quantity)
    }
  }

  public die(sides = 6): number {
    return this.integer(1, sides)
  }

  public dice(numberOfDice: number, sides = 6): number[] {
    return Slumpa.#setOf(numberOfDice, this.die.bind(this), sides)
  }

  public boolean(probability = 1 / 2): boolean {
    return this.float() > probability
  }

  public booleans(quantity: number, probability = 1 / 2): boolean[] {
    return Slumpa.#setOf(quantity, this.boolean.bind(this), probability)
  }

  public shuffle<T>(array: T[]): T[] {
    return this.#knuthShuffle(array)
  }

  public string(length: number, settings?: StringSettings): string {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const numbers = '0123456789'
    const specials = '~`!@#$%^&*()_-+={[}]|:;"\'<,>.?/'
    const uppers = letters.toUpperCase()
    const lowers = letters.toLowerCase()

    const chars: string =
      (!settings || settings.useUppercase ? uppers : '') +
      (!settings || settings.useLowercase ? lowers : '') +
      (!settings || settings.useNumbers ? numbers : '') +
      (!settings || settings.useSpecials ? specials : '')
    return this.items(length, chars.split(''), true).join('')
  }

  public date(from: Date, to: Date): Date {
    from.setHours(0, 0, 0, 0)
    to.setHours(23, 59, 59, 999)
    const date = this.integer(from.getTime(), to.getTime())
    return new Date(date)
  }
  public dates(quantity: number, from: Date, to: Date): Date[] {
    return Slumpa.#setOf(quantity, this.date.bind(this), from, to)
  }

  // TODO
  /*
  public time(from: Date, to: Date): Date {
     return new Date()
  }
  public times(quantity: number, from: Date, to: Date): Date[] {
    return Slumpa.#setOf(quantity, this.time.bind(this), from, to)
  }
  */

  static #setOf<T extends (...args: U[]) => V, U, V>(quantity: number, randomizer: T, ...inputs: U[]): V[] {
    return new Array(quantity).fill(0).map(() => randomizer.call(this, ...inputs))
  }

  #knuthShuffle<T>(array: T[]): T[] {
    let currentIndex = array.length
    let randomIndex: number

    const shuffledArray = [...array]
    while (currentIndex != 0) {
      randomIndex = Math.floor(this.#mulberry32() * currentIndex)
      currentIndex--
      ;[shuffledArray[currentIndex], shuffledArray[randomIndex]] = [shuffledArray[randomIndex], shuffledArray[currentIndex]]
    }
    return shuffledArray
  }

  #mulberry32() {
    let t = (this.#seed += 0x6d2b79f5)
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }

  #ensureNumberSeed(a: string | number): number {
    const str = a.toString()
    if (!str || /^0+$/.test(str)) return Math.random() * 10000000
    if (/^-?\d+$/.test(str) && str.length < 20) return parseInt(str.replace(/^(-?)0+/, '$1'), 10)
    let hash = 0
    for (let i = 0; i < str.length; i++) {
      const character = str.charCodeAt(i)
      hash = (hash << 5) - hash + character
      hash = hash & hash // Convert to 32bit integer
    }
    return hash
  }
}
