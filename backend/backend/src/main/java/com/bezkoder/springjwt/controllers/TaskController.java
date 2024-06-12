package com.bezkoder.springjwt.controllers;

import com.bezkoder.springjwt.models.Task;
import com.bezkoder.springjwt.security.services.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {
    @Autowired
    private TaskService taskService;

    @PostMapping
    public Task scheduleTask(@RequestBody Task task) {
        return taskService.scheduleTask(task);
    }

    @GetMapping
    public List<Task> getPendingTasks() {
        return taskService.getPendingTasks();
    }

    @PostMapping("/{id}/complete")
    public void completeTask(@PathVariable Long id) {
        Task task = taskService.getPendingTasks().stream().filter(t -> t.getId().equals(id)).findFirst().orElseThrow();
        taskService.markTaskAsCompleted(task);
    }
}
