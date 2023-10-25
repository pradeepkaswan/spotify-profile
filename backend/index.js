import app from './app.js'
import { PORT, NODE_ENV } from './utils/config.js'
import { info } from './utils/logger.js'

app.listen(PORT, () => {
  info(`[${NODE_ENV}] Server running on port ${PORT}...`)
})
