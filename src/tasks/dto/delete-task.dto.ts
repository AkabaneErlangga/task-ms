import { IsNotEmpty, IsString } from "class-validator";

export class DeleteTaskDto {
  @IsNotEmpty()
  @IsString()
  taskId: string;
}