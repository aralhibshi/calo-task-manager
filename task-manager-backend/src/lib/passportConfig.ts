// Dependencies
import { Model } from 'mongoose';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

// Model/Schema
import { IUser, UserModel } from '../models/User';
const User: Model<IUser> = UserModel;

// Save User ID into Session
passport.serializeUser((user: any, done) => { // temp any
  done(null, user.id);
});

// Find User with ID
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

// Authentication
passport.use(
  new LocalStrategy(
    {
      usernameField: 'emailAddress',
      passwordField: 'password'
    },
    async (emailAddress: string, password: string, done) => {
      try {
        const user: IUser | null = await User.findOne({ emailAddress });
        if (!user) {
          return done(null, false);
        }

        if (!(await user.verifyPassword(password))) {
          return done(null, false);
        }
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

export default passport;