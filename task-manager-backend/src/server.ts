// Dependencies
import express, { Express } from 'express';
import mongoose from 'mongoose';
import session, { SessionOptions } from 'express-session';
import dotenv from 'dotenv';

// Dotenv
dotenv.config();

// Port
const port: string | undefined = process.env.PORT;

// Passport Configuration
import passport from './lib/passportConfig';
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
import teamRoute from './routes/team';

// Mounted Routes
app.use('/', authRoute);
app.use('/', userRoute);
app.use('/', taskRoute);
app.use('/', teamRoute);

// Start Server
app.listen(port, () => {
    console.log(`Backend Running on PORT ${port}`)
});

// MongoDB URL
const mongoURL: string = process.env.MONGOLOCAL!;

// DB Connection
mongoose.connect(mongoURL)
.then(() => {
    console.log('Mongoose Connected to MongoDB')
})
.catch((err) => {
    console.log('Error Occurred', err)
});