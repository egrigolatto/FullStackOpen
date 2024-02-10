const logger = require('./logger')
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const requestLogger = (request, response, next) => {
  logger.info('****************************************')
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('****************************************')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({
      error: 'invalid token'
    })
  } else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({
      error: 'token expired'
    })
  }
  next(error)
}

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7)
    logger.info('tokenla',request.token)
  } 
  next()
}

const userExtractor = async (request, response, next) => {
  const token = request.token;

  logger.info('token user',token)

  if (token) {
    try {
      const decodedToken = jwt.verify(token, process.env.SECRET);
      logger.info('Decoded Token:', decodedToken);

      if (decodedToken.id) {
        const user = await User.findById(decodedToken.id);
        logger.info('User:', user);

        if (user) {
          request.user = user;  // Asigna el usuario al objeto de solicitud
        } else {
          return response.status(404).json({ error: 'Usuario no encontrado' });
        }
      }
    } catch (error) {
      logger.error(error.message);
      return response.status(401).json({ error: 'Token no válido' });
    }
  } else {
    return response.status(401).json({ error: 'Token no proporcionado' });
  }

  next();
}


module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor
}