**_JavaScript_**

- Variables
```js
const x = 1
let y = 5

console.log (x, y) // 1, 5 es impreso
y += 10
console. log (x, y) // 1, 15 es impreso
y = 'sometext'
console.log(x, y) // 1, sometext es impreso
x = 4 // provoca un error
```

- Arrays
```js
const t = [1, -1, 3]

t.push(5)

console.log(t.length) // Se imprime 4 
console.log(t [1]) // -1 es impreso

t.forEach(value => {
  console.log (value) // se imprimen los números 1, -1, 3, 5, cada uno en la línea propia
})

// se sugiere usa concat que cres un nuevo array

const t = [1, -1, 3]

const t2 = t.concat(5)

console.log(t)  // [1, -1, 3] es impreso
console.log(t2) // [1, -1, 3, 5] es impreso

const t = [1, 2, 3] 

const m1 = t.map(value => value * 2) 
console.log(m1) // [2, 4, 6] es impreso

// destructuracion para agregar elementos individuales

const t = [1, 2, 3, 4, 5]

const [first, second, ...rest] = t

console.log(first, second)  // 1, 2 es impreso
console.log(rest)          // [3, 4 ,5] es impreso
```

- Objetos
 ```js
 const object1 = {
  name: 'Arto Hellas',
  age: 35,
  education: 'PhD',
}

const object2 = {
  name: 'Full Stack web application development',
  level: 'intermediate studies',
  size: 5,
}

const object3 = {
  name: {
    first: 'Dan',
    last: 'Abramov',
  },
  grades: [2, 3, 5, 3],
  department: 'Stanford University',
}
// para hacer regerencia
console.log(object1.name)         // se imprime Arto Hellas
const fieldName = 'age' 
console.log(object1[fieldName])    // 35 es impreso

// para agregar propiedades
object1.address = 'Helsinki'
object1['secret number'] = 12341
 ```

- Funciones
```js
  const sum = (p1, p2) => { 
  console.log (p1) 
  console.log (p2) 
  return p1 + p2 
} 

function product(a, b) {
  return a * b
}
const result = product(2, 6)
// result is now 12

const average = function(a, b) {
  return (a + b) / 2
}
const result = average(2, 5)
// result is now 3.5
```

- Métodos de objeto y "this"

- Clases
```js
class Person {
  constructor(name, age) {
    this.name = name
    this.age = age
  }
  greet() {
    console.log('hello, my name is ' + this.name)
  }
}

const adam = new Person('Adam Ondra', 35)
adam.greet()

const janja = new Person('Janja Garnbret', 22)
janja.greet()
```

- Materiales JavaScript