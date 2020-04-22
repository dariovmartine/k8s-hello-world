El archivo de docker-compose es para desarrollo, permite levantar las dos apps tal cual se ejecutan en k8s pero usando nodemon para permitir cambios sin reiniciar.

### Debug

Se puede debugear usado visual studio code ejecutando la app a debugear con:

    node --inspect

### Ejecutar con docker-compose 

Para levantar las dos apps con nodemon:

Iniciar:
    
    docker-compose up -d
    
Reiniciar:    
    
    docker-compose down && docker-compose up -d

### Pasos para desplegar en K8s

#### Builder las imagenes
    
    docker build --network host -t apimocks:1.0 ./apimocks
    docker build --network host -t flow:1.0 ./flow
    docker image prune

#### Probar las apps

    docker run --name run_apimocks --rm -d -p 3000:3000 apimocks:1.0
    curl -X POST localhost:3000/api/users/1 

    docker tag apimocks:1.0 localhost:5000/apimocks:1.0
    docker push localhost:5000/apimocks

    docker run --name run_flow --rm -d -p 33010:3010 flow:1.0
    curl -X POST -H "Content-type: application/json" localhost:33010/flow -d '{ "customerId" : "12345" }'
    
    docker tag flow:1.0 localhost:5000/flow:1.0
    docker push localhost:5000/flow

    TODO: Revisar q no se puede entrar con bash
    
Validar la subida al registry:    
    
    curl localhost:5000/v2/flow/tags/list
    
    curl localhost:5000/v2/apimocks/tags/list

#### Desplegar en micro.k8s

Validar que k8s esté funcionando
    
    microk8s status | grep microk8s

Iniciarlo en caso contrario

    microk8s start

Crear los pods:

    microk8s.kubectl create -f pod-apiclient-hw.yml

Exponer el servicio
    
    microk8s.kubectl expose pod apiclient-hw --type=NodePort --name apiclient-hw-service

Valido que el servicio queda expuesto
    
    microk8s.kubectl describe service apiclient-hw-service

Ejecutar:

    curl localhost:<port>  

donde port es el indicado por la property NodePort indicada por el comando describe