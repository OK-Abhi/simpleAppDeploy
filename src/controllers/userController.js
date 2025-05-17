// External Modules
const asyncHandler = require("express-async-handler");

// variables
let registerFormData = [
  {
    Username: "employee",
    email: "random9@GMAIL.COM",
    password: "456732",
    user_role: "employee",
  },
  {
    Username: "student",
    email: "student9@GMAIL.COM",
    password: "456732",
    user_role: "student",
  },
];
let id = 0;

//@desc Register the user
//@route POST /register
//@access public
const registerUser = asyncHandler(async (req, res) => {
  registerFormData.push(JSON.stringify({ id: id, ...req.body }));
  console.log("body", req.body);
  console.log(`\narray data ${registerFormData}`);

  // registerFormData.fill(null);
  id++;
  res.status(200).redirect("/");
});

//@desc Login user
//@route GET /api/users/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
  const { userName, password, user_role } = req.body;
  console.log(req.body);
  if (
    userName === registerFormData[0].Username &&
    password === registerFormData[0].password &&
    user_role === registerFormData[0].user_role
  ) {
    res.status(200).redirect("/login/registrars");
  } else if (
    userName === registerFormData[1].Username &&
    password === registerFormData[1].password &&
    user_role === registerFormData[1].user_role
  ) {
    res.status(200).redirect("/login/students");
  }
});

module.exports = {
  registerUser,
  loginUser,
};
