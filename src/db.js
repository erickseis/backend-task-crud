import mongoose from "mongoose";

const db_crud = 'mongodb+srv://erickseis:G6P2mDnd82d1gYF7@cluster0.h6gdz9i.mongodb.net/db_crud?retryWrites=true&w=majority&appName=Cluster0'
export const connectDB = async () => {
    try {
        await mongoose.connect(db_crud)
        console.log(">>> DB is connected")

    } catch (error) {
        console.log(error)
    }
}