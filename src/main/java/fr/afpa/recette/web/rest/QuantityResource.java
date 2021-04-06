package fr.afpa.recette.web.rest;

import fr.afpa.recette.domain.Quantity;
import fr.afpa.recette.service.QuantityService;
import fr.afpa.recette.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link fr.afpa.recette.domain.Quantity}.
 */
@RestController
@RequestMapping("/api")
public class QuantityResource {

    private final Logger log = LoggerFactory.getLogger(QuantityResource.class);

    private static final String ENTITY_NAME = "quantity";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final QuantityService quantityService;

    public QuantityResource(QuantityService quantityService) {
        this.quantityService = quantityService;
    }

    /**
     * {@code POST  /quantities} : Create a new quantity.
     *
     * @param quantity the quantity to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new quantity, or with status {@code 400 (Bad Request)} if the quantity has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/quantities")
    public ResponseEntity<Quantity> createQuantity(@Valid @RequestBody Quantity quantity) throws URISyntaxException {
        log.debug("REST request to save Quantity : {}", quantity);
        if (quantity.getId() != null) {
            throw new BadRequestAlertException("A new quantity cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Quantity result = quantityService.save(quantity);
        return ResponseEntity.created(new URI("/api/quantities/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /quantities} : Updates an existing quantity.
     *
     * @param quantity the quantity to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated quantity,
     * or with status {@code 400 (Bad Request)} if the quantity is not valid,
     * or with status {@code 500 (Internal Server Error)} if the quantity couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/quantities")
    public ResponseEntity<Quantity> updateQuantity(@Valid @RequestBody Quantity quantity) throws URISyntaxException {
        log.debug("REST request to update Quantity : {}", quantity);
        if (quantity.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Quantity result = quantityService.save(quantity);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, quantity.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /quantities} : get all the quantities.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of quantities in body.
     */
    @GetMapping("/quantities")
    public ResponseEntity<List<Quantity>> getAllQuantities(Pageable pageable) {
        log.debug("REST request to get a page of Quantities");
        Page<Quantity> page = quantityService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /quantities/:id} : get the "id" quantity.
     *
     * @param id the id of the quantity to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the quantity, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/quantities/{id}")
    public ResponseEntity<Quantity> getQuantity(@PathVariable Long id) {
        log.debug("REST request to get Quantity : {}", id);
        Optional<Quantity> quantity = quantityService.findOne(id);
        return ResponseUtil.wrapOrNotFound(quantity);
    }

    /**
     * {@code DELETE  /quantities/:id} : delete the "id" quantity.
     *
     * @param id the id of the quantity to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/quantities/{id}")
    public ResponseEntity<Void> deleteQuantity(@PathVariable Long id) {
        log.debug("REST request to delete Quantity : {}", id);
        quantityService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
