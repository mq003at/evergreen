import { Document, Model, CallbackError } from 'mongoose';

type NextFunction = (err?: CallbackError) => void;

export const autoIncrementId = async function (this: Document, next: NextFunction) {
    if (this.isNew) {
        const model = this.constructor as Model<Document>;
        try {
            const lastDoc = await model.findOne().sort({ id: -1 }).exec();

            console.log('Last Document:', lastDoc); 

            if (lastDoc && lastDoc.id) {
                this.set('id', lastDoc.id + 1);
            } else {
                this.set('id', 1);
            }
        } catch (err) {
            next(err as CallbackError); // Cast to CallbackError for proper typing. This is mongoose's direct Callback Error
            return; //  no further processing occurs
        }
    }
    next();
};

// NOTE: This and timeStamp are both volatile. Double check database record to see if the data we have is correct.
// Double check on Stackoverflow to see if the codes function correctly most of the time