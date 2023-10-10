import pkg from 'json-server'
const { create, router: _router, defaults, bodyParser } = pkg
const server = create()
const router = _router('db.json')
const middlewares = defaults()

const validator = (request, response, next) => {
  console.log()

  const { content } = request.body

  if (request.method === 'POST' && (!content || content.length < 5)) {
    return response.status(400).json({
      error: 'too short anecdote, must have length 5 or more',
    })
  } else {
    next()
  }
}

server.use(middlewares)
server.use(bodyParser)
server.use(validator)
server.use(router)

server.listen(3001, () => {
  console.log('JSON Server is running')
})

