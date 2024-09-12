import winston from "winston";
import 'winston-daily-rotate-file';
import 'winston-mongodb';
import TransportStream from "winston-transport";

import mongodb from 'mongodb';
const MongoClient = mongodb.MongoClient;
const url = 'mongodb+srv://wildani:Tuhiu2003@cluster0.slilzy7.mongodb.net/';
const client = new MongoClient(url);
await client.connect();

class MyClass extends TransportStream {
    constructor(options) {
        super(options);
    }

    log(info, next) {
        // custom disini sesuai kebutuhan email, WA, .....
        console.log(`${new Date().toISOString()} ${info.level}: ${info.message}`);
        next();
    }
}

const transport = new winston.transports.DailyRotateFile({
    filename: './logs/app-%DATE%.log',
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: true,
    maxSize: '1m',
    maxFiles: '14d',
    level: 'silly'
});

const logger = winston.createLogger({
    level: 'silly',
    format: winston.format.combine(
        winston.format.json({ space: 2 }),
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS A' }),
        winston.format.label({ label: '[LOGGER]' }),
        winston.format.printf(
            (info) => 
                `${info.label} ${info.timestamp} ${info.level}: ${info.message}`
        )
    ),
    transports: [
        // new winston.transports.Console({
        //     level: 'silly',
        //     format: winston.format.combine(winston.format.colorize({ all: true }))
        // }),
        new winston.transports.File({
            handleExceptions: true,
            level: 'silly',
            filename: './logs/app.log',
        }),
        new winston.transports.File({
            handleExceptions: true,
            level: 'error',
            filename: './logs/app-error.log',
        }),
        transport,
        // new winston.transports.MongoDB({
        //     level: 'error',
        //     db: await Promise.resolve(client),
        //     collection: 'logs',
        //     capped: true,
        // }),
        new MyClass({
            level: 'silly',
            format: winston.format.combine(winston.format.colorize({ all: true })),
        }),
    ]
})

export default logger;