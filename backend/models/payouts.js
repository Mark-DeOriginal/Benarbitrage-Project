import { DataTypes } from "sequelize";
import db from "../config/database.js";

const sequelize = db;

const Payouts = sequelize.define(
  "payouts",
  {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    payee_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    payee_id: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },
    payout_amount: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    original_amount: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    payout_percentage: {
      type: DataTypes.STRING(60),
      allowNull: true,
    },
    payout_method: {
      type: DataTypes.STRING(60),
      allowNull: true,
    },
    tx_id: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    payout_wallet_address: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    payout_status: {
      type: DataTypes.STRING(60),
      allowNull: true,
    },
    payout_date: {
      type: DataTypes.STRING(60),
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "payouts",
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

export default Payouts;
