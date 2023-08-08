package com.g6ciclo2reto03.g6ciclo2reto03.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.g6ciclo2reto03.g6ciclo2reto03.Documents.User;
import com.g6ciclo2reto03.g6ciclo2reto03.MongoRepository.UserMongoRepository;


@Repository
public class UserRepository {
    @Autowired
    private UserMongoRepository userMongoRepository;

    public User newUser(User user) {
        return userMongoRepository.save(user);
    }

    public User updUser(User user) {
            return userMongoRepository.save(user);
    }

    public List<User> getUsers() {
        return (List<User>) userMongoRepository.findAll();
    }

    public void deleteUser(Integer id) {
        userMongoRepository.deleteById(id);
    }

	public Optional<User> existEmail(String email) {
		return userMongoRepository.findByEmail(email);
	}

    public Optional<User> getUser(String email, String password) {
        return userMongoRepository.findByEmailAndPassword(email, password);
    }

    public User getUserById(Integer idUser) {
        Optional<User> objUser = userMongoRepository.findById(idUser);
        User objUserReturn = new User();

        if (objUser.isEmpty()){
            objUserReturn.setId(idUser);
            objUserReturn.setName("NO DEFINIDO");
        } else {
            objUserReturn = objUser.get();
        }

        return objUserReturn;
    }

    public Optional<User> getUserByZoneAndType(String zone, String type) {
        return userMongoRepository.getUserByZoneAndType(zone, type);
    }

    public List<User> findallByZoneAndType(String zone, String type) {
        return userMongoRepository.findAllByZoneAndType(zone, type);
    }   



}
