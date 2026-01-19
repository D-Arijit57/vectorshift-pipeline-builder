# 🚀 VectorShift Pipeline Builder

A visual pipeline builder with custom nodes, dynamic text variables, and FastAPI backend DAG validation.  Build complex data processing workflows with an intuitive drag-and-drop interface.

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://vectorshift-pipeline-builder-six.vercel.app)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.2-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.2.0-61dafb)](https://reactjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-Backend-009688)](https://fastapi.tiangolo.com/)

## ✨ Features

- **🎨 Visual Drag-and-Drop Interface**:  Build pipelines intuitively with ReactFlow
- **🔧 14 Custom Node Types**: From basic I/O to advanced processing nodes
- **🔗 Dynamic Text Variables**: Support for variable interpolation with `{{variable}}` syntax
- **✅ DAG Validation**: Backend validation ensures your pipeline is a valid Directed Acyclic Graph
- **🌓 Dark Mode UI**: Beautiful aurora gradient background with modern glassmorphic design
- **⚡ Real-time Updates**:  Instant visual feedback as you build your pipeline
- **📊 MiniMap & Controls**: Navigate large pipelines easily

## 🎯 Node Types

### Primitive Nodes
- **Input**: Define pipeline inputs with customizable types (Text/File)
- **Output**: Define pipeline outputs (Text/Image)
- **Text**: Dynamic text with variable interpolation
- **LLM**: Large Language Model integration

### Advanced Nodes
- **Note**: Add annotations and documentation
- **Email**: Email sending functionality
- **Translation**: Language translation processing
- **API**:  External API integration
- **Filter**:  Conditional data filtering
- **Logger**: Debug and logging capabilities
- **Condition**:  Conditional branching (True/False paths)
- **Merge**: Combine multiple data streams
- **Delay**: Add time delays in processing
- **Transform**: Data transformation operations

## 🛠️ Tech Stack

### Frontend
- **React 18.2** - UI framework
- **TypeScript 5.8** - Type safety
- **ReactFlow 11. 11** - Visual workflow editor
- **Zustand 4.5** - State management
- **Vite 6.2** - Build tool
- **Tailwind CSS** - Styling
- **Lucide React** - Icon library

### Backend
- **FastAPI** - High-performance Python API framework
- **Python 3.x** - Backend runtime
- **CORS Middleware** - Cross-origin request handling

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- Python 3.8+
- npm or yarn

### Frontend Setup

```bash
# Clone the repository
git clone https://github.com/D-Arijit57/vectorshift-pipeline-builder.git
cd vectorshift-pipeline-builder

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will be available at `http://localhost:3000`

### Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install Python dependencies
pip install fastapi uvicorn

# Start the FastAPI server
uvicorn main:app --reload --port 8000
```

The backend API will be available at `http://localhost:8000`

## 📖 Usage

1. **Add Nodes**:  Drag and drop node types from the toolbar onto the canvas
2. **Connect Nodes**: Click and drag from output handles to input handles to create connections
3. **Configure Nodes**: Click on nodes to edit their properties and settings
4. **Validate Pipeline**: Click the "Submit" button to analyze your pipeline
5. **View Results**: See node count, edge count, and DAG validation status

### Variable Interpolation

Text nodes support dynamic variables using double curly braces: 

```
Hello {{name}}, your order {{order_id}} is ready!
```

Variables are automatically detected and create corresponding input handles.

## 🔌 API Endpoints

### `POST /pipelines/parse`

Validates and analyzes pipeline structure.

**Request Body:**
```json
{
  "nodes":  [... ],
  "edges": [...]
}
```

**Response:**
```json
{
  "num_nodes": 5,
  "num_edges":  4,
  "is_dag":  true
}
```

### `GET /health`

Health check endpoint.

**Response:**
```json
{
  "status": "healthy"
}
```

## 🏗️ Project Structure

```
vectorshift-pipeline-builder/
├── components/
│   ├── nodes/
│   │   ├── BaseNode.tsx          # Base node component
│   │   ├── PrimitiveNodes.tsx    # Input, Output, LLM nodes
│   │   ├── TextNode.tsx          # Dynamic text node
│   │   └── AdvancedNodes.tsx     # All advanced node types
│   ├── Toolbar.tsx               # Draggable node toolbar
│   └── SubmitButton.tsx          # Pipeline submission
├── services/
│   └── pipelineService.ts        # API integration
├── backend/
│   └── main.py                   # FastAPI backend
├── App.tsx                       # Main application
├── store. ts                      # Zustand state management
├── types.ts                      # TypeScript definitions
└── package.json                  # Dependencies
```

## 🎨 Design Features

- **Aurora Gradient Background**: Dynamic purple/indigo/violet gradients
- **Glassmorphic UI**:  Backdrop blur effects with semi-transparent panels
- **Smooth Animations**: Animated edges and pulsing accents
- **Responsive Design**: Works on various screen sizes
- **Dark Mode Optimized**: Eye-friendly dark theme

## 🔄 State Management

The application uses Zustand for efficient state management:

```typescript
const { nodes, edges, onNodesChange, onEdgesChange, onConnect, addNode } = useStore();
```

Key state features:
- Node creation and updates
- Edge management
- Automatic handle registration
- Type-safe operations

## 🧪 DAG Validation Algorithm

The backend uses depth-first search (DFS) with a three-color algorithm (White-Gray-Black) to detect cycles:

- **White**:  Unvisited node
- **Gray**: Currently being explored
- **Black**: Completely processed

A back edge to a gray node indicates a cycle, making the graph not a DAG.

## 📝 License

This project is open source and available under the MIT License. 

## 👨‍💻 Author

**D-Arijit57**

- GitHub: [@D-Arijit57](https://github.com/D-Arijit57)

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! 

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🙏 Acknowledgments

- [ReactFlow](https://reactflow.dev/) - Powerful workflow visualization
- [FastAPI](https://fastapi.tiangolo.com/) - Modern Python web framework
- [Lucide Icons](https://lucide.dev/) - Beautiful icon library
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework

---

⭐ Star this repo if you find it helpful! 
