import mongoose from "mongoose";


export const connection = () => {
    mongoose.connect(process.env.MongoURL, {
        dbName: "backendAPI",
    }).then(() => console.log("Database Connected"))
        .catch((e) => console.log(e));

}