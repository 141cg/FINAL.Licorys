//pasos para consumir apis desde el front

//1. construir o declarar la direccion del servidor 
//el cliente o front se comunica con el back o servidor

//2. construir la conexion del api que llamamos peticion

//3. implementar la conexion

export async function consumirAPI(datos) {
    let url="localhost:8080/registro"
    let peticion={
        method:"POST",
        body:JSON.stringify(datos)
    }
    let respuesta=await fetch(url,peticion)
    return await respuesta.json()
}