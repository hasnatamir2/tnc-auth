import mongoose from "./index";

const UserSchema = new mongoose.Schema(
    {
        username: String,
        email: {
            type: String,
            unique: true,
            pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
            required: true,
        },
        password: {
            type: String,
            required: true,
            pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
        },
        dob: {
            type: Date,
            required: true,
            default: Date.now,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        updatedAt: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: { currentTime: () => Math.round(Date.now()) } }
);

export default mongoose.model("User", UserSchema);
