package com.example.demo8.service;

import com.example.demo8.model.Favori;
import com.example.demo8.repository.FavoriRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class FavoriService {

    @Autowired
    private FavoriRepository favoriRepository;

    @Cacheable(value = "favoris", key = "#studentId")
    public List<Favori> getFavorisByStudent(String studentId) {
        return favoriRepository.findByStudentId(studentId);
    }

    @CacheEvict(value = "favoris", key = "#studentId")
    public Favori addFavori(String studentId, String courseId, String courseName) {
        Favori favori = new Favori(studentId, courseId, courseName, LocalDateTime.now());
        return favoriRepository.save(favori);
    }

    @CacheEvict(value = "favoris", key = "#studentId")
    public void removeFavori(String studentId, String courseId) {
        favoriRepository.deleteByStudentIdAndCourseId(studentId, courseId);
    }
}
