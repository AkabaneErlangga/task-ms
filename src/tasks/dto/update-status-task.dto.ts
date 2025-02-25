import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateStatusTaskDto {
  @IsNotEmpty()
  @IsString()
  taskId: string;

  @IsNotEmpty()
  @IsString()
  status: string;
}
