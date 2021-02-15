package fr.afpa.recette.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Ustensil.
 */
@Entity
@Table(name = "ustensil")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Ustensil implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "ustensil")
    private String ustensil;

    @ManyToMany(mappedBy = "ustensils")
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

    public String getUstensil() {
        return ustensil;
    }

    public Ustensil ustensil(String ustensil) {
        this.ustensil = ustensil;
        return this;
    }

    public void setUstensil(String ustensil) {
        this.ustensil = ustensil;
    }

    public Set<Recipe> getRecipes() {
        return recipes;
    }

    public Ustensil recipes(Set<Recipe> recipes) {
        this.recipes = recipes;
        return this;
    }

    public Ustensil addRecipe(Recipe recipe) {
        this.recipes.add(recipe);
        recipe.getUstensils().add(this);
        return this;
    }

    public Ustensil removeRecipe(Recipe recipe) {
        this.recipes.remove(recipe);
        recipe.getUstensils().remove(this);
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
        if (!(o instanceof Ustensil)) {
            return false;
        }
        return id != null && id.equals(((Ustensil) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Ustensil{" +
            "id=" + getId() +
            ", ustensil='" + getUstensil() + "'" +
            "}";
    }
}
