import bcrypt from 'bcrypt';
import Cart from '../../models/cart'; 
import { IUser, IUserDocument } from '../../models/user';
import { NextFunction } from '../../utils/type';

// Auto deletion should be put in Service layers

// export const handleUserCart = {
//     // Middleware to create a Cart when a User is created
//     async createCartOnUserSave(this: IUser, next: NextFunction) {
//         if (this.isNew) {
//             try {
//                 await Cart.create({ userId: this._id });
//                 next();
//             } catch (error) {
//                 next(error);
//             }
//         } else {
//             next();
//         }
//     },

//     // Middleware to delete Cart when a User is deleted
//     async deleteCartOnUserRemove(this: IUser, next: Function) {
//         try {
//             await Cart.deleteOne({ userId: this._id });
//             next();
//         } catch (error) {
//             next(error);
//         }
//     }
// };

// https://www.npmjs.com/package/bcrypt
/* 
* Async recommended: saltRounds = 10, myPass = 's0/\/\P4$$w0rD', otherPass = 'not_bacon'
* This Mongoose middlware handles hashing passwords, which will be executed right before 'save' into db
* The technique used is technique 1 (generate a salt and hash on a seperate function calls)
* 
* bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
        // Store hash in your password DB.
    });
});
* 
* First, it takes the instance of the document, and the next middleware function or the error if somehow this function gets an error
* Then, it checks if the password has been hased or not (modified), return next if it is already is
* genSalt is an RNG seed?
* then the change will update the password field of the document into a hashed one, and it will continue with a next middleware
* If there is an error, it will be caught (MongoD Middleware only has req and next, unlike Express which can have err, req, res, next)
*/

// Middleware function to hash passwords
// export const hashPassword = function (this: IUserDocument, next: NextFunction) {
//     if (!this.isModified('password')) {
//         return next();
//     }
//     bcrypt.genSalt(10)
//         .then(salt => bcrypt.hash(this.password, salt))
//         .then(hash => {
//             this.password = hash;
//             next();
//         })
//         .catch(err => next(err));
// };

export default {}