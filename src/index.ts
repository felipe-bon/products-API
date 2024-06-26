import 'express-async-errors'
import express from 'express';
import { AppDatasource } from './data-source'; 
import routes from './routes';
import { errorMiddleware } from './middlewares/error';


AppDatasource.initialize().then(() => {
    const app = express()

    app.use(express.json())

    app.use(routes)

    app.use(errorMiddleware)

    return app.listen(process.env.PORT)
})