import Assets from "./assets.js";
import Users from "./users.js";

export default function initModels() {
  var assets = Assets;
  var users = Users;

  return {
    assets,
    users,
  };
}
