<div class="container" id="ceo_div_na_stanici_prikaz_klijenta">
  <div class="row">
    <div class="col-md-12" id="div_gornji_deo_na_stanici_prikaz_klijenta">
      <input type="image" src="slika/icon.png" value="Nazad" id="nazad_sa_stanice_prikaz_klijenta">
      <h3 id="prikaz_korisnika_naslov">Prikaz klijenta</h3>

    </div>
    </div>
    <div class="row" id="div_sa_informacijama_na_stanici_prikaz_klijenta">

        <div class="col-lg-4" id="prva_kolona_prikaz_klijenta">
          <label for="prikaz_korisnika_ime_firme" id="label_ime_komintenta_prikaz_klijenta">Ime klijenta:</label>
          <h3 id="prikaz_korisnika_ime_firme"></h3>
          <input type="text" value="" id="prikaz_klijenta_promena_imena">
          <label for="prikaz_korisnika_pib" id="label_pib_komintenta_prikaz_klijenta">Pib klijenta:</label>
          <h3 id="prikaz_korisnika_pib"></h3>
          <input type="text" value="" id="prikaz_klijenta_promena_piba">
        </div>
        <div class="col-lg-4" id="druga_kolona_prikaz_klijenta">
          <label for="prikaz_korisnika_lokacija" id="label_predstavnistvo_komintenta_prikaz_klijenta">Predstavnistvo klijenta:</label>
          <h3 id="prikaz_korisnika_lokacija"></h3>
          <input type="text" value="" id="prikaz_klijenta_promena_lokacije">
          <label for="prikaz_korisnika_email" id="label_email_komintenta_prikaz_klijenta">E-mail klijenta:</label>
          <h3 id="prikaz_korisnika_email"></h3>
          <input type="text" value="" id="prikaz_klijenta_promena_emaila">
        </div>
        <div class="col-lg-4" id="treca_kolona_prikaz_klijenta">
          <input type="button" class="btn btn-secondary btn-sm" id="promeni_osnovne_podatke_o_klijentu" value="Promeni osnovne podatke o klijentu">
          <input type="button" class="btn btn-secondary btn-sm" id="promeni_osnovne_podatke_o_klijentu_dugme_sacuvaj" value="Sacuvaj">
            <input type="button" class="btn btn-danger btn-sm" id="napravi_novu_fakturu_dugme_prikaz_klijenta" value="Napravi novu fakturu za klijenta">
        </div>

  </div>
  <div class="row" id="donji_red_prikaz_korisnikovih_faktura_u_tabeli">
    <div class="col-md-12">
      <div id="selektovi_prikaz_klijenta">
        <div id="div_izbor_statusa_prikaz_klijenta_stranica">
                <select class="js-example-basic-single" id="izbor_statusa_prikaz_klijenta_stranica" data-placeholder="Sve fakture po statusu">
                     <option value="sve_fakture" id="select_obelezeni_odabir_statusa_klijentska_strana" selected>Sve fakture po statusu</option>
                </select>
        </div>
        <div id="div_izbor_godine_prikaz_klijenta_stranica">
                <select class="js-example-basic-single" id="izbor_godine_prikaz_klijenta_stranica" data-placeholder="Sve fakture po godinama">
                     <option value="sve_fakture" selected>Sve fakture po godinama</option>
                </select>
        </div>
      </div>

        <table class="table table-bordered" id="prikaz_korisnikovih_faktura_u_tabeli">
             <thead>
                   <tr>
                     <td id="prikaz_klijenta_naslov_kolona1"><b>R.B</b></td>
                     <td id="prikaz_klijenta_naslov_kolona2"><b>Ime Firme</b></td>
                     <td id="prikaz_klijenta_naslov_kolona3"><b>PIB</b></td>
                     <td id="prikaz_klijenta_naslov_kolona4"><b>Datum</b></td>
                     <td id="prikaz_klijenta_naslov_kolona5"><b>Vrednost fakture</b></td>
                     <td id="prikaz_klijenta_naslov_kolona8"><b>Status</b></td>
                     <td id="prikaz_klijenta_naslov_kolona6"><b>Pregled</b></td>
                     <td id="prikaz_klijenta_naslov_kolona7"><b>izbrisati</b></td>
                   </tr>
             </thead>
             <tbody>

             </tbody>
     </table>
    </div>
  </div>

</div>
