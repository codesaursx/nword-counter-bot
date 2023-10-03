import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';

export class CommandEntity {
  constructor(
    public readonly data:
      | SlashCommandBuilder
      | Omit<SlashCommandBuilder, 'addSubcommandGroup' | 'addSubcommand'>,
    public readonly execute: (
      interaction: ChatInputCommandInteraction
    ) => Promise<void>
  ) {}
}
