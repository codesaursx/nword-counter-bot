import {
  CacheType,
  ChatInputCommandInteraction,
  SlashCommandBuilder
} from 'discord.js';
import { CommandEntity } from '../entities/command.entity';

export default new CommandEntity(
  new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with Pong!'),
  async interaction => {
    await interaction.reply('Pong!');
  }
);
