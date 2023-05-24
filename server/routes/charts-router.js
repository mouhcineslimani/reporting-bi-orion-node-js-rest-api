const { Router } = require("express");
const service = require("../services/orion-service");

// c'est le routeur et le controlleur d'actions
const router = new Router();
// toutes les routes qui ont un prefix /biblio/authors/{qlq}
router.get("/", (req, res) => {
  service.getData((result) => {
    res.send(result.data);
    console.log(result.fields);
  });
});
module.exports = router;
