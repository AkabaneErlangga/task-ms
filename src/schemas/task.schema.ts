import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TaskDocument = HydratedDocument<Task>;

@Schema({ timestamps: true }) // Enables createdAt & updatedAt fields
export class Task {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({
    required: true,
    enum: ['pending', 'in-progress', 'completed'],
    default: 'pending',
  })
  status: string;

  @Prop({ required: true })
  userId: string;

  @Prop({ default: null })
  deletedAt: Date | null;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
