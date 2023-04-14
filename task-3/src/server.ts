import {server, port} from './index';
import {DB} from './models/db';
import {logger} from './shared/loggers/error-logger';

server.listen(port, async() => {
  await DB.initDB();
  logger.info({level: 'error', info: `Server started on port ${port}`});
})