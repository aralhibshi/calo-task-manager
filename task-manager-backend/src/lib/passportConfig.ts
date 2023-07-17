// // Dependencies
// import { Model } from 'mongoose';
// import passport from 'passport';
// import { Strategy as LocalStrategy } from 'passport-local';

// // Model/Schema
// import IUser from '../models/User';
// import User from '../models/User';

// // Save User ID into Session
// passport.serializeUser((user: any, done) => {
//   done(null, user.id);
// });

// // Find User with ID
// passport.deserializeUser(async (id, done) => {
//   try {
//     const user = await User.findById(id);
//     done(null, user);
//   } catch (err) {
//     done(err);
//   }
// });

// // Authentication
// passport.use(
//   new LocalStrategy(
//     {
//       usernameField: 'emailAddress',
//       passwordField: 'password',
//     },
//     async (emailAddress, password, done) => {
//       try {
//         const user = await User.findOne({ emailAddress });
//         if (!user) {
//           return done(null, false);
//         }

//         if (!(await user.verifyPassword(password))) {
//           return done(null, false);
//         }
//         return done(null, user);
//       } catch (err) {
//         return done(err);
//       }
//     }
//   )
// );

// export default passport;
