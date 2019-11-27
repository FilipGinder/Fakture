
<div class="row" id="okvir_registracije">
			<div class="col-sm-3"></div>
     <div class="col-sm-6" id="okvir">
       <div id="naslov">
         <h5 id="naslovh5">Unos podataka o korisniku i firmi</h5>
         <button type="button" class="close">
       </div>
          <div id="strelice">
               <div id="strelica1">Podaci o korisniku</div>
               <div id="strelica2">Podaci o firmi</div>
               <div id="strelica3">Podaci o firmi</div>
               <div id="strelica4">Kontakt firme</div>
          </div>
          <div id="sadrzaj">

              <form id="formica">
              <div id="korak-0" class="korak">

                <label for="message-text" class="col-form-label"><span class="label_inputa_registracija" id="label_email">Email:</span></label>
                <input type="email" id="email" placeholder="Email" class="form-control" required>
                <label for="message-text" class="col-form-label"><span class="label_inputa_registracija" id="label_lozinka">Lozinka:</span></label>
                <input type="password" id="lozinka" placeholder="Lozinka" class="form-control" name="lozinka" required>
								<span toggle="#lozinka" id="showPasswordInRegistration" class="fa fa-lg fa-eye field-icon toggle-password"></span>
                <label for="message-text" class="col-form-label"><span class="label_inputa_registracija" id="label_ime_vlasnika">Ime i prezime vlasnika:</span></label>
                <input type="text" id="ime_vlasnika" placeholder="Ime i prezime vlasnika koje ce se prikazivati na fakturi" class="form-control" required>

              </div>
              <div id="korak-1" class="korak">

                  <label for="recipient-name" class="col-form-label"><span class="label_inputa_registracija" id="label_ime_firme">Ime Firme:</span></label>
                  <input type="text" id="ime_firme" placeholder="Ime Firme" class="form-control" required>
                  <label for="message-text" class="col-form-label"><span class="label_inputa_registracija" id="label_adresa_firme">Adresa Firme:</span></label>
                  <input type="text" id="adresa_firme" placeholder="Adresa Firme" class="form-control" required>
                  <label for="message-text" class="col-form-label"><span class="label_inputa_registracija" id="label_lokacija_firme">Lokacija Firme:</span></label>
                  <input type="text" id="lokacija_firme" placeholder="Lokacija Firme/Grad" class="form-control" required>

                </div>
                <div id="korak-2" class="korak">

                  <label for="message-text" class="col-form-label"><span class="label_inputa_registracija" id="label_pib_firme">Pib Firme:</span></label>
                  <input type="text" id="pib_firme" placeholder="Pib Firme" class="form-control" maxlength="9" required>
                  <label for="message-text" class="col-form-label"><span class="label_inputa_registracija" id="label_maticni_br_firme">Maticni broj Firme:</span></label>
                  <input type="text" id="maticni_br_firme" placeholder="Maticni broj Firme" class="form-control" maxlength="8" required>
                  <label for="message-text" class="col-form-label"><span class="label_inputa_registracija" id="label_opis_firme">Delatnost firme:</span></label>
                  <input type="text"  id="opis_firme" placeholder="Opis firme cime se bavi" class="form-control" title='Ovo polje nije obavezno popuniti'>

                </div>
                <div id="korak-3" class="korak">

                  <label for="message-text" class="col-form-label"><span class="label_inputa_registracija" id="label_ziro_racun">Ziro Racun:</span></label>
                  <input type="text"  id="ziro_racun" placeholder="Ziro Racun" class="form-control" maxlength="20" required>
                  <label for="message-text" class="col-form-label"><span class="label_inputa_registracija" id="label_broj_telefona">Broj telefona u formatu (xxx-xxx-xxxx)</span></label>
                  <input type="tel" id="broj_telefona" name="broj_telefona" placeholder="064/123-4567" class="form-control" maxlength="12" title='Ovo polje je obavezno popuniti'>
                  <label for="message-text" class="col-form-label"><span class="label_inputa_registracija" id="label_fix_br_telefona">Fix broj telefona:</span></label>
                  <input type="text" id="fix_br_telefona" placeholder="011/123-4567" class="form-control" maxlength="12" title='Ovo polje nije obavezno popuniti'>

                </div>

                <input type="button" class="btn btn-danger" id="cancel" value="Cancel">
              <div id="dugmici">

                <input type="button" class="btn btn-secondary" value="Nazad" id="nazad">
                <input type="button" class="btn btn-secondary" value="Napred" id="napred">
                <input type="button" class="btn btn-primary" value="Sacuvaj" id="sacuvaj">
              </div><br><br>
            </form>
            <!-- <hr id="crta"> -->
            <div>
              <div id="div_uslovi_koriscenja">
                  <input type="checkbox" id="uslovi_koriscenja">
                  <span><a href="#" data-toggle="modal" data-target="#exampleModalScrollable" id="modal_uslovi_koriscenja">Prihvatam uslove koriscenja</a></span>
              </div>
              <input type="button" value="Zatvori" class="btn btn-secondary" id="zatvori">
            </div>

          </div>
     </div>
     <div class="col-sm-3"></div>
     </div>
