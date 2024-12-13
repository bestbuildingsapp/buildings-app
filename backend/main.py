from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

app = FastAPI()

# List of allowed origins
origins = [
    "http://localhost:3000",  # React development server
    "https://yourfrontenddomain.com",
]

# Add CORS middleware to allow requests from specified origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Specifies which origins are allowed
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],  # Allow methods
    allow_headers=["*"],  # Allow all headers
)

@app.get("/api/")
def read_root():
    return {"message": "Hello from FastAPI!"}
