const { Client, GatewayIntentBits, ActionRowBuilder, StringSelectMenuBuilder, EmbedBuilder } = require('discord.js');

const token = 'YOUR_BOT_TOKEN';            // Replace with your bot token
const channelId = '1419133739174203442';   // Channel where message should appear

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once('ready', async () => {
    console.log(`Logged in as ${client.user.tag}`);

    const channel = await client.channels.fetch(channelId);

    // Create the dropdown menu
    const row = new ActionRowBuilder()
        .addComponents(
            new StringSelectMenuBuilder()
                .setCustomId('department_select')
                .setPlaceholder('Select your department')
                .addOptions(
                    { label: 'TOU', value: 'tou', description: 'Tactical Operations Unit' },
                    { label: 'AFP', value: 'afp', description: 'Australian Federal Police' },
                    { label: 'SES', value: 'ses', description: 'State Emergency Services' }
                )
        );

    // Create embed with intro text and your image
    const embed = new EmbedBuilder()
        .setTitle('Choose Your Department')
        .setDescription('Here at Australia State Roleplay there are many whitelisted departments you may apply for such as TOU, AFP, and SES. Pick your department below to get started.')
        .setImage('https://i.imgur.com/grKRNFg.jpeg') // Your image URL
        .setColor('#00ff99');

    // Send the message once (persistent)
    await channel.send({ embeds: [embed], components: [row] });
});

// Handle dropdown selections
client.on('interactionCreate', async interaction => {
    if (!interaction.isStringSelectMenu()) return;
    if (interaction.customId !== 'department_select') return;

    await interaction.deferUpdate(); // prevents "This interaction failed"

    let embed, contentText;
    const selected = interaction.values[0];

    if (selected === 'tou') {
        embed = new EmbedBuilder()
            .setTitle('TOU - Tactical Operations Unit')
            .setDescription('A specialist police team trained to deal with high-risk situations that general duties officers cannot handle. They respond to armed offenders, hostage incidents, high-risk arrests, and counter-terrorism threats. TOU officers use advanced equipment, strict tactics, and teamwork to keep the community safe, and are only deployed in serious emergencies.')
            .setImage('https://i.imgur.com/8kmHUuB.jpeg')
            .setColor('#0099ff');
        contentText = 'Join TOU: https://discord.gg/2pKat73Hy';
    } else if (selected === 'afp') {
        embed = new EmbedBuilder()
            .setTitle('AFP - Australian Federal Police')
            .setDescription('The Australian Federal Police (AFP) protects Commonwealth laws and engages with terrorism threats and organised crime investigations. They are only deployed in serious circumstances.')
            .setImage('https://i.imgur.com/S2gvSHK.jpeg')
            .setColor('#ff0000');
        contentText = 'Join AFP: https://discord.gg/mhBjCp3D';
    } else if (selected === 'ses') {
        embed = new EmbedBuilder()
            .setTitle('SES - State Emergency Services')
            .setDescription('The State Emergency Services (SES) helps the community during floods, storms, rescues, and other emergencies. They support police, fire, and ambulance with disaster response and public safety.')
            .setImage('https://i.imgur.com/zM7xiIU.jpeg')
            .setColor('#00ff00');
        contentText = 'Join SES: https://discord.gg/GXmhmqAkZ';
    }

    // Edit ephemeral reply so only the user sees it
    await interaction.editReply({ content: contentText, embeds: [embed], ephemeral: true });
});

client.login(token);