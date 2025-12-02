const app = require('./app')
const logger = require('./utils/logger')
const config = require('./utils/config')

try {
    app.listen(process.env.PORT, () => {
        logger.info(`Server running on port ${config.PORT}`)
    })
} catch (error) {
    logger.info('error:', error)
}
