import { Document, Model, CallbackError } from 'mongoose';
import { IBaseModel } from '../models/base';

type NextFunction = (err?: CallbackError) => void;

export const autoIncrementId = async function (this: IBaseModel, next: NextFunction) {
    if (this.isNew) {
        const model = this.constructor as Model<IBaseModel>;
        try {
            const lastDoc = await model.findOne().sort({ id: -1 }).exec();
            console.log('Last Document:', lastDoc);

            if (lastDoc && lastDoc.id) {
                this.id = lastDoc.id + 1;
            } else {
                this.id = 1;
            }
        } catch (err) {
            next(err as CallbackError);
            return;
        }
    }
    next();
};

// NOTE: This and timeStamp are both volatile. Double check database record to see if the data we have is correct.
// Double check on Stackoverflow to see if the codes function correctly most of the time