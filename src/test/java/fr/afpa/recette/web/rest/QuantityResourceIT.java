package fr.afpa.recette.web.rest;

import fr.afpa.recette.AfparecetteApp;
import fr.afpa.recette.domain.Quantity;
import fr.afpa.recette.repository.QuantityRepository;
import fr.afpa.recette.service.QuantityService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link QuantityResource} REST controller.
 */
@SpringBootTest(classes = AfparecetteApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class QuantityResourceIT {

    private static final Float DEFAULT_QTY = 1F;
    private static final Float UPDATED_QTY = 2F;

    private static final String DEFAULT_UNIT = "AAAAAAAAAA";
    private static final String UPDATED_UNIT = "BBBBBBBBBB";

    @Autowired
    private QuantityRepository quantityRepository;

    @Autowired
    private QuantityService quantityService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restQuantityMockMvc;

    private Quantity quantity;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Quantity createEntity(EntityManager em) {
        Quantity quantity = new Quantity()
            .qty(DEFAULT_QTY)
            .unit(DEFAULT_UNIT);
        return quantity;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Quantity createUpdatedEntity(EntityManager em) {
        Quantity quantity = new Quantity()
            .qty(UPDATED_QTY)
            .unit(UPDATED_UNIT);
        return quantity;
    }

    @BeforeEach
    public void initTest() {
        quantity = createEntity(em);
    }

    @Test
    @Transactional
    public void createQuantity() throws Exception {
        int databaseSizeBeforeCreate = quantityRepository.findAll().size();
        // Create the Quantity
        restQuantityMockMvc.perform(post("/api/quantities")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(quantity)))
            .andExpect(status().isCreated());

        // Validate the Quantity in the database
        List<Quantity> quantityList = quantityRepository.findAll();
        assertThat(quantityList).hasSize(databaseSizeBeforeCreate + 1);
        Quantity testQuantity = quantityList.get(quantityList.size() - 1);
        assertThat(testQuantity.getQty()).isEqualTo(DEFAULT_QTY);
        assertThat(testQuantity.getUnit()).isEqualTo(DEFAULT_UNIT);
    }

    @Test
    @Transactional
    public void createQuantityWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = quantityRepository.findAll().size();

        // Create the Quantity with an existing ID
        quantity.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restQuantityMockMvc.perform(post("/api/quantities")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(quantity)))
            .andExpect(status().isBadRequest());

        // Validate the Quantity in the database
        List<Quantity> quantityList = quantityRepository.findAll();
        assertThat(quantityList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkQtyIsRequired() throws Exception {
        int databaseSizeBeforeTest = quantityRepository.findAll().size();
        // set the field null
        quantity.setQty(null);

        // Create the Quantity, which fails.


        restQuantityMockMvc.perform(post("/api/quantities")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(quantity)))
            .andExpect(status().isBadRequest());

        List<Quantity> quantityList = quantityRepository.findAll();
        assertThat(quantityList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkUnitIsRequired() throws Exception {
        int databaseSizeBeforeTest = quantityRepository.findAll().size();
        // set the field null
        quantity.setUnit(null);

        // Create the Quantity, which fails.


        restQuantityMockMvc.perform(post("/api/quantities")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(quantity)))
            .andExpect(status().isBadRequest());

        List<Quantity> quantityList = quantityRepository.findAll();
        assertThat(quantityList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllQuantities() throws Exception {
        // Initialize the database
        quantityRepository.saveAndFlush(quantity);

        // Get all the quantityList
        restQuantityMockMvc.perform(get("/api/quantities?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(quantity.getId().intValue())))
            .andExpect(jsonPath("$.[*].qty").value(hasItem(DEFAULT_QTY.doubleValue())))
            .andExpect(jsonPath("$.[*].unit").value(hasItem(DEFAULT_UNIT)));
    }
    
    @Test
    @Transactional
    public void getQuantity() throws Exception {
        // Initialize the database
        quantityRepository.saveAndFlush(quantity);

        // Get the quantity
        restQuantityMockMvc.perform(get("/api/quantities/{id}", quantity.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(quantity.getId().intValue()))
            .andExpect(jsonPath("$.qty").value(DEFAULT_QTY.doubleValue()))
            .andExpect(jsonPath("$.unit").value(DEFAULT_UNIT));
    }
    @Test
    @Transactional
    public void getNonExistingQuantity() throws Exception {
        // Get the quantity
        restQuantityMockMvc.perform(get("/api/quantities/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateQuantity() throws Exception {
        // Initialize the database
        quantityService.save(quantity);

        int databaseSizeBeforeUpdate = quantityRepository.findAll().size();

        // Update the quantity
        Quantity updatedQuantity = quantityRepository.findById(quantity.getId()).get();
        // Disconnect from session so that the updates on updatedQuantity are not directly saved in db
        em.detach(updatedQuantity);
        updatedQuantity
            .qty(UPDATED_QTY)
            .unit(UPDATED_UNIT);

        restQuantityMockMvc.perform(put("/api/quantities")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedQuantity)))
            .andExpect(status().isOk());

        // Validate the Quantity in the database
        List<Quantity> quantityList = quantityRepository.findAll();
        assertThat(quantityList).hasSize(databaseSizeBeforeUpdate);
        Quantity testQuantity = quantityList.get(quantityList.size() - 1);
        assertThat(testQuantity.getQty()).isEqualTo(UPDATED_QTY);
        assertThat(testQuantity.getUnit()).isEqualTo(UPDATED_UNIT);
    }

    @Test
    @Transactional
    public void updateNonExistingQuantity() throws Exception {
        int databaseSizeBeforeUpdate = quantityRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restQuantityMockMvc.perform(put("/api/quantities")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(quantity)))
            .andExpect(status().isBadRequest());

        // Validate the Quantity in the database
        List<Quantity> quantityList = quantityRepository.findAll();
        assertThat(quantityList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteQuantity() throws Exception {
        // Initialize the database
        quantityService.save(quantity);

        int databaseSizeBeforeDelete = quantityRepository.findAll().size();

        // Delete the quantity
        restQuantityMockMvc.perform(delete("/api/quantities/{id}", quantity.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Quantity> quantityList = quantityRepository.findAll();
        assertThat(quantityList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
