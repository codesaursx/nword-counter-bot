import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';

export class CommandEntity {
  constructor(
    public data: SlashCommandBuilder,
    public execute: (interaction: ChatInputCommandInteraction) => Promise<void>
  ) {}
}
