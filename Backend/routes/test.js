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
      // Fetch sender account
      const fromAcc = await accountModel.findOne({ userId: FromId }).session(session);
  
      if (!fromAcc) {
        throw new Error("Invalid sender");
      }
  
      if (fromAcc.balance < transferAmount) {
        throw new Error("Insufficient balance");
      }
  
      // Fetch recipient account
      const toAcc = await accountModel.findOne({ userId: toId }).session(session);
  
      if (!toAcc) {
        throw new Error("Invalid recipient");
      }
  
      // Perform transfer
      await accountModel.updateOne(
        { userId: FromId },
        { $inc: { balance: -transferAmount } }
      ).session(session);
  
      await accountModel.updateOne(
        { userId: toId },
        { $inc: { balance: transferAmount } }
      ).session(session);
  
      await session.commitTransaction();  // Commit the transaction if everything is successful
      res.status(200).json({ message: "transaction success" });
  
    } catch (error) {
      await session.abortTransaction();  // Rollback in case of error
      res.status(500).json({ message: error.message });
    } finally {
      await session.endSession();  // Ensure the session is always closed
    }
  });
  