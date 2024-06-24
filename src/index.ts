import express from 'express';
import { AppDatasource } from './data-source'; 
import routes from './routes';

AppDatasource.initialize().then(() => {
    const app = express()

    app.use(express.json())

    app.use(routes)

    return app.listen(process.env.PORT)
})