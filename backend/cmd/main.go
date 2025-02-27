package main

import (
	"gochat/internal/websocket_client"
	"log"
	"net/http"

	"github.com/gorilla/mux"
	ws "github.com/gorilla/websocket"
)

var upgrader = ws.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin: func(r *http.Request) bool {
		return true // Be careful with this in production
	},
}

func serveWs(hub *websocket_client.Hub, w http.ResponseWriter, r *http.Request) {
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println(err)
		return
	}
	client := &websocket_client.Client{
		Hub:  hub,                    // Note the capital H
		Conn: conn,                   // Note the capital C
		Send: make(chan []byte, 256), // Note the capital S
	}
	hub.Register <- client // Note the capital H

	go client.WritePump()
	go client.ReadPump()
}

func main() {
	router := mux.NewRouter()
	hub := websocket_client.NewHub()
	go hub.Run()

	router.HandleFunc("/ws", func(w http.ResponseWriter, r *http.Request) {
		serveWs(hub, w, r)
	})

	// Add CORS middleware if needed
	router.Use(mux.CORSMethodMiddleware(router))

	log.Println("Starting server on :8080")
	if err := http.ListenAndServe(":8080", router); err != nil {
		log.Fatalf("Could not start server: %s\n", err)
	}
}
