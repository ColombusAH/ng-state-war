const jsonServer = require("json-server");
const middleware = jsonServer.defaults();
const server = jsonServer.create();

server.use(middleware);
server.use(jsonServer.bodyParser);
const userData = require("../server/data/users");
const tagData = require("../server/data/tags");
const ArticlesData = require("../server/data/articles");

//users
server.get("/api/users", (req, res) => {
  res.status(200).send(userData.getUsers);
});

//login
server.post("/api/users/login", (req, res) => {
  console.log("[/api/users/login]");
  const allUsers = userData.getUsers.users;
  const creds = req.body.user || {};
  const user = allUsers.find(
    (u) => u.email === creds.email && u.password === creds.password
  );

  console.log(user);
  if (!!user) {
    const { password, ...userDetails } = user;
    return res.status(200).send({ user: userDetails });
  }
  return res.status(401);
});

//tags
server.get("/api/tags", (req, res) => {
  console.log(tagData.getTags);
  res.status(200).send(tagData.getTags);
});

//articles

server.get("/api/articles", (req, res) => {
  console.log(ArticlesData.getArticles);
  const articles = ArticlesData.getArticles.articles;
  const articlesCount = articles.length;

  res.status(200).send({ articles, articlesCount });
});

server.get("/api/articles/feed", (req, res) => {
  console.log(ArticlesData.getArticles);
  const articles = ArticlesData.getArticles.articles;
  const articlesCount = articles.length;

  res.status(200).send({ articles, articlesCount });
});

server.listen(3000, () => {
  console.log(`Server listening on localhost:3000`);
});
