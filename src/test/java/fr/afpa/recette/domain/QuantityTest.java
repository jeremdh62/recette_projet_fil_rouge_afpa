package fr.afpa.recette.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import fr.afpa.recette.web.rest.TestUtil;

public class QuantityTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Quantity.class);
        Quantity quantity1 = new Quantity();
        quantity1.setId(1L);
        Quantity quantity2 = new Quantity();
        quantity2.setId(quantity1.getId());
        assertThat(quantity1).isEqualTo(quantity2);
        quantity2.setId(2L);
        assertThat(quantity1).isNotEqualTo(quantity2);
        quantity1.setId(null);
        assertThat(quantity1).isNotEqualTo(quantity2);
    }
}
