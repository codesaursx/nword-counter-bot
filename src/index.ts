import { Events } from 'discord.js';

import { DISCORD_TOKEN } from '@/constants/config.constants';
import { TARGET_WORDS } from '@/constants/target-words.constants';
import { client } from '@/constants/client.constants';

import { TrackerService } from '@/services';

import { commandRegister } from '@/registers/command.register';
import { getWordsOccurrences } from '@/utils/get-words-occurrences.util';

client.commands = commandRegister();

client.once(Events.ClientReady, c => {
  console.log(`Up and Running! Logged in as ${c.user.tag}`);
});

client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) return;

  const command = interaction.client.commands.get(interaction.commandName);
  if (!command) {
    console.error(`No command matching ${interaction.commandName} was found.`);
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    console.log(error);
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({
        content: 'There was an error while executing this command!',
        ephemeral: true
      });
    } else {
      await interaction.reply({
        content: 'There was an error while executing this command!',
        ephemeral: true
      });
    }
  }
});

client.on(Events.MessageCreate, async message => {
  if (!message.inGuild()) return;

  const content = message.content;
  const matches = getWordsOccurrences(content.toLowerCase(), TARGET_WORDS);

  const needCountUpdate = matches > 0;
  if (needCountUpdate) {
    const userId = message.author.id;
    const guildId = message.guildId;

    await TrackerService.upsert(userId, guildId, matches);
  }

  // TODO: Reply messages that contains n-words?
  console.log(`This text includes ${matches} N-Words`);
});

client.login(DISCORD_TOKEN);
