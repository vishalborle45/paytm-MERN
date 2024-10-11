const express = require("express");
const { authMiddleware } = require("../middleware");
const { accountModel, userModel } = require("../db");
const { default: mongoose } = require("mongoose");
const accountRouter = express.Router();

accountRouter.get("/balance", authMiddleware, async (req, res) => {
  const userId = req.userId;

  try {
    const account = await accountModel.findOne({ userId: userId });

    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }

    res.json({
      message: "Balance fetched",
      balance: account.balance,
    });
  } catch (error) {
    console.error("Error fetching balance:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


accountRouter.post("/transfer", authMiddleware, async (req, res) => {
  const FromId = req.userId;
  const { toId, amount } = req.body;
  const transferAmount = parseInt(amount);

  if (isNaN(transferAmount)) {
    return res.status(400).json({ message: "Invalid amount" });
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    //fetch the sender account
    const fromAcc = await accountModel
      .findOne({
        userId: FromId,
      })
      .session(session);

    if (!fromAcc) {
      throw new Error("Invalid sender");
    }

    if (fromAcc.balance < transferAmount) {
      throw new Error("Insufficient balance");
    }

    // Fetch recipient account
    const toAcc = await accountModel
      .findOne({
        userId: toId,
      })
      .session(session);

    if (!toAcc) {
      throw new Error("Invalid recipient");
    }

    await accountModel
      .updateOne(
        { userId: FromId },
        {
          $inc: {
            balance: -transferAmount,
          },
        }
      )
      .session(session);

    await accountModel
      .updateOne(
        { userId: toId },
        {
          $inc: {
            balance: transferAmount,
          },
        }
      )
      .session(session);

    await session.commitTransaction();
    res.status(200).json({
      message: "transaction success",
    });
  } catch (error) {
    await session.abortTransaction();
    return res
      .status(500)
      .json({ message: "transaction failed", error: error.message });
  } finally{
    await session.endSession()
  }
});

module.exports = accountRouter;
