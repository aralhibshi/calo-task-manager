import { Document, Schema, Model, model } from 'mongoose';

// Interface
export interface IUser extends Document {
    firstName: string;
    lastName: string;
    emailAddress: string;
    password: string;
    tasks: Array<Schema.Types.ObjectId>;
};

// Schema
const userSchema: Schema<IUser> = new Schema({
    firstName: {
        type: String,
        minlength: [2, '"First Name" must be 2 or more characters'],
        maxlength: [50, '"First Name" cannot be more than 50 characters'],
        required: true
    },
    lastName:  {
        type: String,
        minlength: [2, '"Last Name" must be 2 or more characters'],
        maxlength: [50, '"Last Name" cannot be more than 50 characters'],
        required: true
    },
    emailAddress: {
        type: String,
        lowercase: true,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    tasks: [{
        type: Schema.Types.ObjectId,
        ref: 'Task',
    }]
},{
    timestamps: true
});

export const UserModel: Model<IUser> = model<IUser>('User', userSchema);