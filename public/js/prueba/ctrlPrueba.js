import { collection, infos } from "../lib/util.js";
import { sinScript } from "../lib/util.js";

const form = document.querySelector("#vista");

if (form && document.querySelector("[type=submit]")) {
    form.addEventListener("submit", realizaPrueba);
}
vista.style.display = "block";

async function realizaPrueba(e) {
    e.preventDefault();
    
    vista.style.display = 'none';

    let respuestaCorrecta = infos(await collection("QUIZ").orderBy("RESPUESTA_CORRECTA").get());
    
    var numeroRespuestasOK = 0;
    var numeroRespuestasIn = 0;
    let tablaResultados =  /* html */"<thead> <tr> <th>Respuestas</th> </tr> </thead> <tbody>";

    for (const j of respuestaCorrecta) {
        const radios = document.getElementsByName(j.NAME);
        for (const i of radios) {
            if (i.checked) {
                var RESPUESTA = i.value;
                if (RESPUESTA == j.RESPUESTA_CORRECTA) {
                     tablaResultados += 
                        /* html */ `<tr>
                                        <td>Respuesta correcta: </td> 
                                        <td>${RESPUESTA}</td>
                                    </tr>`;
                    numeroRespuestasOK++;
                    break;
                } else {
                    tablaResultados += 
                    /* html */ `<tr>
                                    <td>Respuesta incorrecta: </td> 
                                    <td>${RESPUESTA}</td>
                                </tr>`;
                    numeroRespuestasIn++;
                    break;
                }
            }
        }
    }

    const RESULTADO = `${numeroRespuestasOK} / ${respuestaCorrecta.length} `,
          prom = (numeroRespuestasOK / respuestaCorrecta.length) * 10,
          PROMEDIO = prom.toFixed(2);

    tablaResultados += 
        /* html */ `<tr><td>Resultado: </td>
                        <td>Respuestas correctas: ${numeroRespuestasOK} <br/>
                        Respuestas incorrectas: ${numeroRespuestasIn} </td>
                    </tr>
                    <tr><td>Promedio: </td>
                        <td>${PROMEDIO}</td>
                    </tr>
                    <tr><td>Obtuviste: </td>
                        <td>${RESULTADO} Preguntas</td>
                    </tr>  
                    </tbody>`;

    tabla.innerHTML = sinScript(tablaResultados);

    rein.innerHTML = sinScript('<a href="QuizPrueba.html" title="Cancelar" class="btn btn-info btn-icon-split"><span class="icon text-white-50"><i class="fas fa-sync-alt"></i></span><span class="text">Volver a Probar</span></a>');

}