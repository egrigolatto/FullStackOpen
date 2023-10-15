
[React](https://react.dev/)

Para iniciar un proyecto en React
```
$ npx create-react-app part1 
$ cd part1
```

[Vite](https://vitejs.dev/)

Para iniciar un proyecto en Vite
```
npm create vite@latest
```

- **_Componente_**
  
```js
const App = () => {
  return (
    <div>
      <p>Hello world</p>
    </div>
  )
}
```
- **_JSX_**
  
- **_Componentes multiples_**
```js
const Hello = () => {
  return (
    <div>
      <p>Hello world</p>
    </div>
  )
}

const App = () => {
  return (
    <div>
      <h1>Greetings</h1>

      <Hello />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```
- **_props: pasar datos a componentes_**
```js
const Hello = (props) => {
  return (
    <div>

      <p>Hello {props.name}</p>
    </div>
  )
}

const App = () => {
  return (
    <div>
      <h1>Greetings</h1>

      <Hello name="George" />
      <Hello name="Daisy" />
    </div>
  )
}
```
```js
const Hello = (props) => {
  return (
    <div>
      <p>

        Hello {props.name}, you are {props.age} years old
      </p>
    </div>
  )
}

const App = () => {

  const name = 'Peter'
  const age = 10

  return (
    <div>
      <h1>Greetings</h1>

      <Hello name="Maya" age={26 + 10} />
      <Hello name={name} age={age} />
    </div>
  )
}
```
- **_Algunas notas_**
  - Prestar atencion a los errores que React brinda en la consolo, hacer uso de **Console.log()**
  - Los nombres de los componentes de React deben estar en mayúscula
  - El contenido de un componente de React (normalmente) debe contener un elemento raíz (Un array de componentes también es una solución válida)
  - Tambien es recomendable el uso de **fragmets** <></> como elemento raiz
    ```js
      const App = () => {
      const name = 'Peter'
      const age = 10
    
      return (
        <>
          <h1>Greetings</h1>
          <Hello name="Maya" age={26 + 10} />
          <Hello name={name} age={age} />
          <Footer />
        </>
      )
    }
    ```
- **_Ejercicios 1.1.-1.2._**
  