const express = require("express");
const Model = require("../api/models/model");
const { hashPassword, validateUser } = require("../utils/cryptPassword");

const router = express.Router();

router.get("/all", async (_req, res) => {
  try {
    const data = await Model.find();
    res.json(data).status(200);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/cadastrar", async (req, res) => {
  const newPass = await hashPassword(req.body.password);
  const data = new Model({
    name: req.body.name,
    email: req.body.email,
    password: newPass,
  });

  try {
    const dataToSave = data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/user/:id", async (req, res) => {
  try {
    const data = await Model.findById(req.params.id);
    res.json(data).status(200);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Model.findOne({ email });

    const verify = await validateUser(password, user.password);

    if (user && verify) {
      res.json(user).status(200);
    } else {
      throw new Error("Usuário inválido");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
