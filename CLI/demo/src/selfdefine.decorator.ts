/* eslint-disable prettier/prettier */
import { SetMetadata } from '@nestjs/common';

export const Selfdefine = (...args: string[]) => SetMetadata('selfdefine', args);
// @Reflect.defineMetadata
