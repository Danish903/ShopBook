const axios = require("axios");
function handlerRender(req, res) {
  axios
    .get("http://localhost:5000/api/books")
    .then(response => {
      const html = JSON.stringify(response.data);
      res.render("index", { html });
    })
    .catch(err => {
      console.log("ERRIR");
    });
}
module.exports = handlerRender;
