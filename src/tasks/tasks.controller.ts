import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller()
export class TasksController {
  constructor(private readonly TasksService: TasksService) {}

  @MessagePattern({ cmd: 'create_task' })
  async createTask(message: CreateTaskDto) {
    return this.TasksService.createTask(message);
  }

  @MessagePattern({ cmd: 'get_all_tasks' })
  async getTasks() {
    return this.TasksService.getTasks();
  }

  @MessagePattern({ cmd: 'update_task' })
  async updateTask(message: any) {
    return this.TasksService.updateTask(message.taskId, message.taskData);
  }

  // @MessagePattern({ cmd: 'create_task' })
  // async createTask(message: CreateTaskDto) {
  //   return this.TasksService.createTask(message);
  // }

  // @MessagePattern({ cmd: 'get_all_tasks' })
  // async getTasks() {
  //   return this.TasksService.getTasks();
  // }

  // @MessagePattern({ cmd: 'update_task' })
  // async updateTask(message: any) {
  //   return this.TasksService.updateTask(taskId, taskData);
  // }

  // @MessagePattern({ cmd: 'update_task_status' })
  // async updateTaskStatus(message: any) {
  //   return this.TasksService.updateTaskStatus(taskId, status);
  // }

  // @MessagePattern({ cmd: 'delete_task' })
  // async deleteTask(message: any) {
  //   return this.TasksService.deleteTask(taskId);
  // }
}
