const { User, Test, Question, Answer, Skill, Prueba } = require("../db/models/index");

const userController = {
  getUsers(req, res) {
    User.findAll({})
      .then((users) => {
        res.send(users);
      })
      .catch((err) => {
        res.send(err);
      });
  },

  getUser(req, res) {
    User.findOne({
      where: {
        id: req.params.id,
      },
    })
      .then((user) => {
        res.send(user);
      })
      .catch((err) => res.send(err));
  },

  postUser(req, res) {
    User.create(req.body)
      .then((user) => {
        res.status(200).send(user);
      })
      .catch((err) => res.send(err));
  },
  postSkill(req, res) {
    User.findByPk(req.params.id)
      .then((user) => {
        return user.addSkill(req.body.skillId);
      })
      .then((user) => {
        res.status(200).send(user);
      })
      .catch((err) => res.send(err));
  },
  getUserSkills(req, res) {
    User.findOne({
      where:{id: req.params.id},
      include: [{ model: Skill}],
      order: [["createdAt", "DESC"]]
    })
      .then((skills) => {
        res.status(200).send(skills);
      })
      .catch((err) => res.send(err));
  },
};

module.exports = userController;
