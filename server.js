import jsonServer from 'json-server';

const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

server.use(middlewares)

server.use((req, res, next) => {
  res.header('Access-Control-Expose-Headers', 'X-Total-Count')
  next()
})

server.use(router)
server.listen(4000, () => {
  console.log('JSON Server running on http://localhost:4000')
})
