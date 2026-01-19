from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()


# Allow local frontend to access the API during development
app.add_middleware(
	CORSMiddleware,
	# Allow common local dev origins. In dev we allow localhost on typical Vite ports.
	allow_origins=[
		"http://localhost:3000",
		"http://127.0.0.1:3000",
		"http://localhost:3001",
		"http://127.0.0.1:3001",
	],
	allow_credentials=True,
	allow_methods=["*"],
	allow_headers=["*"],
)


@app.get("/")
def read_root():
	return {"status": "ok", "message": "Backend running"}


@app.get("/health")
def health():
	return {"status": "healthy"}


@app.post("/pipelines/parse")
async def parse_pipeline(payload: dict):
	"""Basic pipeline parser used by the frontend for validation.

	Expects JSON body: { nodes: [...], edges: [...] }
	Returns: { num_nodes, num_edges, is_dag }
	"""
	try:
		nodes = payload.get("nodes", [])
		edges = payload.get("edges", [])

		# Basic sanity: nodes must be a list and edges must be a list
		if not isinstance(nodes, list) or not isinstance(edges, list):
			raise HTTPException(status_code=400, detail="Invalid payload: nodes and edges must be arrays")

		num_nodes = len(nodes)
		num_edges = len(edges)

		# Build adjacency list using node ids from edges (source -> target)
		adj: dict[str, list[str]] = {}
		node_ids = set()
		for n in nodes:
			nid = n.get("id")
			if isinstance(nid, str):
				node_ids.add(nid)
				adj.setdefault(nid, [])

		for e in edges:
			src = e.get("source")
			tgt = e.get("target")
			if isinstance(src, str) and isinstance(tgt, str):
				# only include edges between known nodes
				if src not in adj:
					adj.setdefault(src, [])
				adj[src].append(tgt)

		# Detect cycles using DFS (white-gray-black)
		WHITE, GRAY, BLACK = 0, 1, 2
		color: dict[str, int] = {nid: WHITE for nid in adj.keys()}
		has_cycle = False

		def dfs(u: str) -> bool:
			nonlocal has_cycle
			color[u] = GRAY
			for v in adj.get(u, []):
				# ignore edges to unknown nodes
				if v not in color:
					color[v] = WHITE
				if color[v] == GRAY:
					return True
				if color[v] == WHITE and dfs(v):
					return True
			color[u] = BLACK
			return False

		for node_id in list(adj.keys()):
			if color.get(node_id, WHITE) == WHITE:
				if dfs(node_id):
					has_cycle = True
					break

		return {"num_nodes": num_nodes, "num_edges": num_edges, "is_dag": not has_cycle}

	except HTTPException:
		raise
	except Exception as exc:
		# Unexpected errors -> return 500
		raise HTTPException(status_code=500, detail=str(exc))
