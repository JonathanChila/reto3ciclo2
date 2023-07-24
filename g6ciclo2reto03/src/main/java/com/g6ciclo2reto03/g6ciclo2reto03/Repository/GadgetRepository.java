package com.g6ciclo2reto03.g6ciclo2reto03.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.g6ciclo2reto03.g6ciclo2reto03.Documents.Gadget;
import com.g6ciclo2reto03.g6ciclo2reto03.MongoRepository.GadgetMongoRepository;



@Repository
public class GadgetRepository {
    @Autowired
    private GadgetMongoRepository gadgetMongoRepository;

    public Gadget newGadget(Gadget gadget) {
        return gadgetMongoRepository.save(gadget);
    }

    public Gadget updGadget(Gadget gadget) {
            return gadgetMongoRepository.save(gadget);
    }

    public List<Gadget> getGadgets() {
        return (List<Gadget>) gadgetMongoRepository.findAll();
    }

    public void deleteGadget(Integer id) {
        gadgetMongoRepository.deleteById(id);
    }

    public Gadget getGadgetById(Integer idGadget) {
        Optional<Gadget> objGadget = gadgetMongoRepository.findById(idGadget);
        Gadget objGadgetReturn = new Gadget();

        if (objGadget.isEmpty()){
            objGadgetReturn.setId(idGadget);
            objGadgetReturn.setName("NO DEFINIDO");
        } else {
            objGadgetReturn = objGadget.get();
        }

        return objGadgetReturn;
    }
    
}