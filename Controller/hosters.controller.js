const {hosters} = require('../models');
const bcrypt = require('bcryptjs');

const registerHoster = async ( req, res ) => {
  const {name, email, password} = req.body;
  const salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(password, salt);
  try {
    if (await hosters.findOne({where: {email}})) res.send({isExist: true});
    else {
        const newHoster = await hosters.create({
            name,
            email,
            password: hashPassword,
            avatar: `https://avatars.dicebear.com/api/big-smile/:${name}.jpg`
        })
        res.status(201).send(newHoster)
    }
  } catch (error) {
        res.status(500).send(error)
  }
}

const loginHoster = async (req, res) => {
  const {email, password} = req.body;
  try {
    const userFind = await hosters.findOne({where: {email}})
    if (userFind) {
        const isLogin  = bcrypt.compareSync(password, userFind.password);
        if (isLogin) res.send({msg: "Login success!", userFind})
        else res.status(400).send("Password incorrect!");
    }
    else res.status(400).send("Email not found!!");
  } catch (error) {
    res.status(500).send(error)
  }
}

module.exports = {
    registerHoster,
    loginHoster
}