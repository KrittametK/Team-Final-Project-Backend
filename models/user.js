module.exports = (sequelize, DataType) => {
  const User = sequelize.define(
    "user",
    {
      firstname: {
        type: DataType.STRING
      },
      lastname: {
        type: DataType.STRING
      },
      phone: {
        type: DataType.STRING
      },
      email: {
        type: DataType.STRING
      },
      password: {
        type: DataType.STRING
      },
      address: {
        type: DataType.STRING
      },
      district: {
        type: DataType.STRING
      },
      province: {
        type: DataType.STRING
      },
      user_image: {
        type: DataType.STRING
      },
      role: {
				defaultValue: "USER",
        type: DataType.ENUM("ADMIN", "USER")
      }
    },
    {
      freezeTableName: true,
      timestamps: false
    }
  );
  return User;
};
