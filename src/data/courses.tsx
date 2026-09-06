import React from 'react';
import { 
  Brain, Code, Link, Cpu, Terminal, Database, Server, Layers, 
  Cpu as AiIcon, Activity, Shield, Lock 
} from 'lucide-react';

export interface SyllabusModule {
  hours: string;
  title: string;
  topics: string[];
}

export interface Course {
  id: string;
  title: string;
  instructor: string;
  methodology: string;
  costLocal: string;
  costGlobal: string;
  learn: string[];
  achieve: string;
  icon: React.ReactNode;
  accentColor: string;
  syllabus: SyllabusModule[];
}

export const courses: Course[] = [
  {
    id: "ai-agents",
    title: "Agentic AI & Multi-Agent Systems",
    instructor: "Jhanak Parajuli (Founder & Multi-Agent Systems Architect)",
    methodology: "Case-study driven engineering paired with deep sandbox notebook implementation. 30% theory and conceptual boundaries, 70% direct programmatic orchestration and deployment.",
    costLocal: "10000 NPR",
    costGlobal: "100 USD",
    accentColor: "var(--accent2)",
    icon: <Brain size={22} style={{ color: 'var(--accent2)' }} />,
    learn: [
      "Constructing dense vector spaces and optimizing multi-layered Retrieval-Augmented Generation (RAG).",
      "Orchestrating stateful, multi-agent execution graphs using deterministic guardrails.",
      "Deploying production-ready private LLM inference servers and tracking latency metrics."
    ],
    achieve: "You will build and fully deploy a secure, autonomous cross-border regulatory compliance agent network capable of structured data extraction and real-time validation.",
    syllabus: [
      { hours: "Hours 01-10", title: "Foundations of LLM Inference & Embeddings", topics: ["Tokenomics, context window limits, and cost optimization formulas", "Structuring local embedding generation pipelines", "Vector database management: Designing optimal index topologies in Qdrant and Pinecone"] },
      { hours: "Hours 11-20", title: "Advanced RAG & Semantic Context Routing", topics: ["Hierarchical chunking patterns and metadata tracking structures", "Implementing multi-stage semantic re-ranking layers", "Building intent routing logic using semantic similarity vectors"] },
      { hours: "Hours 21-30", title: "Multi-Agent Systems & Orchestration Graphs", topics: ["Transitioning from linear chains to complex Directed Acyclic Graphs (DAGs)", "Managing agent state persistence, shared memories, and human-in-the-loop gates", "Designing specialized agent networks using programmatic graph routing frameworks"] },
      { hours: "Hours 31-40", title: "Production Deployment, Guardrails & MLOps", topics: ["Implementing semantic guardrails to eliminate data hallucinations", "Containerizing complete agent runtimes via Docker", "Deploying low-latency endpoints to cloud layers with real-time logging"] }
    ]
  },
  {
    id: "generative-ai-transformers",
    title: "Generative AI & Transformer Architectures",
    instructor: "Dr. Amit Thapa (Chief AI Systems Scientist)",
    methodology: "Deep mathematical derivation of attention matrices combined with raw PyTorch construction of structural transformer blocks from absolute zero-dependency modules.",
    costLocal: "10000 NPR",
    costGlobal: "100 USD",
    accentColor: "var(--accent2)",
    icon: <AiIcon size={22} style={{ color: 'var(--accent2)' }} />,
    learn: [
      "Building multi-head self-attention mechanisms and causal mask blocks from vanilla tensor arrays.",
      "Fine-tuning foundational frontier models using parameter-efficient fine-tuning (PEFT, LoRA, QLoRA).",
      "Optimizing KV-caching configurations and low-bit computational quantization mechanics."
    ],
    achieve: "You will write a custom generative transformer block from scratch, train it on localized data targets, and partition it for low-latency local edge computing inference loops.",
    syllabus: [
      { hours: "Hours 01-10", title: "Sequence Vector Foundations & Raw Attention Mechanics", topics: ["Mathematical tracking of sequence matrices, embeddings, and matrix operations", "Deconstructing dot-product attention pipelines step-by-step", "Analyzing gradient degradation models inside recurrent architectures"] },
      { hours: "Hours 11-20", title: "Compiling the Complete Transformer Engine", topics: ["Writing multi-head positional scaling matrices from structural tensor dimensions", "Configuring layer normalization layouts and feed-forward linear layers", "Compiling causal mask constraints for absolute token insulation"] },
      { hours: "Hours 21-30", title: "Parameter-Efficient Adaptations (PEFT/LoRA)", topics: ["Mathematical proof lines for matrix rank dimension downsizing", "Injecting and tracking low-rank adapters inside weights checkpoints", "Quantizing large models to 4-bit configurations while preserving model accuracy metrics"] },
      { hours: "Hours 31-40", title: "Alignment Protocols & Inference Speed Fine-Tuning", topics: ["Programming Direct Preference Optimization (DPO) routines inside training runs", "Implementing FlashAttention kernel hooks into standard tensor arrays", "Exporting optimized checkpoints to streaming production runtimes"] }
    ]
  },
  {
    id: "mlops-production-lifecycle",
    title: "Production MLOps Lifecycle Engineering",
    instructor: "Ecosystem Data Platform Core",
    methodology: "Production-grade automated model testing cycles. 100% focused on continuous execution flows, drift telemetry assertion tracking, and isolated champion/challenger rollouts.",
    costLocal: "10000 NPR",
    costGlobal: "100 USD",
    accentColor: "var(--accent2)",
    icon: <Activity size={22} style={{ color: 'var(--accent2)' }} />,
    learn: [
      "Structuring completely automated model assembly and pipeline validation scripts.",
      "Deploying online and offline feature store layers with automated data lineage version logs.",
      "Configuring live data drift tracking webhooks to trigger retraining engines dynamically."
    ],
    achieve: "You will build a responsive, containerized model pipeline that handles live log traffic, detects accuracy drift metrics via telemetry, and handles canary code deployments with automated rollbacks.",
    syllabus: [
      { hours: "Hours 01-10", title: "Feature Engineering Infrastructure & Data Tracking", topics: ["Configuring online database layers via automated Feature Stores (Feast Frameworks)", "Tracking raw target file lineages with Data Version Control (DVC)", "Assembling isolated data inspection validation boundaries inside CI/CD blocks"] },
      { hours: "Hours 11-20", title: "Experiment Pipelines & Model Gate Management", topics: ["Orchestrating model parameter recording maps within decoupled MLflow instances", "Structuring schema version validations for model artifacts container nodes", "Configuring metric checkpoint monitors inside custom Airflow DAG configurations"] },
      { hours: "Hours 21-30", title: "High-Throughput Serving Matrices & Container Runs", topics: ["Wrapping deep tensor weights arrays inside high-performance Triton serving engines", "Configuring load balancing rules over concurrent model processing cells", "Writing traffic mirror templates to split incoming requests into production shadow tracks"] },
      { hours: "Hours 31-40", title: "Observability Metrics & Retraining Automation Loops", topics: ["Writing mathematical calculations to trace and flag data profile divergence errors", "Connecting Prometheus metrics to flag live performance degradation events", "Constructing zero-downtime model swap routines with absolute safety fallbacks"] }
    ]
  },
  {
    id: "sovereign-defense",
    title: "Sovereign Infrastructure Defense & Threat Hunting",
    instructor: "MTS Cybersecurity Assurance Lab",
    methodology: "100% blue-team laboratory simulation environment. Focuses on setting up real-time endpoint observability, kernel-level logging auditing, and automated incident mitigation playbooks.",
    costLocal: "10000 NPR",
    costGlobal: "100 USD",
    accentColor: "var(--accent)",
    icon: <Shield size={22} style={{ color: 'var(--accent)' }} />,
    learn: [
      "Configuring zero-trust network boundary rules and micro-segmenting container grids.",
      "Writing advanced SIEM correlations to discover low-and-slow root access exploits.",
      "Conducting live volatile RAM forensics and pulling process indicators of compromise (IoC)."
    ],
    achieve: "You will configure, harden, and continuously audit a multi-node company server against live background exploit script injections under zero-trust conditions.",
    syllabus: [
      { hours: "Hours 01-10", title: "Linux Hardening & Enterprise Zero-Trust Architecture", topics: ["Configuring rigid PAM policies, SSH restrictions, and system integrity boundaries", "Micro-segmenting software container interactions using network policies", "Implementing zero-trust access loops and managing local credential matrices safely"] },
      { hours: "Hours 11-20", title: "Telemetry Gathering & Log Pipeline Aggregations", topics: ["Deploying OSquery, Sysmon, and Auditd tracking agents across remote endpoints", "Structuring high-volume security pipeline indexing rules via Elasticsearch and Logstash", "Writing custom Sigma rules to intercept unusual execution behavior indicators"] },
      { hours: "Hours 21-30", title: "Active Threat Hunting & Memory Forensics", topics: ["Analyzing memory structures using Volatility frameworks to capture active processes", "Discovering advanced rootkits and tracking hidden background thread loops", "Tracing shell commands, evaluating malicious payloads, and pulling process signatures"] },
      { hours: "Hours 31-40", title: "Incident Response Playbooks & Threat Isolation Automation", topics: ["Writing bash/python automation tasks to isolate compromised cluster pods dynamically", "Configuring software firewalls to drop target malicious command indicators", "Constructing absolute forensic analysis audit logs for regulatory oversight review"] }
    ]
  },
  {
    id: "offensive-penetration",
    title: "Offensive Security & Advanced Penetration Testing",
    instructor: "MTS Offensive Operations Cell",
    methodology: "Tactile red-team sandbox capture-the-flag environments. Moving from automated web perimeter assessments into advanced scripting of zero-dependency manual exploit payloads.",
    costLocal: "10000 NPR",
    costGlobal: "100 USD",
    accentColor: "var(--accent)",
    icon: <Lock size={22} style={{ color: 'var(--accent)' }} />,
    learn: [
      "Discovering logical configuration bypass flows across complex microservice token maps.",
      "Compiling tailored shellcode payloads that avoid static signature detection layers.",
      "Executing deep-tier network pivoting sequences over multi-homed subnets."
    ],
    achieve: "You will successfully compromise and elevate system rights over an isolated target corporate environment maze containing modern security barriers.",
    syllabus: [
      { hours: "Hours 01-10", title: "Advanced Reconnaissance & Attack Vector Mapping", topics: ["Advanced port configuration analysis and tracking perimeter surface changes", "Writing custom automation tasks to discover vulnerable software variants", "Mapping identity authorization graphs across directory servers"] },
      { hours: "Hours 11-20", title: "Web Application Flaws & API Security Evasions", topics: ["Exploiting server-side requests (SSRF) and broken object authorization models", "Bypassing intermediate security gateways and API token validation loops", "Injecting customized SQL data queries inside filtered database backend stacks"] },
      { hours: "Hours 21-30", title: "Payload Compilation & Evasion Engineering", topics: ["Writing reverse shell code in vanilla C and Go without library blocks", "Using basic encoders to disguise file properties against processing filters", "Executing memory injections inside decoupled runtime memory scopes"] },
      { hours: "Hours 31-40", title: "Subnet Pivoting & Active Directory Exploit Sequences", topics: ["Setting up multi-stage port proxies to slide traffic into hidden subnets", "Exploiting network trust configurations to capture group management rights", "Writing professional vulnerability review reports with step-by-step resolution scripts"] }
    ]
  },
  {
    id: "adv-software",
    title: "Advanced Software Engineering & Scale",
    instructor: "Er. Sunil Pokhrel (Principal Systems Infrastructure Engineer)",
    methodology: "Low-level system sandbox compilation combined with continuous peer-reviewed code auditing. Focused entirely on backend architecture resilience, zero-dependency engineering, and concurrency safety.",
    costLocal: "10000 NPR",
    costGlobal: "100 USD",
    accentColor: "var(--accent)",
    icon: <Code size={22} style={{ color: 'var(--accent)' }} />,
    learn: [
      "Mastering memory safety models, custom pointers, and structural asynchronous patterns.",
      "Architecting highly concurrent network sockets and distributed cache fabrics.",
      "Designing highly optimized REST, GraphQL, and high-performance gRPC interfaces."
    ],
    achieve: "You will engineer and benchmark an independent concurrent telemetry streaming engine processing 50,000+ operations per second with sub-10ms response margins.",
    syllabus: [
      { hours: "Hours 01-10", title: "Low-Level Memory Management & Compilers", topics: ["Pointers, stack vs heap allocations, and garbage collection mechanisms", "Writing highly performant, type-safe structures in Go and Rust", "Profiling CPU bottlenecks and handling memory leak diagnostic cycles"] },
      { hours: "Hours 11-20", title: "High-Concurrency Paradigms & Thread Safety", topics: ["Asynchronous runtimes, event loops, and green thread abstractions", "Managing manual exclusions, race conditions, and synchronization primitives", "Designing thread-safe channels for real-time computational pooling"] },
      { hours: "Hours 21-30", title: "Distributed Data Frameworks & Caching", topics: ["Architecting low-latency transactional layers with Redis and Memcached", "Database connection pool fine-tuning and write-ahead log structures", "Implementing data sharding and partition schemes across large datasets"] },
      { hours: "Hours 31-40", title: "Production Network Engines & Benchmarking", topics: ["Engineering high-throughput gRPC services and binary streaming endpoints", "Writing system load tests using automated traffic injection scripts", "Configuring reverse proxies, connection multiplexing, and SSL/TLS handshakes"] }
    ]
  },
  {
    id: "blockchain",
    title: "Blockchain Technologies & Consensus Engines",
    instructor: "Dr. Ramesh Adhikari (Principal Ledger Researcher)",
    methodology: "Cryptographic sandbox assembly combined with rigorous gas-optimization profiling. 100% focused on smart contract design, network verification, and zero-knowledge proof applications.",
    costLocal: "10000 NPR",
    costGlobal: "100 USD",
    accentColor: "var(--accent)",
    icon: <Link size={22} style={{ color: 'var(--accent)' }} />,
    learn: [
      "Writing type-safe smart contracts using Solidity and Rust for Ethereum and Solana ecosystems.",
      "Deconstructing distributed consensus mechanisms and multi-node validation protocols.",
      "Building end-to-end decentralized applications (dApps) linking Web3 providers with frontend states."
    ],
    achieve: "You will develop, test, and audit an independent cross-chain asset routing token smart contract complete with optimized automated market maker liquidity interfaces.",
    syllabus: [
      { hours: "Hours 01-10", title: "Cryptographic Primitives & Distributed Ledgers", topics: ["Hashing algorithms, Merkle trees, and public key cryptography matrices", "Deconstructing Proof-of-Work (PoW) vs Proof-of-Stake (PoS) state machines", "Peer-to-peer network routing and block propagation dynamics"] },
      { hours: "Hours 11-20", title: "Smart Contract Engineering & Security Foundations", topics: ["Solidity compilation structures, memory layouts, and state tracking variables", "Writing defensive code against reentrancy, overflow, and oracle manipulation threats", "Unit testing distributed modules using local Hardhat and Foundry runtime networks"] },
      { hours: "Hours 21-30", title: "Decentralized Storage & Advanced Web3 Architecture", topics: ["Integrating decentralized persistence arrays via IPFS and Arweave systems", "Connecting frontends using modern RPC client libraries", "Designing gas-efficient asset tracking frameworks"] },
      { hours: "Hours 31-40", title: "Enterprise Scaling & Zero-Knowledge Implementations", topics: ["Evaluating Layer-2 optimistic and zero-knowledge rollups infrastructure", "Structuring basic zk-SNARK compilation circuits", "Deploying production contracts to testnets and compiling comprehensive audit logs"] }
    ]
  },
  {
    id: "quantum",
    title: "Quantum Computing Foundations",
    instructor: "Prof. Kiran Sharma (Quantum Physics & Mathematical Computation Specialist)",
    methodology: "Mathematical modeling verified via remote programmatic execution on absolute physical IBM Quantum processing arrays. Focused on quantum logic gate implementation and simulation runtimes.",
    costLocal: "10000 NPR",
    costGlobal: "100 USD",
    accentColor: "var(--green)",
    icon: <Cpu size={22} style={{ color: 'var(--green)' }} />,
    learn: [
      "Manipulating pure quantum states using linear algebra, Dirac notation, and Bloch spheres.",
      "Programming complete quantum circuit maps using IBM Qiskit software development frameworks.",
      "Implementing advanced acceleration algorithms that surpass classical computational complexities."
    ],
    achieve: "You will write and execute a verified quantum search network script on real hardware, optimizing error-mitigation parameters to maintain coherent processing loops.",
    syllabus: [
      { hours: "Hours 01-10", title: "Mathematical Infrastructure & Bloch Mechanics", topics: ["Complex vector spaces, inner products, and Hermitian matrices", "Qubits representation, quantum state vectors, and superposition principles", "Mathematical parsing of multi-qubit systems and quantum entanglement thresholds"] },
      { hours: "Hours 11-20", title: "Quantum Logic Gates & Qiskit Programming", topics: ["Single-qubit operations: Pauli matrices, Hadamard, and phase rotation modules", "Multi-qubit gates: CNOT, Toffoli, and controlled unitary operators design", "Constructing, running, and measuring circuits using the Python Qiskit library"] },
      { hours: "Hours 21-30", title: "Core Algorithmic Quantum Implementations", topics: ["Coding the Deutsch-Jozsa evaluation protocol step-by-step", "Implementing Grover's Search Algorithm: Designing diffusion operators", "Analyzing Shor's Factoring framework and its impact on modern RSA cryptography"] },
      { hours: "Hours 31-40", title: "NISQ Realities, VQE & Real Hardware Execution", topics: ["Managing quantum noise, decoherence factors, and relaxation constants", "Programming the Variational Quantum Eigensolver (VQE) for chemical modeling", "Routing remote code arrays through IBM Cloud quantum processor cells safely"] }
    ]
  },
  {
    id: "prog-basics",
    title: "Programming Basics & Algorithmic Logic",
    instructor: "Er. Sunil Pokhrel (Principal Systems Infrastructure Engineer)",
    methodology: "Zero-slide, immediate tactile terminal interaction. Building continuous code construction mechanics from core principles, avoiding automated block tools or copy-paste tutorials.",
    costLocal: "10000 NPR",
    costGlobal: "100 USD",
    accentColor: "var(--accent)",
    icon: <Terminal size={22} style={{ color: 'var(--accent)' }} />,
    learn: [
      "Deconstructing problems logically into clean execution steps and pseudo-code structures.",
      "Mastering memory variable allocations, conditional routes, and recursive loop pipelines.",
      "Configuring data types, data structures, and structural algorithms for efficient processing."
    ],
    achieve: "You will write a terminal-based, local data file indexing tool entirely from scratch, utilizing clean memory scoping layouts, input sanitizers, and comprehensive error catch layers.",
    syllabus: [
      { hours: "Hours 01-10", title: "Computer Architecture Core & Simple Script Scopes", topics: ["How machine instructions operate: Understanding binary systems, compilers, and runtimes", "Declaring variables, evaluating primitive data forms, and memory scoping rules", "Writing multi-branch conditional statements and configuring loop systems safely"] },
      { hours: "Hours 11-20", title: "Functional Modularization & Memory Collection Matrices", topics: ["Writing pure functions, pass-by-value parameters, and pass-by-reference mechanics", "Managing primitive data arrays, lists, and dynamic sizing strategies", "String parsing, character encodings, and string formatting metrics"] },
      { hours: "Hours 21-30", title: "Core Data Structuring & Algorithm Logic", topics: ["Implementing Key-Value maps, dictionaries, and hash allocation patterns", "Basic sorting mechanics and search logic configurations", "Big-O notation analysis and code execution profiling"] },
      { hours: "Hours 31-40", title: "File Operations, Error Exceptions & Capstone Assembly", topics: ["Reading and writing binary and text data files to disk storage systems", "Writing structured error handling and exception interception logic blocks", "Compiling, packaging, and debugging interactive terminal software projects locally"] }
    ]
  },
  {
    id: "data-engineering",
    title: "Data Engineering & Production Pipelines",
    instructor: "Anjali Shrestha (Lead Data Platform Architect)",
    methodology: "Tactile data architecture simulation. Setting up distributed logging infrastructures, high-throughput aggregation steps, and data validations inside an isolated workspace context.",
    costLocal: "10000 NPR",
    costGlobal: "100 USD",
    accentColor: "var(--green)",
    icon: <Database size={22} style={{ color: 'var(--green)' }} />,
    learn: [
      "Architecting transactional extract, transform, and load (ETL) schedules with strict schema checking rules.",
      "Setting up high-volume distributed messaging hubs capable of multi-consumer routing handlers.",
      "Optimizing cloud warehouse queries over partitioned dimensional datasets using index strategies."
    ],
    achieve: "You will build and monitor an integrated pipeline processing millions of active log signals, parsing and routing them down to live warehousing lakes for real-time BI indexing.",
    syllabus: [
      { hours: "Hours 01-10", title: "Batch Ingestion Mechanics & Schema Layouts", topics: ["Structuring clean Python ETL scripting and cron validation rules", "SQL optimization: Query execution paths, joining strategies, and indexing parameters", "Orchestrating workflows using custom dependency nodes in Apache Airflow"] },
      { hours: "Hours 11-20", title: "Stream Processing & Live Messaging Pools", topics: ["Setting up Apache Kafka topics, partition groups, and cluster topologies", "Writing resilient stream consumers with transaction isolation guarantees", "Handling backpressure limits and message recovery behaviors safely"] },
      { hours: "Hours 21-30", title: "Distributed Compute Stacks & Aggregations", topics: ["Programming processing blocks using Apache Spark and PySpark libraries", "Transforming semi-structured JSON structures into columnar formats at scale", "Configuring memory allocations and optimization strategies across cluster processing units"] },
      { hours: "Hours 31-40", title: "Enterprise Warehousing & Data Lakes", topics: ["Designing Star and Snowflake dimensional schema matrices", "Partitioning strategies and data pruning techniques in Snowflake and BigQuery", "Connecting sanitized views into live business intelligence aggregation dashboards"] }
    ]
  },
  {
    id: "devops-cloud",
    title: "Cloud-Native Operations & DevSecOps",
    instructor: "Er. Sunil Pokhrel (Principal Systems Infrastructure Engineer)",
    methodology: "Declarative infrastructure configuration execution. Zero application dashboard mouse clicks; everything is automated via terminal scripts, strict text manifest structures, and monitoring webhooks.",
    costLocal: "10000 NPR",
    costGlobal: "100 USD",
    accentColor: "var(--accent)",
    icon: <Server size={22} style={{ color: 'var(--accent)' }} />,
    learn: [
      "Isolating code engines into lightweight container layers with optimized caching structures.",
      "Managing live multi-pod networking loops with automated configuration parameters.",
      "Writing cloud platform automation templates to eliminate manual setup discrepancies."
    ],
    achieve: "You will provision, secure, and stress-test a multi-zone Kubernetes orchestration cluster with automated rolling updates and continuous container checking logic.",
    syllabus: [
      { hours: "Hours 01-10", title: "Container Engineering & Asset Assembly", topics: ["Writing high-security Dockerfiles using multi-stage compilation paradigms", "Optimizing layer cache speeds and thinning final images via alpine variants", "Managing environment configurations and system volume mounts safely"] },
      { hours: "Hours 11-20", title: "Orchestration Platforms & Network Routing", topics: ["Deploying pods, services, deployments, and ingress controllers in Kubernetes", "Managing cluster storage bounds, config maps, and tracking service definitions", "Configuring zero-downtime rolling update logic blocks and fallback mechanisms"] },
      { hours: "Hours 21-30", title: "Declarative Infrastructure as Code (IaC)", topics: ["Writing declarative cloud provider automation scripts using Terraform", "Managing shared state files, isolation tags, and configuration tracking keys", "Analyzing execution drift and configuring dynamic modular scaling pools"] },
      { hours: "Hours 31-40", title: "Continuous Integration & Perimeter Vulnerability Controls", topics: ["Building linting, checking, and assembly workflows via GitHub Actions configurations", "Automating container image vulnerability scanning routines inside runner actions", "Injecting logging telemetry aggregations with Grafana alert boundaries"] }
    ]
  },
  {
    id: "fullstack-react",
    title: "Advanced Full-Stack Engineering (React & Node.js)",
    instructor: "Elena Vance (Head of GovTech Systems Integration)",
    methodology: "Tactile production ecosystem optimization. Building production applications focused heavily on bundle shrinking, data caching protocols, and event tracking loops.",
    costLocal: "10000 NPR",
    costGlobal: "100 USD",
    accentColor: "var(--accent2)",
    icon: <Layers size={22} style={{ color: 'var(--accent2)' }} />,
    learn: [
      "Mastering React rendering lifecycles, memory hook constraints, and virtual DOM tracking layers.",
      "Designing decoupled service routers processing database transactions with pool managers.",
      "Deploying high-performance web components to worldwide edge distribution points."
    ],
    achieve: "You will build and optimize a full-stack, real-time application featuring instant data sync states, edge rendering layers, and robust encryption protocols.",
    syllabus: [
      { hours: "Hours 01-10", title: "Advanced React State Fabrics & Dom Metrics", topics: ["Fine-tuning state tracking via custom dispatch hooks and reference states", "Profiling execution bottlenecks: Eliminating wasteful sub-tree updates", "Implementing background worker threads for complex math calculations"] },
      { hours: "Hours 11-20", title: "Server-Driven Framework Layouts (Next.js)", topics: ["Structuring component architecture patterns across server and client boundaries", "Configuring partial pre-rendering strategies and route optimizations", "Setting up serverless route functions with edge database pooling layers"] },
      { hours: "Hours 21-30", title: "Asynchronous Backend Engines & Persistent Pools", topics: ["Writing secure event routes using Node.js, TypeScript, and Fastify configurations", "Integrating connection managers with PostgreSQL or MongoDB", "Structuring real-time socket connections with horizontal scaling metrics"] },
      { hours: "Hours 31-40", title: "Global Deployment Optimization Matrices", topics: ["Configuring zero-latency production deployments onto Vercel and AWS infrastructures", "Tuning edge-caching configurations and image optimization pipelines", "Implementing cookie-based auth validations and cross-site scripting defense barriers"] }
    ]
  }
];
