const { body, validationResult } = require('express-validator')
const validateRules = () => {
    return [
        body('name').isLength({ max: 40 }).withMessage('Название проекта не может быть длинее 40 символов'),
    ]
}

const validate = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        return next()
    }
    const extractedErrors = []
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

    return res.status(422).json({
        errors: extractedErrors,
    })
}

module.exports = {
    validateRules,
    validate,
}