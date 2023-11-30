import { DataTypes } from "sequelize";
import db from "../config/database.js";
import Assets from "./assets.js";

const sequelize = db;

const Users = sequelize.define(
  "users",
  {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    account_id: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    account_validated: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    account_type: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    date_registered: {
      type: DataTypes.STRING(60),
      allowNull: true,
    },
    onboarding_stage: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    reg_completed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    has_asset: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    portfolio_balance: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    accumulated_interest: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    total_balance: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    last_login_date: {
      type: DataTypes.STRING(60),
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "users",
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [{ name: "id" }],
      },
    ],
    hooks: {
      beforeSave: (asset) => {
        // Calculate totalbalance dynamically based on accumulated_interest and portfolio_balance
        asset.total_balance =
          asset.accumulated_interest + asset.portfolio_balance;
      },
    },
  }
);

// Establish the association
Users.hasMany(Assets, { foreignKey: "user_id", as: "assets" });
Assets.belongsTo(Users, { foreignKey: "user_id" });

export default Users;
