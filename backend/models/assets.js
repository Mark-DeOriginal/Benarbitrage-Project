import { DataTypes } from "sequelize";
import db from "../config/database.js";

const sequelize = db;

const Assets = sequelize.define(
  "assets",
  {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    asset_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    asset_owner: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    asset_amount: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    purchase_date: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    payment_wallet_address: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    crypto_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    transaction_id: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "assets",
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

export default Assets;
