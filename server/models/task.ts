import { model, Schema } from "mongoose";


interface Task {
    name: string,
    description: string,
    reward: number,
    answer: string,
    category: string,
    attachments?: Array<{
        name: string,
        url: string
    }>
}

const taskSchema = new Schema<Task>({
    name: String,
    description: String,
    reward: Number,
    answer: String,
    category: String,
    attachments: {type: [{name: String, url: String}], default: undefined}
});

const Model = model('Task', taskSchema);

export default Model; 
