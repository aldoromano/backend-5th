const express = require("express");
const formData = require("form-data");
const Mailgun = require("mailgun.js");
require("dotenv").config();

/* MAILGUN CONFIGURATION */
const mailgun = new Mailgun(formData);
const client = mailgun.client({
  username: "John Doe",
  key: process.env.MAIL_KEY_API /* VOTRE CLÉ API */,
});

const router = express.Router();

router.post("/form", async (req, res) => {
  console.log("Contact ....");

  try {
    //   On crée un objet messageData qui contient des informations concernant le mail (qui m'envoie le mail, adresse vers laquelle je veux envoyer le mail, titre et contenu du mail) :
    const messageData = {
      from: `${req.body.firstname} ${req.body.lastname} <${req.body.email}>`,
      to: "tiano.roma@gmail.com",
      subject: `${req.body.subject}`,
      text: req.body.message,
    };

    //   Fonctions fournies par le package mailgun pour créer le mail et l'envoyer, en premier argument de `create`, votre nom de domaine :
    client.messages
      .create(
        process.env.MAIL_DOMAIN,
        messageData
      ) /* VOTRE NOM DE DOMAINE SE TERMINANT PAR `.mailgun.org` */
      .then((response) => {
        console.log(response);
        res.status(200).json({ message: "email sent" });
      })
      .catch((err) => {
        res.status(err.status).json({ message: err.message });
      });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
