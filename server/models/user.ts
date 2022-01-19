import { model, Schema, Types } from "mongoose";

interface User {
    username: string,
    password: string,
    score: number,
    solvedTasks: [Types.ObjectId],
    contest: Types.ObjectId
}

const userSchema = new Schema<User>({
    username: {type: String, required: true},
    password: {type: String, required: true},
    score: {type: Number, required: true},
    solvedTasks: {type: [{type: Schema.Types.ObjectId, ref: 'Task'}], required: true},
    contest: {type: Schema.Types.ObjectId, ref: 'Contest', required: true}
});

const User = model('User', userSchema);

export default User;