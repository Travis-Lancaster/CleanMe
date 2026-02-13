# CleanMe

React Hooks + TypeScript + Ant Design project for B2Gold.

## Project Setup

This project was initialized with the following structure:
- **Frontend**: React with TypeScript and Ant Design
- **Data Layer**: Custom API clients and database schemas
- **UI Scaffold**: Comprehensive component library
- **UX Components**: Drill hole data management system

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- pnpm package manager

### Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/lanca1988/CleanMe.git
   cd CleanMe
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Start the development server:
   ```bash
   pnpm dev
   ```

## Project Structure

```
src/
├── app.tsx              # Main application component
├── index.tsx            # Application entry point
├── data-layer/          # Data management layer
├── ui-scaffold/         # UI component library
└── ux/                  # User experience components
```

## GitHub Repository Setup

**Note**: This repository needs to be created on GitHub first.

To complete the GitHub setup:

1. **Create Repository on GitHub**:
   - Go to https://github.com/new
   - Repository name: `CleanMe`
   - Make it public
   - Do NOT initialize with README (we have existing code)
   - Click "Create repository"

2. **Push to GitHub**:
   ```bash
   git remote add origin https://github.com/lanca1988/CleanMe.git
   git branch -M master
   git push -u origin master
   ```

## Technologies Used

- **React 18** - Frontend framework
- **TypeScript** - Type-safe JavaScript
- **Ant Design** - UI component library
- **Vite** - Build tool and dev server
- **AG-Grid** - Data grid components
- **Dexie** - IndexedDB wrapper for offline storage
- **React Query** - Data fetching and caching

## Development

The project uses modern development practices with:
- TypeScript for type safety
- ESLint for code quality
- Prettier for code formatting
- Git for version control

## License

This project is licensed under the MIT License.