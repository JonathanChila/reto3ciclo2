package com.g6ciclo2reto03.g6ciclo2reto03.Services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.g6ciclo2reto03.g6ciclo2reto03.Documents.Order;
import com.g6ciclo2reto03.g6ciclo2reto03.Repository.OrderRepository;

@Service
public class OrderService {
    @Autowired
    private OrderRepository orderRepository;
    
    public Order newOrder(Order order) {
        return orderRepository.newOrder(order);
    }

    public List<Order> getAll() {
        return orderRepository.getOrders();
    }


    public void deleteOrder(Integer id) {
    }

    public Order getOrderById(Integer id) {
        return orderRepository.getOrderById(id);
    }

    public List<Order> getOrdersByZone(String zone) {
        return orderRepository.getOrdersByZone(zone);
    }

    public Order updStatus(Order order) {
        Order myOrder = orderRepository.getOrderById(order.getId());

        if(!myOrder.getId().equals(null)) {
            myOrder.setStatus(order.getStatus());
        }

        return myOrder;
    }
}