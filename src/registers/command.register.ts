import { Collection } from 'discord.js';
import path from 'node:path';
import fs from 'node:fs';
import { CommandEntity } from '../entities/command.entity';

export const commandRegister = () => {
  const commands = new Collection();

  const commandsPath = path.join(import.meta.dir, '..', 'commands');
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter(f => f.endsWith('.ts'));

  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command: CommandEntity = require(filePath).default;

    if ('data' in command && 'execute' in command) {
      commands.set(command.data.name, command);
    } else
      console.log(
        `[WARNING] The command at ${filePath} is missing required properties.`
      );
  }

  return commands;
};
