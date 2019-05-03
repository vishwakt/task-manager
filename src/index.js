const express = require('express')
const cors = require('cors')
require('./db/mongoose')
const userRouter = require('./routers/user_routes')
const taskRouter = require('./routers/task_routes')

const app = express()
const port = process.env.PORT

app.use(cors())
app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})


const Task = require('./models/task_model')
const User = require('./models/user_model')

const main = async () => {
    // const task = await Task.findById('5cc7493d0b9da724c743441c')
    // await task.populate('owner').execPopulate()
    // console.log(task.owner)

    // const user = await User.findById('5cc7491a371b6324c39579e9')
    // await user.populate('tasks').execPopulate()
    // console.log(user.tasks)
}

main()