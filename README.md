# Clean YouTube (Queue-Tube)

Clean YouTube (Queue-Tube) is a distraction-free web app for organizing and watching YouTube playlists. The platform focuses on enhancing productivity by limiting distractions and providing features like playlist management, note-taking, and video tracking.

## Features

### 1. User Authentication

- Secure login using Google or Facebook.

### 2. Playlist Management

- Add up to 20 playlists using YouTube playlist links or IDs.
- View and manage playlists and videos.

### 3. Distraction-Free Video Watching

- Watch videos exclusively from your added playlists—no outside suggestions.

### 4. Time-Stamped Note-Taking

- Take notes while watching videos and save them with timestamps.

### 5. Playlist and Video Data Fetching

- Fetches playlist and video data from YouTube API once per day.

### 6. Watch History

- Tracks watched videos and their timestamps.

## Tech Stack

- **Frontend**: React.js, Next.js
- **Backend**: Node.js, MongoDB
- **Deployment**: Vercel

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/NO-Alim/queue-tube.git
   ```
2. Navigate to the project directory:
   ```bash
   cd queue-tube
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set up environment variables:
   - Create a `.env` file in the root directory.
   - Add the following variables:
     ```env
     MONGODB_CONNECTION_STRING=your_mongo_connection_string
     YOUTUBE_API_KEY=your_youtube_api_key
     ```
5. Start the development server:
   ```bash
   npm run dev
   ```
6. Open your browser and navigate to `http://localhost:3000`.

## Project Links

- **Live Project**: [Queue-Tube](https://queue-tube.vercel.app/)
- **GitHub Repository**: [Queue-Tube Code](https://github.com/NO-Alim/queue-tube)

## Challenges & Learnings

### Challenges:

- Handling MongoDB connection errors and managing compound indexes.
- Designing a scalable schema for playlists and videos.

### Learnings:

- Improved my understanding of MongoDB connection management and indexing.
- Enhanced debugging skills and problem-solving capabilities.

## How to Contribute

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Make your changes and commit them:
   ```bash
   git commit -m "Add feature"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

---

Thank you for checking out Clean YouTube (Queue-Tube)! If you have any feedback or suggestions, feel free to reach out. 😊
