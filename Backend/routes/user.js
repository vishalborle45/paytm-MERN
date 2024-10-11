const express = require("express");
const userRouter = express.Router();
const { userModel, accountModel } = require("../db");
const bcrypt = require("bcrypt");
const { JWT_SECRET } = require("../config");
const jwt = require("jsonwebtoken");
const { authMiddleware } = require("../middleware");

const {
  signupSchema,
  signinSchema,
  updateSchema,
} = require("./zodSchemas/user");

userRouter.post("/signup", async (req, res) => {
  // Validate request body using Zod
  const zodval = signupSchema.safeParse(req.body);
  if (!zodval.success) {
    return res.status(400).json({
      message: "Invalid input",
      errors: zodval.error.issues,
    });
  }

  // Log the parsed data
  console.log("Parsed data:", zodval.data);

  try {
    // Destructure validated data
    const { firstname, lastname, email, password } = zodval.data;
    
    // Hash the password
    const hashpass = await bcrypt.hash(password, 10);
    
    // Create a new user
    const response = await userModel.create({
      lastname,
      firstname,
      email,
      password: hashpass,
    });

    // Create an associated account for the user
    const acc = await accountModel.create({
      userId: response._id,
      balance: 1 + Math.random() * 1000, // Generate a random balance
    });

    // Log the created account and user
    console.log("Account created:", acc);
    console.log("User created:", response);

    // Respond with success
    res.json("Signup successful");
  } catch (error) {
    // Log and respond with an error message
    console.error("Error during signup:", error);
    res.status(500).json({ message: "Signup failed", error: error.message });
  }
});


userRouter.post("/signin", async (req, res) => {
  const zodval = signinSchema.safeParse(req.body);
  if (!zodval.success) {
    return res.status(400).json({
      message: "Invalid input",
      errors: zodval.error.issues,
    });
  }

  try {
    const { email, password } = zodval.data;

    const user = await userModel.findOne({
      email,
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user) {
      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        return res.status(401).json({ message: "Invalid password" });
      }

      if (isValid) {
        const token = await jwt.sign(
          {
            user: user._id,
          },
          JWT_SECRET
        );
        res.json({
          message: "signin successful",
          token,
          user
        });
      }
    };
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "signin failed" });
  }
});

// Ensure you have bcrypt installed

userRouter.put("/update", authMiddleware, async (req, res) => {
  const zodval = updateSchema.safeParse(req.body);
  if (!zodval.success) {
    return res.status(400).json({
      message: "Invalid input",
      errors: zodval.error.issues,
    });
  }
  const userId = req.userId;
  console.log(userId);

  try {
    const { firstname, lastname, password } = zodval.data;

    // Hash the password if it has been updated
    const hashedPassword = password
      ? await bcrypt.hash(password, 10)
      : undefined;

    const updateData = {
      firstname,
      lastname,
    };

    if (hashedPassword) {
      updateData.password = hashedPassword; // Only add the password if it's being updated
    }

    const response = await userModel.updateOne(
      { _id: userId },
      { $set: updateData }
    );
    console.log(response);

    if (response.acknowledged) {
      // Check if any document was modified
      return res.status(200).json({
        message: "User update successful",
      });
    } else {
      return res.status(404).json({
        message: "User not found or no changes made",
      });
    }
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ message: "User update failed" });
  }
});

userRouter.get("/bulk", async (req, res) => {
  const filter = req.query.filter || "";
  console.log(filter)

  try {
    const users = await userModel.find(
     { $or : [
        {
          firstname: {
            $regex: filter,
          },
        },
        {
          lastname: {
            $regex: filter,
          },
        },
      ]}
    );

    console.log(users)
    res.json({
      user: users.map((user) => (
        {
          lastname : user.lastname,
          firstname : user.firstname,
           _id : user._id,
        }
    )),
    });


  } catch (error) {
    res.json({
      message: "error in getting user data",
    });
  }
});

module.exports = userRouter;
