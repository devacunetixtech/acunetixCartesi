const express = require("express");
const fetch = require("node-fetch");

const app = express();
app.use(express.json());

const rollupServerUrl = process.env.ROLLUP_HTTP_SERVER_URL || "http://127.0.0.1:5004";
console.log("Rollup HTTP Server URL is " + rollupServerUrl);

// In-memory storage for the to-do list
let todoList = [];

// Helper function to get the next ID
const getNextId = () => {
  return todoList.length ? Math.max(...todoList.map(item => item.id)) + 1 : 1;
};

async function handleAdvance(data) {
  if (!data || !data.action) {
    console.log("Invalid request data");
    return "reject";
  }

  console.log("Received advance request data: ", JSON.stringify(data));

  const { action, itemId, content } = data;

  switch (action) {
    case "add":
      // Add a new item
      const newItem = {
        id: getNextId(), // Consistent ID management
        content: content || "",
      };
      todoList.push(newItem);
      console.log(`Added item: ${JSON.stringify(newItem)}`);
      return "accept";

    case "edit":
      // Edit an existing item
      const itemToEdit = todoList.find((item) => item.id === itemId);
      if (itemToEdit) {
        itemToEdit.content = content || itemToEdit.content;
        console.log(`Edited item: ${JSON.stringify(itemToEdit)}`);
        return "accept";
      } else {
        console.log(`Item with ID ${itemId} not found`);
        return "reject";
      }

    case "delete":
      // Delete an existing item
      const initialLength = todoList.length;
      todoList = todoList.filter((item) => item.id !== itemId);
      if (todoList.length < initialLength) {
        console.log(`Deleted item with ID ${itemId}`);
        return "accept";
      } else {
        console.log(`Item with ID ${itemId} not found`);
        return "reject";
      }

    default:
      console.log("Unknown action");
      return "reject";
  }
}

async function handleInspect(data) {
  if (!data || !data.action) {
    console.log("Invalid request data");
    return "reject";
  }

  console.log("Received inspect request data: ", JSON.stringify(data));

  const { action, itemId } = data;

  switch (action) {
    case "list":
      // Return the full list
      console.log("Returning full to-do list");
      return JSON.stringify(todoList);

    case "get":
      // Return a specific item
      const item = todoList.find((item) => item.id === itemId);
      if (item) {
        console.log(`Returning item: ${JSON.stringify(item)}`);
        return JSON.stringify(item);
      } else {
        console.log(`Item with ID ${itemId} not found`);
        return "item not found";
      }

    default:
      console.log("Unknown action");
      return "unknown action";
  }
}

const handlers = {
  advance_state: handleAdvance,
  inspect_state: handleInspect,
};

app.post("/rollup", async (req, res) => {
  try {
    const rollupReq = req.body;
    const handler = handlers[rollupReq.request_type];
    if (handler) {
      const status = await handler(rollupReq.data);
      res.json({ status });
    } else {
      res.status(400).json({ status: "unknown request type" });
    }
  } catch (error) {
    console.error("Error handling request: ", error);
    res.status(500).json({ status: "error" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Cartesi dApp backend listening on port ${PORT}`);
});
