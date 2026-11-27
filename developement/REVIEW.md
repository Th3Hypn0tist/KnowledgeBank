# Local-First – lopputarkastus 27.11.2026

Tarkastettu lähtöcommit: `2c5066a1f6ad48e8032cff48aebea5a2592891aa`. Tämä on rajattu julkaisutarkastus, ei kurssin harjoitusten suoritusraportti.

## GitHub-aineisto: toteutuneet tarkastukset

| Tarkastus | Tulos |
|---|---|
| JSON-parsinta | PASS, kaikki 102 index.json-tiedostoa luettu ja parsittu |
| Kurssin tila | PASS, 101/101 complete |
| Hierarkia | PASS, 7 pääaihetta, kaikki tarkastetut lapsiviittaukset löytyvät ja hierarkia käyty läpi |
| FI/EN-rakenne | PASS, 230 korttia kummallakin kielellä |
| Kuvaviittaukset | PASS, 460/460 löytyi GitHubin tiedostopuusta |
| Käyttämättömät kuvat | 22 vanhaa SVG:tä, poistetaan tässä commitissa; 460 jää |
| Sisällön otsikko vs. kuvateksti | 29 nodessa erillinen diagrammin otsikko; esimerkiksi Kanava käyttää kuvassa otsikkoa Fyysinen reitti ja looginen kanava. Ei tulkittu kaksoisotsikoksi. SVG:n oma otsikko säilyy näkymässä, JSON-otsikko säilyy metadatana. |

Luettu erissä 15 + 18 + 18 + 18 + 18 + 15 JSON-tiedostoa työkalun kutsurajan vuoksi. Tarkastettu olemassa oleva hierarkia ja kieliversioiden rakenteellinen paritus, ei kaikkien käännösten semanttista vastaavuutta.

## Ajotestit – rajattu synteettinen testipuu

- PHP 8.4.24, API-lähteen Git-blob `c94a974e7d91ce45d3cd40abac45e91ca5cd4982` vastasi paikallista kopiota. PHP-syntaksi PASS.
- Python-validaattorin syntaksi ja ajo PASS: luettelo, kurssijuuri, yksi aliaihe, kaksi korttiparia ja neljä testikuvaa.
- PHP CLI PASS: kaikki kolme testipuun nodea, discovery, JSON-sitemap ja alipuu, XML-sitemap ja HTML-linkit, kuusi negatiivista tapausta (puuttuva polku, traversal, koodattu traversal, tuntematon node, tuntematon reitti, POST).
- Apache + PHP: /kb/, /kb/api/, /kb/api/sitemap, yksittäinen node, XML- ja HTML-sitemap HTTP 200. Puuttuva node 404, puuttuva polku 400, POST 405. Uudet .git- ja developement-estot 403.
- JavaScriptin alkuperäinen Git-blob `817f439b2c33692f10e9d5b57ed2674ce71d4e01` ja paikallinen kopio vastasivat toisiaan. Node.js-syntaksitarkastus PASS ennen ja jälkeen URL-ankkurikorjauksen.
- Testit eivät edellyttäneet ulkoisia palveluja. Kyse ei kuitenkaan ollut koko kurssin selaimessa suoritetusta offline-testistä.

## Korjaukset

- Poistettu ainoastaan viittaamattomat SVG-tiedostot; sisältö-JSON ennallaan.
- Virheellinen prosenttikoodattu URL-fragmentti ei enää kaada koko kurssin renderöintiä.
- Footerin API-linkki absoluuttiseksi muiden löydettävyyslinkkien mukaisesti.
- Apache-säännöt estävät .git- ja developement-hakemistojen HTTP-pääsyn. Muissa palvelintoteutuksissa vastaavat estot määriteltävä erikseen.
- Lisätty `developement/validate.py`, joka ei vaadi ulkoisia Python-kirjastoja.

## Avoimet tarkastukset

Koko repositorion lataus paikalliseen testiympäristöön ei onnistunut (DNS / latausrajapinta), eikä tuotanto-URLien avaaminen onnistunut käytetyllä web-työkalulla. Chromium palautti ERR_BLOCKED_BY_ADMINISTRATOR myös paikallisessa testissä. Tästä syystä täyden aineiston SVG-XML-parseriajo, kaikkien 102 noden API-ajotesti, selaimen desktop/mobiilitesti, kaikkien kaavioiden visuaalinen ja FI/EN-sisällön semanttinen katselmointi sekä harjoitusten käytännön toteutus jäävät avoimiksi. Aiempi käyttäjän vahvistus käyttöliittymän/API:n toiminnasta ei korvaa näitä testejä.

Toista täydellä checkoutilla:

    python3 developement/validate.py --api
    node --check lib/bank.js

Validaattori on testattu synteettisellä aineistolla, ei koko repositoriolla. Sen PASS ei yksin osoita kurssin pedagogista tai semanttista oikeellisuutta.

## Poistetut käyttämättömät tiedostot

- bank/courses/localfirst/access/images/communication-1-fi.svg
- bank/courses/localfirst/access/images/communication-1-en.svg
- bank/courses/localfirst/access/images/communication-2-fi.svg
- bank/courses/localfirst/access/images/communication-2-en.svg
- bank/courses/localfirst/ai/images/services-1-fi.svg
- bank/courses/localfirst/ai/images/services-1-en.svg
- bank/courses/localfirst/ai/images/services-2-fi.svg
- bank/courses/localfirst/ai/images/services-2-en.svg
- bank/courses/localfirst/communication/images/connectivity-1-fi.svg
- bank/courses/localfirst/communication/images/connectivity-1-en.svg
- bank/courses/localfirst/communication/images/connectivity-2-fi.svg
- bank/courses/localfirst/communication/images/connectivity-2-en.svg
- bank/courses/localfirst/environment/images/environment-1-fi.svg
- bank/courses/localfirst/environment/images/environment-1-en.svg
- bank/courses/localfirst/environment/images/environment-2-fi.svg
- bank/courses/localfirst/environment/images/environment-2-en.svg
- bank/courses/localfirst/images/index-1-fi.svg
- bank/courses/localfirst/images/index-1-en.svg
- bank/courses/localfirst/verification/images/practice-1-fi.svg
- bank/courses/localfirst/verification/images/practice-1-en.svg
- bank/courses/localfirst/verification/images/practice-2-fi.svg
- bank/courses/localfirst/verification/images/practice-2-en.svg

