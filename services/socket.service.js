const { Server } = require('socket.io')
const RabbitMQ = require('./rabbitmq')
const _ = require('lodash')

/**
 * Socket state management
 */
const engine = {
  socketServerEngine: {},
  socketId: null,
  sessionEngine: {},
}

const dispatch = (e, chunk) => {
  console.log(e, chunk)
}

/**
 * Funnel socket events to the correct handler
 */
engine.dispatchEvents = socket => {

}

/**
 * Socket.io event listeners
 */
engine.listenToEvents = server => {
  server.on('connection', socket => {
    engine.socketId = socket.id
    engine.socketServerEngine = server

    engine.dispatchEvents(socket)
  })
}

/**
 * Socket.io server cross origin resource sharing setup
 */
// const corsOrigin = JSON.parse(process.env.CORS_ORIGIN)

// console.log(corsOrigin)
const cors = {
  origin: ['https://localhost:8080'],
  allowedHeaders: ["Access-Control-Allow-Origin"],
  methods: ["GET", "POST"],
  transports: ["websocket", "polling"],
  credentials: true
}

RabbitMQ.consume().then(connection => {
  console.log(connection)
  connection.on('connection', listener => {
    console.log('Redis connected')
  })
})

/**
 * Socket.io server initialization
 */
const init = httpServer => {
  const server = new Server(httpServer, {
    cors,
    allowEIO3: true
  })
  engine.listenToEvents(server)
  return server
}

module.exports = {
  init
}
