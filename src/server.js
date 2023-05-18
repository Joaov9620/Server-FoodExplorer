require('express-async-errors');
const AppError = require('./utils/AppError');

// const uploadConfig = require('./configs/upload');
const { UPLOADS_FOLDER } = require('./configs/upload2');

const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false})); //verifica essa linha

const cors = require('cors');
app.use(cors());

const routes = require('./routes');

app.use(routes);

// app.use('/files', express.static(uploadConfig.UPLOADS_FOLDER));
app.use('/files', express.static(UPLOADS_FOLDER));

app.use((error, req, res, next) => {
    if(error instanceof AppError){
        return res.status(error.statusCode).json({
            status: "error",
            message: error.message
        })
    }

    console.error(error)

    return res.status(500).json({
        status: "error",
        message: "Internal Server Error"
    })
});

const PORT = 3332;
app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`));