# User Authentication API

## Table of Contents
- [User Authentication API](#user-authentication-api)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Base URL](#base-url)
  - [Authentication](#authentication)
    - [Bearer Token](#bearer-token)
  - [Current User](#current-user)
    - [Get Profile](#get-profile)
    - [Update Profile](#update-profile)
  - [Authorizations](#authorizations)
    - [Request Access Token](#request-access-token)
    - [Revoke Token](#revoke-token)
  - [Responses](#responses)
    - [200 OK](#200-ok)
    - [401 Unauthorized](#401-unauthorized)
  - [Error Handling](#error-handling)
  - [Rate Limits](#rate-limits)
  - [SDKs](#sdks)

## Introduction

The Authentication API provides secure access to user resources and allows applications to verify user identities. This API supports OAuth 2.0 for authentication and provides endpoints for managing user profiles and permissions.

## Base URL

All API requests should use the following base URL:

```
https://api.example.com/v2
```

## Authentication

### Bearer Token

All authenticated endpoints require an Authorization header with a valid Bearer token:

```
Authorization: Bearer {access_token}
```

Example:

```http
GET /me HTTP/1.1
Host: api.example.com
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Current User

Make updates to the user to which the login token was issued.

### Get Profile

Retrieve the profile of the currently logged in user.

**Endpoint:** `GET /me`

**Parameters:** None

**Response:**

```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "status": "pending",
  "name": "Jane Doe",
  "bio": "Software Engineer",
  "activeSessions": 1,
  "createdAt": "2023-03-13T10:54:16.946Z",
  "updatedAt": "2023-03-13T10:54:16.946Z",
  "email": "jane.doe@example.com"
}
```

**Code Example:**

```python
import requests

response = requests.get(
    "/me",
    headers={"Authorization":"Bearer jwt"},
)
data = response.json()
```

### Update Profile

Update properties of the current user.

**Endpoint:** `PATCH /me`

**Request Body:**

```json
{
  "name": "Jane Smith",
  "bio": "Senior Software Engineer"
}
```

**Response:**

```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "status": "active",
  "name": "Jane Smith",
  "bio": "Senior Software Engineer",
  "activeSessions": 1,
  "createdAt": "2023-03-13T10:54:16.946Z",
  "updatedAt": "2023-03-13T11:02:24.382Z",
  "email": "jane.doe@example.com"
}
```

## Authorizations

### Request Access Token

Exchange authorization code for an access token.

**Endpoint:** `POST /oauth/token`

**Request Body:**

```json
{
  "grant_type": "authorization_code",
  "code": "auth_code_from_redirect",
  "client_id": "your_client_id",
  "client_secret": "your_client_secret",
  "redirect_uri": "https://your-app.com/callback"
}
```

**Response:**

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "Bearer",
  "expires_in": 3600,
  "refresh_token": "def50200..."
}
```

### Revoke Token

Revoke an active access token.

**Endpoint:** `POST /oauth/revoke`

**Request Body:**

```json
{
  "token": "access_token_or_refresh_token",
  "client_id": "your_client_id",
  "client_secret": "your_client_secret"
}
```

**Response:** `204 No Content`

## Responses

### 200 OK

Standard success response format:

```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "status": "active",
  "name": "Jane Smith",
  "bio": "Senior Software Engineer",
  "activeSessions": 1,
  "createdAt": "2023-03-13T10:54:16.946Z",
  "updatedAt": "2023-03-13T11:02:24.382Z",
  "email": "jane.doe@example.com"
}
```

### 401 Unauthorized

Example response when authentication fails:

```json
{
  "error": "invalid_token",
  "error_description": "The access token provided is expired, revoked, or invalid"
}
```

## Error Handling

All error responses follow this format:

```json
{
  "error": "error_code",
  "error_description": "Human readable explanation",
  "error_uri": "https://docs.example.com/errors/error_code"
}
```

Common error codes:
- `invalid_request`: The request is missing a required parameter
- `invalid_token`: The provided token is invalid
- `insufficient_scope`: The request requires higher privileges
- `server_error`: An error occurred on the server

## Rate Limits

API requests are limited to 100 requests per minute per IP address. Rate limit headers are included in responses:

```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1678721893
```

## SDKs

Official client libraries are available for the following platforms:
- [JavaScript](javascript:void(0))
- [Python](javascript:void(0))
- [Ruby](javascript:void(0))
- [PHP](javascript:void(0))
- [Java](javascript:void(0))