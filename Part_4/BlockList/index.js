// El archivo index.js solo importa la aplicación real desde el archivo app.js y luego inicia la aplicación

const app = require('./app')
const config = require('./utils/config')
const logger = require('./utils/logger')

app.listen(config.PORT, () => {
  logger.info(`Servidor corriendo en http://localhost:${config.PORT}/api/blogs`)
})

// Las otras partes de la aplicación pueden acceder a las variables de entorno importando el módulo de configuración:
// const config = require('./utils/config')
// logger.info(`Server running on port ${config.PORT}`)