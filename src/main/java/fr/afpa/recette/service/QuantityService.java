package fr.afpa.recette.service;

import fr.afpa.recette.domain.Quantity;
import fr.afpa.recette.repository.QuantityRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link Quantity}.
 */
@Service
@Transactional
public class QuantityService {

    private final Logger log = LoggerFactory.getLogger(QuantityService.class);

    private final QuantityRepository quantityRepository;

    public QuantityService(QuantityRepository quantityRepository) {
        this.quantityRepository = quantityRepository;
    }

    /**
     * Save a quantity.
     *
     * @param quantity the entity to save.
     * @return the persisted entity.
     */
    public Quantity save(Quantity quantity) {
        log.debug("Request to save Quantity : {}", quantity);
        return quantityRepository.save(quantity);
    }

    /**
     * Get all the quantities.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<Quantity> findAll(Pageable pageable) {
        log.debug("Request to get all Quantities");
        return quantityRepository.findAll(pageable);
    }


    /**
     * Get one quantity by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<Quantity> findOne(Long id) {
        log.debug("Request to get Quantity : {}", id);
        return quantityRepository.findById(id);
    }

    /**
     * Delete the quantity by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Quantity : {}", id);
        quantityRepository.deleteById(id);
    }
}
