import app from './app'
import { ENV_VARS } from './config/envVars'

const port = ENV_VARS.PORT || 4001

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})
