package fr.afpa.recette.web.rest;

import fr.afpa.recette.AfparecetteApp;
import fr.afpa.recette.domain.Reward;
import fr.afpa.recette.repository.RewardRepository;

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
 * Integration tests for the {@link RewardResource} REST controller.
 */
@SpringBootTest(classes = AfparecetteApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class RewardResourceIT {

    private static final String DEFAULT_REWARD = "AAAAAAAAAA";
    private static final String UPDATED_REWARD = "BBBBBBBBBB";

    @Autowired
    private RewardRepository rewardRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restRewardMockMvc;

    private Reward reward;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Reward createEntity(EntityManager em) {
        Reward reward = new Reward()
            .reward(DEFAULT_REWARD);
        return reward;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Reward createUpdatedEntity(EntityManager em) {
        Reward reward = new Reward()
            .reward(UPDATED_REWARD);
        return reward;
    }

    @BeforeEach
    public void initTest() {
        reward = createEntity(em);
    }

    @Test
    @Transactional
    public void createReward() throws Exception {
        int databaseSizeBeforeCreate = rewardRepository.findAll().size();
        // Create the Reward
        restRewardMockMvc.perform(post("/api/rewards")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(reward)))
            .andExpect(status().isCreated());

        // Validate the Reward in the database
        List<Reward> rewardList = rewardRepository.findAll();
        assertThat(rewardList).hasSize(databaseSizeBeforeCreate + 1);
        Reward testReward = rewardList.get(rewardList.size() - 1);
        assertThat(testReward.getReward()).isEqualTo(DEFAULT_REWARD);
    }

    @Test
    @Transactional
    public void createRewardWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = rewardRepository.findAll().size();

        // Create the Reward with an existing ID
        reward.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restRewardMockMvc.perform(post("/api/rewards")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(reward)))
            .andExpect(status().isBadRequest());

        // Validate the Reward in the database
        List<Reward> rewardList = rewardRepository.findAll();
        assertThat(rewardList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllRewards() throws Exception {
        // Initialize the database
        rewardRepository.saveAndFlush(reward);

        // Get all the rewardList
        restRewardMockMvc.perform(get("/api/rewards?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(reward.getId().intValue())))
            .andExpect(jsonPath("$.[*].reward").value(hasItem(DEFAULT_REWARD)));
    }
    
    @Test
    @Transactional
    public void getReward() throws Exception {
        // Initialize the database
        rewardRepository.saveAndFlush(reward);

        // Get the reward
        restRewardMockMvc.perform(get("/api/rewards/{id}", reward.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(reward.getId().intValue()))
            .andExpect(jsonPath("$.reward").value(DEFAULT_REWARD));
    }
    @Test
    @Transactional
    public void getNonExistingReward() throws Exception {
        // Get the reward
        restRewardMockMvc.perform(get("/api/rewards/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateReward() throws Exception {
        // Initialize the database
        rewardRepository.saveAndFlush(reward);

        int databaseSizeBeforeUpdate = rewardRepository.findAll().size();

        // Update the reward
        Reward updatedReward = rewardRepository.findById(reward.getId()).get();
        // Disconnect from session so that the updates on updatedReward are not directly saved in db
        em.detach(updatedReward);
        updatedReward
            .reward(UPDATED_REWARD);

        restRewardMockMvc.perform(put("/api/rewards")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedReward)))
            .andExpect(status().isOk());

        // Validate the Reward in the database
        List<Reward> rewardList = rewardRepository.findAll();
        assertThat(rewardList).hasSize(databaseSizeBeforeUpdate);
        Reward testReward = rewardList.get(rewardList.size() - 1);
        assertThat(testReward.getReward()).isEqualTo(UPDATED_REWARD);
    }

    @Test
    @Transactional
    public void updateNonExistingReward() throws Exception {
        int databaseSizeBeforeUpdate = rewardRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restRewardMockMvc.perform(put("/api/rewards")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(reward)))
            .andExpect(status().isBadRequest());

        // Validate the Reward in the database
        List<Reward> rewardList = rewardRepository.findAll();
        assertThat(rewardList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteReward() throws Exception {
        // Initialize the database
        rewardRepository.saveAndFlush(reward);

        int databaseSizeBeforeDelete = rewardRepository.findAll().size();

        // Delete the reward
        restRewardMockMvc.perform(delete("/api/rewards/{id}", reward.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Reward> rewardList = rewardRepository.findAll();
        assertThat(rewardList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
