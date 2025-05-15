package com.example.demo8.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import com.example.demo8.model.Favori;
import com.example.demo8.service.FavoriService;
import org.springframework.web.bind.annotation.*;



@RestController
@RequestMapping("/api/favoris")
@CrossOrigin(origins = "*") // Pour autoriser les requêtes depuis le frontend Next.js
public class FavoriController {

    @Autowired
    private FavoriService favoriService;

    @GetMapping("/{studentId}")
    public List<Favori> getFavoris(@PathVariable String studentId) {
        return favoriService.getFavorisByStudent(studentId);
    }

    @PostMapping
    public Favori addFavori(@RequestBody Favori favori) {
        return favoriService.addFavori(favori.getStudentId(), favori.getCourseId(), favori.getCourseName());
    }

    @DeleteMapping
    public void removeFavori(@RequestParam String studentId, @RequestParam String courseId) {
        favoriService.removeFavori(studentId, courseId);
    }
}
