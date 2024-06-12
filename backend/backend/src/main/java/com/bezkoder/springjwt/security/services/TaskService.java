package com.bezkoder.springjwt.security.services;


import com.bezkoder.springjwt.models.Task;
import com.bezkoder.springjwt.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class TaskService {
    @Autowired
    private TaskRepository taskRepository;

    public Task scheduleTask(Task task) {
        return taskRepository.save(task);
    }

    public List<Task> getPendingTasks() {
        return taskRepository.findByScheduledTimeBeforeAndCompletedFalse(LocalDateTime.now());
    }

    public void markTaskAsCompleted(Task task) {
        task.setCompleted(true);
        taskRepository.save(task);
    }
}
