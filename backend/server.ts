import app from './app'
import { ENV_VARS } from './config/envVars'
import path from 'path'
import express from 'express'

const port = ENV_VARS.PORT || 4001
let env = ENV_VARS.NODE_ENV

env ="production"
if (ENV_VARS.NODE_ENV == "production") {
  console.log("Production mode")
  const frontendPath = path.resolve(process.cwd(), "../frontend", "dist");
  app.use(express.static(frontendPath));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(frontendPath, "index.html"));
});
}
else console.log("Development mode")

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})