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
| 01 Suljettu toimintaympäristö | 11 | 3 | Sisältötyö käynnissä |
| 02 Kommunikointi | 21 | 0 | Aiempi luonnos |
| 03 Pääsynhallinta ja toimivalta | 12 | 0 | Aiempi luonnos |
| 04 Datan hallinta | 11 | 0 | Runko |
| 05 Riippuvuuksien hallinta | 15 | 0 | Runko |
| 06 Paikallinen tekoäly | 15 | 0 | Aiempi luonnos |
| 07 Verifiointi | 15 | 0 | Aiempi luonnos |

## Työlista nodeittain

- [x] Kurssin juurinode: johdanto, oppimistavoitteet ja referenssijärjestelmän lähtökohta (`index.json`).

### 01 Suljettu toimintaympäristö

  - [ ] `environment/compute/index.json`
- [x] `environment/index.json`
    - [ ] `environment/lifecycle/failures/index.json`
  - [ ] `environment/lifecycle/index.json`
    - [ ] `environment/lifecycle/shutdown/index.json`
    - [ ] `environment/lifecycle/startup/index.json`
  - [x] `environment/logical/index.json`
  - [ ] `environment/network/index.json`
  - [x] `environment/physical/index.json`
  - [ ] `environment/services/index.json`
  - [ ] `environment/storage/index.json`

### 02 Kommunikointi

    - [ ] `communication/external/federation/index.json`
  - [ ] `communication/external/index.json`
    - [ ] `communication/external/proxy/index.json`
    - [ ] `communication/external/remote/index.json`
- [ ] `communication/index.json` — aiempi luonnos, syvennettävä
  - [ ] `communication/patterns/index.json`
    - [ ] `communication/patterns/pull/index.json`
    - [ ] `communication/patterns/push/index.json`
    - [ ] `communication/patterns/request-response/index.json`
    - [ ] `communication/patterns/store-forward/index.json`
    - [ ] `communication/primitives/channel/index.json`
    - [ ] `communication/primitives/direction/index.json`
  - [ ] `communication/primitives/index.json`
    - [ ] `communication/primitives/payload/index.json`
    - [ ] `communication/primitives/protocol/index.json`
    - [ ] `communication/primitives/source/index.json`
    - [ ] `communication/primitives/target/index.json`
    - [ ] `communication/transfer/egress/index.json`
  - [ ] `communication/transfer/index.json`
    - [ ] `communication/transfer/ingress/index.json`
    - [ ] `communication/transfer/offline/index.json`

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

- Hyväksytysti valmiit sisältönodet: **4 / 101** (sisältää kurssin juurinoden).
- Pääaiheet: **0 / 7** hyväksytysti valmista.
- SVG-tiedostoja: **42** (22 aiempaa + 20 uutta; 21 kaaviota FI/EN).
- Seuraava työ: `environment/compute/`, `storage/`, `network/` ja `services/`.

## Kehitysloki

- Työlista alustettu nykyisen repository-puun pohjalta. Aiempi luonnos säilytetään, mutta mitään sisältönodea ei vielä merkitä hyväksytysti valmiiksi. Selaintestaus tekemättä.

- Kierros 01: johdanto, toimintaympäristön yleiskuva, fyysinen ja looginen eristys täydennetty FI/EN. 10 uutta kaaviota kahdella kielellä. JSON-muoto, kuvatiedostoviittaukset ja sisällölliset rajaukset tarkastettu generoinnissa; SVG:n selaimessa renderöinti ja koko kurssin lopputarkastus tekemättä. Vanhoja SVG-resursseja ei poistettu tässä kierroksessa.
