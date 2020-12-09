const { User, Test, Skills, Answer, Skill } = require("../db/models/index")

const skillsController = {
    getSkill(req, res) {
      Skill.findOne({
          where:{id: req.params.id}//NO SE SI TEST O CATEGORY
        })
        .then((skill) => {
          res.send(skill);
        })
        .catch((err) => {
          res.send(err);
        });
    },
  
    getSkills(req, res) {
      Skill.findAll({})
        .then((skills) => {
          res.send(skills);
        })
        .catch((err) => res.send(err));
    },

    postSkill(req, res) {
      Skill.create(req.body)
        .then((skill) => {
          res.status(200).send(skill);
        })
        .catch((err) => res.send(err));
    },
  
    putSkill(req, res){
        Skill.update(req.body, {where: {id: req.params.id}})
        .then(skill => res.status(200).send(skill))
        .catch(err => res.send(err))
    },
    deleteSkill(req, res){
        Skill.destroy(
            {where:{id: req.params.id}}
            )
            .then(skill => res.status(200).send(skill))
            .catch(err => res.send(err))
    }
  };

  module.exports = skillsController