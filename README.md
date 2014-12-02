![OCTANT](http://i.imgur.com/ZKRDxRe.png)

A tool to visualize your docker daemon. A demo can be found [here](http://dev.rob-sheehy.com/).

![octant](http://i.imgur.com/Nptbaiy.jpg)

Running Inside Docker
======
Requirements
------
* [Docker](https://www.docker.com/)

Setup
------
```
docker pull themagicalkarp/octant:latest
```

Run
------
```
docker run -v /var/run/docker.sock:/var/run/docker.sock -p 8000:8000 themagicalkarp/octant
```

Use
------
Visit ```http://your-docker-host:8000```


Running Outside Docker (With Boot2Docker)
======
Requirements
------
* [Boot2Docker](http://boot2docker.io/)
* [Golang](https://golang.org/)

Setup
------
```
go get github.com/theMagicalKarp/octant
```

Run
------
```
$GOPATH/bin/octant
```

Use
------
Visit ```http://localhost:8000```

Hints
------
* Make sure ```$DOCKER_HOST``` env variable is properly set.
* Make sure Boot2Docker is running, ```boot2docker up```
