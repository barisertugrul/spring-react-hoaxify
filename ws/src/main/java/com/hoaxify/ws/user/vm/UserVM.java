package com.hoaxify.ws.user.vm;

import com.hoaxify.ws.user.User;
import lombok.Data;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Data
public class UserVM {

    private String username;

    private String displayName;

    private String image;

    public UserVM(User user){
        this.setUsername(user.getUsername());
        this.setDisplayName(user.getDisplayName());
        this.setImage(user.getImage());
    }
}
