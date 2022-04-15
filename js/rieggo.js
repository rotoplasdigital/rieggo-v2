jQuery(document).ready(function($){
	// Formulario, campo oculto
	$("#00N1I00000P9xne").on('change', function(){
		optionValue = $("#00N1I00000P9xne").find(':selected').val()
		//console.log('change: ' + optionValue)
		if(optionValue === "Otro") {
			$('#formularioTextArea').css('display','block')
		} else  {
			$('#formularioTextArea').css('display','none')
			$('#00N1I00000P9xnj').val('')
		}
	})
	// Capacitacion
	var videoUrl = ''
	var videoBotones = document.getElementsByClassName('capacitacion-video-btn')
	// Si exite las dos cookies abre el video
	if( Cookies.get('usdatacol') == 'yes' && Cookies.get('uslasturlvideo') ) {
		videoUrl = Cookies.get('uslasturlvideo')
		abrirVideo()
		Cookies.set('uslasturlvideo', '', { expires: 365 })
	}
	Array.from(videoBotones).forEach(function(element){
		element.addEventListener('click', verificarCookie)
	})
	// Verificar la Cookie
	function verificarCookie(e) {
		// prevenimos el funcionamiento de los botones
		e.preventDefault()
		// valor del atributo url del boton
		videoUrl = this.getAttribute('url')
		//comprovamos la cookie
		if ( Cookies.get('usdatacol') ) {
			// Si exite la cookie abrimos el video correspondiente
			console.log('usdatacol:si')
			abrirVideo()
		} else {
			// Se abre el formulario para capturar los datos cookie:no
			console.log('usdatacol:no')
			Fancybox.show([
				{ 
					src: "#capacitacion-form", 
					type: "inline" 
				}
			])
		}
	}
	// Abrir video
	function abrirVideo() {
		Fancybox.show([
			{
				src: videoUrl,
				type: "video"
			}
		])
	}
	// Cerrar video
	function cerrarVideo() {
		Fancybox.close()
	}
	// Registro en Google Sheets y envio de correo
	const scriptURL = 'https://script.google.com/macros/s/AKfycbxmKAgHEHEih6TfHAuUN6Rl6oROKKdeqxDcPb-DZWskFaUv5ab58zbBeOxx3Y3L5AkV/exec'
	const form = document.forms['form']
	form.addEventListener('submit', e => {
		e.preventDefault()
		fetch(scriptURL, { method: 'POST', body: new FormData(form)})
			.then(
				response => console.log('Success!', response)
			)
			.then(function() {
				// Al no haber Cookie se crea
				if ( Cookies.get('usdatacol') ) {
					console.log('response:cookie:si')
				} else {
					console.log('response:cookie:no')
					Cookies.set('usdatacol', 'yes', { expires: 365 })
					Cookies.set('uslasturlvideo', videoUrl, { expires: 365 })
				}
				cerrarVideo()
				form.submit()
			})
			.catch(error => console.error('Error!', error.message))
	})
});