package pdp.repositories;


import com.fasterxml.jackson.core.JsonProcessingException;
import org.junit.Before;
import org.junit.Test;
import pdp.domain.PdpPolicy;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import static java.util.stream.Collectors.toMap;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static pdp.PolicyTemplateEngine.getPolicyId;

public class PdpPolicyRepositoryTest extends AbstractRepositoryTest {

  @Before
  public void before() throws Exception {
    pdpPolicyRepository.save(pdpPolicy(NAME_ID + 1));
  }

  @Test
  public void testFindByName() throws JsonProcessingException {
    Optional<PdpPolicy> policy = pdpPolicyRepository.findFirstByPolicyId(getPolicyId(NAME_ID + 1)).stream().findFirst();
    assertEquals(NAME_ID + 1, policy.get().getName());
  }

  @Test
  public void testFindByNameNotFound() throws JsonProcessingException {
    Optional<PdpPolicy> policy = pdpPolicyRepository.findFirstByPolicyId("nope").stream().findFirst();
    assertFalse(policy.isPresent());
  }

  @Test
  public void testFindRevisionCountPerId() throws Exception {
    PdpPolicy policy = pdpPolicy(NAME_ID + 2);
    policy.addRevision(pdpPolicy(NAME_ID + 3));
    PdpPolicy saved = pdpPolicyRepository.save(policy);

    List<Object[]> revisionCountPerId = pdpPolicyRepository.findRevisionCountPerId();
    Map<Number, Number> revisionCountPerIdMap = revisionCountPerId.stream().collect(toMap((obj) -> (Number) obj[0], (obj) -> (Number) obj[1]));

    assertEquals("1", revisionCountPerIdMap.get(saved.getId().intValue()).toString());
  }

}

