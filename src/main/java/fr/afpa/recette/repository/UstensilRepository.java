package fr.afpa.recette.repository;

import fr.afpa.recette.domain.Ustensil;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Ustensil entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UstensilRepository extends JpaRepository<Ustensil, Long> {
}
