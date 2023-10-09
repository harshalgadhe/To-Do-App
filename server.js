import { connectDB } from "./data/database.js"
import { app } from "./app.js";

connectDB();

app.listen(process.env.PORT , () => {
    console.log("Server is Listening");
});