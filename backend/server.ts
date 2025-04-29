import app from './app'
import { ENV_VARS } from './config/envVars'
import path from 'path'
import express from 'express'


const port = ENV_VARS.PORT || 4001


if (ENV_VARS.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})
