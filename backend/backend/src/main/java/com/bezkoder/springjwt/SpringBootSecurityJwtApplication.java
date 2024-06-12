package com.bezkoder.springjwt;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableJpaRepositories("com.bezkoder.springjwt.repository")
@EnableScheduling
@EntityScan("com.bezkoder.springjwt.models")
public class SpringBootSecurityJwtApplication  {

	public static void main(String[] args) {
    SpringApplication.run(SpringBootSecurityJwtApplication.class, args);
	}


}
/*package com.bezkoder.springjwt;

import com.bezkoder.springjwt.repository.ServerRepo;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.scheduling.annotation.EnableScheduling;
@SpringBootApplication
//@SpringBootSecurityJwtApplication.EnableMail
@EnableJpaRepositories("com.bezkoder.springjwt.repository")
@EnableScheduling
@EntityScan("com.bezkoder.springjwt.models")
public class SpringBootSecurityJwtApplication  {

	public static void main(String[] args) {
		SpringApplication.run(SpringBootSecurityJwtApplication.class, args);
	}
	@Bean

	CommandLineRunner run(ServerRepo serverRepo){
		return args -> {
			/*serverRepo.save(new Server(1L, "192.168.1.160", "Ubuntu Linux", "16 GB","Personal PC", "http://localhost:8081/server/image/server1.png", SERVER_UP));
			serverRepo.save(new Server(2L, "192.168.1.58", "fedora Linux", "16 GB","Dell Tower", "http://localhost:8081/server/image/server2.png", SERVER_DOWN));
			serverRepo.save(new Server(3L, "192.168.1.21", "MS 2008", "32 GB","web server", "http://localhost:8081/server/image/server3.png", SERVER_DOWN));
			serverRepo.save(new Server(4L, "192.168.1.14", "Red Hat Enterprise Linux", "64 GB","mail Server", "http://localhost:8081/server/image/server4.png", SERVER_UP));


		};
	}

	@Target(ElementType.TYPE)
	@Retention(RetentionPolicy.RUNTIME)
	@Documented

	public @interface EnableMail {
	}

}
*/