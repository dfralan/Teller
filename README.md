# Teller
Chat button and feedback Widget.

** Updates 🤖 **

- Integration with Facebook Messenger.
- Integration with Telegram.
- Integration with Whatsapp.
- Feedback integration with Google Forms.
- Soporte inglés y español.

** Importante 🦄 **

La integración con el formulario de Google se realiza manualmente, es decir que tienes que generar el link del formulario de Google pre-rellenado desde tu cuenta de Google iniciada.
Puedes integrar solo una plataforma o todas las que quieras, en caso que decidas no utilizar una, por ejemplo Telegram, solo deja el campo en blanco, el botón no aparecerá en la barra de complementos.

** Comenzando 🚀 **

Estas instrucciones te permitirán crear tu botón de chat y agregarlo a tu proyecto.

** Pre-requisitos 📋 **

- Consigue el CDN de Teller o agrega el archivo teller.js o teller.min.js a tu proyecto: https://github.com/dfralan/Teller/blob/main/teller.js 

- Creá el siguiente elemento y agregalo al cuerpo de tu HTML modificando los datos que correspondan.

```bash
<teller keyCodeTeller="dbcadceaeea4b522e42b160db3953980" lang="en" supportHours="08:00/14:00(-03:00)" username="Teller" operatorName="Juancho Rodriguez" tellerMode="brick" userColor="" side="left" borderRadius="5" theme="light" appearAfter="5" bubbleText="" callToAction="Hablemos..." photoUrl="https://viviendassion.com/wp-content/uploads/2020/12/sion_foto1.webp"
formUrl="https://docs.google.com/forms/d/e/1FAIpQLSdpgab-bhAdoFrIO7hqw2woqA7dIzxNHZa5sXCoMGfHT7NNCg/viewform?usp=pp_url&entry.1085830910=nice&entry.601918770=pepe&entry.1067325052=naranja&entry.52853599=pepe"
telegramID="messae" whatsappNumber="543412293515" messengerID="dufouralan">
</teller>
```
** Repasemos los campos 🔧 **

- keyCodeTeller: Déjalo como está.

- lang: Elige entre "en" ó "es" (Es el idioma en el cúal re realizará la base de datos en el formulario de Google que integres.)

- supportHours: Intervalo de horas en las que figurará activo el operador de cada botón que integres. (No olvides de colocar la zona horaria, ya que funciona de acuerdo a la zona horaria del usuario que esté navegando.) 

- username: Compañia o agrupación que utiliza el servicio.

- operatorName: Nombre de la persona que está detrás del teléfono. (En caso que dejes el campo en blanco, pondremos el nombre de la compañía o agrupación de forma predeterminada.)

- tellerMode: Es el modo de Widget que utilizarás, actualmente está disponible el modo "brick" únicamente, así que déjalo de esa manera.

- userColor: Es el color que representa a tu agrupación o empresa, en caso que lo dejes en blanco se rellenera de forma automática en blanco o gris de acuerdo al tema elegido.

- side: Lugar en la pantalla donde se ubicará el botón ("left" si quieres que aparezca a la izquierda, o "right" si quieres que aparezca a la derecha, en caso que lo dejes en blanco aparecera a la derecha de forma predeterminada.)

- borderRadius: Redonde del botón y de la barra de complementos. (Recomendado: 5 ó 25);

- theme: Tema del widget, puedes elegír entre light ó dark.

- callToAction: Mensaje de llamado de acción.

- appearAfter: Tiempo en segundos en que aparecerá el llamado a la acción. (En caso que lo dejes en blanco aparecerá de forma predeterminada a los 5 segundos.)

- bubbleText: Mensaje que aparecerá en la burbuja de las plataformas integradas. (Messenger, Whatsapp, Telegram.)

- photoURL: Link de la imagen del perfil que aparecerá en las plataformas integradas. (Messenger, Whatsapp, Telegram.)

- formURL: Link al formulario de Google Form donde se almacenarán las opiniones que recibas de tus visitantes, tén en cuenta que el link ha de ser un link pre-rellenado para obtener los numeros de entrys del formulario. (El mismo ha de contener 4 inputs, 2 de respuesta corta, 1 de respuesta larga y 1 de respuesta corta respectivamente. Para más información sobre como obtener un link de formulario pre-rellenado visitá https://support.google.com/a/users/answer/9308781?hl=en)

- messengerID: ID de messenger de tu perfil de facebook o el de tu compañia, puede ser un número o un nombre. Es el texto que aparece justo luego de "facebook.com/aaaaaaa" cuando visitás tu perfil de Facebook.

- whatsappNumber: Número de whatsapp con código de país incluído o ID en caso de ser un una cuenta Enterprise. (Ejemplo: si tu número es +54 345 2 293 515 deberías de poner"5493452293515")

- telegramID: ID de tu cuenta de Telegram o nombre de usuario.

** Comprueba que funcione correctamente 🔧 **

Eso es todo, ya puedes empezar a recibir feedback, consultas y mensajes en tu página web.

Solo observa la magia. 

** Construido con 🛠️ **

* Pure Javascript.

** Contribuyendo 🖇️ **

Por ahora solo ETH, sorry not sorry por el spanglish 🦧

** Autores ✒️ **

https://github.com/dfralan

**dfralan** - *Trabajo Inicial* - [dfralan](https://github.com/dfralan)

También puedes mirar la lista de todos los [contribuyentes](https://github.com/dfralan/Teller/contributors) quíenes han participado en este proyecto. 

** Licencia 📄 **

Este proyecto está bajo la Licencia GNU General Public License v3.0 - mira el archivo [LICENSE.md](https://github.com/dfralan/Teller/blob/main/LICENSE) para detalles

** Expresiones de Gratitud 🎁 **

* Suma tu destreza al proyecto 📢
* Realiza feedback de tu resultado en ejecución 🤓.
* Deja volar tu imaginación 💫 (0x87C35820fe988e73c54f71fB69da61Ac05474d26) ETH wallet.

---
# ⌨️ con ❤️

https://github.com/dfralan 💁‍♂️
