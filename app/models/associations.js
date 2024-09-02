import { Animal } from "./Animal.js";
import { Role } from "./Role.js";
import { User } from "./User.js";
import { Request } from "./Request.js";

// Role <-> User (One-to-Many)
Role.hasMany(User, {
  foreignKey: "role_id",
  as: "users",
});
User.belongsTo(Role, {
  foreignKey: "role_id",
  as: "role",
});

// User <-> Animal (One-to-Many)
User.hasMany(Animal, {
  foreignKey: "user_id",
  as: "animals",
});
Animal.belongsTo(User, {
  foreignKey: "user_id",
  as: "user",
});

// User <-> Request (One-to-Many)
User.hasMany(Request, {
  foreignKey: "user_id",
  as: "requests",
});
Request.belongsTo(User, {
  foreignKey: "user_id",
  as: "user",
});

// Request <-> Animal (One-to-Many)
Animal.hasMany(Request, {
  foreignKey: "animal_id",
  as: "animals",
});
Request.belongsTo(Animal, {
  foreignKey: "animal_id",
  as: "request",
});

export { Animal, Role, User, Request };
