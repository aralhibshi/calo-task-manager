import { Document, Schema, Model, model } from 'mongoose'

// Interface
export interface ITask extends Document {
    title: string;
    description: string;
    users: Array<Schema.Types.ObjectId>;
};

// Schema
const taskSchema: Schema<ITask> = new Schema({
    title: {
        type: String,
        minlength: [2, '"Title must be 2 or more characters'],
        maxlength: [50, '"Title" cannot be more than 50 characters'],
        required: true
    },
    description: {
        type: String,
        minlength: [5, '"Description", must be 5 or more characters'],
        required: true
    },
    users: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
}, {
    timestamps: true
});

// Export Task Model and Interface
export const TaskModel: Model<ITask> = model<ITask>('Task', taskSchema);