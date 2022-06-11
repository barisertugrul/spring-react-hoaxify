package com.hoaxify.ws.auth;

//import com.fasterxml.jackson.annotation.JsonView;
//import com.hoxify.ws.error.ApiError; //Çıkartıldı (Ders 45)
import com.hoaxify.ws.shared.CurrentUser;
//import com.hoaxify.ws.shared.Views;
import com.hoaxify.ws.shared.GenericResponse;
import com.hoaxify.ws.user.User;
import com.hoaxify.ws.user.UserRepository;
import com.hoaxify.ws.user.vm.UserVM;
import org.slf4j.Logger; //Çıkartıldı (Ders 45)
import org.slf4j.LoggerFactory; //Çıkartıldı (Ders 45)
import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus; //Çıkartıldı (Ders 45)
import org.springframework.http.ResponseEntity;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder; //Çıkartıldı (Ders 45)
//import org.springframework.security.crypto.password.PasswordEncoder; //Çıkartıldı (Ders 45)
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;
//import java.util.HashMap;
//import java.util.Map;

@RestController
public class AuthController {

    @Autowired
    AuthService authService;

//    PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(); //Çıkartıldı (Ders 45)

    @PostMapping("/api/1.0/auth")
    //@JsonView(Views.Base.class)
/* Ders 47 - Değiştririldi
    ResponseEntity<?> handleAuthentication(@RequestHeader(name = "Authorization") String authorization){
 */
   AuthResponse handleAuthentication(@RequestBody Credentials credentials){
        //log.info(String.valueOf(user));
//  Ders 47 - Eklenen START
        // User user = (User) authentication.getPrincipal(); // Çıkarıldı - Ders 47

       return authService.authenticate(credentials);

//  Ders 47 - Eklenen END
/* Eklendi-Çıkarıldı (Ders 47)
        HoaxifyUserDetails userDetails = (HoaxifyUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return  ResponseEntity.ok(userDetails.getUser()); //Değiştirildi (Ders 47)
        String username = userDetails.getUsername(); //Eklendi ve çıkarıldı (Ders 47)

 */

/*  Ders 45 - Çıkartıldı
        log.info(authorization);

        if(authorization == null){
            ApiError error = new ApiError(401,"Unauthorized request", "/api/1.0/auth");
            ResponseEntity<?> response = ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
            log.info(response.toString());
            return response;
        }
*/

/*  Ders 47 - Çıkartıltı
        String base64Encoded = authorization.split("Basic ")[1];
        String decoded = new String(Base64.getDecoder().decode(base64Encoded));
        String[] parts = decoded.split(":");
        String username = parts[0];
*/

//        String password = parts[1]; //Çıkartıldı (Ders 45)


//        User inDB = userRepository.findByUsername(username); //Çıkartıldı (Ders 47)

/*  Çıkartıldı (Ders 45)
        if(inDB == null){
            ApiError error = new ApiError(401,"Unauthorized request", "/api/1.0/auth");
            ResponseEntity<?> response = ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
            log.info(response.toString());
            return response;
        }

        String hashedPassword = inDB.getPassword();
        if(!passwordEncoder.matches(password,hashedPassword)){
            ApiError error = new ApiError(401,"Unauthorized request", "/api/1.0/auth");
            ResponseEntity<?> response = ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
            log.info(response.toString());
            return response;
        }
*/

        //username, displayName, image
/*
        Map<String, String> responseBody = new HashMap<>();
        responseBody.put("username", inDB.getUsername());
        responseBody.put("displayName",inDB.getDisplayName());
        responseBody.put("image", inDB.getImage());
        return  ResponseEntity.ok(responseBody);
*/

//        return  ResponseEntity.ok(inDB); //Değiştirildi (Ders 47)
    }

    @PostMapping("/api/1.0/logout")
    GenericResponse handleLogout(@RequestHeader(name = "Authorization") String authorization){
        String token = authorization.substring(7);
        authService.clearToken(token);
        return new GenericResponse("Logout success");
    }
}
