module.exports = (err, req, res, next) => {
    let status
    let message
  
    switch (err.name) {
      case 'Unauthenticated':
      case 'JsonWebTokenError':
        status = 401
        message = 'Unauthenticated'
        break;
  
      case 'NotFound':
        status = 404
        message = 'Entity not found'
        break;
  
      case 'SequelizeValidationError':
        status = 400
        message = err.errors[0].message
        break;

      case 'SequelizeUniqueConstraintError':
        status = 400
        message = err.errors[0].message
        break;
  
      case 'EmailPasswordisRequired':
        status = 400
        message = 'Email and password is required'
        break;
  
      case 'UserNotFound':
      case 'EmailPasswordInvalid':
        status = 401
        message = 'Email or password is invalid'
        break;
  
      default:
        status = 500
        message = 'Internal server error'
        break;
    }
  
    res.status(status).json({ message })
  }