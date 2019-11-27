<?php
if(isset($_COOKIE['EMAIL']) && isset($_COOKIE['pass']))
{
	$pass = base64_decode($_COOKIE['pass']);
	?>
<script type="text/javascript">

	$(document).ready(function(){

   $("#email-login").val("<?php echo  $_COOKIE['EMAIL'] ?>");
	 $("#password").val("<?php echo  $pass ?>");
	})
</script>

	<?php
}

 ?>
<div class="row" id="logovanje_div">
			<div class="col-sm-3"></div>
				<div class="col-sm-6" id="forma"><br>

					<div class="form-group centred">
							<input type="text" class="form-control" id="email-login" placeholder="Email">
					</div>

					<div class="form-group centred">
					<input type="password" class="form-control" id="password" placeholder="Lozinka">
					<span toggle="#password" id="showPassword" class="fa fa-lg fa-eye field-icon toggle-password"></span>



					</div>
						 <button type="button" class="btn btn-primary form-control" id="posalji">Prijavite se</button>
				 <br><hr>
					     <!-- <button type="button" class="btn btn-success form-control" class="dugme_registracija" data-toggle="modal" data-target="#exampleModal">Registruj se</button>
					     <br> -->
					     <button type="button" class="btn btn-link form-control" data-toggle="modal" id="link_zaboravljena_lozinka" data-target="#zab_sifra">Zaboravljena lozinka</button>
               <input type="checkbox"  id="zapamti_me">
                <label for="zapamti_me" id="label_zapamti_me">Zapamti me</label>

								<div id="poslednji_div_u_login_boxu">
									<p id="text_o_registraciji">Još uvek nemate nalog na Trikorijum Fakturisanje?</p>&nbsp;<span id="dugme_registracija" data-toggle="modal" data-target="#exampleModal">REGISTRUJTE SE</span>
                </div>

					<!-- <p class="alert alert-info">Za sve vase sugestije/primedbe mozete nas kontaktirati putem neke od drustvenih mreza</p>
					    <div class="socijalne_mreze">
					<a href="viber://chat?number=38169709284"><img src="slicice/viber.png" alt="Viber"></a>
					<a href="https://m.me/ginderfilip"><img src="slicice/messenger ikonica.png" alt="Messenger"></a>
						</div> -->
				</div>

			<div class="col-sm-3"></div>
		</div>
