//require files
const seedRouter = require('./seedRoutes')
const productRouter= require('./productRoutes')
const  userRouter  = require('./UserRoutes')
const orderRouter = require('./orderRoutes')
module.exports = (app) => {
  app.use('/api/seed' , seedRouter)
  app.use('/api/products' , productRouter)
  app.use('/api/users',userRouter)
  app.use('/api/orders' , orderRouter)

  }