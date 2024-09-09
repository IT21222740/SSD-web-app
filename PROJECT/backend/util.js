const jwt =  require('jsonwebtoken')
 const generateToken = (user) => {
    return jwt.sign({
        _id: user._id,
        name : user.name,
        email : user.email,
        isAdmin : user.isAdmin,
        isCoach : user.isCoach,
        isDoctor : user.isDoctor,
        isCustomer: user.isCustomer
    } , process.env.JWT_SECRET,{
        expiresIn : '30d'
    });
}
 const isAuth = (req, res, next) => {
    
    if (true) {
     
      jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
      
          req.user = decode;
          next();
        
      });
    } else {
      res.status(401).send({ message: 'No Token' });
    }
  };
module.exports = generateToken , isAuth
