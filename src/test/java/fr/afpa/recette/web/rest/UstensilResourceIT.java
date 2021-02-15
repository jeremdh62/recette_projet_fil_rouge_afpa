package fr.afpa.recette.web.rest;

import fr.afpa.recette.AfparecetteApp;
import fr.afpa.recette.domain.Ustensil;
import fr.afpa.recette.repository.UstensilRepository;

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
 * Integration tests for the {@link UstensilResource} REST controller.
 */
@SpringBootTest(classes = AfparecetteApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class UstensilResourceIT {

    private static final String DEFAULT_USTENSIL = "AAAAAAAAAA";
    private static final String UPDATED_USTENSIL = "BBBBBBBBBB";

    @Autowired
    private UstensilRepository ustensilRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restUstensilMockMvc;

    private Ustensil ustensil;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Ustensil createEntity(EntityManager em) {
        Ustensil ustensil = new Ustensil()
            .ustensil(DEFAULT_USTENSIL);
        return ustensil;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Ustensil createUpdatedEntity(EntityManager em) {
        Ustensil ustensil = new Ustensil()
            .ustensil(UPDATED_USTENSIL);
        return ustensil;
    }

    @BeforeEach
    public void initTest() {
        ustensil = createEntity(em);
    }

    @Test
    @Transactional
    public void createUstensil() throws Exception {
        int databaseSizeBeforeCreate = ustensilRepository.findAll().size();
        // Create the Ustensil
        restUstensilMockMvc.perform(post("/api/ustensils")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(ustensil)))
            .andExpect(status().isCreated());

        // Validate the Ustensil in the database
        List<Ustensil> ustensilList = ustensilRepository.findAll();
        assertThat(ustensilList).hasSize(databaseSizeBeforeCreate + 1);
        Ustensil testUstensil = ustensilList.get(ustensilList.size() - 1);
        assertThat(testUstensil.getUstensil()).isEqualTo(DEFAULT_USTENSIL);
    }

    @Test
    @Transactional
    public void createUstensilWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = ustensilRepository.findAll().size();

        // Create the Ustensil with an existing ID
        ustensil.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restUstensilMockMvc.perform(post("/api/ustensils")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(ustensil)))
            .andExpect(status().isBadRequest());

        // Validate the Ustensil in the database
        List<Ustensil> ustensilList = ustensilRepository.findAll();
        assertThat(ustensilList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllUstensils() throws Exception {
        // Initialize the database
        ustensilRepository.saveAndFlush(ustensil);

        // Get all the ustensilList
        restUstensilMockMvc.perform(get("/api/ustensils?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(ustensil.getId().intValue())))
            .andExpect(jsonPath("$.[*].ustensil").value(hasItem(DEFAULT_USTENSIL)));
    }
    
    @Test
    @Transactional
    public void getUstensil() throws Exception {
        // Initialize the database
        ustensilRepository.saveAndFlush(ustensil);

        // Get the ustensil
        restUstensilMockMvc.perform(get("/api/ustensils/{id}", ustensil.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(ustensil.getId().intValue()))
            .andExpect(jsonPath("$.ustensil").value(DEFAULT_USTENSIL));
    }
    @Test
    @Transactional
    public void getNonExistingUstensil() throws Exception {
        // Get the ustensil
        restUstensilMockMvc.perform(get("/api/ustensils/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateUstensil() throws Exception {
        // Initialize the database
        ustensilRepository.saveAndFlush(ustensil);

        int databaseSizeBeforeUpdate = ustensilRepository.findAll().size();

        // Update the ustensil
        Ustensil updatedUstensil = ustensilRepository.findById(ustensil.getId()).get();
        // Disconnect from session so that the updates on updatedUstensil are not directly saved in db
        em.detach(updatedUstensil);
        updatedUstensil
            .ustensil(UPDATED_USTENSIL);

        restUstensilMockMvc.perform(put("/api/ustensils")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedUstensil)))
            .andExpect(status().isOk());

        // Validate the Ustensil in the database
        List<Ustensil> ustensilList = ustensilRepository.findAll();
        assertThat(ustensilList).hasSize(databaseSizeBeforeUpdate);
        Ustensil testUstensil = ustensilList.get(ustensilList.size() - 1);
        assertThat(testUstensil.getUstensil()).isEqualTo(UPDATED_USTENSIL);
    }

    @Test
    @Transactional
    public void updateNonExistingUstensil() throws Exception {
        int databaseSizeBeforeUpdate = ustensilRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restUstensilMockMvc.perform(put("/api/ustensils")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(ustensil)))
            .andExpect(status().isBadRequest());

        // Validate the Ustensil in the database
        List<Ustensil> ustensilList = ustensilRepository.findAll();
        assertThat(ustensilList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteUstensil() throws Exception {
        // Initialize the database
        ustensilRepository.saveAndFlush(ustensil);

        int databaseSizeBeforeDelete = ustensilRepository.findAll().size();

        // Delete the ustensil
        restUstensilMockMvc.perform(delete("/api/ustensils/{id}", ustensil.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Ustensil> ustensilList = ustensilRepository.findAll();
        assertThat(ustensilList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
