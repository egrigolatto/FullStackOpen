**_Estado del componente, controladores de eventos_**

- Funciones auxiliares del componente
```js
const Hello = (props) => {

  const bornYear = () => {
    const yearNow = new Date().getFullYear()
    return yearNow - props.age
  }

  return (
    <div>
      <p>
        Hello {props.name}, you are {props.age} years old
      </p>

      <p>So you were probably born in {bornYear()}</p>
    </div>
  )
}
```

- Desestructuración
```js
const Hello = ({ name, age }) => {
  const bornYear = () => new Date().getFullYear() - age

  return (
    <div>
      <p>
        Hello {name}, you are {age} years old
      </p>
      <p>So you were probably born in {bornYear()}</p>
    </div>
  )
}
```
- Re-renderizado de la página

- Componente con estado

- Manejo de eventos

- El controlador de eventos es una función

- Pasando el estado a componentes hijos

- Los cambios en el estado provocan re-renderizado

- Refactorización de los componentes

