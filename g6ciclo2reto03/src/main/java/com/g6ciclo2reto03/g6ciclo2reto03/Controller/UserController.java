package com.g6ciclo2reto03.g6ciclo2reto03.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.g6ciclo2reto03.g6ciclo2reto03.Documents.User;
import com.g6ciclo2reto03.g6ciclo2reto03.Services.UserService;

import org.springframework.http.HttpStatus;



@RestController
@RequestMapping("/api/user")
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping("/all")
    public List<User> getAll(){
        return userService.getAll();
    }

    @PostMapping("/new")
    @ResponseStatus(HttpStatus.CREATED)
    public User newUser(@RequestBody User user) {
        return userService.newUser(user);
    }

    @GetMapping("emailexist/{email}")
    public Boolean existEmail(@PathVariable String email) {
        return userService.existEmail(email);
    }

    @GetMapping("/{email}/{password}")
    public User getUser(@PathVariable("email") String email, 
                        @PathVariable("password") String password) {
        return userService.getUser(email, password);
    }

    @PutMapping("/update")
    @ResponseStatus(HttpStatus.CREATED)
    public User updateUser(@RequestBody User User) {
        return userService.updUser(User);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteUser(@PathVariable Integer id) {
        userService.deleteUser(id);
    }

    @GetMapping("/{id}")
    public User getUserById(@PathVariable Integer id) {
        return userService.getUserById(id);
    }

    @GetMapping("/coordinator/{zone}")
    public User getZoneCoordinator(@PathVariable String zone) {
        return userService.getZoneCoordinator(zone);
    }

    @GetMapping("/salesMen/{zone}")
    public Boolean zoneHasSalesMan(@PathVariable String zone) {
        return userService.zoneHasSalesMan(zone);
    }
}