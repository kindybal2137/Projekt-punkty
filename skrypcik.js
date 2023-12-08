const daneJSONUjemne = {
    "p0": {
    "pozycja": "Palenie",
    "punkty": 75
    },
    "p1": {
    "pozycja": "Nagana Rady Pedagogicznej",
    "punkty": 400
    },
    "p2": {
    "pozycja": "Nagana Dyrektora",
    "punkty": 300
    },
    "p3": {
    "pozycja": "Upomnienie Dyrektora",
    "punkty": 150
    },
    "p4": {
    "pozycja": "Nagana wychowawcy",
    "punkty": 100
    },
    "p5": {
    "pozycja": "pomnienie wychowawcy",
    "punkty": 50
    },
    "p6": {
    "pozycja": "Uwaga za naganne zachowanie w czasie zajęć",
    "punkty": 15
    },
    "p7": {
    "pozycja": "Uwaga za naganne zachowanie w czasie zbiorowych imprez",
    "punkty": 30
    },
    "p8": {
    "pozycja": "podrabianie dokumentów szkolnych",
    "punkty": 100
    },
    "p9": {
    "pozycja": "Wandalizm",
    "punkty": 35
    },
    "p10": {
    "pozycja": "Aroganckie zachowanie",
    "punkty": 75
    },
    "p11": {
    "pozycja": "Zaczepki słowne i fizyczne",
    "punkty": 75
    },
    "p12": {
    "pozycja": "Wulgarne słownictwo",
    "punkty": 20
    },
    "p13": {
    "pozycja": "Niewykonywanie poleceń nauczyciela i innych pracowników szkoły",
    "punkty": 20
    },
    "p14": {
    "pozycja": "Niewywiązywanie się ze zobowiązań",
    "punkty": 20
    },
    "p15": {
    "pozycja": "Niewywiązywanie się ze zobowiązań reprezentantów szkoły",
    "punkty": 30
    },
    "p16": {
    "pozycja": "Nieprzestrzeganie przepisów BHP",
    "punkty": 15
    },
    "p17": {
    "pozycja": "Za każdą opuszczoną godzinę bez usprawiedliwienia",
    "punkty": 3
    },
    "p18": {
    "pozycja": "Za każdą opuszczoną godzinę bez usprawiedliwienia w dniu odrabiania zajęć szkolnych",
    "punkty": 5
    },
    "p19": {
    "pozycja": "Za zbiorową ucieczkę z zajęć lekcyjnych",
    "punkty": 20
    },
    "p20": {
    "pozycja": "Spóźnienia",
    "punkty": 1
    },
    "p21": {
    "pozycja": "Zaśmiecanie szkoły i jej otoczenia",
    "punkty": 10
    },
    "p22": {
    "pozycja": "Korzystanie z telefonu komórkowego w czasie lekcji",
    "punkty": 40 
    }
};

const daneJSONDodatnie = {
    "p1": {
    "pozycja": "Udział w olimpiadzie przedmiotowej",
    "punkty": 72.5
  },
  "p2": {
    "pozycja": "Udział w konkursie szkolnym udział",
    "punkty": 25
  },
  "p3": {
    "pozycja": "Udział w konkursie pozaszkolnym",
    "punkty": 46
  },
  "p4": {
    "pozycja": "Udział w zawodach sportowych",
    "punkty": 24.5
  },
  "p5": {
    "pozycja": "Funkcje społeczne w klasie",
    "punkty": 35
  },
  "p6": {
    "pozycja": "Praca społeczna",
    "punkty": 4.33
  },
  "p7": {
    "pozycja": "Uczestnictwo w zorganizowanych zajęciach pozalekcyjnych",
    "punkty": 20
  },
  "p8": {
    "pozycja": "Honorowe krwiodawstwo, wolontariat za każdą akcję",
    "punkty": 30
  },
  "p9": {
    "pozycja": "Frekwencja od 90 %",
    "punkty": 60
  },
  "p10": {
    "pozycja": "Do dyspozycji wychowawców klas programowo najwyższych po konsultacji z zespołem nauczycieli",
    "punkty": 25
  },
  "p11": {
    "pozycja": "Stosunek do obowiązków szkolnych po konsultacji z zespołem nauczycieli",
    "punkty": 15
  },
  "p12": {
    "pozycja": "Kultura osobista po konsultacji z zespołem nauczycieli",
    "punkty": 15
  },
  "p13": {
    "pozycja": "Pomoc koleżeńska uzgodniona z wychowawcą klasy",
    "punkty": 10
  }
};


let noweZliczonePunkty = 100;

function daneHandler(d, formId) {
    const selectElement = document.getElementById(formId);

    Object.keys(d).forEach(key => {
        const value = d[key];

        let z;
        if (typeof value.punkty === "number") {
            z = value.punkty;
        }

        const option = document.createElement("option");
        option.value = `${formId[0]}${key}`;
        option.textContent = `${value.pozycja} [${z}]`;

        option.addEventListener("click", () => {
            obliczPunkty();
        });

        selectElement.appendChild(option);
    });
}

function obliczPunkty() {
    noweZliczonePunkty = 100;

    const optionsUjemne = document.querySelectorAll("#punktyUjemne option:checked");
    const optionsDodatnie = document.querySelectorAll("#punktyDodatnie option:checked");

    optionsUjemne.forEach(option => {
        const value = daneJSONUjemne[option.value.substring(2)];
        if (value && typeof value.punkty === "number") {
            noweZliczonePunkty += value.punkty;
        }
    });

    optionsDodatnie.forEach(option => {
        const value = daneJSONDodatnie[option.value.substring(2)];
        if (value && typeof value.punkty === "number") {
            noweZliczonePunkty += value.punkty;
        }
    });

    const zliczonePunktyElement = document.getElementById("zliczonePunkty");
    zliczonePunktyElement.innerHTML = `Zliczone punkty: ${noweZliczonePunkty}`;
}

daneHandler(daneJSONUjemne, "punktyUjemne");
daneHandler(daneJSONDodatnie, "punktyDodatnie");

const dodajPunktyButton = document.getElementById("dodajPunkty");
const resetujPunktyButton = document.getElementById("resetujPunkty");

dodajPunktyButton.addEventListener("click", () => {
    alert("Dodano punkty!");
});

resetujPunktyButton.addEventListener("click", () => {
    noweZliczonePunkty = 100;
    const zliczonePunktyElement = document.getElementById("zliczonePunkty");
    zliczonePunktyElement.innerHTML = `Zliczone punkty: ${noweZliczonePunkty}`;
    alert("Zresetowano punkty!");
});