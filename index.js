/**
 * Pripremio sam vam slijedeću šprancu jer još niste učili fetch.
 * Stoga vas molim nadogradite kod da radi punu funkcionalnost koristeći pripremljenu
 * funkciju prikaziNoveRezultate u koju ćete kao parameter dobiti objekt sa rezultatima
 * nakon što se dohvati(fetch-a) rezultat sa nationalize.io apija.
 *
 * Molim pokušajte i sami exploreati još neke metode DOM-a, te ih primjenjivati.
 * Konkretno mislim na to da osim appendChild, postoje i removeChild i lastElementChild
 * uz pomoć kojih možete izbaciti prethodi rezultat iz prikaza, te onda dodati novi rezultat.
 *
 * Rezultate bi bilo zgodno prikazivati u ul elementu.
 * Bilo bi zgodno i kada biste od stvorili klasu iz koje ćete instancirati objekte s kojih
 * ćete pozivom na određenu metodu izbacivati konkretni html element (Npr. cijeli ul sa svim itemima)
 * za ubacivanje u dom stablo.
 *
 * Ekstra poene biste dobili kada biste sve instancirane objekte iz klase (za svaku novu pretragu po jedan)
 * pospremili dinamički u "Prethodne pretrage:" područje u htmlu, te po uzoru na ove pripremljene dummy botune
 * automatski generirate prave klikom na koje bi se prikazao taj davno prije dohvaćeni rezultat u rezultatima.
 *
 * Ps. tko god napravi molim da link na github repo, te link na github page dijeli u našu whatsup grupu tako da
 * bude od pomoći ili barem nadahnuća kolegama koji se muče sa izradom.
 *
 * S ljubavlju,
 * vaš profesor Antun
 *
 */

document
  .getElementById("botunZaSlanje")
  .addEventListener("click", dohvatiPodatke);

function dohvatiPodatke(event) {
  let unos = event.target.previousElementSibling.value;
  fetch(`https://api.nationalize.io/?name=${unos}`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("NETWORK RESPONSE ERROR");
      }
    })
    .then((data) => {
      console.log(data);
      prikaziNoveRezultate(data);
    })
    .catch((error) => console.error("FETCH ERROR:", error));
}

function prikaziNoveRezultate(data) {
  const country1 = data.country[0];
  const country2 = data.country[1];
  const country3 = data.country[2];

  const countryLi1 = document.getElementById("drzava1");
  const countryLi2 = document.getElementById("drzava2");
  const countryLi3 = document.getElementById("drzava3");

  const naziv1 = country1.country_id;
  const naziv2 = country2.country_id;
  const naziv3 = country3.country_id;

  const vjerojatnost1 = country1.probability;
  const vjerojatnost2 = country2.probability;
  const vjerojatnost3 = country3.probability;

  countryLi1.innerHTML =
    "1. Država: " + naziv1 + " |  Vjerojatnost: " + vjerojatnost1 * 100 + "%";
  countryLi2.innerHTML =
    "2. Država: " + naziv2 + " | Vjerojatnost: " + vjerojatnost2 * 100 + "%";
  countryLi3.innerHTML =
    "3. Država: " + naziv3 + " | Vjerojatnost: " + vjerojatnost3 * 100 + "%";
}
