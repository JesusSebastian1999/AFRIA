import { inicio,error } from "./lib/util.js";
      import { auth } from "../lib/utilAuth.js";
      auth.onAuthStateChanged(async usuarioAuth => {
        if (usuarioAuth && usuarioAuth.email) {
          // Usuario aceptado.
          //cue.value = usuarioAuth.email;
          nombre.value = usuarioAuth.displayName;
          icono.src = usuarioAuth.photoURL;
        } else {
          // Usuario rechazado.
          inicio();
        }
      },
        e => {
          error(e);
          inicio()
        }
      );