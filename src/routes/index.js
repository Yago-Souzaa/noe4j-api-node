import express from "express";
import livros from "../routes/routesLivros.js"

const routes = (app) => {
    app.route('/').get((req, res) => {
      res.status(200).send("<h1>API Nodejs Express com Neo4j<h1>")
    })
  
    app.use(
      express.json(),
      livros
      
    )
  }
  
  export default routes;