package pdp.access;

import org.springframework.web.bind.annotation.ResponseStatus;

import static org.springframework.http.HttpStatus.FORBIDDEN;

@SuppressWarnings("serial")
@ResponseStatus(value = FORBIDDEN)
public class PolicyIdpAccessMismatchServiceProviderException extends AbstractPolicyIdpAccessException {

  public PolicyIdpAccessMismatchServiceProviderException(String msg) {
    super(msg);
  }
}
