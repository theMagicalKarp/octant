package main

import (
    "os"
    "fmt"

    "net/http"
    "encoding/json"

    "github.com/zenazn/goji"
    "github.com/zenazn/goji/web"

    "github.com/fsouza/go-dockerclient"
)

var client *docker.Client

func main() {
    dockerHost := os.Getenv("DOCKER_HOST")
    client, err := docker.NewClient(dockerHost)

    if err != nil {
        fmt.Println(err)
    }

    goji.Get("/", func(c web.C, w http.ResponseWriter, r *http.Request) {
        http.ServeFile(w, r, "static/index.html")
    })

    goji.Get("/containers", func(c web.C, w http.ResponseWriter, r *http.Request) {
        containers, err := client.ListContainers(docker.ListContainersOptions {
            All: true,
        })

        if err != nil {
            http.Error(w, http.StatusText(500), 500)
            return
        }

        response, err := json.Marshal(containers)

        if err != nil {
            http.Error(w, http.StatusText(500), 500)
            return
        }

        w.Header().Set("Content-Type", "application/json")
        w.Write(response)
    })

    goji.Get("/container/:id", func(c web.C, w http.ResponseWriter, r *http.Request) {
        container, err := client.InspectContainer(c.URLParams["id"])

        if err != nil {
            http.Error(w, http.StatusText(500), 500)
            return
        }

        response, err := json.Marshal(container)

        if err != nil {
            http.Error(w, http.StatusText(500), 500)
            return
        }

        w.Header().Set("Content-Type", "application/json")
        w.Write(response)
    })

    goji.Get("/container/:id/logs", func(c web.C, w http.ResponseWriter, r *http.Request) {
        err := client.Logs(docker.LogsOptions {
            Container: c.URLParams["id"],
            OutputStream: w,
            Stdout: true,
            RawTerminal: true,
        })

        if err != nil {
            fmt.Println(err)
            http.Error(w, http.StatusText(500), 500)
            return
        }
    })

    goji.Get("/images", func(c web.C, w http.ResponseWriter, r *http.Request) {
        images, err := client.ListImages(false)

        if err != nil {
            http.Error(w, http.StatusText(500), 500)
            return
        }

        response, err := json.Marshal(images)

        if err != nil {
            http.Error(w, http.StatusText(500), 500)
            return
        }

        w.Header().Set("Content-Type", "application/json")
        w.Write(response)
    })

    goji.Get("/image/:id", func(c web.C, w http.ResponseWriter, r *http.Request) {
        image, err := client.InspectImage(c.URLParams["id"])

        if err != nil {
            http.Error(w, http.StatusText(500), 500)
            return
        }

        response, err := json.Marshal(image)

        if err != nil {
            http.Error(w, http.StatusText(500), 500)
            return
        }

        w.Header().Set("Content-Type", "application/json")
        w.Write(response)
    })

    goji.Get("/static/*",
        http.StripPrefix("/static/",http.FileServer(http.Dir("static"))))
    goji.Serve()
}