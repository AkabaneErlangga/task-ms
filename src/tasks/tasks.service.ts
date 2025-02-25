import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task, TaskDocument } from 'src/schemas/task.schema';
import { CreateTaskDto } from './dto/create-task.dto';
import { UserDto } from './dto/user.dto';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}

  async createTask(taskData: CreateTaskDto, userData: UserDto) {
    const newTask = new this.taskModel({ ...taskData, userId: userData.sub });
    return newTask.save();
  }

  async getTasks() {
    const tasks = this.taskModel.find().exec();
    return tasks;
  }

  async updateTaskStatus(taskId: string, status: string) {
    return this.taskModel
      .findByIdAndUpdate(taskId, { status }, { new: true })
      .exec();
  }

  async updateTask(taskId: string, taskData: CreateTaskDto) {
    return this.taskModel
      .findByIdAndUpdate(taskId, taskData, { new: true })
      .exec();
  }

  async deleteTask(taskId: string) {
    return this.taskModel
      .findByIdAndUpdate(taskId, { deletedAt: new Date() }, { new: true })
      .exec();
  }

  async restoreTask(taskId: string) {
    return this.taskModel.findByIdAndUpdate(taskId, { deletedAt: null }).exec();
  }
}
