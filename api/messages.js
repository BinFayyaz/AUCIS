import { saveMessage } from '../server/core.js'
import { jsonHandler } from '../server/handler.js'

export default jsonHandler(saveMessage)
