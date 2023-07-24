package com.g6ciclo2reto03.g6ciclo2reto03.Services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.g6ciclo2reto03.g6ciclo2reto03.Documents.User;
import com.g6ciclo2reto03.g6ciclo2reto03.Repository.UserRepository;



@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public User newUser(User user) {
        Boolean flat = true;
        
        if(user.getEmail() == null)
            flat = false;
        
        if(user.getPassword() == null)
            flat = false;

        flat = !existEmail(user.getEmail());
        
        if(flat){
            return userRepository.newUser(user);
        } else{return user;}          
    }

    //validate if email exists in the repository
    public Boolean existEmail(String email) {
        Boolean flat = false;
        Optional<User> objUser = userRepository.existEmail(email);

        if (!objUser.isEmpty())
            flat = true;

        return flat;
    }

    //return user if exist; otherwise return a undefined user
    public User getUser(String email, String password) {
        Optional<User> objUser = userRepository.getUser(email, password);
        User objUserReturn;

        if (objUser.isEmpty())
            objUserReturn = new User();
        else
            objUserReturn = objUser.get();

        return objUserReturn;
    }

    public User updUser(User user) {
        User myUser = userRepository.getUserById(user.getId());

        if (!myUser.getName().equals("NO DEFINIDO"))
            return userRepository.updUser(user);
        else
            return user;
    }

    public List<User> getAll() {
        return userRepository.getUsers();
    }

    public void deleteUser(Integer idUser) {
        User myUser = userRepository.getUserById(idUser);

        if (!myUser.getName().equals("NO DEFINIDO"))
            userRepository.deleteUser(idUser);
    }

    public User getUserById(Integer id){
        return userRepository.getUserById(id);
    }
}
