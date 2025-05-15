package com.example.demo8.model;

import java.time.LocalDateTime;

public class Favori {

    private Long id;
    private String studentId;
    private String courseId;
    private String courseName;
    private LocalDateTime addedAt;

    public Favori() {}

    public Favori(String studentId, String courseId, String courseName, LocalDateTime addedAt) {
        this.studentId = studentId;
        this.courseId = courseId;
        this.courseName = courseName;
        this.addedAt = addedAt;
    }

    // Getters et Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getStudentId() {
        return studentId;
    }

    public void setStudentId(String studentId) {
        this.studentId = studentId;
    }

    public String getCourseId() {
        return courseId;
    }

    public void setCourseId(String courseId) {
        this.courseId = courseId;
    }

    public String getCourseName() {
        return courseName;
    }

    public void setCourseName(String courseName) {
        this.courseName = courseName;
    }

    public LocalDateTime getAddedAt() {
        return addedAt;
    }

    public void setAddedAt(LocalDateTime addedAt) {
        this.addedAt = addedAt;
    }
}
