import { User } from "../models/associations.js";
import { authService } from "../services/authService.js";

export const getAllMembers = async (req, res) => {
  const members = await User.findAll({
    attributes: { exclude: ["password"] },
  });
  res.status(200).json(members);
};

// export const getAllMembersByRoleId = async (req, res) => {
//   const members = await User.findAll({
//     attributes: { exclude: ["password"] },
//     where: { role_id: 2 }, // il faudrait modifier le "2" en dur par user.id par exemple, revoir Etienne pour ça
//   });
//   res.status(200).json(members);
// };

export const getOneMember = async (req, res) => {
  const { id } = req.user;
  if (req.user.id !== parseInt(id)) {
    return res.status(403).json({ error: "Forbidden" });
  }
  const member = await User.findByPk(id, {
    attributes: { exclude: ["password"] },
  });
  if (!member) {
    return res.status(404).json({ error: "Member not found" });
  }
  res.status(200).json(member);
};

export const updateMember = async (req, res) => {
  const { id } = req.params;
  const { name, firstname, password } = req.body;
  const member = await User.findByPk(id);
  if (!member) {
    return res.status(404).json({ error: "Member not found" });
  }
  if (name) {
    member.name = name;
  }

  if (firstname) {
    member.firstname = firstname;
  }

  if (password) {
    const hashedPassword = await authService.hashPassword(password);
    member.password = hashedPassword;
  }
  await member.save();

  delete member.dataValues.password;

  res.status(200).json(member);
};

export const deleteMember = async (req, res) => {
  const requestingUserId = req.user.id;
  const requestingUserRole = req.user.role_id;
  const userIdToDelete = req.params.id;

  // Vérifier si l'utilisateur à supprimer existe
  const memberToDelete = await User.findByPk(userIdToDelete);

  if (!memberToDelete) {
    return res.status(404).json({ error: "Member not found" });
  }

  // Convertir les IDs en nombres pour une comparaison sûre
  const requestingUserIdNum = Number(requestingUserId);
  const userIdToDeleteNum = Number(userIdToDelete);

  if (requestingUserRole === 1) {
    if (requestingUserIdNum === userIdToDeleteNum) {
      return res
        .status(401)
        .json({ error: "Admin cannot delete their own account" });
    }
  } else {
    if (requestingUserIdNum !== userIdToDeleteNum) {
      return res.status(401).json({ error: "Unauthorized access" });
    }
  }

  await memberToDelete.destroy();

  return res.status(204).json({ message: "Member deleted successfully" });
  // const { id } = req.user;
  // const member = await User.findByPk(id);
  // if (member.id !== id || req.user.role_id !== 1)
  //   res.status(401).json({ error: "Unauthorized access" });
  // if (!member) {
  //   return res.status(404).json({ error: "Member not found" });
  // }
  // await member.destroy();
  // res.status(204).json({ message: "Member deleted" });
};
