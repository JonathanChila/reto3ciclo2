package com.g6ciclo2reto03.g6ciclo2reto03.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.g6ciclo2reto03.g6ciclo2reto03.Documents.Order;
import com.g6ciclo2reto03.g6ciclo2reto03.MongoRepository.OrderMongoRepository;

@Repository
public class OrderRepository {
    @Autowired
    private OrderMongoRepository orderMongoRepository;

    public Order newOrder(Order order) {
        return orderMongoRepository.save(order);
    }

    public List<Order> getOrders() {
        return (List<Order>)orderMongoRepository.findAll();
    }

    public List<Order> getOrdersByZone(String zone) {
        return (List<Order>) orderMongoRepository.findBySalesMan_Zone(zone);
    }

    public Order getOrderById(Integer id) {
        Optional<Order> objOrder = orderMongoRepository.findById(id);
        Order objOrderReturn = new Order();

        if (objOrder.isEmpty()){
            objOrderReturn.setId(null);
        } else {
            objOrderReturn = objOrder.get();
        }
        return objOrderReturn;
    }

    public Order updStatus(Order order) {
        return orderMongoRepository.save(order);
    }

    public void deleteOrderById(Integer id) {
        orderMongoRepository.deleteById(id);
    }
}
