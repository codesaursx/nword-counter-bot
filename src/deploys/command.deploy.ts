import { REST, Routes } from 'discord.js';
import { CLIENT_ID, DISCORD_TOKEN } from '../constants/config.constants';
import { commandRegister } from '../registers/command.register';

const bootstrap = async () => {
  const rest = new REST().setToken(DISCORD_TOKEN);
  const commands = commandRegister().map((v: any) => v.data.toJSON());

  try {
    console.log(`Refreshing ${commands.length} application (/) commands.`);

    const data = (await rest.put(Routes.applicationCommands(CLIENT_ID), {
      body: commands
    })) as unknown[];

    console.log(
      `Successfully reloaded ${data.length} application (/) commands.`
    );
  } catch (error) {
    console.log(error);
  }
};

bootstrap();
