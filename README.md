# Conway's Game of Life – React Frontend

This is a React + Vite + TypeScript frontend implementation of **Conway’s Game of Life**, styled with TailwindCSS.

## 🚀 How to Run

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:5173](http://localhost:5173) in your browser.

## 🎮 How to Play

- **Click cells** to toggle them on/off.
- **Next** → advances one generation.
- **Play / Pause** → runs generations automatically at the chosen speed.
- **Advance X** → moves forward by a chosen number of generations.
- **Final State** → computes until the board is stable, extinct, or looping.
- **Presets** → quickly load common patterns (Glider, Blinker).
- **Speed input** → adjust play speed in milliseconds.
- **Generation counter** → shows how many generations have passed.
- **Board size display** → shows current grid dimensions.

## 🌱 Future Improvements

- **Keyboard shortcuts**
  - Space → Play/Pause
  - N → Next generation

- **Resizable board**
  Change rows/cols dynamically.

- **Randomize / Clear**
  Quickly seed or reset the board.

- **Save & Load boards**
  Persist custom boards locally or via API.

- **API integration**
  Replace the in-memory simulation with the backend .NET API.

- **Deployment**
  Deploy to Vercel/Netlify with environment-based configs.
