// Dependencies
import express, { Express } from 'express';
import mongoose from 'mongoose';
import session, { SessionOptions } from 'express-session';

// Passport Configuration
import passport from './lib/passportConfig';

const PORT: number = 4000;

// Initialize App
const app: Express = express();

// Parse URL
app.use(express.urlencoded({
    extended: true
}));

// Parse JSON
app.use(express.json());

// Session Configuration
const sessionOptions: SessionOptions = {
    secret: 'MyCoolSecret',
    saveUninitialized: true,
    resave: false,
    cookie: {maxAge: 365000000}
};

// Session
app.use(session(sessionOptions));

// Initialize Passport and Session Access
app.use(passport.initialize())
app.use(passport.session())

// Imported Routes
import authRoute from './routes/auth';
import userRoute from './routes/user';
import taskRoute from './routes/task';

// Mounted Routes
app.use('/', authRoute);
app.use('/', userRoute);
app.use('/', taskRoute);

// Start Server
app.listen(PORT, () => {
    console.log(`Backend Running on PORT ${PORT}`)
});

// DB Connection
mongoose.connect('mongodb://127.0.0.1:27017/taskManager')
.then(() => {
    console.log('Mongoose Connected to MongoDB')
})
.catch((err) => {
    console.log('Error Occurred', err)
});