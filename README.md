
<img src="assets\logo.webp" width="200">


### WIP 
<img src="assets\wip_12_9.png">

API Usage 
```
$  curl -X POST http://localhost:8080/roll -H "Content-Type: application/json" -d '{"sides":20}'
{"message":"Critical Success","result":20}
$  curl -X POST http://localhost:8080/roll -H "Content-Type: application/json" -d '{"sides":20, "advantage": true}'
{"message":"Successfully rolled dice","result":16}
$  curl -X POST http://localhost:8080/roll -H "Content-Type: application/json" -d '{"sides":20, "advantage": true, "disadvantage":false, "modifiers":["1d8", "5"]}'
{"message":"Successfully rolled dice","result":30}
```