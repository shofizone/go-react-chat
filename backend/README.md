# README for Backend

# Go Chat Application - Backend

This is the backend part of the Go Chat Application. It is built using Go and provides the necessary APIs and WebSocket connections for the chat functionality.

## Project Structure

- `cmd/main.go`: Entry point of the application.
- `internal/handlers/chat.go`: Contains the `ChatHandler` for handling chat-related requests.
- `internal/models/message.go`: Defines the `Message` struct for chat messages.
- `internal/websocket/client.go`: Manages WebSocket connections.

## Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd go-react-chat/backend
   ```

2. **Initialize Go modules:**
   ```bash
   go mod tidy
   ```

3. **Run the application:**
   ```bash
   go run cmd/main.go
   ```

## API Endpoints

- **POST /api/chat/send**: Send a chat message.
- **GET /api/chat/messages**: Retrieve chat messages.

## WebSocket

The backend supports WebSocket connections for real-time chat functionality. Clients can connect to the WebSocket server to send and receive messages instantly.

## License

This project is licensed under the MIT License.