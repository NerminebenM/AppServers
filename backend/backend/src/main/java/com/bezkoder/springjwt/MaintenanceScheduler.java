package com.bezkoder.springjwt;

//import com.bezkoder.springjwt.models.MonitoredService;
import com.bezkoder.springjwt.models.Task;
import com.bezkoder.springjwt.security.services.NotificationService;
//import com.bezkoder.springjwt.security.services.ServiceMonitoringService;
import com.bezkoder.springjwt.security.services.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class MaintenanceScheduler {

    @Autowired
    private TaskService taskService;

    @Autowired
    private NotificationService notificationService;

   /* @Autowired
    private ServiceMonitoringService serviceMonitoringService;
*/
    @Scheduled(fixedRate = 60000)
    public void checkTasks() {
        // Check pending tasks
        List<Task> tasks = taskService.getPendingTasks();
        for (Task task : tasks) {
            String subject = "Task Reminder";
            String body = "Please complete the task: " + task.getDescription();
        //    notificationService.notifyUsers(subject, body);
            taskService.markTaskAsCompleted(task);
        }

        // Check service statuses
       /* List<MonitoredService> monitoredServices = serviceMonitoringService.getAllServices();
        for (MonitoredService service : monitoredServices) {
            serviceMonitoringService.checkServiceStatus(service);
        }*/
    }
}
