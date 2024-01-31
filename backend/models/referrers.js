import { DataTypes } from "sequelize";
import db from "../config/database.js";
import Payouts from "./payouts.js";

const sequelize = db;

const Referrers = sequelize.define(
  "referrers",
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
    gender: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING(60),
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
    date_registered: {
      type: DataTypes.STRING(60),
      allowNull: true,
    },
    usdt_tron_address: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    total_payouts: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    payout_percentage: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    total_refers: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    total_successful_refers: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    last_successful_refer: {
      type: DataTypes.STRING(60),
      allowNull: true,
    },
    last_login_date: {
      type: DataTypes.STRING(60),
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "referrers",
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [{ name: "id" }],
      },
    ],
  }
);

// Establish the association
Referrers.hasMany(Payouts, { foreignKey: "id" });
Payouts.belongsTo(Referrers, { foreignKey: "id" });

export default Referrers;
