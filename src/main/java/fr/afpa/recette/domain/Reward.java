package fr.afpa.recette.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Reward.
 */
@Entity
@Table(name = "reward")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Reward implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "reward")
    private String reward;

    @OneToMany(mappedBy = "reward")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<UserInfo> userInfos = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getReward() {
        return reward;
    }

    public Reward reward(String reward) {
        this.reward = reward;
        return this;
    }

    public void setReward(String reward) {
        this.reward = reward;
    }

    public Set<UserInfo> getUserInfos() {
        return userInfos;
    }

    public Reward userInfos(Set<UserInfo> userInfos) {
        this.userInfos = userInfos;
        return this;
    }

    public Reward addUserInfo(UserInfo userInfo) {
        this.userInfos.add(userInfo);
        userInfo.setReward(this);
        return this;
    }

    public Reward removeUserInfo(UserInfo userInfo) {
        this.userInfos.remove(userInfo);
        userInfo.setReward(null);
        return this;
    }

    public void setUserInfos(Set<UserInfo> userInfos) {
        this.userInfos = userInfos;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Reward)) {
            return false;
        }
        return id != null && id.equals(((Reward) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Reward{" +
            "id=" + getId() +
            ", reward='" + getReward() + "'" +
            "}";
    }
}
