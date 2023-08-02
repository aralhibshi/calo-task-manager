import { Document, Schema, Model, model } from 'mongoose';
import bcrypt from 'bcrypt'

// Interface
export interface IUser extends Document {
    firstName: string;
    lastName: string;
    emailAddress: string;
    password: string;
    teams: Array<Schema.Types.ObjectId>;
    tasks: Array<Schema.Types.ObjectId>;
    verifyPassword(password: string): Promise<boolean>;
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
        minlength: [6, '"Email Address" must be 6 or more characters'],
        maxlength: [50, '"Email Address" cannot be more than 50 characters'],
        lowercase: true,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        minlength: [6, '"Password" must be 6 or more characters'],
        maxlength: [100, '"Password" cannot be more than 100 characters'],
        required: true
    },
    teams: [{
        type: Schema.Types.ObjectId,
        ref: 'Team'
    }],
    tasks: [{
        type: Schema.Types.ObjectId,
        ref: 'Task'
    }]
},{
    timestamps: true
});

// Verify Password Method
userSchema.methods.verifyPassword = async function (password: string): Promise<boolean> {
    try {
      return await bcrypt.compare(password, this.password);
    } catch (err) {
      throw err;
    }
  };

// Export User Model and Interface
export const UserModel: Model<IUser> = model<IUser>('User', userSchema);