export default function (sequelize, DataTypes) {
  return sequelize.define(
    "assets",
    {
      owner_id: {
        type: DataTypes.STRING(60),
        allowNull: false,
      },
      asset_name: {
        type: DataTypes.STRING(60),
        allowNull: false,
      },
      asset_worth: {
        type: DataTypes.STRING(60),
        allowNull: false,
      },
      asset_type: {
        type: DataTypes.STRING(60),
        allowNull: false,
      },
      date_purchased: {
        type: DataTypes.STRING(60),
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "assets",
      timestamps: false,
    }
  );
}
