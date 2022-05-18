
        function oznac(bunka) {

            if (bunka.className != "tip" && bunka.parentElement.parentElement.getElementsByClassName("tip").length < 6) {/**/
                bunka.classList.add("tip");

                if (bunka.classList.contains("los")) {
                    bunka.classList.remove("los");
                }
            }
            else if (bunka.classList.contains("tip")) {
                bunka.classList.remove("tip");

                bunka.classList.remove("los");
            }
        }
        var vylosovanaCisla = new Array();

        function losuj() {
            let nahodneCislo;

            if (vylosovanaCisla.length != 0) { vymazCisla(); }
            do {
                nahodneCislo = Math.floor(Math.random() * 49 + 1);
                if (vylosovanaCisla.indexOf(nahodneCislo) == -1) {

                    vylosovanaCisla.push(nahodneCislo);
                }
            } while (vylosovanaCisla.length < 6);

            zobrazVylosovanaCisla();
            zobrazSerazenaCisla();

            zobrazCisla();
            zobrazVysledek();
        }
        function zobrazVylosovanaCisla() {
            for (let i = 0; i < 6; i++) {
                document.querySelectorAll("#vylosovano td")[i].innerHTML = vylosovanaCisla[i];
            }
        }
        function zobrazSerazenaCisla() {
            vylosovanaCisla.sort((a, b) => a - b);
            for (let i = 0; i < 6; i++) {
                document.querySelectorAll("#serazeno td")[i].innerHTML = vylosovanaCisla[i];
            }
        }
        function vytvorTabulkuOld() {

            let tabulka = "<table>";
            for (let r = 0; r < 7; r++) {
                tabulka += "<tr>";
                for (let s = 1; s <= 7; s++) {
                    tabulka += "<td onclick='oznac(this)'>" + (r * 7 + s) + "</td>";
                }
                tabulka += "</tr>";
            }
            tabulka += "</table>";
            document.querySelector("section").innerHTML = "<article id='1'><h2>TABULKA 1</h2></article>";
            document.querySelector("article").innerHTML /**/ +=/**/ tabulka;/**/

        }

        function vytvorTabulku() {
            pocetArticle = document.querySelector("section").childElementCount;
            let article = document.createElement("article");
            article.id = (pocetArticle + 1);
            let h2 = document.createElement("h2");
            h2.innerHTML = "TABULKA " + (pocetArticle + 1);
            article.appendChild(h2);
            let table = document.createElement("table");
            for (let r = 0; r < 7; r++) {
                let row = document.createElement("tr");
                for (let s = 1; s <= 7; s++) {
                    let cell = document.createElement("td");
                    cell.innerHTML = r * 7 + s;
                    cell.addEventListener("click", function () { oznac(this); });
                    row.appendChild(cell);
                }
                table.appendChild(row);
            }
            article.appendChild(table);
            document.querySelector("section").appendChild(article);
            if (pocetArticle == 4) {
                document.querySelector("button").style.display = "none";
            }
        }
        function vymazCisla() {
            vylosovanaCisla.splice(0, 6);
            let pocetLosovanych = document.querySelectorAll(".los").length;
            for (let i = 0; i < pocetLosovanych; i++) {
                document.querySelectorAll(".los")[0].classList.remove("los");
            }

        }
        function zobrazCisla() {
            for (let i = 0; i < 6; i++) {
                for (let j = 0; j < document.getElementsByTagName("table").length - 2; j++) {

                    document.querySelectorAll("td")[vylosovanaCisla[i] - 1 + 49 * j].classList.add("los");

                }
            }
        }
        function zobrazVysledek() {
            let poctyUhodnutych = new Array();

            for (let i = 0; i < document.querySelectorAll("table").length - 2; i++) {
                poctyUhodnutych.push(document.querySelectorAll("table")[i].querySelectorAll("td.tip.los").length);
            }
            document.querySelector("#uhodnutaCisla").innerHTML = "Nejvyšší počet uhodnutých čísel: " + Math.max(...poctyUhodnutych);
        }
