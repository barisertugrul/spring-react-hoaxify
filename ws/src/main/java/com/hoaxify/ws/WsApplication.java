package com.hoaxify.ws;

import com.hoaxify.ws.hoax.HoaxService;
import com.hoaxify.ws.hoax.vm.HoaxSubmitVM;
import com.hoaxify.ws.user.User;
import com.hoaxify.ws.user.UserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Profile;

@SpringBootApplication
public class WsApplication {

	public static void main(String[] args) {
		SpringApplication.run(WsApplication.class, args);
	}

	/*@Bean
	CommandLineRunner createInitialUsers(UserService userService){
		return new CommandLineRunner() {
			@Override
			public void run(String... args) throws Exception {
				User user = new User();
				user.setUsername("user1");
				user.setDisplayName("display1");
				user.setPassword("Password");
				userService.save(user);
			}
		};
	}*/

	//Tek fonksiyonlu implementasyon için kısa yazım
	@Bean
	@Profile("dev")
	CommandLineRunner createInitialUsers(UserService userService, HoaxService hoaxService){
		return (args) -> {
			for(int i=1; i<=25; i++){
				try {
					userService.getByUsername("user" + i);
				} catch (Exception e){
					User user = new User();
					user.setUsername("user"+i);
					user.setDisplayName("Display"+i);
					user.setPassword("P4ssword");
					userService.save(user);
					for (int j=1; j<= 20; j++){
						HoaxSubmitVM hoax = new HoaxSubmitVM();
						hoax.setContent("Hoax-"+ j + " from user" + i);
						hoaxService.save(hoax, user);
					}
				}
			}
		};
	}
}
