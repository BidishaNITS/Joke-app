from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import random
import logging

# Logging Setup 
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s %(levelname)s %(name)s │ %(message)s",
)
logger = logging.getLogger("joke-api")

# Response Model 
class JokeResponse(BaseModel):
    joke: str

# App Init 
app = FastAPI(
    title="DevOps Joke API",
    version="1.0",
    description="Returns a random joke for DevOps/SRE engineers"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Data
jokes: list[str] = [
    "Why do DevOps engineers love pipes? Because they keep things flowing!",
    "I told my server a joke, now it’s rolling its logs!",
    "Why did the DevOps engineer get kicked out of school? For caching in class!",
    "Why are DevOps engineers great at stand-ups? They always want to remove blockers!",
    "What’s a DevOps engineer’s favorite martial art? Kubernetes!",
    "Why did the deployment fail? Because someone left a TODO in prod!",
    "Why do DevOps engineers prefer dark mode? Because light attracts bugs!",
    "My CI pipeline told me a joke. It had great test coverage!",
    "Why do DevOps engineers like comedy? They love good release notes!",
    "How many DevOps engineers does it take to change a light bulb? None—it’s an infrastructure-as-code issue!",
    "I asked Chef for a joke, but it ended up installing dependencies!",
    "Why did the Kubernetes pod go to therapy? It had too many liveness probe failures!",
    "What do you call a DevOps engineer who can’t say no? A Puppet slave!",
    "Why did the Git commit go to rehab? It had too many dependencies!",
    "Why do DevOps engineers hate manual tasks? Because they can’t automate them!",
    "Why did the container break up with the image? It found it too shallow!",
    "What’s a DevOps engineer’s favorite tea? Automatee!",
    "Why do DevOps engineers love jokes about scaling? They like to distribute laughter!",
    "Why did the server blush? Because it saw the cloud naked!",
    "Why don’t DevOps engineers tell secrets? They encrypt everything!"
]

# Endpoints
@app.get(
    "/api/joke",
    response_model=JokeResponse,
    summary="Get a random DevOps joke",
    description="Pick one joke at random from a curated list of 20 DevOps/SRE puns."
)
async def read_joke() -> JokeResponse:
    """Return a random joke about DevOps engineering."""
    joke = random.choice(jokes)
    logger.info("Served joke: %s", joke)
    return JokeResponse(joke=joke)
