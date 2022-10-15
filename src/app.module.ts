import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { diskStorage } from 'multer';
import { Request } from 'express';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MulterModule.register({
      storage: diskStorage({
        destination: function (req, file, cb) {
          cb(null, './public');
        },
        filename: function (
          req: Request,
          file: Express.Multer.File,
          cb: (error: Error | null, filename: string) => void,
        ) {
          const filename = `${
            file.originalname?.split('.')[0]
          }-${Date.now()}-${Math.round(Math.random() * 1e9)}.${
            file.originalname?.split('.')[1]
          }`;
          cb(null, filename.replace(/ /g, '_'));
        },
      }),
    }),

    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
