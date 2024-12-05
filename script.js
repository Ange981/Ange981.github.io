// URLs de imágenes de gatos y no-gatos
const todasLasImagenes = [
  { url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEzgOKpeM5mAvAYSrAqU83JUDV_RpCMV4Cmw&s", esGato: true },
  { url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6ufCAv0jhICLo0HPy6y9i5OE1jcfx-xKtcw&s", esGato: true },
  { url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS09KUR0B1Ad-utFXV0O_z720QGoozhZa_asg&s", esGato: true },
  { url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaSfpQfYw1E0mRm_RY5GKQn1pTKOn6xlTBOA&s", esGato: true },
  { url: "https://us.123rf.com/450wm/mm140/mm1402204/mm140220400132/185581544-fotograf%C3%ADas-de-lindos-gatos-callejeros-que-viven-en-la-remota-isla-felina-de-ogamijima-miyakojima.jpg?ver=6", esGato: true },
  { url: "https://es.onlyfresh.com/cdn/shop/articles/shutterstock_1478941268_1000x.jpg?v=1648630983", esGato: true },
  { url: "https://placebear.com/100/100", esGato: false },
  { url: "https://placebear.com/101/101", esGato: false },
  { url: "https://placebear.com/102/102", esGato: false },
  { url: "https://placebear.com/103/103", esGato: false },
  { url: "https://placebear.com/104/104", esGato: false },
  { url: "https://placebear.com/105/105", esGato: false },
  { url: "https://placedog.net/100/100", esGato: false },
  { url: "https://placedog.net/101/101", esGato: false },
  { url: "https://placedog.net/102/102", esGato: false },
  { url: "https://placedog.net/103/103", esGato: false }
];

let imagenesSeleccionadas = [];
let gatosCorrectos = [];

// Función para obtener un subconjunto aleatorio de imágenes
function obtenerImagenesAleatorias(array, num) {
  const mezcladas = array.sort(() => 0.5 - Math.random());
  return mezcladas.slice(0, num);
}

// Mostrar la ventana modal al presionar el botón "Mostrar CAPTCHA"
document.getElementById('mostrarCaptchaBtn').addEventListener('click', function () {
  document.getElementById('checkboxNoRobot').checked = false;
  document.getElementById('contenedorNoRobot').style.display = 'block';
  document.getElementById('contenedorCaptcha').style.display = 'none';
  document.getElementById('modalCaptcha').style.display = 'block';
});

// Cerrar la ventana modal al presionar la "X"
document.getElementById('cerrarModalCaptcha').addEventListener('click', function () {
  document.getElementById('modalCaptcha').style.display = 'none';
});

// Cerrar la ventana modal al hacer clic fuera de ella
window.addEventListener('click', function (event) {
  const modal = document.getElementById('modalCaptcha');
  if (event.target === modal) {
    modal.style.display = 'none';
  }
});

// Función para generar el CAPTCHA
function generarCaptcha() {
  const contenedorImagenesCaptcha = document.getElementById('imagenesCaptcha');
  contenedorImagenesCaptcha.innerHTML = '';  // Limpiar el contenedor de imágenes
  imagenesSeleccionadas = [];
  gatosCorrectos = [];

  // Tomamos 8 imágenes aleatorias del conjunto total
  const imagenesAleatorias = obtenerImagenesAleatorias(todasLasImagenes, 8);

  imagenesAleatorias.forEach((imagen, index) => {
    const img = document.createElement('img');
    img.src = imagen.url;
    img.alt = `Imagen ${index + 1}`;
    img.classList.add('imagen-captcha');
    img.dataset.esGato = imagen.esGato;

    img.addEventListener('click', function () {
      if (imagenesSeleccionadas.includes(index)) {
        imagenesSeleccionadas = imagenesSeleccionadas.filter(i => i !== index);
        img.classList.remove('seleccionada');
      } else {
        imagenesSeleccionadas.push(index);
        img.classList.add('seleccionada');
      }
    });

    contenedorImagenesCaptcha.appendChild(img);

    if (imagen.esGato) {
      gatosCorrectos.push(index);
    }
  });
}

// Mostrar CAPTCHA al marcar el checkbox "No soy un robot"
document.getElementById('checkboxNoRobot').addEventListener('change', function () {
  if (this.checked) {
    document.getElementById('contenedorNoRobot').style.display = 'none';
    document.getElementById('contenedorCaptcha').style.display = 'block';
    generarCaptcha(); // Generar CAPTCHA cuando se marque el checkbox
  }
});

// Validar CAPTCHA
document.querySelector('.validar-captcha').addEventListener('click', function (e) {
  e.preventDefault();

  // Verificar si las imágenes seleccionadas son todas gatos
  const esCaptchaValido = imagenesSeleccionadas.length === gatosCorrectos.length &&
    imagenesSeleccionadas.every(index => gatosCorrectos.includes(index));

  if (esCaptchaValido) {
    document.getElementById('mensajeCaptcha').textContent = "CAPTCHA correcto.";
    document.getElementById('mensajeCaptcha').style.color = "green";

    // Reiniciar y cerrar el modal antes de abrir WhatsApp
    setTimeout(function () {
      document.getElementById('modalCaptcha').style.display = 'none'; // Cerrar el modal
      document.getElementById('mensajeCaptcha').textContent = ""; // Reiniciar mensaje
      generarCaptcha(); // Reiniciar CAPTCHA
      window.open("https://api.whatsapp.com/send?phone=3334955374", "_blank"); // Reemplaza con el enlace de WhatsApp
    }, 1000);
  } else {
    document.getElementById('mensajeCaptcha').textContent = "CAPTCHA incorrecto. Inténtalo de nuevo.";
    document.getElementById('mensajeCaptcha').style.color = "red";
  }
});

// Refrescar CAPTCHA
document.querySelector('.refrescar-captcha').addEventListener('click', generarCaptcha);
