import app from './src/app.js'
import config from './src/envconfigure/url.configure.js'

const port = config.PORT;


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
}) 