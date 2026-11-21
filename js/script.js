
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import { DateTime } from "luxon";

// Obtener los elementos HTML
const resultado = document.getElementById("resultado");
const boton = document.getElementById("calcular");

// Guardar la fecha seleccionada
let fechaSeleccionada = null;

// Configurar el calendario
flatpickr("#fechaNacimiento", {
    dateFormat: "Y-m-d",
    maxDate: "today",

    onChange: function (selectedDates) {
        fechaSeleccionada = selectedDates[0];
    }
});

// Escuchar el clic del botón
boton.addEventListener("click", function () {

    // Verificar que exista una fecha
    if (!fechaSeleccionada) {
        resultado.textContent = "Selecciona tu fecha de nacimiento";
        return;
    }

    // Convertir la fecha de JavaScript a Luxon
    const nacimiento = DateTime
        .fromJSDate(fechaSeleccionada)
        .startOf("day");

    // Obtener la fecha actual
    const actual = DateTime.now().startOf("day");

    // Calcular la edad
    const diferencia = actual.diff(nacimiento, [
        "years",
        "months",
        "days"
    ]);

    // Obtener los resultados
    const edad = diferencia.toObject();

    // Mostrar la edad
    resultado.innerHTML = `
        <h2>Tu edad es:</h2>
        <p>${Math.floor(edad.years)} años</p>
        <p>${Math.floor(edad.months)} meses</p>
        <p>${Math.floor(edad.days)} días</p>
    `;
});
