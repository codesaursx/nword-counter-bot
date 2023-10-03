import { SlashCommandBuilder } from 'discord.js';

import { CommandEntity } from '@/entities/command.entity';
import { TrackerService } from '@/services';

const command = new CommandEntity(
  new SlashCommandBuilder()
    .setName('stats')
    .setDescription('Shows the count of the user saying the N-Word.')
    .addUserOption(option =>
      option
        .setName('target')
        .setDescription('The member you want to expose')
        .setRequired(false)
    ),

  async interaction => {
    if (!interaction.inGuild()) {
      await interaction.reply(`It seems that you're not on a server.`);
      return;
    }

    let target = interaction.options.getUser('target');
    if (!target) target = interaction.user;

    const data = await TrackerService.findOne(target.id, interaction.guildId);

    if (!data) {
      await interaction.reply(`<@${target.id}> is a clean as a white man.`);
      return;
    }

    await interaction.reply(
      `<@${target.id}> Has said the N-Word ${data.count} times.`
    );
  }
);

export default command;
