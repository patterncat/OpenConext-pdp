/*
 * Copyright 2013 SURFnet bv, The Netherlands
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package pdp.sab;

import javax.xml.stream.XMLInputFactory;
import javax.xml.stream.XMLStreamConstants;
import javax.xml.stream.XMLStreamException;
import javax.xml.stream.XMLStreamReader;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

import static java.util.stream.IntStream.range;

public class SabResponseParser {

  public List<String> parse(InputStream soap) throws XMLStreamException {
    //despite it's name, the XMLInputFactoryImpl is not thread safe
    XMLInputFactory factory = XMLInputFactory.newInstance();

    XMLStreamReader reader = factory.createXMLStreamReader(soap);

    List<String> roles = new ArrayList<>();
    boolean processRoles = false;

    while (reader.hasNext()) {
      switch (reader.next()) {
        case XMLStreamConstants.START_ELEMENT:
          switch (reader.getLocalName()) {
            case "Attribute":
              if (hasAttributeValue(reader, "urn:oid:1.3.6.1.4.1.5923.1.1.1.7")) {
                processRoles = true;
              }
              break;
            case "AttributeValue":
              if (processRoles) {
                roles.add(reader.getElementText());
              }
              break;
          }
          break;
        case XMLStreamConstants.END_ELEMENT:
          if (processRoles && reader.getLocalName().equals("Attribute")) {
            //we got what we wanted
            return roles;
          }
      }
    }
    return roles;
  }

  private boolean hasAttributeValue(XMLStreamReader reader, String attributeValue) {
    return range(0, reader.getAttributeCount()).mapToObj(i -> reader.getAttributeValue(i)).anyMatch(v -> v != null && v.equals(attributeValue));
  }
}
