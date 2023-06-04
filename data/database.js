import mongoose from "mongoose";


export const connection = () => {
    mongoose.connect(process.env.MongoURL, {
        dbName: "backendAPI",
    }).then((c) => console.log(`Database Connected with ${c.connection.host}`))
        .catch((e) => console.log(e));

}