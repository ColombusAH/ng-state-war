const jsonServer = require("json-server");
const middleware = jsonServer.defaults();
const server = jsonServer.create();

server.use(middleware);
server.use(jsonServer.bodyParser);
const userData = require("../server/data/users");
const tagData = require("../server/data/tags");

//users
server.get("/api/users", (req, res) => {
  res.status(200).send(userData.getUsers);
});

//login
server.post("/api/users/login", (req, res) => {
  console.log(userData.getUsers);
  res.status(200).send(userData.getUsers);
});

//tags
server.get("/api/tags", (req, res) => {
  console.log(tagData.getTags);
  res.status(200).send(tagData.getTags);
});

server.listen(3000, () => {
  console.log(`Server listening on localhost:3000`);
});
