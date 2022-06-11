package com.hoaxify.ws.file;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.Collections;
import java.util.Map;

@RestController
public class FileController {

    @Autowired
    FileService fileService;

    @PostMapping("/api/1.0/hoax-attachments")
//    Map<String, String> saveHoaxAttachment(@RequestParam(name = "image") MultipartFile multipartFile){
    FileAttachment saveHoaxAttachment(MultipartFile file){
        return fileService.saveHoaxAttachment(file);
//        String fileName = fileService.saveHoaxAttachment(multipartFile);
//        return Collections.singletonMap("name", fileName);
    }
}
