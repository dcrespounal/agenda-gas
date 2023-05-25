const HOJA = SpreadsheetApp.openById('1Q6ARghboL7E9ancmPeJkO3LyOrpzcWpqzs1Vq4P_mIo').getActiveSheet()
const CARPETA = DriveApp.getFolderById('1LjZrKUjTZQ087oqeK6860nhpTlBwcZ8T')
const CABECERA_URL_IMAGEN_DRIVE = 'https://drive.google.com/uc?export=view&id='

function doGet(){

    return HtmlService.createTemplateFromFile('web').evaluate().setTitle('Agenda con GAS')
}

function doPost(datos){
    
    return HtmlService.createTemplateFromFile('web').evaluate().setTitle('Agenda con GAS')
}

function obtenerDatosHTML(nombre){

    return HtmlService.createHtmlOutputFromFile(nombre).getContent() 
}

function obtenerDatos(){
    
    return HOJA.getDataRange().getValues()
}

function insertarContacto(contacto, imagen){
    //Si se recibe una imagen
    if(imagen) contacto.imagen = guardarImagen(imagen)
    //añadir un vector con cada celda a añadir
    HOJA.appendRow([contacto.nombre, contacto.apellidos, contacto.correo, contacto.telefono, contacto.imagen])
}

function modificarContacto(contacto, imagen){

    if(imagen) contacto.imagen = guardarImagen(imagen)
    let celdas = HOJA.getRange('A'+contacto.fila+':E'+contacto.fila)
    celdas.setValues([[contacto.nombre, contacto.apellidos, contacto.correo, contacto.telefono, contacto.imagen]])
}

function guardarImagen(imagen){
    let blob = Utilities.newBlob(imagen.datos, imagen.tipo, imagen.nombre)
    let archivo = CARPETA.createFile(blob)
    return CABECERA_URL_IMAGEN_DRIVE+archivo.getId()
}
//Importar contactos desde API externa
function importarContactos(){

    let url = 'https://randomuser.me/api/?results=5&inc=name,email,phone,picture'
    let respuesta = UrlFetchApp.fetch(url).getContentText()
    //Logger.log(respuesta)
    //*Convertir respuesta (String) a Json
    let datos = JSON.parse(respuesta)
    //datos.results.forEach(contacto => {Logger.log(contacto)});
    datos.results.forEach(insertarContactoJSON);
}

function borrarContacto(numeroFila){

    HOJA.deleteRow(numeroFila)
}

function insertarContactoJSON(contacto){

    HOJA.appendRow([contacto.name.first, contacto.name.last, contacto.email, contacto.phone, contacto.picture.large])
}




