import { connectDB } from "./data/database.js"
import { app } from "./app.js";

connectDB();

app.listen(process.env.PORT , () => {
    console.log(`Server is Listening on port ${process.env.PORT} in ${process.env.NODE_ENV} mode`);
});