import { Document, Schema, Model, model } from 'mongoose';

// Interface
export interface ITeam extends Document {
    name: string,
    description: string,
    users: Array<{user: Schema.Types.ObjectId; isOwner: boolean}>;
};

// Schema
const teamSchema: Schema<ITeam> = new Schema({
    name: {
        type: String,
        minlength: [2, '"Name" must be 2 or more characters'],
        maxlength: [20, '"Name cannot be more than 50 characters'],
        unique: true,
        required: true
    },
    description: {
        type: String,
        minlength: [2, '"Description" must be 2 or more characters'],
        maxlength: [20, '"Description", cannot be more than 20 characters'],
        required: true
    },
    users: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'User'
            },
            isOwner: {
                type: Boolean,
                default: false,
                required: true
            }
        }
    ]
}, {
    timestamps: true
});

// Export Team Model and Interface
export const TeamModel: Model<ITeam> = model<ITeam>('Team', teamSchema);