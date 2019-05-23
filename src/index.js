const express = require('express')
const cors = require('cors')
const aws = require('aws-sdk'); //"^2.2.41"
const multer = require('multer'); // "^1.3.0"
const multerS3 = require('multer-s3'); //"^2.7.0"
const bodyParser = require('body-parser');

require('./db/mongoose')
const userRouter = require('./routers/user_routes')
const taskRouter = require('./routers/task_routes')
const orderRouter = require('./routers/order_routes')

// AWS_SECRET_ACCESS_KEY=PWkYVg3MPYp76nyRsWlnyAYFl2P4eJ6RSjeLIlB1
// AWS_ACCESS_KEY_ID=AKIA5L6FAR2VQ36JHBGF
// AWS_REGION=us-east-2

aws.config.update({
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    region: process.env.AWS_REGION
});

const app = express()
const s3 = new aws.S3();

app.use(bodyParser.json());

const port = process.env.PORT

// const upload = multer({
//     dest:'images'
// })
//
// app.post('/upload', upload.single('upload'), (req, res) => {
//     res.send()
// })

const upload = multer({
    storage: multerS3({
        s3: s3,
        acl: 'public-read',
        bucket: 'airworks-file-upload-test',
        key: function (req, file, cb) {
            console.log(file);
            cb(null, file.originalname); //use Date.now() for unique file keys
        }
    })
});

app.post('/uploadkml', upload.array('upl',1), async (req, res, next) => {

    res.send("Uploaded!");
});

app.use(cors())
app.use(express.json())
app.use(userRouter)
app.use(taskRouter)
app.use(orderRouter)

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