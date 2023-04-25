
# Explicación de porque funciona de esa manera

Bueno para entender mejor mirar el video: sección 9-131-minuto:2:50.

Si miramos el enlace que lleva esa función vamos a ver que, tiene un parámetro esa función, y al invocarlo, en los rest server nos damos cuenta que, no se está pasando el parámetro.

Es debido por esto:
~~~
check('rol').custom( esRoleValido )

// lo de arriba es igual a:

check('rol').custom( (rol) => esRoleValido( rol ) )

~~~

Te preguntas porque y eso... esto es debido a que el documento de este middleware de custom, bueno pa que se me entienda mirar el enlace de express validator [Link](https://express-validator.github.io/docs/custom-error-messages/#custom-validator-level).


Acá exliplico el porque:
~~~
check('email').custom(value => {
    return User.findByEmail(value).then(user => {
      if (user) {
        return Promise.reject('E-mail already in use');
      }
    });
})
  
  //value se refiere al valor del check que va revisar 
  // en el caso del ejemplo es "password"
~~~

> Una vez entendido que funciona de esta manera el value, del ejemplo de arriba, entonces, como value es la revision, y el parámetro que se le pasa es el value y bueno, con ecmascript6 hace eso por defecto le pasa el value por defecto como parametro a la función. Por eso la función funciona sin el parámetro el que nosotros hicimos

~~~
check('rol').custom( esRoleValido )

// Lo de arriba es igual a:

check('rol').custom( (rol) => esRoleValido( rol ) )

// Porque:(rol) este le pasa de forma directo al parametro de la función
// y por eso sale igual el primero.
~~~