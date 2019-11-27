<div class="container" id="podesavanje">
  <div class="row">
    <div class="col-md-12">
      <h3 id="naslov_update">Izmeni licne podatke</h3>
      <input type="image" src="slika/icon.png" id="povratak_na_pocetnu_update">
      <input type="button" class="btn btn-danger btn-sm" value="Obrisi nalog" id="obrisi_nalog">
      <select id="odabir_jezika" class="btn btn-danger btn-sm">
            <option id="Promeni_jezik" hidden>Promeni jezik</option>
            <option value="srpski">Srpski</option>
            <option value="engleski">Englisch</option>
      </select>
      <select id="odabir_boje_pozadine" class="btn btn-danger btn-sm">
            <option id="Promeni_boju" hidden>Promeni pozadinu</option>
            <option id="default_boja" value="podrazumevano">Podrazumevano</option>
            <option id="svetlo_siva_boja" value="svetlo_siva">Svetlo siva</option>
            <option id="srednje_siva_boja" value="srednje_siva">Srednje siva</option>
            <option id="tamno_siva_boja" value="tamno_siva">Tamno siva</option>
      </select>

    </div>
  </div>
  <div class="row">
    <div class="col-md-4">
      <label id="label_email_update" for="email_update">Promeni email:</label><br>
      <input type="text" id="email_update" class="form-control" value=""><br>

      <label id="label_lozinka_update" for="lozinka_update">Unesi novu lozinku / nije obavezno:</label><br>
      <input type="password" id="lozinka_update" class="form-control" value=""><br>

      <label id="label_ime_i_prezime_update" for="ime_i_prezime_update">Promeni ime i prezime:</label><br>
      <input type="text" id="ime_i_prezime_update" class="form-control" value=""><br>

      <label id="label_ime_firme_update" for="ime_firme_update">Promeni ime firme:</label><br>
      <input type="text" id="ime_firme_update" class="form-control" value=""><br>
    </div>
    <div class="col-md-4">
      <label id="label_adresa_firme_update" for="adresa_firme_update">Promeni adresu firme:</label><br>
      <input type="text" id="adresa_firme_update" class="form-control" value=""><br>

      <label id="label_lokacija_firme_update" for="lokacija_firme_update">Promeni lokaciju:</label><br>
      <input type="text" id="lokacija_firme_update" class="form-control" value=""><br>

      <label id="label_pib_firme_update" for="pib_firme_update">Promeni pib:</label><br>
      <input type="text" id="pib_firme_update" class="form-control" maxlength="9" value="" required><br>

      <label id="label_maticni_br_firme_update" for="maticni_br_firme_update">Promeni maticni broj:</label><br>
      <input type="text" id="maticni_br_firme_update" class="form-control" maxlength="8" value="" required><br>
    </div>
    <div class="col-md-4">
      <label id="label_opis_firme_update" for="opis_firme_update">Promeni opis:</label><br>
      <input type="text" id="opis_firme_update" class="form-control" value=""><br>

      <label id="label_ziro_racun_update" for="ziro_racun_update">Promeni ziro racun:</label><br>
      <input type="text" id="ziro_racun_update" class="form-control" maxlength="20" value=""><br>

      <label id="label_broj_telefona_update" for="broj_telefona_update">Promeni broj telefona:</label><br>
      <input type="text" id="broj_telefona_update" maxlength="12" title='Ovo polje je obavezno popuniti' class="form-control" value=""><br>

      <label id="label_fix_br_telefona_update" for="fix_br_telefona_update">Promeni broj fix telefona:</label><br>
      <input type="text" id="fix_br_telefona_update" class="form-control" maxlength="12" title='Ovo polje nije obavezno popuniti' value=""><br>
    </div>
  </div>
  <input type="button" class="btn btn-success" value="Sacuvaj promene" id="sacuvaj_promene">

</div>
