import { app } from "./app.js";
import { connection } from "./data/database.js";
connection();

app.listen(process.env.PORT, () => {
    console.log(`Server is Running on port :${process.env.PORT} in ${process.env.NODE_ENV} mode`);
});