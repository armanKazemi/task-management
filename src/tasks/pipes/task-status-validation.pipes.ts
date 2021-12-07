import { BadRequestException, PipeTransform } from "@nestjs/common";
import { TaskStatus } from "../task-status.enum";

export class TaskStatusValidationPipes implements PipeTransform {
    readonly allowedStatuses = [
        TaskStatus.OPEN,
        TaskStatus.IN_PROGRESS,
        TaskStatus.DONE
    ]

    transform(value: any) {
        value = value.toUpperCase();
        if (this.isStatusValid(value)) {
            return value;
        } else{
            throw new BadRequestException(`'${value}' is not valid.`);
        }
    }

    private isStatusValid (status: any) {
        const index = this.allowedStatuses.indexOf(status);
        return index !== -1;
    }
}