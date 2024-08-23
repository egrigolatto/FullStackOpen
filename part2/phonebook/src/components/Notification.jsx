const Notification = ({ message, errorMensaje }) => {
  const estiloMensaje = {
    color: "green",
    fontStyle: "italic",
    fontSize: 20,
    border: "4px solid green",
    padding: 10,
    backgroundColor: "lightgrey",
    marginBottom: 10,
  };

  const estiloError = {
    color: "red",
    fontStyle: "italic",
    fontSize: 20,
    border: "4px solid red",
    padding: 10,
    backgroundColor: "lightgrey",
    marginBottom: 10,
  };

  if (!message && !errorMensaje) {
    return null;
  }

  const estilos = errorMensaje ? estiloError : estiloMensaje;

  return <div style={estilos}>{errorMensaje || message}</div>;
};


export { Notification };
