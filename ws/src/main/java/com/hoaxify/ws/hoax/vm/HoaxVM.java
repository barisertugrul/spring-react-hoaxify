package com.hoaxify.ws.hoax.vm;

import com.hoaxify.ws.file.FileAttachment;
import com.hoaxify.ws.file.vm.FileAttachmentVM;
import com.hoaxify.ws.hoax.Hoax;
import com.hoaxify.ws.user.User;
import com.hoaxify.ws.user.vm.UserVM;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.util.Date;

@Data
public class HoaxVM {

    private long id;

    private String content;

    private long timeStamp;

    private UserVM user;

    private FileAttachmentVM fileAttachment;

    public HoaxVM(Hoax hoax){
        this.setId(hoax.getId());
        this.setContent(hoax.getContent());
        this.setTimeStamp(hoax.getTimeStamp().getTime());
        this.setUser(new UserVM(hoax.getUser()));
        if(hoax.getFileAttachment() != null){
            this.fileAttachment = new FileAttachmentVM(hoax.getFileAttachment());
        }

    }
}
