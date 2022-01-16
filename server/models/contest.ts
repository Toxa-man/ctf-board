import { model, Schema } from "mongoose";

interface Contest {
    name: string
}

const schema = new Schema<Contest>({
    name: String
})

const Model = model('Contest', schema);

export default Model;