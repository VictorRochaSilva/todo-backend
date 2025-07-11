import { Schema, model, Document, Types } from 'mongoose';

export interface ITask extends Document {
  title: string;
  description?: string;
  dueDate?: Date;
  completed: boolean;
}

const TaskSchema = new Schema<ITask>(
  {
    title: { type: String, required: true },
    description: { type: String },
    dueDate: { type: Date },
    completed: { type: Boolean, default: false }
  },
  {
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform: (_doc, ret: any) => {
        if (ret._id && ret._id instanceof Types.ObjectId) {
          ret.id = ret._id.toHexString();
        } else if (ret._id) {
          // fallback: tentar converter com toString
          ret.id = ret._id.toString();
        }
        delete ret._id;
      }
    },
    toObject: {
      virtuals: true,
      versionKey: false,
      transform: (_doc, ret: any) => {
        if (ret._id && ret._id instanceof Types.ObjectId) {
          ret.id = ret._id.toHexString();
        } else if (ret._id) {
          ret.id = ret._id.toString();
        }
        delete ret._id;
      }
    }
  }
);

export default model<ITask>('Task', TaskSchema);
