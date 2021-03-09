import bcrypt from "bcryptjs";

const data = {
  users: [
    {
      name: "Sunil",
      email: "sunil@email.com",
      password: bcrypt.hashSync("1234", 8),
      isAdmin: true,
      firstName: "Sunil",
      lastName: "L",
      phoneNumber: "9878",
    },
    {
      name: "John",
      email: "john@email.com",
      password: bcrypt.hashSync("1234", 8),
      isAdmin: false,
      firstName: "John",
      lastName: "Kenedy",
      phoneNumber: "9878781232",
    },
  ],
};

export default data;
