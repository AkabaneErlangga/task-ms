import { IsNotEmpty, IsString } from 'class-validator';

export class RestoreTaskDto {
  @IsNotEmpty()
  @IsString()
  taskId: string;
}
