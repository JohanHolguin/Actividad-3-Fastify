const { validationResult } = require("express-validator");

const sumOperator = (param1, param2) => (+param1) + (+param2);

exports.sum = (req, res, nest) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const err = new Error('Error');
        err.statusCode = 500;
        err.data = errors.array();
        throw err;
    }

    const sum =  sumOperator(+req.body.paramone, +req.body.paramtwo);

    const params = {
        body: req.body,
        result: sum
    }

    try{
        res.status(201).json({ message: 'sum', params });
    } catch(err){

         const error = new Error('Error');
         error.statusCode = 500;
         error.data = err;
         throw error;
    }
}