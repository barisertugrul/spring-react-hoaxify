package com.hoaxify.ws.configuration;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Data
@Configuration
@ConfigurationProperties(prefix="hoaxify")
public class AppConfiguration {
    private String uploadPath;

    private String profileStoragePath = "profiles";

    private  String attachmentStoragePath = "attachments";

    public String getProfileStoragePath() {
        return uploadPath + "/" + profileStoragePath;
    }

    public String getAttachmentStoragePath() {
        return uploadPath + "/" + attachmentStoragePath;
    }
}
