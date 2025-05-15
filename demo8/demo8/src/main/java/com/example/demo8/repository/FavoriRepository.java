package com.example.demo8.repository;

import com.example.demo8.model.Favori;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.util.List;

@Repository
public class FavoriRepository {

    private final JdbcTemplate jdbcTemplate;

    public FavoriRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private final RowMapper<Favori> favoriMapper = (rs, rowNum) -> {
        Favori favori = new Favori();
        favori.setStudentId(rs.getString("student_id"));
        favori.setCourseId(rs.getString("course_id"));
        favori.setCourseName(rs.getString("course_name"));
        Timestamp ts = rs.getTimestamp("added_at");
        if (ts != null) {
            favori.setAddedAt(ts.toLocalDateTime());
        }
        return favori;
    };

    public List<Favori> findByStudentId(String studentId) {
        String sql = "SELECT * FROM favoris WHERE student_id = ?";
        return jdbcTemplate.query(sql, favoriMapper, studentId);
    }

    public void deleteByStudentIdAndCourseId(String studentId, String courseId) {
        String sql = "DELETE FROM favoris WHERE student_id = ? AND course_id = ?";
        jdbcTemplate.update(sql, studentId, courseId);
    }

    public Favori save(Favori favori) {
        // Insérer un enregistrement dans la base de données
        String sql = "INSERT INTO favoris (student_id, course_id, course_name, added_at) VALUES (?, ?, ?, ?)";
        jdbcTemplate.update(sql,
                favori.getStudentId(),
                favori.getCourseId(),
                favori.getCourseName(),
                Timestamp.valueOf(favori.getAddedAt()));

        // Récupérer l'ID auto-incrémenté
        String getIdSql = "SELECT last_insert_rowid()";  // SQLite retourne l'ID du dernier enregistrement
        Long id = jdbcTemplate.queryForObject(getIdSql, Long.class);  // Exécuter la requête et récupérer l'ID

        // Affecter l'ID au favori et le retourner
        favori.setId(id);
        return favori;
    }

}
