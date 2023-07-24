package com.g6ciclo2reto03.g6ciclo2reto03.MongoRepository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.g6ciclo2reto03.g6ciclo2reto03.Documents.Order;

public interface OrderMongoRepository extends MongoRepository<Order, Integer> {


    public List<Order> findBySalesMan_Zone(String zone);

}
