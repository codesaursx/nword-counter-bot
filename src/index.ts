import { Client, Events, GatewayIntentBits } from 'discord.js';

import { DISCORD_TOKEN } from '@/constants/config.constants';
import { TARGET_WORDS } from '@/constants/target-words.constants';

import { commandRegister } from '@/registers/command.register';

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

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
  const text = message.content;
  const regex = new RegExp(TARGET_WORDS.join('|'), 'gi');
  const matches = text.match(regex);

  message.reply(`This text includes ${matches} N-Words`);
});

client.login(DISCORD_TOKEN);
