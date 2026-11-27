# Local-First – työlista

Tämä on kurssin jatkuvasti päivitettävä työlista. Päivitä sama tiedosto jokaisessa sisältöcommitissa: merkitse valmistuneet nodet, kirjaa jäljellä oleva työ ja päivitä yhteenveto. Älä merkitse aihetta valmiiksi ennen sisältö- ja resurssitarkastusta.

## Lähtötilanne

- [x] Yksi HTML koko KnowledgeBankille, yhteinen renderöintimoottori.
- [x] JSON-hakemistohierarkia ja FI/EN-tietomalli.
- [x] Tuotantopolku `/kb/bank/courses/localfirst/`.
- [x] Aiemman materiaalin siirto ja 22 SVG-tiedostoa (11 aihekuvaa kahdella kielellä).
- [x] Seitsemän pääaiheen otsikkopuu.
- [ ] Täydellinen kurssisisältö.
- [ ] Sisältö-, resurssi- ja selaintestaus.

## Sisältötyön kriteerit

- Yksi aihe per node; ei tarpeetonta päällekkäisyyttä muiden aiheiden kanssa.
- Suomi ja englanti samassa JSON-tiedostossa, sisällöllisesti vastaavina.
- Selkeä määritelmä, toimintaperiaate, käytännön esimerkki ja tarvittaessa rajoitukset.
- Runsaasti kuvia: lähtökohtaisesti 2–4 erilaista opetuksellista SVG-kaaviota per varsinainen opetettava aihe, tarpeen mukaan enemmän. Ei koristekuvia eikä pakollisia kaavioita pelkille ryhmittelyotsikoille.
- Yhtenäinen AIGM-väripaletti ja symboliikka, selkeät nuolten suunnat ja luottamusrajat; SVG-tekstit lokalisoituina.
- Kaikki kuvat omissa SVG-tiedostoissaan; JSON-viittaukset suhteessa nodeen, alt-tekstit ja kuvatekstit mukana.
- Sama referenssijärjestelmä kasvaa eristetystä tietokoneesta verkoksi, palveluiksi, hallituiksi yhteyksiksi ja paikalliseksi tekoälyksi.
- Sisällön kehitys ei muuta HTML-, CSS- tai JS-arkkitehtuuria ilman todellista tarvetta ja erillistä päätöstä.
- `status: outline` = runko; `draft` = keskeneräinen sisältö; `complete` = tarkastettu sisältö. Renderer ei tarvitse muutoksia tilamerkintää varten.

## Pääaiheet

| Aihe | Nodeja | Hyväksytty valmiiksi | Tila |
|---|---:|---:|---|
| 01 Suljettu toimintaympäristö | 11 | 11 | Sisältö valmis |
| 02 Kommunikointi | 21 | 21 | Sisältö valmis |
| 03 Pääsynhallinta ja toimivalta | 12 | 0 | Aiempi luonnos |
| 04 Datan hallinta | 11 | 0 | Runko |
| 05 Riippuvuuksien hallinta | 15 | 0 | Runko |
| 06 Paikallinen tekoäly | 15 | 0 | Aiempi luonnos |
| 07 Verifiointi | 15 | 0 | Aiempi luonnos |

## Työlista nodeittain

- [x] Kurssin juurinode: johdanto, oppimistavoitteet ja referenssijärjestelmän lähtökohta (`index.json`).

### 01 Suljettu toimintaympäristö

  - [x] `environment/compute/index.json`
- [x] `environment/index.json`
    - [x] `environment/lifecycle/failures/index.json`
  - [x] `environment/lifecycle/index.json`
    - [x] `environment/lifecycle/shutdown/index.json`
    - [x] `environment/lifecycle/startup/index.json`
  - [x] `environment/logical/index.json`
  - [x] `environment/network/index.json`
  - [x] `environment/physical/index.json`
  - [x] `environment/services/index.json`
  - [x] `environment/storage/index.json`

### 02 Kommunikointi

    - [x] `communication/external/federation/index.json`
  - [x] `communication/external/index.json`
    - [x] `communication/external/proxy/index.json`
    - [x] `communication/external/remote/index.json`
- [x] `communication/index.json`
  - [x] `communication/patterns/index.json`
    - [x] `communication/patterns/pull/index.json`
    - [x] `communication/patterns/push/index.json`
    - [x] `communication/patterns/request-response/index.json`
    - [x] `communication/patterns/store-forward/index.json`
    - [x] `communication/primitives/channel/index.json`
    - [x] `communication/primitives/direction/index.json`
  - [x] `communication/primitives/index.json`
    - [x] `communication/primitives/payload/index.json`
    - [x] `communication/primitives/protocol/index.json`
    - [x] `communication/primitives/source/index.json`
    - [x] `communication/primitives/target/index.json`
    - [x] `communication/transfer/egress/index.json`
  - [x] `communication/transfer/index.json`
    - [x] `communication/transfer/ingress/index.json`
    - [x] `communication/transfer/offline/index.json`

### 03 Pääsynhallinta ja toimivalta

  - [ ] `access/authentication/index.json`
  - [ ] `access/authorization/index.json`
  - [ ] `access/boundaries/index.json`
    - [ ] `access/boundaries/organizations/index.json`
    - [ ] `access/boundaries/processes/index.json`
    - [ ] `access/boundaries/segments/index.json`
    - [ ] `access/boundaries/users/index.json`
  - [ ] `access/default-deny/index.json`
  - [ ] `access/identity/index.json`
- [ ] `access/index.json` — aiempi luonnos, syvennettävä
  - [ ] `access/revocation/index.json`
  - [ ] `access/validation/index.json`

### 04 Datan hallinta

  - [ ] `data/backup/index.json`
  - [ ] `data/conflicts/index.json`
  - [ ] `data/deletion/index.json`
- [ ] `data/index.json`
  - [ ] `data/lifecycle/index.json`
  - [ ] `data/location/index.json`
  - [ ] `data/ownership/index.json`
  - [ ] `data/replication/index.json`
  - [ ] `data/restore/index.json`
  - [ ] `data/ssot/index.json`
  - [ ] `data/sync/index.json`

### 05 Riippuvuuksien hallinta

  - [ ] `dependencies/discovery/index.json`
    - [ ] `dependencies/external/cdn/index.json`
    - [ ] `dependencies/external/certificates/index.json`
    - [ ] `dependencies/external/cloud/index.json`
    - [ ] `dependencies/external/dns/index.json`
    - [ ] `dependencies/external/iam/index.json`
  - [ ] `dependencies/external/index.json`
    - [ ] `dependencies/external/libraries/index.json`
    - [ ] `dependencies/external/licenses/index.json`
    - [ ] `dependencies/external/ntp/index.json`
    - [ ] `dependencies/external/packages/index.json`
    - [ ] `dependencies/external/telemetry/index.json`
- [ ] `dependencies/index.json`
  - [ ] `dependencies/internal/index.json`
  - [ ] `dependencies/updates/index.json`

### 06 Paikallinen tekoäly

    - [ ] `ai/behavior/deterministic/index.json`
  - [ ] `ai/behavior/index.json`
    - [ ] `ai/behavior/probabilistic/index.json`
    - [ ] `ai/bots/authority/index.json`
  - [ ] `ai/bots/index.json`
    - [ ] `ai/bots/tools/index.json`
  - [ ] `ai/external/index.json`
- [ ] `ai/index.json` — aiempi luonnos, syvennettävä
  - [ ] `ai/inference/index.json`
  - [ ] `ai/knowledge/index.json`
  - [ ] `ai/models/index.json`
  - [ ] `ai/rag/index.json`
  - [ ] `ai/resources/index.json`
  - [ ] `ai/separation/index.json`
  - [ ] `ai/validation/index.json`

### 07 Verifiointi

  - [ ] `verification/audit/index.json`
    - [ ] `verification/audit/logging/index.json`
    - [ ] `verification/audit/trail/index.json`
- [ ] `verification/index.json` — aiempi luonnos, syvennettävä
  - [ ] `verification/monitoring/index.json`
    - [ ] `verification/monitoring/resources/index.json`
    - [ ] `verification/monitoring/services/index.json`
    - [ ] `verification/monitoring/traffic/index.json`
    - [ ] `verification/testing/authority/index.json`
    - [ ] `verification/testing/autonomy/index.json`
    - [ ] `verification/testing/boundaries/index.json`
    - [ ] `verification/testing/disconnect/index.json`
    - [ ] `verification/testing/faults/index.json`
  - [ ] `verification/testing/index.json`
    - [ ] `verification/testing/recovery/index.json`

## Lopputarkastus

- [ ] Kaikki JSON-tiedostot parsittavissa ja `children`-viittaukset olemassa oikeassa järjestyksessä.
- [ ] Kaikki kuvaviittaukset osoittavat olemassa oleviin SVG-tiedostoihin; SVG:t validia XML:ää.
- [ ] FI/EN-sisällön vastaavuus, terminologia ja kuvien luettavuus.
- [ ] Päällekkäisyyksien ja abstraktiotasojen tarkastus.
- [ ] Referenssijärjestelmän jatkuvuus ja käytännön harjoitukset.
- [ ] Kurssiluettelo, ankkurit, kielivalinta ja sivun toiminta selaimessa.
- [ ] Mobiilinäkymä ja tuotantopolut; testaa ilman ulkoisia verkkoyhteyksiä paikallisella HTTP-palvelimella ja AIGM site.css:llä.

## Edistyminen

- Hyväksytysti valmiit sisältönodet: **33 / 101** (sisältää kurssin juurinoden).
- Pääaiheet: **2 / 7** hyväksytysti valmista.
- SVG-tiedostoja: **182** (22 aiempaa + 160 uutta; 91 kaaviota FI/EN).
- Seuraava työ: 03 Pääsynhallinta ja toimivalta, yleiskuva, identiteetinhallinta, autentikointi, auktorisointi ja validointi.

## Kehitysloki

- Työlista alustettu nykyisen repository-puun pohjalta. Aiempi luonnos säilytetään, mutta mitään sisältönodea ei vielä merkitä hyväksytysti valmiiksi. Selaintestaus tekemättä.

- Kierros 01: johdanto, toimintaympäristön yleiskuva, fyysinen ja looginen eristys täydennetty FI/EN. 10 uutta kaaviota kahdella kielellä. JSON-muoto, kuvatiedostoviittaukset ja sisällölliset rajaukset tarkastettu generoinnissa; SVG:n selaimessa renderöinti ja koko kurssin lopputarkastus tekemättä. Vanhoja SVG-resursseja ei poistettu tässä kierroksessa.

- Kierros 02: laskenta, tallennus, sisäinen verkko ja paikalliset palvelut täydennetty FI/EN. 12 uutta kaaviota kahdella kielellä. R0/R1-referenssijärjestelmä jatkuu huolto-organisaation esimerkillä. JSON ja uudet kuvaviittaukset tarkastettu; SVG:n visuaalinen selaintestaus ja koko kurssin lopputarkastus jäljellä.

- Kierros 03: järjestelmän operatiivinen elinkaari, käynnistys, sammutus ja vikatilanteet täydennetty FI/EN. 11 uutta kaaviota kahdella kielellä. Pääaiheen 01 kaikki 11 nodea sisältövalmiita. R1:n käyttövalmius-, kirjoitus- ja vikatestit määritelty harjoituksiksi, ei väitetty suoritetuiksi. JSON ja uudet kuvaviittaukset tarkastettu; SVG:n visuaalinen selaintestaus ja koko kurssin lopputarkastus jäljellä.

- Kierros 04: kommunikoinnin yleiskuva ja kuusi primitiiviä ryhmittelynodeineen täydennetty FI/EN (8 nodea). 16 uutta kaaviota kahdella kielellä. R1:n sisäinen ohjehaku ja R2:n suunniteltu ohjetuonti muodostavat esimerkkien perustan. JSON, kieliparien rakenne ja uudet kuvaviittaukset tarkastettu. SVG:n visuaalinen selaintestaus, harjoitusten suoritus ja koko kurssin lopputarkastus jäljellä.

- Kierros 05: tiedonsiirto ja kommunikointimallit ryhmittelynodeineen täydennetty FI/EN (9 nodea). 20 uutta kaaviota kahdella kielellä. R2:n ohjetuonti ja raporttivienti kuvaavat siirtosuuntia, aloitteellisuutta ja toimituksen ajallista erottelua. Offline ja verkotettu R2 ovat vaihtoehtoisia toteutuksia. JSON, kieliparien rakenne ja uudet kuvaviittaukset tarkastettu. SVG:n visuaalinen selaintestaus, harjoitusten suoritus ja koko kurssin lopputarkastus jäljellä.

- Käyttöliittymän visuaalinen muutos käyttäjän pyynnöstä: kurssin sisältökortit ja kurssiluettelon kortit vaaleanharmaiksi, tekstit tummiksi. Sivun yleinen tumma teema ja SVG-kaaviot säilytetty. CSS:n välimuistiversio päivitetty. Ei muutoksia sisältönodien valmiusasteeseen; visuaalinen selaintestaus jäljellä.

- Kierros 06: ulkoiset yhteydet, Proxy, Remote Access ja Federation täydennetty FI/EN (4 nodea). 11 uutta kaaviota kahdella kielellä. Kommunikointiluvun kaikki 21 nodea sisältövalmiita. Federation määritelty kurssissa itsenäisten järjestelmien sopimuspohjaiseksi yhteistyöksi, ei yhteiseksi toimivallaksi. JSON, kieliparien rakenne ja uudet kuvaviittaukset tarkastettu. Visuaalinen selaintestaus, harjoitusten suoritus ja koko kurssin lopputarkastus jäljellä.

- Käyttöliittymä: kuvat koko sisältökortin leveydelle ensimmäiseksi, leipäteksti kuvan alle. Kuvallisissa korteissa käytetään SVG:n omaa otsikkoa ilman toistuvaa HTML-otsikkoa tai kuvatekstiä. Kuvattomien korttien otsikot säilyvät. Korttitausta tummennettu (#aeb4bd), välimuistiversiot v7. Ei muutosta sisältöprosenttiin. Selaintestaus jäljellä.
