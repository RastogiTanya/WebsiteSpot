import bcrypt from "bcryptjs";
const users = [
  {
    name: "Admin User",
    email: "admin@gmail.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "FIrst User",
    email: "first@gmail.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "Second User",
    email: "second@gmail.com",
    password: bcrypt.hashSync("123456", 10),
  },
];
export default users;
