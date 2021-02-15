package fr.afpa.recette.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

/**
 * A UserInfo.
 */
@Entity
@Table(name = "user_info")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class UserInfo implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "newsletter")
    private Boolean newsletter;

    @Column(name = "created_at")
    private LocalDate createdAt;

    @Column(name = "updated_at")
    private LocalDate updatedAt;

    @Column(name = "user_name")
    private String userName;

    @OneToOne
    @JoinColumn(unique = true)
    private User user;

    @OneToMany(mappedBy = "userinfo")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Note> notes = new HashSet<>();

    @OneToMany(mappedBy = "userinfo")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Recipe> recipes = new HashSet<>();

    @OneToMany(mappedBy = "userinfo")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Comments> comments = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = "userInfos", allowSetters = true)
    private Role role;

    @ManyToOne
    @JsonIgnoreProperties(value = "userInfos", allowSetters = true)
    private Reward reward;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Boolean isNewsletter() {
        return newsletter;
    }

    public UserInfo newsletter(Boolean newsletter) {
        this.newsletter = newsletter;
        return this;
    }

    public void setNewsletter(Boolean newsletter) {
        this.newsletter = newsletter;
    }

    public LocalDate getCreatedAt() {
        return createdAt;
    }

    public UserInfo createdAt(LocalDate createdAt) {
        this.createdAt = createdAt;
        return this;
    }

    public void setCreatedAt(LocalDate createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDate getUpdatedAt() {
        return updatedAt;
    }

    public UserInfo updatedAt(LocalDate updatedAt) {
        this.updatedAt = updatedAt;
        return this;
    }

    public void setUpdatedAt(LocalDate updatedAt) {
        this.updatedAt = updatedAt;
    }

    public String getUserName() {
        return userName;
    }

    public UserInfo userName(String userName) {
        this.userName = userName;
        return this;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public User getUser() {
        return user;
    }

    public UserInfo user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Set<Note> getNotes() {
        return notes;
    }

    public UserInfo notes(Set<Note> notes) {
        this.notes = notes;
        return this;
    }

    public UserInfo addNote(Note note) {
        this.notes.add(note);
        note.setUserinfo(this);
        return this;
    }

    public UserInfo removeNote(Note note) {
        this.notes.remove(note);
        note.setUserinfo(null);
        return this;
    }

    public void setNotes(Set<Note> notes) {
        this.notes = notes;
    }

    public Set<Recipe> getRecipes() {
        return recipes;
    }

    public UserInfo recipes(Set<Recipe> recipes) {
        this.recipes = recipes;
        return this;
    }

    public UserInfo addRecipe(Recipe recipe) {
        this.recipes.add(recipe);
        recipe.setUserinfo(this);
        return this;
    }

    public UserInfo removeRecipe(Recipe recipe) {
        this.recipes.remove(recipe);
        recipe.setUserinfo(null);
        return this;
    }

    public void setRecipes(Set<Recipe> recipes) {
        this.recipes = recipes;
    }

    public Set<Comments> getComments() {
        return comments;
    }

    public UserInfo comments(Set<Comments> comments) {
        this.comments = comments;
        return this;
    }

    public UserInfo addComments(Comments comments) {
        this.comments.add(comments);
        comments.setUserinfo(this);
        return this;
    }

    public UserInfo removeComments(Comments comments) {
        this.comments.remove(comments);
        comments.setUserinfo(null);
        return this;
    }

    public void setComments(Set<Comments> comments) {
        this.comments = comments;
    }

    public Role getRole() {
        return role;
    }

    public UserInfo role(Role role) {
        this.role = role;
        return this;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public Reward getReward() {
        return reward;
    }

    public UserInfo reward(Reward reward) {
        this.reward = reward;
        return this;
    }

    public void setReward(Reward reward) {
        this.reward = reward;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof UserInfo)) {
            return false;
        }
        return id != null && id.equals(((UserInfo) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "UserInfo{" +
            "id=" + getId() +
            ", newsletter='" + isNewsletter() + "'" +
            ", createdAt='" + getCreatedAt() + "'" +
            ", updatedAt='" + getUpdatedAt() + "'" +
            ", userName='" + getUserName() + "'" +
            "}";
    }
}
