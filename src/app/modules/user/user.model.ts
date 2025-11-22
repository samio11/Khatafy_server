import { model, Schema } from "mongoose";
import { ERole, IUser } from "./user.interface";
import bcrypt from "bcrypt";
import config from "../../config";

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    photo: { type: String },
    role: {
      type: String,
      enum: {
        values: Object.values(ERole),
        message: "{VALUE} is not a valid Role",
      },
      default: ERole.member,
    },
    messId: { type: Schema.Types.ObjectId, ref: "Mess" },
    isKicked: { type: Boolean, default: false },
  },
  { versionKey: false, timestamps: true }
);

userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, Number(config.BCRYPT_SALT));
});

userSchema.post("save", async function (doc, next) {
  doc.password = "";
});

export const User = model<IUser>("User", userSchema);
