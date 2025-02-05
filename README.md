# Real-Time Polling System with Kafka and WebSockets

## 🚀 Project Overview
A high-concurrency polling system using Node.js, Kafka, Zookeeper, PostgreSQL, and WebSockets.

## 📋 Prerequisites
- Docker (version 20.10+)
- Docker Compose (version 1.29+)
- Node.js (version 16+)

## 🔧 Technology Stack
- Backend: Node.js
- Message Broker: Apache Kafka
- Coordination: Zookeeper
- Database: PostgreSQL
- Real-Time Communication: WebSockets

## 🛠️ Project Setup

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/polling-system.git
cd polling-system
```

### 2. Environment Configuration
Create a `.env` file in the project root:
```env
# Database Configuration
DATABASE_URL=postgresql://postgres:pollsecret@postgres:5432/pollsystem
POSTGRES_DB=pollsystem
POSTGRES_PASSWORD=pollsecret

# Kafka Configuration
KAFKA_BROKER=kafka:9092
KAFKA_ZOOKEEPER_CONNECT=zookeeper:2181
KAFKA_TOPIC=votes
KAFKA_PARTITION=3

# Application Configuration
PORT=3000
WS_PORT=3000
```

### 3. Docker Deployment
```bash
# Build and start all services
docker-compose up --build
(If it break 1st time then again run the same command)

# Run in detached mode
docker-compose up -d --build

# Stop services
docker-compose down
```

## 📡 API Endpoints

### Polls
- `POST /polls`: Create a new poll
  - Request Body: 
    ```json
    {
      "title": "Favorite Programming Language",
      "options": ["JavaScript", "Python", "Java", "C++"]
    }
    ```

- `POST /polls/:id/vote`: Vote on a specific poll
  - Request Body:
    ```json
    {
      "option": "Python"
    }
    ```

- `GET /polls/:id`: Get poll results
  - Response:
    ```json
    {
      "javascript": 4,
      "python": 2,
      "c++": 0,
      "java": 1
    }
    ```

### Leaderboard
- `GET /leaderboard`: Get global poll rankings

## 🌐 WebSocket Events
- `poll-update`: Real-time poll result updates
- `leaderboard-update`: Real-time leaderboard changes

## 🧪 Testing
```bash
# Run tests
docker-compose run backend npm test
```

## 🔍 Monitoring Kafka
```bash
# Access Kafka container
docker-compose exec kafka bash

# List topics
kafka-topics.sh --list --bootstrap-server localhost:9092

# Describe topics
kafka-topics.sh --describe --bootstrap-server localhost:9092
```

## 🚧 Troubleshooting
- Ensure Docker is running
- Check container logs: `docker-compose logs backend`
- Verify network connectivity
- Restart specific services: `docker-compose restart <service-name>`

## 🔒 Security Considerations
- Use environment variables for sensitive configurations
- Implement input validation
- Consider adding authentication for poll creation/voting

## 📈 Scaling
- Adjust Kafka partition count in `docker-compose.yml`
- Increase Kafka/Zookeeper replicas for high availability

## 🤝 Contributing
1. Fork the repository
2. Create your feature branch
3. Commit changes
4. Push to the branch
5. Create a Pull Request

## 📞 Contact
- Project Maintainer: Abhirup Kashyap Borah
- Email: abhirupbora1@gmail.com
```

This comprehensive README covers:
- Project setup
- Technology stack
- Docker deployment
- API documentation
- WebSocket events
- Testing
- Kafka monitoring
- Troubleshooting
- Security and scaling considerations
- Contribution guidelines