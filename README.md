# Vup Web

A web-based file manager for the S5 decentralized storage network, built with SvelteKit and powered by [s5-rust](https://github.com/s5-dev/s5-rs) via WebAssembly.

## Features

- **Account Creation/Login**: Generate or recover your S5 identity using a BIP39 seed phrase
- **Directory Management**: Create and navigate directories
- **File Upload**: Upload files to remote S5 nodes with end-to-end encryption
- **File Download**: Download and decrypt files from the network

All data is end-to-end encrypted using your seed phrase - remote nodes only see encrypted blobs.

## Prerequisites

- [Bun](https://bun.sh/) (recommended) or Node.js 18+
- A modern browser with WebAssembly support
- A running S5 node for storage (see [Setting Up an S5 Node](#setting-up-an-s5-node))

## Setting Up an S5 Node

Vup Web requires a remote S5 node to store encrypted data. Follow these steps to set up your own node:

### 1. Install the S5 CLI

```bash
cargo install --git https://github.com/s5-dev/s5-rs s5_cli
```

### 2. Initialize S5

```bash
s5 init
```

### 3. Configure the Node

Edit `~/.config/s5/local.toml` to allow anonymous uploads:

```toml
[identity]
secret_key_file = "local.secretkey"

[store.default]
type = "local"
base_path = "/home/YOUR_USERNAME/.local/share/s5/anon_uploads"

# Allow anonymous uploads from anyone
[peer."*"]
id = "*"

[peer."*".blobs]
readable_stores = ["default"]
store_uploads_in = "default"
```

### 4. Start the Node

```bash
s5 start
```

The node will output its public ID on startup. Copy this ID.

### 5. Configure Vup Web

Update `src/state.svelte.ts` with your node's public ID:

```typescript
const REMOTE_NODE_ID = "your_node_public_id_here";
```

## Getting Started

### Install Dependencies

```bash
bun install
```

### Development

Start the development server:

```bash
bun run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
bun run build
```

Preview the production build:

```bash
bun run preview
```

## Testing the Application

1. Ensure your S5 node is running (`s5 start`)
2. Start the dev server with `bun run dev`
3. Open the app in your browser
4. **Create Account**: A seed phrase will be generated automatically. Save it securely and check the confirmation box, then click "Create account"
5. **Sign In**: If you already have an account, click "Sign In instead" and enter your seed phrase
6. **Browse Files**: Navigate directories using the breadcrumb navigation or Quick Access sidebar
7. **Create Directory**: Click "Create Directory" and enter a name
8. **Upload Files**: Click "Upload Files" to select and upload a file
9. **Download Files**: Click on any file to download it

## Technology Stack

- **Framework**: [SvelteKit](https://kit.svelte.dev/) with Svelte 5
- **S5 Client**: [@redsolver/s5-wasm](https://www.npmjs.com/package/@redsolver/s5-wasm) - Rust/WASM bindings for S5
- **Build Tool**: [Vite](https://vitejs.dev/)
- **UI Components**: Custom Svelte components with Storybook

## Storybook

View and develop UI components in isolation:

```bash
bun run storybook
```

## License

See [LICENSE](./LICENSE) for details.
