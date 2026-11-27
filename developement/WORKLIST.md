# Local-First – työlista

Tämä on kurssin jatkuvasti päivitettävä työlista. Päivitä sama tiedosto jokaisessa sisältöcommitissa: merkitse valmistuneet nodet, kirjaa jäljellä oleva työ ja päivitä yhteenveto. Älä merkitse aihetta valmiiksi ennen sisältö- ja resurssitarkastusta.

## Lähtötilanne

- [x] Yksi HTML koko KnowledgeBankille, yhteinen renderöintimoottori.
- [x] JSON-hakemistohierarkia ja FI/EN-tietomalli.
- [x] Tuotantopolku `/kb/bank/courses/localfirst/`.
- [x] Aiemman materiaalin siirto ja 22 SVG-tiedostoa (11 aihekuvaa kahdella kielellä).
- [x] Seitsemän pääaiheen otsikkopuu.
- [x] Täydellinen kurssisisältö.
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
| 03 Pääsynhallinta ja toimivalta | 12 | 12 | Sisältö valmis |
| 04 Datan hallinta | 11 | 11 | Sisältö valmis |
| 05 Riippuvuuksien hallinta | 15 | 15 | Sisältö valmis |
| 06 Paikallinen tekoäly | 15 | 15 | Sisältö valmis |
| 07 Verifiointi | 15 | 15 | Sisältö valmis |

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

  - [x] `access/authentication/index.json`
  - [x] `access/authorization/index.json`
  - [x] `access/boundaries/index.json`
    - [x] `access/boundaries/organizations/index.json`
    - [x] `access/boundaries/processes/index.json`
    - [x] `access/boundaries/segments/index.json`
    - [x] `access/boundaries/users/index.json`
  - [x] `access/default-deny/index.json`
  - [x] `access/identity/index.json`
- [x] `access/index.json`
  - [x] `access/revocation/index.json`
  - [x] `access/validation/index.json`

### 04 Datan hallinta

  - [x] `data/backup/index.json`
  - [x] `data/conflicts/index.json`
  - [x] `data/deletion/index.json`
- [x] `data/index.json`
  - [x] `data/lifecycle/index.json`
  - [x] `data/location/index.json`
  - [x] `data/ownership/index.json`
  - [x] `data/replication/index.json`
  - [x] `data/restore/index.json`
  - [x] `data/ssot/index.json`
  - [x] `data/sync/index.json`

### 05 Riippuvuuksien hallinta

  - [x] `dependencies/discovery/index.json`
    - [x] `dependencies/external/cdn/index.json`
    - [x] `dependencies/external/certificates/index.json`
    - [x] `dependencies/external/cloud/index.json`
    - [x] `dependencies/external/dns/index.json`
    - [x] `dependencies/external/iam/index.json`
  - [x] `dependencies/external/index.json`
    - [x] `dependencies/external/libraries/index.json`
    - [x] `dependencies/external/licenses/index.json`
    - [x] `dependencies/external/ntp/index.json`
    - [x] `dependencies/external/packages/index.json`
    - [x] `dependencies/external/telemetry/index.json`
- [x] `dependencies/index.json`
  - [x] `dependencies/internal/index.json`
  - [x] `dependencies/updates/index.json`

### 06 Paikallinen tekoäly

    - [x] `ai/behavior/deterministic/index.json`
  - [x] `ai/behavior/index.json`
    - [x] `ai/behavior/probabilistic/index.json`
    - [x] `ai/bots/authority/index.json`
  - [x] `ai/bots/index.json`
    - [x] `ai/bots/tools/index.json`
  - [x] `ai/external/index.json`
- [x] `ai/index.json`
  - [x] `ai/inference/index.json`
  - [x] `ai/knowledge/index.json`
  - [x] `ai/models/index.json`
  - [x] `ai/rag/index.json`
  - [x] `ai/resources/index.json`
  - [x] `ai/separation/index.json`
  - [x] `ai/validation/index.json`

### 07 Verifiointi

  - [x] `verification/audit/index.json`
    - [x] `verification/audit/logging/index.json`
    - [x] `verification/audit/trail/index.json`
- [x] `verification/index.json`
  - [x] `verification/monitoring/index.json`
    - [x] `verification/monitoring/resources/index.json`
    - [x] `verification/monitoring/services/index.json`
    - [x] `verification/monitoring/traffic/index.json`
    - [x] `verification/testing/authority/index.json`
    - [x] `verification/testing/autonomy/index.json`
    - [x] `verification/testing/boundaries/index.json`
    - [x] `verification/testing/disconnect/index.json`
    - [x] `verification/testing/faults/index.json`
  - [x] `verification/testing/index.json`
    - [x] `verification/testing/recovery/index.json`

## Lopputarkastus

- [x] Kaikki 102 JSON-tiedostoa parsittavissa ja `children`-viittaukset olemassa; julkaistun hierarkian kattavuus tarkastettu.
- [x] Kaikki 460 kuvaviittausta osoittavat olemassa oleviin SVG-tiedostoihin; 22 käyttämätöntä vanhaa SVG:tä poistettu.
- [ ] Koko 460 SVG-tiedoston XML-validointi oikealla parserilla; validaattori lisätty ja testattu testiaineistolla.
- [x] FI/EN-rakenne: kaikissa 101 nodessa yhtä monta korttia molemmilla kielillä (230/kieli).
- [ ] FI/EN-sisällön semanttinen vastaavuus, terminologia ja kaikkien kuvien luettavuus.
- [ ] Päällekkäisyyksien ja abstraktiotasojen tarkastus.
- [ ] Referenssijärjestelmän jatkuvuus ja käytännön harjoitukset.
- [x] PHP-syntaksi ja API:n JSON/XML/HTML-sitemapit, yksittäiset nodet ja virhetapaukset paikallisella synteettisellä testipuulla; Apache-reititys testattu.
- [x] JavaScript-syntaksi tarkastettu; virheellisen URL-ankkurin käsittely korjattu.
- [ ] API:n kaikkien 102 todellisen noden ajotesti ja tuotantoreititys.
- [ ] Kurssiluettelo, ankkurit, kielivalinta ja sivun toiminta selaimessa; Chromium esti navigoinnin testiympäristössä.
- [ ] Mobiilinäkymä ja tuotantopolut; testaa ilman ulkoisia verkkoyhteyksiä paikallisella HTTP-palvelimella ja AIGM site.css:llä.

## Edistyminen

- Hyväksytysti valmiit sisältönodet: **101 / 101** (sisältää kurssin juurinoden).
- Pääaiheet: **7 / 7** hyväksytysti valmista.
- SVG-tiedostoja: **460** (230 kaaviota FI/EN; 22 vanhaa käyttämätöntä poistettu).
- Seuraava työ: koko aineiston XML/API-ajotesti, semanttinen ja visuaalinen katselmointi, tuotanto- ja harjoitustestit; ks. `developement/REVIEW.md`.

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

- Kierros 07: pääsynhallinnan yleiskuva, identiteetinhallinta, autentikointi, auktorisointi ja validointi täydennetty FI/EN (5 nodea). 14 uutta kaaviota kahdella kielellä. SVG:n näkyvä otsikko vastaa oppitunnin otsikkoa uuden kuva-ensin-asettelun mukaisesti. JSON, kieliparien rakenne ja kuvaviittaukset tarkastettu. Selaintestaus, harjoitusten suoritus ja koko kurssin lopputarkastus jäljellä.

- Kierros 08: oletusarvoinen esto, oikeuksien peruuttaminen ja luottamusrajat (verkko, prosessi, käyttäjä, organisaatio) täydennetty FI/EN (7 nodea). 20 uutta kaaviota kahdella kielellä. Pääaiheen 03 kaikki 12 nodea sisältövalmiita. Erottelun toteutusmekanismit, peruutuksen vaikutusviive ja toimivaltapolitiikan puuttuminen käsitelty erillisinä. JSON, kieliparien rakenne ja kuvaviittaukset tarkastettu. Selaintestaus, harjoitusten suoritus ja koko kurssin lopputarkastus jäljellä.

- Käyttöliittymäkorjaus: tuotannossa näkyi tekstin ja otsikon vanha järjestys uuden CSS:n kanssa. Repon aiempi renderöijä oli jo kuva ensin -mallissa, joten vanhan JS:n välimuisti tai puutteellinen julkaisu on mahdollinen, ei varmistettu syy. Yhteiset tiedostot nimetty bank.js ja bank.css, HTML-viittaukset v8. CSS varmistaa kuvan ensimmäiseksi myös vanhan DOM-rakenteen tapauksessa, piilottaa toistuvat korttiotsikot ja kuvatekstit sekä palauttaa tekstin sisämarginaalit. JSON-sisältö ennallaan; tuotantotestaus jäljellä.

- Repon juureen lisätty llms.txt: ohjaa botit suoraan bank/-sisältöhierarkiaan, kurssiluetteloon ja rekursiiviseen JSON-lukuun. README päivitetty. Ei muutoksia sisältöprosenttiin.

- Lisätty read-only PHP REST API /api-hakemistoon: rekursiivinen sitemap, rajattu alipuu ja yksittäinen node. Ei erillistä indeksiä tai sisältökopioita. llms.txt ja README päivitetty. PHP-ajotestaus ja tuotannon reitityksen tarkastus jäljellä; sisältöprosentti ennallaan.

- llms.txt muutettu API-first-ohjeeksi (sitemap → valitut nodet → kieliversio ja SVG:t). index.html sisältää staattiset head-linkit llms.txt:hen ja API-sitemappiin sekä näkyvät footer-linkit. Ei muutosta sisältöprosenttiin. Tuotantoreititys ja selaintestaus jäljellä.

- Käyttäjä vahvisti viimeisimmän käyttöliittymä/API-kokonaisuuden toimivan; tämä ei korvaa systemaattista lopputestausta.

- Kierros 09: datan hallinnan yleiskuva, SSOT, omistajuus, sijainti ja elinkaari täydennetty FI/EN (5 nodea). 14 uutta kaaviota kahdella kielellä. SSOT kuvattu loogisena auktoritatiivisuutena, ei yhden fyysisen kopion vaatimuksena. Omistajuus rajattu arkkitehtuurin hallintavastuuseen, ei juridiseksi omistusoikeusväitteeksi. JSON, kieliparien rakenne ja kuvaviittaukset tarkastettu; uusien kaavioiden visuaalinen tarkastus ja harjoitusten suoritus jäljellä.

- Kierros 10A: datan hallinnan loput kuusi nodea sekä riippuvuuksien hallinnan viisi yleisnodea, yhteensä 11 nodea ja 22 kaaviota FI/EN. Ensimmäinen laaja erä jaettu teknisesti kahteen committiin työkalun kutsurajan vuoksi. JSON ja kuvaviittaukset tarkastettu; visuaalinen tarkastus, XML-parseritarkastus ja harjoitusten suoritus jäljellä.

- API:n löydettävyys: absoluuttiset HTTPS-osoitteet (`api`, `source`, `root`, discovery) yhdestä PUBLIC_BASE-vakiosta. Lisätty dynaamiset XML-sitemap ja HTML-linkkiluettelo samasta JSON-hierarkiasta sekä robots.txt-yhdistämismalli sivuston juureen. XML jättää outline/draft-nodet pois; JSON/HTML näyttävät koko rakenteen. index.html, llms.txt ja README päivitetty. Ei sisältöprosentin muutosta. PHP-ajotesti, tuotantoreititys, host-root robots.txt -yhdistäminen ja botin uusintatesti jäljellä.

- Kierros 10B: kaikki 10 ulkoisen riippuvuuden nodea täydennetty FI/EN, 20 uutta kaaviota (40 SVG-tiedostoa). Riippuvuuksien hallinta kokonaan sisältövalmis. DNS, NTP, IAM, sertifikaatit, lisenssit, kirjastot, pakettivarastot, Cloud API, CDN ja telemetria käsitelty hankinta-, suoritus- tai ylläpitoriippuvuuksina. Jokaisessa määritelmä, R3-esimerkki, harjoitus ja hyväksymiskriteerit. JSON-parsinta, kieliparien rakenne ja uudet kuvaviittaukset tarkastettu; SVG:n XML- ja visuaalinen tarkastus sekä harjoitusten suoritus jäljellä. Ei käyttöliittymä- tai API-muutoksia.

- Kierros 11: koko paikallisen tekoälyn luku, 15 nodea FI/EN, 30 uutta kaaviota (60 SVG-tiedostoa). Malli, data, inferenssi, Knowledge Engine, RAG ja botin toimivalta erotettu toisistaan; paikallinen ydintoiminta säilyy ilman tekoälypalvelua. Käytetty synteettistä R3-huoltoaineistoa ja malliriippumattomia toimivaltarajoja. Jokaisessa nodessa määritelmä ja harjoitus hyväksymiskriteereineen. Olemassa oleva hierarkia ja metatiedot säilytetty, aiemmat kuvat jätetty repositorioon lopputarkastusta varten. JSON-parsinta, kieliparien rakenne ja uudet kuvaviittaukset tarkastettu; SVG:n XML- ja visuaalinen tarkastus sekä harjoitusten suoritus jäljellä. Ei UI- tai API-muutoksia.

- Kierros 12: verifioinnin kaikki 15 nodea täydennetty FI/EN, 30 uutta kaaviota (60 SVG-tiedostoa). Monitorointi, auditointi ja testaus erotettu toisistaan. Hyväksymistestit kattavat katkaisun, kylmäkäynnistyksen, vikatilanteet, toimivallan, luottamusrajat ja palautumisen; jokaisessa nodessa määritelmä ja harjoitus hyväksymiskriteereineen. Kurssin kaikki 101 sisältönodea ja 7 pääaihetta sisältövalmiita. Olemassa oleva hierarkia ja metatiedot säilytetty; aiemmat kuvat säilytetty lopputarkastusta varten. JSON-parsinta, kieliparien rakenne ja uudet kuvaviittaukset tarkastettu. Koko kurssin resurssi-, XML-, sisältö-, selain- ja API-tarkastus sekä harjoitusten suorittaminen vielä avoinna. Harjoitusten määrittely ei ole näyttö niiden suorittamisesta. Ei UI- tai API-muutoksia.

- Kierros 13: kaikki 102 JSON-tiedostoa luettu GitHubista (101 kurssinodea + luettelo). 230 korttia/kieli, 460 kuvaviittausta; ei puuttuvia nodeja tai kuvia. Poistettu 22 viittaamatonta vanhaa SVG:tä. Lisätty riippuvuudeton julkaisuvalidaattori ja katselmointiraportti. PHP 8.4.24 CLI ja paikallinen Apache synteettisellä testipuulla PASS; JavaScript-syntaksi PASS. Korjattu virheellisen URL-fragmentin käsittely, yhdenmukaistettu footerin API-linkki absoluuttiseksi ja estetty .git/developement HTTP-pääsy Apache-säännöllä (403 testattu). Koko repon kloonaus ja tuotannon hakeminen estyivät ympäristössä; selaimen navigointi estetty. Täyden aineiston XML/parseriajoa, koko aineiston API-ajotestiä, visuaalista/semanttista katselmointia ja harjoituksia ei merkitä läpäistyiksi.

## Käyttöliittymän kehityskierros 14 – kolmen paneelin lukija

- [x] Avattava otsikkopuu vasemmalla, vain valittu node keskellä.
- [x] Oikealla vain aktiivisen pääaiheen SVG-pikkukuvat, hierarkian järjestyksessä. Johdanto omana ryhmänään.
- [x] Pikkukuvat linkittävät yksittäiseen korttiin; aktiivinen node ja kuva korostetaan. Ryhmän sisällä kuvahakemisto säilyy.
- [x] Breadcrumb, edellinen/seuraava, aliaihelinkit, kielenvaihto ja hash-navigaatio. Aiemmat node-ankkurit säilyvät.
- [x] Leveä työpöytäasettelu, kolme erikseen vieritettävää aluetta; kapeassa näkymässä avattavat paneelit.
- [ ] Selaimen desktop/mobiili- ja navigointiregressiotestit oikealla aineistolla.

Ei muutoksia JSON-lähdeaineistoon, PHP-API:in tai sisältömäärään (101/101). CSS/JS v10. Hakua, koko kurssin yhtenäistä näkymää ja etenemisseurantaa ei lisätty tähän kokeiluun.

## Kehityskierros 15 – SVG-kaavioiden pystysuuntainen tiivistys

- [x] Ensimmäinen erä: 204 SVG:tä tarkastettu, 204 tiivistetty. Lähdeblobit tarkistettu SHA-1:llä. FI/EN-pareille yhteinen korkeus; muotojen, tekstien ja nuolten skaala ennallaan.
- [x] Pikkukuvat käyttävät SVG:n omaa kuvasuhdetta, eivät pakotettua 680/370-suhdetta.
- [x] Lisätty toistettava Node.js-työkalu developement/compact-svg.js (oletuksena dry-run; --write kirjoittaa).
- [x] Toinen osatallennus: 118 SVG:tä tiivistetty ja lähdeblobit tarkistettu. Korkeussumma 43660 → 40554.
- [x] Viimeinen osatallennus: 138 SVG:tä tiivistetty ja lähdeblobit tarkistettu. Korkeussumma 51060 → 46484.
- [x] Kaikki 460 SVG:tä (230 FI/EN-paria) tiivistetty ja tallennettu. Kokonaiskorkeus 169320 → 138236. Tiivistys idempotentti korkeuden osalta.
- [ ] Visuaalinen selaintarkastus ja koko aineiston XML-parseritarkastus.
