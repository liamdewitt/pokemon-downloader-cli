# Pokémon Downloader CLI

Welcome to the Pokémon Downloader CLI! This tool allows users to interact with the [PokéAPI](https://pokeapi.co/) to download and save specific data about their favorite Pokémon, including stats, sprites, and official artwork. Users can select which pieces of information they’d like to retrieve and save them locally in structured folders.

## Table of Contents
- [Features](#features)
- [Requirements](#requirements)
- [Installation](#installation)
- [Usage](#usage)
- [Example](#example)
- [Contributing](#contributing)

## Features
- **Interactive CLI**: Uses Inquirer to guide the user through selecting a Pokémon and choosing data to download.
- **Data Options**:
  - **Stats**: Saves Pokémon stats (like HP, Attack, etc.) in a `.txt` file.
  - **Sprites**: Downloads various sprite images, including front and back views, and saves them in PNG format.
  - **Artwork**: Downloads the official artwork and saves it in PNG format.
- **Error Handling**: Gracefully handles errors such as network failures or unavailable Pokémon data.
- **Folder Structure**: Automatically organizes each Pokémon’s data into separate folders.

## Requirements
- Node.js (version 14 or higher)
- Internet connection (to access the PokéAPI)

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/liamdewitt/pokemon-downloader-cli.git

2. Navigate into the project directory:
    ```bash
    cd pokemon-downloader-cli

3. Open the project in your favorite code editor.

4. install dependencies:
    ```bash
    npm install

## Usage
1. Start the CLI:
    ```bash
    node pokemon-downloader.js

2. Follow the prompts to:
    - Enter the name of a Pokemon
    - Choose the data types you want to download (Stats, Sprites, and or Artwork)
    - View each Pokemon's data, saved in organized folders.

## Example:
1. After selecting "Pikachu" (not case sensitive) and choosing all data options, the tool will create a folder structure like this:

pokemon-downloader-cli/
├── pikachu/
│   ├── stats.txt              # Pokémon stats
│   ├── front_default.png      # Pokémon sprite (front view)
│   ├── back_default.png       # Pokémon sprite (back view)
│   └── pikachuOfficialArtwork.png # Official artwork

## Contributing
Contributions are welcome! Please open an issue or submit a pull request to discuss any changes.