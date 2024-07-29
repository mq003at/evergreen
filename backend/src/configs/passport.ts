import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import User from '../models/user';

/**
 * LocalStrategy for authenticating users with an email and password. If the email is found, the program will proceed to compare the password.
 * If succeed, return user with null as error. If fail, return false for user and output a message as an option.
 * @param {Object} options - Options to customize the strategy.
 * @param {string} options.usernameField - Field name for the username (email in this case).
 * @param {Function} verify - Verification function for authentication.
 */
passport.use(
    new LocalStrategy(
        { usernameField: 'email' },
        async (email, password, done) => {
            try {
                const user = await User.findOne({ email });
                if (!user) {
                    return done(null, false, { message: 'Incorrect email.' });
                }
                const isMatch = await user.comparePassword(password);
                if (!isMatch) {
                    return done(null, false, { message: 'Incorrect password.' });
                }
                return done(null, user);
            } catch (err) {
                return done(err);
            }
        }
    )
);

/**
 * Serialize user information to be stored in the session.
 * @param {Object} user - The authenticated user object.
 * @param {Function} done - Callback function to be called once serialization is complete.
 */
passport.serializeUser((user: any, done) => {
    done(null, user.id);
});

/**
 * Deserialize user information from the session.
 * @param {string} id - The user ID stored in the session.
 * @param {Function} done - Callback function to be called once deserialization is complete.
 */
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err);
    }
});

export default passport;