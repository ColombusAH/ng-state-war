const jsonServer = require("json-server");
const middleware = jsonServer.defaults();
const server = jsonServer.create();

server.use(middleware);
server.use(jsonServer.bodyParser);
const userData = require("../server/data/users");
server.get("/api/users", (req, res) => {
  res.status(200).send(userData.getUsers);
});

server.listen(3000, () => {
  console.log(`Server listening on localhost:3000`);
});
