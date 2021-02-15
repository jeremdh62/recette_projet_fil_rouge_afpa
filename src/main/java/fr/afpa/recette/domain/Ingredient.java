package fr.afpa.recette.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Ingredient.
 */
@Entity
@Table(name = "ingredient")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Ingredient implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "ingredient")
    private String ingredient;

    @ManyToMany(mappedBy = "ingredients")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnore
    private Set<Recipe> recipes = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getIngredient() {
        return ingredient;
    }

    public Ingredient ingredient(String ingredient) {
        this.ingredient = ingredient;
        return this;
    }

    public void setIngredient(String ingredient) {
        this.ingredient = ingredient;
    }

    public Set<Recipe> getRecipes() {
        return recipes;
    }

    public Ingredient recipes(Set<Recipe> recipes) {
        this.recipes = recipes;
        return this;
    }

    public Ingredient addRecipe(Recipe recipe) {
        this.recipes.add(recipe);
        recipe.getIngredients().add(this);
        return this;
    }

    public Ingredient removeRecipe(Recipe recipe) {
        this.recipes.remove(recipe);
        recipe.getIngredients().remove(this);
        return this;
    }

    public void setRecipes(Set<Recipe> recipes) {
        this.recipes = recipes;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Ingredient)) {
            return false;
        }
        return id != null && id.equals(((Ingredient) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Ingredient{" +
            "id=" + getId() +
            ", ingredient='" + getIngredient() + "'" +
            "}";
    }
}
