import app from './src/app.js'
import config from './src/envconfigure/url.configure.js'

const port = config.PORT;

import dbconfig from './src/dbconfig/db.config.js';

dbconfig();

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
}) 