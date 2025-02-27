package handlers

import (
	"encoding/json"
	"net/http"
)

type Message struct {
	Sender    string `json:"sender"`
	Content   string `json:"content"`
	Timestamp string `json:"timestamp"`
}

type ChatHandler struct{}

func (h *ChatHandler) SendMessage(w http.ResponseWriter, r *http.Request) {
	var msg Message
	if err := json.NewDecoder(r.Body).Decode(&msg); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	// Handle sending the message (e.g., broadcasting to clients)
}

func (h *ChatHandler) ReceiveMessages(w http.ResponseWriter, r *http.Request) {
	// Handle receiving messages (e.g., streaming messages to the client)
}