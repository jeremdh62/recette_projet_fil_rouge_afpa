package fr.afpa.recette.web.rest;

import fr.afpa.recette.AfparecetteApp;
import fr.afpa.recette.domain.Recipe;
import fr.afpa.recette.repository.RecipeRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Base64Utils;
import javax.persistence.EntityManager;
import java.time.Duration;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link RecipeResource} REST controller.
 */
@SpringBootTest(classes = AfparecetteApp.class)
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
public class RecipeResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final byte[] DEFAULT_PICTURE = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_PICTURE = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_PICTURE_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_PICTURE_CONTENT_TYPE = "image/png";

    private static final String DEFAULT_VIDEO = "AAAAAAAAAA";
    private static final String UPDATED_VIDEO = "BBBBBBBBBB";

    private static final Integer DEFAULT_DIFFICULTY = 1;
    private static final Integer UPDATED_DIFFICULTY = 2;

    private static final Float DEFAULT_PRICE = 1F;
    private static final Float UPDATED_PRICE = 2F;

    private static final String DEFAULT_UNROLL_RECIPE = "AAAAAAAAAA";
    private static final String UPDATED_UNROLL_RECIPE = "BBBBBBBBBB";

    private static final Integer DEFAULT_NB_PERSON = 1;
    private static final Integer UPDATED_NB_PERSON = 2;

    private static final Duration DEFAULT_TIME = Duration.ofHours(6);
    private static final Duration UPDATED_TIME = Duration.ofHours(12);

    private static final String DEFAULT_SEASON = "AAAAAAAAAA";
    private static final String UPDATED_SEASON = "BBBBBBBBBB";

    private static final String DEFAULT_ORIGIN = "AAAAAAAAAA";
    private static final String UPDATED_ORIGIN = "BBBBBBBBBB";

    private static final Boolean DEFAULT_ONLINE = false;
    private static final Boolean UPDATED_ONLINE = true;

    private static final String DEFAULT_COOKING = "AAAAAAAAAA";
    private static final String UPDATED_COOKING = "BBBBBBBBBB";

    private static final Boolean DEFAULT_FAVORITE = false;
    private static final Boolean UPDATED_FAVORITE = true;

    private static final LocalDate DEFAULT_CREATED_AT = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_CREATED_AT = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_UPDATED_AT = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_UPDATED_AT = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private RecipeRepository recipeRepository;

    @Mock
    private RecipeRepository recipeRepositoryMock;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restRecipeMockMvc;

    private Recipe recipe;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Recipe createEntity(EntityManager em) {
        Recipe recipe = new Recipe()
            .name(DEFAULT_NAME)
            .description(DEFAULT_DESCRIPTION)
            .picture(DEFAULT_PICTURE)
            .pictureContentType(DEFAULT_PICTURE_CONTENT_TYPE)
            .video(DEFAULT_VIDEO)
            .difficulty(DEFAULT_DIFFICULTY)
            .price(DEFAULT_PRICE)
            .unrollRecipe(DEFAULT_UNROLL_RECIPE)
            .nbPerson(DEFAULT_NB_PERSON)
            .time(DEFAULT_TIME)
            .season(DEFAULT_SEASON)
            .origin(DEFAULT_ORIGIN)
            .online(DEFAULT_ONLINE)
            .cooking(DEFAULT_COOKING)
            .favorite(DEFAULT_FAVORITE)
            .createdAt(DEFAULT_CREATED_AT)
            .updatedAt(DEFAULT_UPDATED_AT);
        return recipe;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Recipe createUpdatedEntity(EntityManager em) {
        Recipe recipe = new Recipe()
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION)
            .picture(UPDATED_PICTURE)
            .pictureContentType(UPDATED_PICTURE_CONTENT_TYPE)
            .video(UPDATED_VIDEO)
            .difficulty(UPDATED_DIFFICULTY)
            .price(UPDATED_PRICE)
            .unrollRecipe(UPDATED_UNROLL_RECIPE)
            .nbPerson(UPDATED_NB_PERSON)
            .time(UPDATED_TIME)
            .season(UPDATED_SEASON)
            .origin(UPDATED_ORIGIN)
            .online(UPDATED_ONLINE)
            .cooking(UPDATED_COOKING)
            .favorite(UPDATED_FAVORITE)
            .createdAt(UPDATED_CREATED_AT)
            .updatedAt(UPDATED_UPDATED_AT);
        return recipe;
    }

    @BeforeEach
    public void initTest() {
        recipe = createEntity(em);
    }

    @Test
    @Transactional
    public void createRecipe() throws Exception {
        int databaseSizeBeforeCreate = recipeRepository.findAll().size();
        // Create the Recipe
        restRecipeMockMvc.perform(post("/api/recipes")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(recipe)))
            .andExpect(status().isCreated());

        // Validate the Recipe in the database
        List<Recipe> recipeList = recipeRepository.findAll();
        assertThat(recipeList).hasSize(databaseSizeBeforeCreate + 1);
        Recipe testRecipe = recipeList.get(recipeList.size() - 1);
        assertThat(testRecipe.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testRecipe.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testRecipe.getPicture()).isEqualTo(DEFAULT_PICTURE);
        assertThat(testRecipe.getPictureContentType()).isEqualTo(DEFAULT_PICTURE_CONTENT_TYPE);
        assertThat(testRecipe.getVideo()).isEqualTo(DEFAULT_VIDEO);
        assertThat(testRecipe.getDifficulty()).isEqualTo(DEFAULT_DIFFICULTY);
        assertThat(testRecipe.getPrice()).isEqualTo(DEFAULT_PRICE);
        assertThat(testRecipe.getUnrollRecipe()).isEqualTo(DEFAULT_UNROLL_RECIPE);
        assertThat(testRecipe.getNbPerson()).isEqualTo(DEFAULT_NB_PERSON);
        assertThat(testRecipe.getTime()).isEqualTo(DEFAULT_TIME);
        assertThat(testRecipe.getSeason()).isEqualTo(DEFAULT_SEASON);
        assertThat(testRecipe.getOrigin()).isEqualTo(DEFAULT_ORIGIN);
        assertThat(testRecipe.isOnline()).isEqualTo(DEFAULT_ONLINE);
        assertThat(testRecipe.getCooking()).isEqualTo(DEFAULT_COOKING);
        assertThat(testRecipe.isFavorite()).isEqualTo(DEFAULT_FAVORITE);
        assertThat(testRecipe.getCreatedAt()).isEqualTo(DEFAULT_CREATED_AT);
        assertThat(testRecipe.getUpdatedAt()).isEqualTo(DEFAULT_UPDATED_AT);
    }

    @Test
    @Transactional
    public void createRecipeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = recipeRepository.findAll().size();

        // Create the Recipe with an existing ID
        recipe.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restRecipeMockMvc.perform(post("/api/recipes")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(recipe)))
            .andExpect(status().isBadRequest());

        // Validate the Recipe in the database
        List<Recipe> recipeList = recipeRepository.findAll();
        assertThat(recipeList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllRecipes() throws Exception {
        // Initialize the database
        recipeRepository.saveAndFlush(recipe);

        // Get all the recipeList
        restRecipeMockMvc.perform(get("/api/recipes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(recipe.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)))
            .andExpect(jsonPath("$.[*].pictureContentType").value(hasItem(DEFAULT_PICTURE_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].picture").value(hasItem(Base64Utils.encodeToString(DEFAULT_PICTURE))))
            .andExpect(jsonPath("$.[*].video").value(hasItem(DEFAULT_VIDEO)))
            .andExpect(jsonPath("$.[*].difficulty").value(hasItem(DEFAULT_DIFFICULTY)))
            .andExpect(jsonPath("$.[*].price").value(hasItem(DEFAULT_PRICE.doubleValue())))
            .andExpect(jsonPath("$.[*].unrollRecipe").value(hasItem(DEFAULT_UNROLL_RECIPE.toString())))
            .andExpect(jsonPath("$.[*].nbPerson").value(hasItem(DEFAULT_NB_PERSON)))
            .andExpect(jsonPath("$.[*].time").value(hasItem(DEFAULT_TIME.toString())))
            .andExpect(jsonPath("$.[*].season").value(hasItem(DEFAULT_SEASON)))
            .andExpect(jsonPath("$.[*].origin").value(hasItem(DEFAULT_ORIGIN)))
            .andExpect(jsonPath("$.[*].online").value(hasItem(DEFAULT_ONLINE.booleanValue())))
            .andExpect(jsonPath("$.[*].cooking").value(hasItem(DEFAULT_COOKING)))
            .andExpect(jsonPath("$.[*].favorite").value(hasItem(DEFAULT_FAVORITE.booleanValue())))
            .andExpect(jsonPath("$.[*].createdAt").value(hasItem(DEFAULT_CREATED_AT.toString())))
            .andExpect(jsonPath("$.[*].updatedAt").value(hasItem(DEFAULT_UPDATED_AT.toString())));
    }
    
    @SuppressWarnings({"unchecked"})
    public void getAllRecipesWithEagerRelationshipsIsEnabled() throws Exception {
        when(recipeRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restRecipeMockMvc.perform(get("/api/recipes?eagerload=true"))
            .andExpect(status().isOk());

        verify(recipeRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({"unchecked"})
    public void getAllRecipesWithEagerRelationshipsIsNotEnabled() throws Exception {
        when(recipeRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restRecipeMockMvc.perform(get("/api/recipes?eagerload=true"))
            .andExpect(status().isOk());

        verify(recipeRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getRecipe() throws Exception {
        // Initialize the database
        recipeRepository.saveAndFlush(recipe);

        // Get the recipe
        restRecipeMockMvc.perform(get("/api/recipes/{id}", recipe.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(recipe.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION))
            .andExpect(jsonPath("$.pictureContentType").value(DEFAULT_PICTURE_CONTENT_TYPE))
            .andExpect(jsonPath("$.picture").value(Base64Utils.encodeToString(DEFAULT_PICTURE)))
            .andExpect(jsonPath("$.video").value(DEFAULT_VIDEO))
            .andExpect(jsonPath("$.difficulty").value(DEFAULT_DIFFICULTY))
            .andExpect(jsonPath("$.price").value(DEFAULT_PRICE.doubleValue()))
            .andExpect(jsonPath("$.unrollRecipe").value(DEFAULT_UNROLL_RECIPE.toString()))
            .andExpect(jsonPath("$.nbPerson").value(DEFAULT_NB_PERSON))
            .andExpect(jsonPath("$.time").value(DEFAULT_TIME.toString()))
            .andExpect(jsonPath("$.season").value(DEFAULT_SEASON))
            .andExpect(jsonPath("$.origin").value(DEFAULT_ORIGIN))
            .andExpect(jsonPath("$.online").value(DEFAULT_ONLINE.booleanValue()))
            .andExpect(jsonPath("$.cooking").value(DEFAULT_COOKING))
            .andExpect(jsonPath("$.favorite").value(DEFAULT_FAVORITE.booleanValue()))
            .andExpect(jsonPath("$.createdAt").value(DEFAULT_CREATED_AT.toString()))
            .andExpect(jsonPath("$.updatedAt").value(DEFAULT_UPDATED_AT.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingRecipe() throws Exception {
        // Get the recipe
        restRecipeMockMvc.perform(get("/api/recipes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateRecipe() throws Exception {
        // Initialize the database
        recipeRepository.saveAndFlush(recipe);

        int databaseSizeBeforeUpdate = recipeRepository.findAll().size();

        // Update the recipe
        Recipe updatedRecipe = recipeRepository.findById(recipe.getId()).get();
        // Disconnect from session so that the updates on updatedRecipe are not directly saved in db
        em.detach(updatedRecipe);
        updatedRecipe
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION)
            .picture(UPDATED_PICTURE)
            .pictureContentType(UPDATED_PICTURE_CONTENT_TYPE)
            .video(UPDATED_VIDEO)
            .difficulty(UPDATED_DIFFICULTY)
            .price(UPDATED_PRICE)
            .unrollRecipe(UPDATED_UNROLL_RECIPE)
            .nbPerson(UPDATED_NB_PERSON)
            .time(UPDATED_TIME)
            .season(UPDATED_SEASON)
            .origin(UPDATED_ORIGIN)
            .online(UPDATED_ONLINE)
            .cooking(UPDATED_COOKING)
            .favorite(UPDATED_FAVORITE)
            .createdAt(UPDATED_CREATED_AT)
            .updatedAt(UPDATED_UPDATED_AT);

        restRecipeMockMvc.perform(put("/api/recipes")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedRecipe)))
            .andExpect(status().isOk());

        // Validate the Recipe in the database
        List<Recipe> recipeList = recipeRepository.findAll();
        assertThat(recipeList).hasSize(databaseSizeBeforeUpdate);
        Recipe testRecipe = recipeList.get(recipeList.size() - 1);
        assertThat(testRecipe.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testRecipe.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testRecipe.getPicture()).isEqualTo(UPDATED_PICTURE);
        assertThat(testRecipe.getPictureContentType()).isEqualTo(UPDATED_PICTURE_CONTENT_TYPE);
        assertThat(testRecipe.getVideo()).isEqualTo(UPDATED_VIDEO);
        assertThat(testRecipe.getDifficulty()).isEqualTo(UPDATED_DIFFICULTY);
        assertThat(testRecipe.getPrice()).isEqualTo(UPDATED_PRICE);
        assertThat(testRecipe.getUnrollRecipe()).isEqualTo(UPDATED_UNROLL_RECIPE);
        assertThat(testRecipe.getNbPerson()).isEqualTo(UPDATED_NB_PERSON);
        assertThat(testRecipe.getTime()).isEqualTo(UPDATED_TIME);
        assertThat(testRecipe.getSeason()).isEqualTo(UPDATED_SEASON);
        assertThat(testRecipe.getOrigin()).isEqualTo(UPDATED_ORIGIN);
        assertThat(testRecipe.isOnline()).isEqualTo(UPDATED_ONLINE);
        assertThat(testRecipe.getCooking()).isEqualTo(UPDATED_COOKING);
        assertThat(testRecipe.isFavorite()).isEqualTo(UPDATED_FAVORITE);
        assertThat(testRecipe.getCreatedAt()).isEqualTo(UPDATED_CREATED_AT);
        assertThat(testRecipe.getUpdatedAt()).isEqualTo(UPDATED_UPDATED_AT);
    }

    @Test
    @Transactional
    public void updateNonExistingRecipe() throws Exception {
        int databaseSizeBeforeUpdate = recipeRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restRecipeMockMvc.perform(put("/api/recipes")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(recipe)))
            .andExpect(status().isBadRequest());

        // Validate the Recipe in the database
        List<Recipe> recipeList = recipeRepository.findAll();
        assertThat(recipeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteRecipe() throws Exception {
        // Initialize the database
        recipeRepository.saveAndFlush(recipe);

        int databaseSizeBeforeDelete = recipeRepository.findAll().size();

        // Delete the recipe
        restRecipeMockMvc.perform(delete("/api/recipes/{id}", recipe.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Recipe> recipeList = recipeRepository.findAll();
        assertThat(recipeList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
