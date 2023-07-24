package com.g6ciclo2reto03.g6ciclo2reto03.Documents;

import java.io.Serializable;
import java.util.Date;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "usuarios")
public class User implements Serializable {
    @Id
    private Integer id;
    private String identification;  
    private String name;    
    private Date birthtDay;    
    private String monthBirthtDay;    
    private String address; 
    private String cellPhone;   
    private String email;   
    private String password;    
    private String zone;    
    private String type;
    
    public User(Integer id, String email, String password, String name) {
        this.email = email;
        this.password = password;
    }    
}