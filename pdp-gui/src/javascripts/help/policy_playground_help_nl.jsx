/** @jsx React.DOM */

App.Help.PolicyPlaygroundHelpNl = React.createClass({
  render: function () {
    return (
        <div className="form-element about">
          <h1>Hoe kan je Playground gebruiken?</h1>

          <p>Met de SURFconext Policy Administration Point (PAP) kan je <a href="https://en.wikipedia.org/wiki/XACML"
                                                                           target="_blank">XACML</a> autorisatie regels
            beheren. Autorisatie regels definiëren wie wordt geautoriseerd voor welke combinatie van instelling en
            dienst op basis
            van de attributen van de gebruiker.</p>

          <p>Deze playground kan worden gebruikt om je autorisatie regels te testen. Nieuwe en / of bewerkte autorisatie
            regels kunnen
            direct worden getest.</p>

          <p>Door een autorisatie regel te selecteren kan je direct deze regel testen zonder alle juiste input
            parameters te kiezen.</p>

          <h2>Dienst (SP) en instelling (IdP)</h2>

          <p>Kies de dienst die je hebt gedefinieerd in je autorisatie regel. Mocht je de autorisatie regel hebben
            gedefinieerd zonder instelling, dan moet je toch een instelling
            hier kiezen om een geldig autorisatie verzoek te doen. De gekozen instelling zal worden genegeerd als er
            geen
            instelling is gekozen in je autorisatie regel.</p>

          <h2>Attributen</h2>

          <p>De attributen die je selecteert en de waardes die je toevoegt worden toegevoegd aan het autorisatie verzoek
            naar de
            'Policy Definition Point' (PDP). Op deze manier kan je verschillende uitkomsten van je regel testen.
          </p>

          <p>Als je het attribuut <em>urn:collab:group:surfteams.nl</em> kiest dan moet je ofwel een geldige volledige
            team naam invullen of
            - om de integratie met teams te testen - een <em>urn:oasis:names:tc:SAML:1.1:nameid-format:unspecified</em>
            attribuut met
            daarin de geldige en volledige id van een gebruiker die lid is van de gedefinieerde groep in je autorisatie
            regel.</p>

          <h2>Resultaten</h2>

          <p>Er zijn 4 mogelijke resultaten van een autorisatie verzoek:</p>
          <ul>
            <li><span>'Permit'</span> - Minstens één autorisatie regel was van toepassing en de 'Permit' regel was een
              match met de attributen
            </li>
            <li><span>'Deny'</span> - Minstens één autorisatie regel was van toepassing en er was geen match met de
              attributen
            </li>
            <li><span>'Not Applicable'</span> - Niet één autorisatie regel was van toepassing op basis van de
              geselecteerde dienst en instelling
            </li>
            <li><span>'Indeterminate'</span> - Een verplicht attribuut voor de autorisatie regel is niet meegestuurd.
              Dit kan alleen gebeuren bij 'Deny' regels.
            </li>
          </ul>
          <p>Als het resultaat dan wel 'Permit' of 'Not Applicable' is, dan zou de gebruiker zijn geautoriseerd voor het
            gebruik van de dienst.</p>
        </div>
    );
  }
});