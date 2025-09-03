### LLM Knowledge Extractor

### Demo

<img src="./assets/demo.gif" alt="Demo" />

### How to Use

#### Backend

- Assuming you have python installed, `cd backend`
- Create a virtual environment with `python -m venv venv`
- Activate the virtual environment:
  - On Windows: `venv\Scripts\activate`
  - On macOS/Linux: `source venv/bin/activate`
- Install the required packages: `pip install -r requirements.txt`

- Go to _root_ and `uvicorn backend.main:app --reload --port 8000`

#### Frontend

- Navigate to the `frontend` directory: `cd frontend`
- Install the required packages: `pnpm install`
- Start the development server: `pnpm run dev`

### Docker

- To build and run the Docker containers, use the following command from the root directory:
  ```
  docker-compose up --build
  ```

#### ENV

- In root dir create a file named `.env` and copy the contents of `.env.example` into it.
- Please create an account in Groq

### System Design

#### Backend

For `backend` I have used fastAPI for building the API endpoints and handling requests. I followed a MVC architecture pattern, creating routes, services and util files.
I have added a docker compose for adding postgres however I still need to configure the database connection settings.
For time being all chats are being stored in memory.

Routes that I've implemneted are:

- `/analyze' - where i intialize groq client, calls LLM to generate response, use `spacy` to get keywords
- `/chats' - where i get all chats made by user and are read from in-memory
- `/search?query=<search_query>` - where i search for a specific query in the chats and this query is checked across sentiments, keywords and topicss

#### Frontend

For `frontend` I have used Next.Js For fetching all API related queries I have used `react query` as it provides in-built caching and state management.
For state management I have used `zustand` as it removed the burden of prop drilling and provides a simple API for managing global state. All code is in `TypeScript` for type safety.

#### Future Improvements

In future, i plan to use the postgres database for storing chat history and user data persistently.
Moreover, an overhaul of frontend
And finally dockerizing the application for easier deployment.
