import { PickType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString, IsOptional, IsBoolean } from 'class-validator';
import { Task } from 'src/schemas/task.schema';

export class CreateTaskDto extends PickType(Task, [
  'title',
  'description',
  'status',
  'assignedTo',
  'dueDate',
  'userId',
]) {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  status: string;

  @IsOptional()
  @IsString()
  assignedTo: string;

  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsOptional()
  @IsString()
  dueDate: Date;

  @IsOptional()
  @IsBoolean()
  deletedAt: Date;
}
