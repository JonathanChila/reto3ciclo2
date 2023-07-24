package com.g6ciclo2reto03.g6ciclo2reto03.MongoRepository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.g6ciclo2reto03.g6ciclo2reto03.Documents.Gadget;



public interface GadgetMongoRepository extends MongoRepository<Gadget, Integer>{
    
}