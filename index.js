import app from './src/app.js'
import config from './src/envconfigure/url.configure.js'
import dbconfig from './src/dbconfig/db.config.js'

const port = config.PORT;

dbconfig();

if (process.env.NODE_ENV !== 'production') {
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
}

export default app;