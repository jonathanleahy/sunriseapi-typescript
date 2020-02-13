"use strict";
export class ParallelQueue {
    constructor(concurrency = 1, completeQueue) {
        this.concurrency = 1;
        this.running = 0;
        this.taskId = 0;
        this.taskQueue = [];
        this.concurrency = concurrency;
        this.completeQueue = completeQueue;
    }
    resolveTask(currentTask) {
        this.running--;
        if (!this.taskQueue.length) {
            if (!this.running) {
                typeof this.completeQueue === "function" && this.completeQueue();
                this.running = 0;
                this.taskId = 0;
                this.taskQueue = [];
            }
            return;
        }
        this.runTask(this.taskQueue.shift());
    }
    runTask(taskItem) {
        if (!taskItem) {
            return;
        }
        this.running++;
        let that = this;
        if (!!taskItem.wait) {
            taskItem.timeoutId = setTimeout(function () {
                clearTimeout(taskItem.timeoutId);
                taskItem.timeoutId = null;
                that.resolveTask(taskItem);
            }, taskItem.wait);
        }
        taskItem.task(() => this.resolveTask(taskItem));
    }
    push(task, wait) {
        const ti = {
            id: this.taskId++,
            task,
            wait: wait
        };
        if (this.running < this.concurrency) {
            this.runTask(ti);
        }
        else {
            this.taskQueue.push(ti);
        }
        return this;
    }
    complete(completeQueue) {
        this.completeQueue = completeQueue;
        return this;
    }
}
exports.ParallelQueue = ParallelQueue;
//# sourceMappingURL=parallelqueue.js.map
