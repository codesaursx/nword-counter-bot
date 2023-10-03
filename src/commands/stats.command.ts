import { SlashCommandBuilder } from 'discord.js';

import { CommandEntity } from '@/entities/command.entity';

const command = new CommandEntity(
  new SlashCommandBuilder()
    .setName('stats')
    .setDescription('Shows the count of the user saying the N-Word.'),
  async interaction => {
    await interaction.reply('[user] Has said the N-Word [totalCount] times.');
  }
);

export default command;
