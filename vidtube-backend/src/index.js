import 'dotenv/config';
import app from './app.js';
import connectDB from './db/dbconnect.js';
import { startCleanupScheduler } from './utils/cleanupTemp.js';

connectDB()
  .then(() => {
    // Start temp file cleanup scheduler
    const stopCleanup = startCleanupScheduler();
    console.log('Temp file cleanup scheduler started');

    // Start server only after DB connection
    const server = app.listen(process.env.PORT || 8080, () => {
      console.log(`Server running on port ${process.env.PORT || 8080}`);
    });

    server.on('error', (error) => {
      console.error('Server error:', error);
      process.exit(1);
    });

    // Graceful shutdown
    const shutdown = () => {
      console.log('Shutting down gracefully...');
      stopCleanup();
      server.close(() => {
        console.log('Server closed');
        process.exit(0);
      });
    };

    process.on('SIGTERM', shutdown);
    process.on('SIGINT', shutdown);
  })
  .catch((error) => {
    console.error('Failed to start application:', error);
  });
