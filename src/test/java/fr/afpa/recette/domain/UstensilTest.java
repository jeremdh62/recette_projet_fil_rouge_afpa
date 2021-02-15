package fr.afpa.recette.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import fr.afpa.recette.web.rest.TestUtil;

public class UstensilTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Ustensil.class);
        Ustensil ustensil1 = new Ustensil();
        ustensil1.setId(1L);
        Ustensil ustensil2 = new Ustensil();
        ustensil2.setId(ustensil1.getId());
        assertThat(ustensil1).isEqualTo(ustensil2);
        ustensil2.setId(2L);
        assertThat(ustensil1).isNotEqualTo(ustensil2);
        ustensil1.setId(null);
        assertThat(ustensil1).isNotEqualTo(ustensil2);
    }
}
