package fr.afpa.recette.web.rest;

import fr.afpa.recette.domain.Ustensil;
import fr.afpa.recette.repository.UstensilRepository;
import fr.afpa.recette.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link fr.afpa.recette.domain.Ustensil}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class UstensilResource {

    private final Logger log = LoggerFactory.getLogger(UstensilResource.class);

    private static final String ENTITY_NAME = "ustensil";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final UstensilRepository ustensilRepository;

    public UstensilResource(UstensilRepository ustensilRepository) {
        this.ustensilRepository = ustensilRepository;
    }

    /**
     * {@code POST  /ustensils} : Create a new ustensil.
     *
     * @param ustensil the ustensil to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new ustensil, or with status {@code 400 (Bad Request)} if the ustensil has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/ustensils")
    public ResponseEntity<Ustensil> createUstensil(@RequestBody Ustensil ustensil) throws URISyntaxException {
        log.debug("REST request to save Ustensil : {}", ustensil);
        if (ustensil.getId() != null) {
            throw new BadRequestAlertException("A new ustensil cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Ustensil result = ustensilRepository.save(ustensil);
        return ResponseEntity.created(new URI("/api/ustensils/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /ustensils} : Updates an existing ustensil.
     *
     * @param ustensil the ustensil to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated ustensil,
     * or with status {@code 400 (Bad Request)} if the ustensil is not valid,
     * or with status {@code 500 (Internal Server Error)} if the ustensil couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/ustensils")
    public ResponseEntity<Ustensil> updateUstensil(@RequestBody Ustensil ustensil) throws URISyntaxException {
        log.debug("REST request to update Ustensil : {}", ustensil);
        if (ustensil.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Ustensil result = ustensilRepository.save(ustensil);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, ustensil.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /ustensils} : get all the ustensils.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of ustensils in body.
     */
    @GetMapping("/ustensils")
    public List<Ustensil> getAllUstensils() {
        log.debug("REST request to get all Ustensils");
        return ustensilRepository.findAll();
    }

    /**
     * {@code GET  /ustensils/:id} : get the "id" ustensil.
     *
     * @param id the id of the ustensil to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the ustensil, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/ustensils/{id}")
    public ResponseEntity<Ustensil> getUstensil(@PathVariable Long id) {
        log.debug("REST request to get Ustensil : {}", id);
        Optional<Ustensil> ustensil = ustensilRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(ustensil);
    }

    /**
     * {@code DELETE  /ustensils/:id} : delete the "id" ustensil.
     *
     * @param id the id of the ustensil to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/ustensils/{id}")
    public ResponseEntity<Void> deleteUstensil(@PathVariable Long id) {
        log.debug("REST request to delete Ustensil : {}", id);
        ustensilRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
