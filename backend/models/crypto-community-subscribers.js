import { DataTypes } from "sequelize";
import db from "../config/database.js";

const sequelize = db;

const CryptoCommunitySubscribers = sequelize.define(
  "crypto-community-subscribers",
  {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    fullName: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    paymentAddr: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    paymentTxId: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    paymentAmount: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    paymentCurrency: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    dateAdded: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "crypto-community-subscribers",
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

export default CryptoCommunitySubscribers;
