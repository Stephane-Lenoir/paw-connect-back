import { User } from "../models/associations.js";
import { authService } from "../services/authService.js";

export const getAllMembers = async (req, res) => {    
  const members = await User.findAll({
    attributes: { exclude: ["password"] },
    where: { role_id: 2 }, // il faudrait modifier le "2" en dur par user.id par exemple, revoir Etienne pour ça
    });
  res.json(members);    
};

export const updateMember = async (req, res) => {
   
      const { id } = req.params;
      const { name, password } = req.body;
      const member = await User.findByPk(id);
      if (!member) {
        return res.status(404).json({ error: "Member not found" });
      }
      if (name) {
        member.name = name;
      }
      if (password) {
        const hashedPassword = await authService.hashPassword(password);
        member.password = hashedPassword;
      }
      await member.save();

      delete member.dataValues.password;

      res.json(member);     
}

export const deleteMember = async (req, res) => {    
  const { id } = req.params;
  const member = await User.findByPk(id);
  if (!member) {
    return res.status(404).json({ error: "Member not found" });
  }
  await member.destroy();
  res.json({ message: "Member deleted" });
}
