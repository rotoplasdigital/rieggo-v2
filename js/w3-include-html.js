//https://www.w3schools.com/howto/howto_html_include.asp
function includeHTML() {
	var z, i, elmnt, file, xhttp;
	/*loop through a collection of all HTML elements:*/
	z = document.getElementsByTagName("*");
	for (i = 0; i < z.length; i++) {
		elmnt = z[i];
		/*search for elements with a certain atrribute:*/
		file = elmnt.getAttribute("w3-include-html");
		if (file) {
		/*make an HTTP request using the attribute value as the file name:*/
		xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4) {
			if (this.status == 200) {elmnt.innerHTML = this.responseText;}
			if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
			/*remove the attribute, and call this function once more:*/
			elmnt.removeAttribute("w3-include-html");
			includeHTML();
			}
		}      
		xhttp.open("GET", file, true);
		xhttp.send();
		/*exit the function:*/
		return;
		}
	}

	// cambio de logo
	if ($('nav').hasClass('menu-secundario')) {
		//console.log('secundario');
		$('#inversionistas-navegacion-logo').attr("src","resources/rotoplas_logo.svg");
		$('#inversionistas-navegacion-logo-interno').attr("src","../resources/rotoplas_logo.svg");
		$('.primera-linea').css('display','flex');
		$('.segunda-linea').css('font-size','13px');
		$('#languageSelector').css('font-size','12px');
	} else {
		//console.log('principal');
		$('#inversionistas-navegacion-logo').attr("src","resources/rotoplas_logo_blanco_azul.svg");
		$('#inversionistas-navegacion-logo-interno').attr("src","../resources/rotoplas_logo_blanco_azul.svg");
		$('.primera-linea').css('display','none');
	}
};