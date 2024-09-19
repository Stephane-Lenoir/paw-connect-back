import { Animal } from "./Animal.js";
import { Role } from "./Role.js";
import { User } from "./User.js";
import { Request } from "./Request.js";

// Role <-> User (One-to-Many)
Role.hasMany(User, {
  foreignKey: "role_id",
  as: "users",
  onDelete: "CASCADE",
});
User.belongsTo(Role, {
  foreignKey: "role_id",
  as: "role",
  onDelete: "CASCADE",
});

// User <-> Animal (One-to-Many)
User.hasMany(Animal, {
  foreignKey: "user_id",
  as: "animals",
  onDelete: "CASCADE",
});
Animal.belongsTo(User, {
  foreignKey: "user_id",
  as: "user",
  onDelete: "CASCADE",
});

// User <-> Request (One-to-Many)
User.hasMany(Request, {
  foreignKey: "user_id",
  as: "requests",
  onDelete: "CASCADE",
});
Request.belongsTo(User, {
  foreignKey: "user_id",
  as: "user",
  onDelete: "CASCADE",
});

// Request <-> Animal (One-to-Many)
Animal.hasMany(Request, {
  foreignKey: "animal_id",
  as: "animals",
  onDelete: "CASCADE",
});
Request.belongsTo(Animal, {
  foreignKey: "animal_id",
  as: "animal",
  onDelete: "CASCADE",
});

export { Animal, Role, User, Request };
