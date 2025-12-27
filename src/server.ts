import { Server } from 'http';
import app from './app';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

const port = process.env.PORT || 5000;

async function main() {
    const server: Server = app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });

    const exitHandler = () => {
        if (server) {
            server.close(() => {
                console.info('Server closed');
            });
        }
        process.exit(1);
    };

    const unexpectedErrorHandler = (error: unknown) => {
        console.error(error);
        exitHandler();
    };

    process.on('uncaughtException', unexpectedErrorHandler);
    process.on('unhandledRejection', unexpectedErrorHandler);

    process.on('SIGTERM', () => {
        console.info('SIGTERM received');
        if (server) {
            server.close();
        }
    });
}

main();
