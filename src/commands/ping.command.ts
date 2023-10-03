import { SlashCommandBuilder } from 'discord.js';

import { CommandEntity } from '../entities/command.entity';

const command = new CommandEntity(
  new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with Pong!'),
  async interaction => {
    await interaction.reply('Pong!');
  }
);

export default command;
