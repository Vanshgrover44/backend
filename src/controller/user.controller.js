import { Asynchandler } from "../utils/Asynchandler.js";

const registeruser = Asynchandler(async (req, res) => {
   res.status(200).json({
    message: "vansh grover",
  });
});

export { registeruser };
