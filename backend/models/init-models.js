import { DataTypes } from "sequelize";
import _assets from "./assets.js";
import _users from "./users.js";

export default function initModels(sequelize) {
  var assets = _assets(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);

  return {
    assets,
    users,
  };
}
