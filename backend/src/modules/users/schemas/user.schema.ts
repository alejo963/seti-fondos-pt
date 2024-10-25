import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class User {
    @Prop({ required: true })
    firstName: string;
    @Prop({ required: true })
    lastName: string;
    @Prop({ required: true })
    nationalId: string;
    @Prop({ required: true })
    wallet: number;
}

export const UserSchema = SchemaFactory.createForClass(User);