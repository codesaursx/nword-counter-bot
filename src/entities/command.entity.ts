import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';

export class CommandEntity {
  constructor(
    public readonly data: SlashCommandBuilder,
    public readonly execute: (
      interaction: ChatInputCommandInteraction
    ) => Promise<void>
  ) {}
}
