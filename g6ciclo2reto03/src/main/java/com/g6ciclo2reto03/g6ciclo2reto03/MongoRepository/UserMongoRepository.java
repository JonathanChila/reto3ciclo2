package com.g6ciclo2reto03.g6ciclo2reto03.MongoRepository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.g6ciclo2reto03.g6ciclo2reto03.Documents.User;



public interface UserMongoRepository extends MongoRepository<User, Integer>{
    
    public Optional<User> findByEmail(String email);

    public Optional<User> findByEmailAndPassword(String email, String password);     
}