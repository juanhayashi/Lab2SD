Web Services - Primera clase
==========

Ejemplo simple de Web Services, donde se puede retornar valores de una base de dato de MongoDB. Para poder realizar las consultas, se debe levantar el servidor, después se devuelven esos datos por JSON. Además, se pueden insertar nuevos tweets en la base de datos con la página principal.

Para instalar MongoDB se puede a través del link http://docs.mongodb.org/manual/installation/

La base de datos está en la carpeta db y se llama tweet.json, para importarla debe aplicarse el siguiente comando en la carpeta mencionada:
	
   	$ mongoimport -d TSD -c tweetList --file tweet.json