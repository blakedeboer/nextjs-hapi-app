const next = require('next')
const Hapi = require('@hapi/hapi')
const {
  pathWrapper,
  defaultHandlerWrapper,
  nextHandlerWrapper,
} = require('./next-wrapper')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const server = new Hapi.Server({
  port,
})

app.prepare().then(async () => {
  /* register inert to serve static files */
  await server.register({
    plugin: require('@hapi/inert')
  })

  server.route({
    method: 'GET',
    path: '/',
    handler: pathWrapper(app, '/'),
  })

  server.route({
    method: 'GET',
    path: '/forecasts/{id}',
    handler: pathWrapper(app, 'forecasts/[id]')
  })

  server.route({
    method: 'GET',
    path: '/_next/{p*}' /* next specific routes */,
    handler: nextHandlerWrapper(app),
  })

  server.route({
    method: 'GET',
    path: '/public/{p*}' /* use next to handle static files */,
    // handler: nextHandlerWrapper(app),
    handler: {
      directory: {
        path: 'public'
      }
    }
  })

  try {
    await server.start()
    console.log(`> Ready on http://localhost:${port}`)
  } catch (error) {
    console.log('Error starting server')
    console.log(error)
  }
})
