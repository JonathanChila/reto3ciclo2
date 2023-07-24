package com.g6ciclo2reto03.g6ciclo2reto03.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.g6ciclo2reto03.g6ciclo2reto03.Documents.Gadget;
import com.g6ciclo2reto03.g6ciclo2reto03.Services.GadgetService;


@RestController
@RequestMapping("/api/gadget")
public class GadgetController {
    @Autowired
    private GadgetService gadgetService;

    @GetMapping("/all")
    public List<Gadget> getAll(){
        return gadgetService.getAll();
    }

    @PostMapping("/new")
    @ResponseStatus(HttpStatus.CREATED)
    public Gadget newGadget(@RequestBody Gadget gadget) {
        return gadgetService.newGadget(gadget);
    }

    @PutMapping("/update")
    @ResponseStatus(HttpStatus.CREATED)
    public Gadget updateGadget(@RequestBody Gadget Gadget) {
        return gadgetService.updGadget(Gadget);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteGadget(@PathVariable Integer id) {
        gadgetService.deleteGadget(id);
    }

    @GetMapping("/{id}")
    public Gadget getGadgetById(@PathVariable Integer id) {
        return gadgetService.getGadgetById(id);
    }
}
