Cartesi dApp Backend
Overview
The Cartesi dApp Backend is a simple Express.js server designed to handle a to-do list with operations for adding, editing, deleting, and inspecting items. The server listens for HTTP POST requests at the `/rollup` endpoint and processes actions related to the to-do list based on the request data.

Features
- Add: a new item to the to-do list.
- Edit: an existing item.
- Delete: an item from the list.
- Inspect: the list or retrieve a specific item.

Prerequisites
- Node.js (v14 or later recommended)
- npm or yarn
- 
Instructions

1. Clone the repository and navigate to the project directory.
2. Install dependencies using `npm install`.
3. Configure environment variables** as needed.
4. Start the server with `npm start`.
5. Send POST requests to `/rollup` with appropriate JSON payloads to manage the to-do list.

DETAILS :
1. Clone the repository:
    git clone https://github.com/devacunetixtech/acunetixCartesi.git
2. Navigate to the project directory:
    cd acunetixCartesi
3. Install the dependencies:
  npm install

Configuration
The server can be configured using environment variables. You can set the following variables:
  ROLLUP_HTTP_SERVER_URL: The URL of the Rollup HTTP server. Default is http://127.0.0.1:5004.
  PORT: The port on which the server will listen. Default is 3000.
You can set these variables in a .env file or directly in your environment.

Example .env file:
  ROLLUP_HTTP_SERVER_URL=http://localhost:5004
  PORT=3000
Usage
Start the server:
  npm start
  
Send POST requests to /rollup:
Add an item:
json
  {
    "request_type": "advance_state",
    "data": {
      "action": "add",
      "content": "Sample to-do item"
    }
  }
  
Edit an item:
json
  {
    "request_type": "advance_state",
    "data": {
      "action": "edit",
      "itemId": 1,
      "content": "Updated content"
    }
  }
  
Delete an item:
json
  {
    "request_type": "advance_state",
    "data": {
      "action": "delete",
      "itemId": 1
    }
  }
  
List all items:
json
  {
    "request_type": "inspect_state",
    "data": {
      "action": "list"
    }
  }
Get a specific item:
json
  {
    "request_type": "inspect_state",
    "data": {
      "action": "get",
      "itemId": 1
    }
  }
  
Error Handling
Invalid Request Data: Returns reject.
Unknown Request Type: Returns unknown request type.
Server Errors: Returns error.

Contact
For any questions or issues, please contact preciousadebisi2003@gmai.com.
