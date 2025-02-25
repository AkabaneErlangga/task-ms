import { Controller, UseGuards } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
  RpcException,
} from '@nestjs/microservices';
import { TasksService } from './tasks.service';
// import { CreateTaskDto } from './dto/create-task.dto';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { CreateTaskDto } from 'task-management-contract';
import { UserDto } from './dto/user.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { UpdateStatusTaskDto } from './dto/update-status-task.dto';
import { DeleteTaskDto } from './dto/delete-task.dto';
import { RestoreTaskDto } from './dto/restore-task.dto';

@UseGuards(AuthGuard)
@Controller()
export class TasksController {
  constructor(private readonly TasksService: TasksService) {}

  @MessagePattern({ cmd: 'create_task' })
  async createTask(
    @Payload('body') message: CreateTaskDto,
    @Payload('user') userData: UserDto,
  ) {
    return this.TasksService.createTask(message, userData);
  }

  @MessagePattern({ cmd: 'get_all_tasks' })
  async getTasks() {
    return this.TasksService.getTasks().catch((error) => {
      console.error('Error Type:', typeof error);
      console.error('Error Instance:', error instanceof Error);
      console.error('Error Content:', error);
 
      // Pastikan selalu melempar RpcException dengan objek yang valid
      throw new RpcException(
        error instanceof Error ? error.message : 'Unexpected error',
      );
    });
  }

  @MessagePattern({ cmd: 'update_task' })
  async updateTask(@Payload() message: UpdateTaskDto) {
    return this.TasksService.updateTask(message.taskId, message.taskData);
  }

  @MessagePattern({ cmd: 'update_task_status' })
  async updateTaskStatus(@Payload() message: UpdateStatusTaskDto) {
    return this.TasksService.updateTaskStatus(message.taskId, message.status);
  }

  @MessagePattern({ cmd: 'delete_task' })
  async deleteTask(@Payload() message: DeleteTaskDto) {
    return this.TasksService.deleteTask(message.taskId);
  }

  @MessagePattern({ cmd: 'restore_task' })
  async restoreTask(@Payload() message: RestoreTaskDto) {
    return this.TasksService.restoreTask(message.taskId);
  }
}
