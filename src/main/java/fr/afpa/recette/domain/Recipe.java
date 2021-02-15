package fr.afpa.recette.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.Type;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.Duration;
import java.util.HashSet;
import java.util.Set;

/**
 * A Recipe.
 */
@Entity
@Table(name = "recipe")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Recipe implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @Lob
    @Column(name = "picture")
    private byte[] picture;

    @Column(name = "picture_content_type")
    private String pictureContentType;

    @Column(name = "video")
    private String video;

    @Column(name = "difficulty")
    private Integer difficulty;

    @Column(name = "price")
    private Float price;

    @Lob
    @Type(type = "org.hibernate.type.TextType")
    @Column(name = "unroll_recipe")
    private String unrollRecipe;

    @Column(name = "nb_person")
    private Integer nbPerson;

    @Column(name = "time")
    private Duration time;

    @Column(name = "season")
    private String season;

    @Column(name = "origin")
    private String origin;

    @Column(name = "online")
    private Boolean online;

    @Column(name = "cooking")
    private String cooking;

    @Column(name = "favorite")
    private Boolean favorite;

    @Column(name = "created_at")
    private LocalDate createdAt;

    @Column(name = "updated_at")
    private LocalDate updatedAt;

    @OneToMany(mappedBy = "recipe")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Note> notes = new HashSet<>();

    @OneToMany(mappedBy = "recipe")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Comments> comments = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JoinTable(name = "recipe_ingredient",
               joinColumns = @JoinColumn(name = "recipe_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "ingredient_id", referencedColumnName = "id"))
    private Set<Ingredient> ingredients = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JoinTable(name = "recipe_ustensil",
               joinColumns = @JoinColumn(name = "recipe_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "ustensil_id", referencedColumnName = "id"))
    private Set<Ustensil> ustensils = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JoinTable(name = "recipe_category",
               joinColumns = @JoinColumn(name = "recipe_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "category_id", referencedColumnName = "id"))
    private Set<Category> categories = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JoinTable(name = "recipe_event",
               joinColumns = @JoinColumn(name = "recipe_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "event_id", referencedColumnName = "id"))
    private Set<Event> events = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = "recipes", allowSetters = true)
    private UserInfo userinfo;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Recipe name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public Recipe description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public byte[] getPicture() {
        return picture;
    }

    public Recipe picture(byte[] picture) {
        this.picture = picture;
        return this;
    }

    public void setPicture(byte[] picture) {
        this.picture = picture;
    }

    public String getPictureContentType() {
        return pictureContentType;
    }

    public Recipe pictureContentType(String pictureContentType) {
        this.pictureContentType = pictureContentType;
        return this;
    }

    public void setPictureContentType(String pictureContentType) {
        this.pictureContentType = pictureContentType;
    }

    public String getVideo() {
        return video;
    }

    public Recipe video(String video) {
        this.video = video;
        return this;
    }

    public void setVideo(String video) {
        this.video = video;
    }

    public Integer getDifficulty() {
        return difficulty;
    }

    public Recipe difficulty(Integer difficulty) {
        this.difficulty = difficulty;
        return this;
    }

    public void setDifficulty(Integer difficulty) {
        this.difficulty = difficulty;
    }

    public Float getPrice() {
        return price;
    }

    public Recipe price(Float price) {
        this.price = price;
        return this;
    }

    public void setPrice(Float price) {
        this.price = price;
    }

    public String getUnrollRecipe() {
        return unrollRecipe;
    }

    public Recipe unrollRecipe(String unrollRecipe) {
        this.unrollRecipe = unrollRecipe;
        return this;
    }

    public void setUnrollRecipe(String unrollRecipe) {
        this.unrollRecipe = unrollRecipe;
    }

    public Integer getNbPerson() {
        return nbPerson;
    }

    public Recipe nbPerson(Integer nbPerson) {
        this.nbPerson = nbPerson;
        return this;
    }

    public void setNbPerson(Integer nbPerson) {
        this.nbPerson = nbPerson;
    }

    public Duration getTime() {
        return time;
    }

    public Recipe time(Duration time) {
        this.time = time;
        return this;
    }

    public void setTime(Duration time) {
        this.time = time;
    }

    public String getSeason() {
        return season;
    }

    public Recipe season(String season) {
        this.season = season;
        return this;
    }

    public void setSeason(String season) {
        this.season = season;
    }

    public String getOrigin() {
        return origin;
    }

    public Recipe origin(String origin) {
        this.origin = origin;
        return this;
    }

    public void setOrigin(String origin) {
        this.origin = origin;
    }

    public Boolean isOnline() {
        return online;
    }

    public Recipe online(Boolean online) {
        this.online = online;
        return this;
    }

    public void setOnline(Boolean online) {
        this.online = online;
    }

    public String getCooking() {
        return cooking;
    }

    public Recipe cooking(String cooking) {
        this.cooking = cooking;
        return this;
    }

    public void setCooking(String cooking) {
        this.cooking = cooking;
    }

    public Boolean isFavorite() {
        return favorite;
    }

    public Recipe favorite(Boolean favorite) {
        this.favorite = favorite;
        return this;
    }

    public void setFavorite(Boolean favorite) {
        this.favorite = favorite;
    }

    public LocalDate getCreatedAt() {
        return createdAt;
    }

    public Recipe createdAt(LocalDate createdAt) {
        this.createdAt = createdAt;
        return this;
    }

    public void setCreatedAt(LocalDate createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDate getUpdatedAt() {
        return updatedAt;
    }

    public Recipe updatedAt(LocalDate updatedAt) {
        this.updatedAt = updatedAt;
        return this;
    }

    public void setUpdatedAt(LocalDate updatedAt) {
        this.updatedAt = updatedAt;
    }

    public Set<Note> getNotes() {
        return notes;
    }

    public Recipe notes(Set<Note> notes) {
        this.notes = notes;
        return this;
    }

    public Recipe addNote(Note note) {
        this.notes.add(note);
        note.setRecipe(this);
        return this;
    }

    public Recipe removeNote(Note note) {
        this.notes.remove(note);
        note.setRecipe(null);
        return this;
    }

    public void setNotes(Set<Note> notes) {
        this.notes = notes;
    }

    public Set<Comments> getComments() {
        return comments;
    }

    public Recipe comments(Set<Comments> comments) {
        this.comments = comments;
        return this;
    }

    public Recipe addComments(Comments comments) {
        this.comments.add(comments);
        comments.setRecipe(this);
        return this;
    }

    public Recipe removeComments(Comments comments) {
        this.comments.remove(comments);
        comments.setRecipe(null);
        return this;
    }

    public void setComments(Set<Comments> comments) {
        this.comments = comments;
    }

    public Set<Ingredient> getIngredients() {
        return ingredients;
    }

    public Recipe ingredients(Set<Ingredient> ingredients) {
        this.ingredients = ingredients;
        return this;
    }

    public Recipe addIngredient(Ingredient ingredient) {
        this.ingredients.add(ingredient);
        ingredient.getRecipes().add(this);
        return this;
    }

    public Recipe removeIngredient(Ingredient ingredient) {
        this.ingredients.remove(ingredient);
        ingredient.getRecipes().remove(this);
        return this;
    }

    public void setIngredients(Set<Ingredient> ingredients) {
        this.ingredients = ingredients;
    }

    public Set<Ustensil> getUstensils() {
        return ustensils;
    }

    public Recipe ustensils(Set<Ustensil> ustensils) {
        this.ustensils = ustensils;
        return this;
    }

    public Recipe addUstensil(Ustensil ustensil) {
        this.ustensils.add(ustensil);
        ustensil.getRecipes().add(this);
        return this;
    }

    public Recipe removeUstensil(Ustensil ustensil) {
        this.ustensils.remove(ustensil);
        ustensil.getRecipes().remove(this);
        return this;
    }

    public void setUstensils(Set<Ustensil> ustensils) {
        this.ustensils = ustensils;
    }

    public Set<Category> getCategories() {
        return categories;
    }

    public Recipe categories(Set<Category> categories) {
        this.categories = categories;
        return this;
    }

    public Recipe addCategory(Category category) {
        this.categories.add(category);
        category.getRecipes().add(this);
        return this;
    }

    public Recipe removeCategory(Category category) {
        this.categories.remove(category);
        category.getRecipes().remove(this);
        return this;
    }

    public void setCategories(Set<Category> categories) {
        this.categories = categories;
    }

    public Set<Event> getEvents() {
        return events;
    }

    public Recipe events(Set<Event> events) {
        this.events = events;
        return this;
    }

    public Recipe addEvent(Event event) {
        this.events.add(event);
        event.getRecipes().add(this);
        return this;
    }

    public Recipe removeEvent(Event event) {
        this.events.remove(event);
        event.getRecipes().remove(this);
        return this;
    }

    public void setEvents(Set<Event> events) {
        this.events = events;
    }

    public UserInfo getUserinfo() {
        return userinfo;
    }

    public Recipe userinfo(UserInfo userInfo) {
        this.userinfo = userInfo;
        return this;
    }

    public void setUserinfo(UserInfo userInfo) {
        this.userinfo = userInfo;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Recipe)) {
            return false;
        }
        return id != null && id.equals(((Recipe) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Recipe{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", description='" + getDescription() + "'" +
            ", picture='" + getPicture() + "'" +
            ", pictureContentType='" + getPictureContentType() + "'" +
            ", video='" + getVideo() + "'" +
            ", difficulty=" + getDifficulty() +
            ", price=" + getPrice() +
            ", unrollRecipe='" + getUnrollRecipe() + "'" +
            ", nbPerson=" + getNbPerson() +
            ", time='" + getTime() + "'" +
            ", season='" + getSeason() + "'" +
            ", origin='" + getOrigin() + "'" +
            ", online='" + isOnline() + "'" +
            ", cooking='" + getCooking() + "'" +
            ", favorite='" + isFavorite() + "'" +
            ", createdAt='" + getCreatedAt() + "'" +
            ", updatedAt='" + getUpdatedAt() + "'" +
            "}";
    }
}
