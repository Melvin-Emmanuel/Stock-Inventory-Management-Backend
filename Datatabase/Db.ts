import mongoose from 'mongoose'

const url = "mongodb://0.0.0.0:27017/stockmanagement"


const db = mongoose.connect(url).then(() => {
    console.log("connected to databasse successfully")
}).catch((err) => {
    console.log(`An error has occured ${err.message}`)
})
export default db
