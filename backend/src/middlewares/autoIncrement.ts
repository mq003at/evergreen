import { Document, Model, CallbackError } from 'mongoose';
import { IBaseModel } from '../models/base';

type NextFunction = (err?: CallbackError) => void;

export const autoIncrementId = async function (this: IBaseModel, next: NextFunction) {
    if (this.isNew) {
        const model = this.constructor as Model<IBaseModel>;
        try {
            // Find the last document to determine the next ID
            const lastDoc = await model.findOne().sort({ _id: -1 }).exec();
            const nextId = lastDoc ? lastDoc._id + 1 : 1;
            this.set('_id', nextId);
            this.set('id', nextId);
        } catch (err) {
            next(err as CallbackError); // Cast to CallbackError for proper typing. This is mongoose's direct Callback Error
            return; //  no further processing occurs
        }
    }
    next();
};

// NOTE: This and timeStamp are both volatile. Double check database record to see if the data we have is correct.
// Double check on Stackoverflow to see if the codes function correctly most of the time