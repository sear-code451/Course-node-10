# ¿ Qué son los middlewares ?



[Enlace de una buena explicación](https://stackoverflow.com/questions/23259168/what-are-express-json-and-express-urlencoded)

El término middleware se refiere al sistema de software que ofrece funciones y servicios de nube comunes para las aplicaciones, de modo que los desarrolladores y los equipos de operaciones puedan diseñaralas e implementarlas con mayor eficiencia. Además, permite conectar las aplicaciones, los datos y los usuarios.

**FUN FACT:** el concepto de arriba si no lo entendes lee el documento del enlace, lo explican muy bien, ese resumen que hice solo para practicar mi escritura.

- **(servidor).use() :** este método se usa para decir mas o menos que estos son middlewares.

~~~
app.use( express.static( 'public' ) );
~~~

> Con este ejemplo de arriba, nos muestra de la clase server un middleware, para identificar por lo que dicen es que son los que hacen uso del método "use", como el código de arriba.