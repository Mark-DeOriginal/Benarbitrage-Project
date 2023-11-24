export default function (sequelize, DataTypes) {
  return sequelize.define(
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
      total_balance: {
        type: DataTypes.STRING(60),
        allowNull: true,
      },
      accumulated_interest: {
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
    }
  );
}
