## Instalación desde CERO
 
0) docker run -d -p 5000:5000 --restart always --name registry registry:2

1) docker build --network host -t directv . 

2) docker tag directv localhost:5000/directv

3) docker push localhost:5000/directv

4) microk8s.kubectl create -f pod-helloworld-docker-hw.yml

5) Para exponer el servicio:

5.1) Se puede hacer haciendo un port forward "manual"
    
    microk8s.kubectl port-forward helloworld-docker-hw 8081:3000

5.2) O se puede exponer el servicio:

    microk8s.kubectl expose pod helloworld-docker-hw --type=NodePort --name helloworld-hw-service
    microk8s.kubectl describe service helloworld-hw-service
    
5.2.1) Recuperar el puerto del valor indicado por NodePort

6) Ejecutar:

    curl localhost:<port>  

donde port es 3000 para el caso de 5.1 o el indicado por NodePort para el caso de 5.2


## UPDATE 
