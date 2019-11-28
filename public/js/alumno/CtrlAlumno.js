import { MiSelect } from "../cmp/mi-select.js";
import { CtrlEditRespuesta } from "../lib/CtrlEditRespuesta.js";
import { DocumentReference } from "../lib/fireAPI.js";
import { collection, infos,getURLSearchParam } from "../lib/util.js";
import { creaDaoRespuesta } from "./DaoAlumno.js";
import { cod, sinScript } from "../lib/util.js";

const dao = creaDaoRespuesta();
const id = getURLSearchParam("id");




console.log(id);
class CtrlAlumno extends CtrlEditRespuesta {

    /** Muestra los datos del modelo.
     * @override
     * @param {import("../Profesor/infoQuiz").InfoQuiz} modelo  
    async muestraModelo(modelo) {

        await tema.carga(
            infos(await collection("TEMAS").orderBy("TEMA").get()),
            rendererTema);

    }*/

    /** Recupera la información capturada.
     * @override
     * @returns {Promise<import("./InfoUsuario").InfoUsuario>}  */
    async leeModelo() {

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
                        </tbody>`;

        tabla.innerHTML = sinScript(tablaResultados);
        const ID_USU = id;
        return {
            RESULTADO,
            ID_USU,
            PROMEDIO
        };
    }

    /** Agrega el modelo a la base de datos y devuelve el nuevo id. Normalmente no
     * se sobreescribe este método, pero en este caso es necesario para subir
     * archivos.
     * @override
     * @param {Object} modelo
     * @returns {Promise<DocumentReference>} referencia a los datos registrados.*/
    async agregaModelo(modelo) {
        
        const doc = await super.agregaModelo(modelo); 

        return doc
    }

}

new CtrlAlumno(dao);