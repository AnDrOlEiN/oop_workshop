#!/usr/bin/env node

import program from 'commander';
import Pipeline from './pipeline';

program.command('pipeline').action(() => console.log(Pipeline()));
program.parse(process.argv);
