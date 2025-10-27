# Notification System (NestJS + Bull + Redis + MySQL)

이 프로젝트는 **NestJS 기반 비동기 알림 처리 시스템**입니다.  
`backend`는 알림 생성 API를 제공하고,  
`worker`는 Redis Queue를 소비하여 예약/실시간 알림을 처리합니다.

---

## 프로젝트 구조

```
notification-system/
├── backend/ # API 서버
│ ├── src/
│ │ ├── modules/notification/
│ │ ├── database/
│ │ ├── configs/
│ │ └── main.ts
│ └── Dockerfile
│
├── worker/ # 큐 처리 전용 워커 서버
│ ├── src/
│ │ ├── processors/
│ │ └── main.ts
│ └── Dockerfile
│
├── docker-compose.yml # 서비스 전체 orchestration
└── README.md
```

---

## 프로젝트 실행

```
1. 컨테이너 빌드 및 실행
git clone

docker-compose up --build
```

## 알림 생성 API 요청 (Postman)

POST http://localhost:3000/notification

### Postman에 아래 JSON import

```
{
  "info": {
    "name": "Notification System API",
    "_postman_id": "notification-system",
    "description": "Notification API 테스트 컬렉션",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Create Notification",
      "request": {
        "method": "POST",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"recipientId\": 1,\n  \"type\": \"USER_EVENT\",\n  \"title\": \"새 댓글 알림\",\n  \"message\": \"홍길동님이 댓글을 남겼습니다.\",\n  \"target\": {\n    \"type\": \"POST\",\n    \"id\": 123\n  },\n  \"metadata\": {\n    \"extraInfo\": \"테스트 데이터\"\n  },\n  \"scheduledAt\": \"2025-10-19T21:00:00Z\",\n  \"createdAt\": \"2025-10-19T21:05:00Z\"\n}"
        },
        "url": {
          "raw": "http://localhost:3000/notifications",
          "protocol": "http",
          "host": ["localhost"],
          "port": "3000",
          "path": ["notifications"]
        }
      },
      "response": []
    },
    {
      "name": "List Notifications by Recipient",
      "request": {
        "method": "GET",
        "header": [],
        "url": {
          "raw": "http://localhost:3000/notifications?recipientId=1",
          "protocol": "http",
          "host": ["localhost"],
          "port": "3000",
          "path": ["notifications"],
          "query": [
            {
              "key": "recipientId",
              "value": "1"
            }
          ]
        }
      },
      "response": []
    }
  ]
}
```

### Project Logging

```
[NotificationProcessor] Processing notification job: 4 → [USER_EVENT] 가입 축하 알림 → user 1:: 회원가입이 완료되었습니다.
```

### Project 주요 구성요소

| 서비스 설명                      | 포트      |
| -------------------------------- | --------- |
| api NestJS 기반 REST API 서버    | 3000      |
| worker Bull 큐 소비 및 알림 처리 | 내부 통신 |
| redis Bull Queue 브로커          | 6379      |
| mysql 알림 데이터베이스          | 3306      |

| 구성 요소             | 설명                         |
| --------------------- | ---------------------------- |
| @nestjs/bull          | Redis 기반 Bull Queue 연동   |
| TypeORM               | MySQL ORM                    |
| NotificationService   | 알림 생성 및 Queue 등록 담당 |
| NotificationProcessor | Worker에서 Job 처리 담당     |
| BullModule Queue      | 설정 및 관리                 |
