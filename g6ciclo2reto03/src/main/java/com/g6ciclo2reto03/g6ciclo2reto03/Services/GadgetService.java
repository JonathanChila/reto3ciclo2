package com.g6ciclo2reto03.g6ciclo2reto03.Services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.g6ciclo2reto03.g6ciclo2reto03.Documents.Gadget;
import com.g6ciclo2reto03.g6ciclo2reto03.Repository.GadgetRepository;


@Service
public class GadgetService {
    @Autowired
    private GadgetRepository gadgetRepository;

    public Gadget newGadget(Gadget gadget) {
        return gadgetRepository.newGadget(gadget);
    }

    public Gadget updGadget(Gadget gadget) {
        Gadget myGadget = gadgetRepository.getGadgetById(gadget.getId());

        if (!myGadget.getName().equals("NO DEFINIDO"))
            return gadgetRepository.updGadget(gadget);
        else
            return gadget;
    }

    public List<Gadget> getAll() {
        return gadgetRepository.getGadgets();
    }

    public void deleteGadget(Integer idGadget) {
        Gadget myGadget = gadgetRepository.getGadgetById(idGadget);

        if (!myGadget.getName().equals("NO DEFINIDO"))
            gadgetRepository.deleteGadget(idGadget);
    }

    public Gadget getGadgetById(Integer id){
        return gadgetRepository.getGadgetById(id);
    }
}
