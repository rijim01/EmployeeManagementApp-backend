import app from "./app.js";
import config from "./config/index.js";
import mongoose from "mongoose";

async function main() {
  await mongoose.connect(config.dbUrl)

  app.listen(config.port, () => {
    console.log(`Your app listening on port ${config.port}!`)
  })
}

main()
.then(() => console.log('Server started successfully'))
.catch(err => console.error(err))