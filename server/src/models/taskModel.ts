import mongoose, { Document, Schema } from 'mongoose'

export interface ITask extends Document {
	title: string
	description: string
	status: string
	owner: mongoose.Schema.Types.ObjectId
}

const TaskSchema: Schema = new Schema(
	{
		title: { type: String, required: true },
		description: { type: String, required: false },
		status: {
			type: String,
			required: true,
			enum: ['todo', 'in-progress', 'done'],
			default: 'todo',
		},
		owner: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
	},
	{
		timestamps: true,
		versionKey: false,
		toJSON: {
			transform: function (doc, ret) {
				ret.id = ret._id
				delete ret._id
			},
		},
	}
)

export default mongoose.model<ITask>('Task', TaskSchema)
