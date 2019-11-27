
<div  id="dole" class="container">



  <nav class="navbar fixed-top navbar-dark bg-primary" id="gornja_navigacija_pri_otvorenoj_fakturi">

          <div>
            <span style="margin-right:30px"><b id="naslov_status_fakture_na_otvorenoj_fakturi">STATUS FAKTURE:</b></span>
            <b id="ispis_o_trenutnom_statusu"></b>
            <span id="promeni_status_text">Promeni status u</span>
            <select id="select_placeno-nije_placeno">
              <option id="skrivena_opcija_status" value="" disabled selected hidden>Izaberi status</option>
              <option id="Nije_placeno" value="Nije placena">Nije placena</option>
              <option id="Placeno" value="Placena">Placena</option>
              <option id="Storno" value="Storno">Storno</option>
            </select>
         </div>
         <div class=" alert-success" id="ispis_o_uspesno_promenjenom_statusu">

         </div>
  </nav>




   <div id="papir">

    <nav class="navbar fixed-bottom navbar-light bg-light" id="nav">
           <div id="navic"></div>
            <div id="navic2">
              <span id="oznaka_dokumenta" style="margin-right:50px"><b>FAKTURA</b></span>
              <button type="button" id="dugme_za_nazad_sa_pregleda" class="btn btn-info btn-sm">Nazad</button>
           </div>

    </nav>


    <nav class="navbar" id="predracun_naslov">
PREDRACUN
    </nav>
    <div id="slikica_logo_za_stampanje">

    </div>
    <!-- <img src="slika/Milan-Grb.JPG" alt="Logo" id="slika_logo"> -->

         <h1 id="ime_firme_za_stampanje"></h1>
              <p><b><span id="opis_firme_za_stampanje"></span></b></p>
              <p><b><span id="lokacija_firme_za_stampanje"></span> &nbsp;<span id="adresa_firme_za_stampanje"></span></b></p>
              <p id="treci_red_za_stampanje_prevod"><b>PIB:&nbsp; <span id="pib_firme_za_stampanje"></span> &nbsp; MATICNI &nbsp;BROJ: &nbsp; <span id="maticni_br_firme_za_stampanje"></span></b></p>
              <p id="cetvrti_red_za_stampanje_prevod"><b>ZIRO &nbsp; RACUN: &nbsp; <span id="ziro_racun_za_stampanje"></span></b></p>
              <p id="peti_red_za_stampanje_prevod"><b>VLASNIK: &nbsp;<span id="ime_vlasnika_za_stampanje"></span> </b></p>
              <p id="sesti_red_za_stampanje_prevod"><b>BROJ TELEFONA: &nbsp;<span id="broj_telefona_za_stampanje"></span> </b></p>
              <p id="sedmi_red_za_stampanje_prevod"><b>FIX BROJ TELEFONA: &nbsp;<span id="fix_br_telefona_za_stampanje"></span> </b></p>
              <p><b>EMAIL: &nbsp;<span id="email_za_stampanje"></span> </b></p>

               <div id="broj_fakture">FAKTURA:</div>

          <div id="podaci_kupca">

          </div>
    <table class="table table-bordered table-hovered" id="tabla_za_stampanje">
           <thead>
                 <tr id="naslov_tabele_za_stampanje">
                   <td id="naslov_kolona_za_stampanje1"><b>R.B</b></td>
                   <td id="naslov_kolona_za_stampanje2"><b>Naziv artikla</b></td>
                   <td id="naslov_kolona_za_stampanje3"><b>JM</b></td>
                   <td id="naslov_kolona_za_stampanje4"><b>Kolicina</b></td>
                   <td id="naslov_kolona_za_stampanje5"><b>Cena bez PDV</b></td>
                   <td id="naslov_kolona_za_stampanje6"><b>Rabat</b></td>
                   <td id="naslov_kolona_za_stampanje7"><b>PDV</b></td>
                   <td id="naslov_kolona_za_stampanje8"><b>Iznos PDV</b></td>
                   <td id="naslov_kolona_za_stampanje9"><b>Ukupna vrednost</b></td>
                 </tr>
           </thead>
           <tbody>

           </tbody>
   </table>
   <strong id="paragraf_za_placanje">UKUPAN&nbsp;IZNOS&nbsp;ZA&nbsp;UPLATU:&nbsp;&nbsp;<span id="za_placanje"></span><span id="valuta"></span></strong>
                 <div class="ukupne_cifre">

                   <p id="paragraf_cena">Cena bez PDV:&nbsp;&nbsp;<strong id="ukupaa_cena_bez_pdv"></strong></p>

                   <p id="paragraf_pdv">Iznos PDV:&nbsp;&nbsp;<strong id="ukupan_iznos_pdv"></strong></p>

                   <p id="paragraf_ukupno">Vrednost sa PDV:&nbsp;&nbsp;<strong id="ukupna_ukupna_vrednost"></strong></p>

                   <p id="paragraf_rabat">Rabat:&nbsp;&nbsp;<strong id="ukupan_rabat"></strong></p>

                  </div>
                  <div class="potpisi">
                    <div id="levi_potpis">RACUN&nbsp;KREIRAO</div>
                    <div id="pecat">M.P</div>
                    <div id="desni_potpis">RACUN&nbsp;PRIMIO</div>
                  </div>



                  <div id="forma_za_slanje_emaila">

                    <button type="button" id="zatvaranje_forma_za_slanje_emaila" class="close" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>

                  <h5 id="forma_emaila_naslov">Posalji fakturu</h5>

                  <p id="forma_emaila_obavestenje">Slanjem faktura postaje zvanicna.</p>

                  <div id="primalac_email_fakture">Primalac:&nbsp;<br><input id="ime_primaoca_emaila" type="text" value="" placeholder="Unesite ime primaoca"></div>
                  <hr>
                  <br>
                  <label for="naslov_emaila"  id="forma_emaila_naslov_label">Naslov</label><br>
                  <input type="text" id="naslov_emaila">
                  <br>
                  <br>
                  <hr>
                  <label for="textarea_emaila" id="forma_emaila_textarea">Poruka</label><br>
                  <textarea name="name" id="textarea_emaila" cols="35"></textarea>
                  <hr>
                  <div id="dugme_posalji_email">
                    <!-- dugme pravimo dinamicki iz jquery-pocetna da bih imalo id fakture -->
                  </div>
                  <div id="informacija_o_statusu_slanja_emaila" style="height:50px;width: 100%; margin-top:4px;">

                  </div>


                  </div>



  </div>
</div>
