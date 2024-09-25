// use of promise for making asynchandler function

const Asynchandler = (requesthandler) => {
  return (req, res, next) => {
    Promise.resolve(requesthandler(req, res, next)).catch((err) => {
      next(err);
    });
  };
};

// use of try-catch format for asynchandler function in this function we are using try catch

// const Asynchandler = (requesthandler) => async (req, res, next) => {

//     try {

//         await requesthandler(req , res , next);

//     } catch (error) {
//         res.status(error.code || 500).json({
//             success: false,
//             message : error.message
//         })
//     }

// };

export { Asynchandler };
