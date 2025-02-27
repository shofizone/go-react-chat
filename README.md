# Go and React Chat Application

This project is a simple chat application built with a Go backend and a React frontend. It allows users to send and receive messages in real-time using WebSockets.

## Project Structure

- **backend/**: Contains the Go backend application.
  - **cmd/**: Entry point for the Go application.
  - **internal/**: Contains the core logic of the application, including handlers, models, and WebSocket management.
  
- **frontend/**: Contains the React frontend application.
  - **src/**: Source files for the React application, including components and main application logic.

## Getting Started

### Backend

1. Navigate to the `backend` directory.
2. Run `go mod tidy` to install dependencies.
3. Start the server with `go run cmd/main.go`.

### Frontend

1. Navigate to the `frontend` directory.
2. Run `npm install` to install dependencies.
3. Start the React application with `npm start`.

## Usage

Once both the backend and frontend are running, you can access the chat application in your web browser. Users can join the chat and start sending messages in real-time.

## License

This project is licensed under the MIT License.