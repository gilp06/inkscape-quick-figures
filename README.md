# Inkscape Quick Figures

Inkscape Quick Figures is a vscode extension that provides utilities to quickly create figures in Inkscape and update them for use in LaTeX. This project is inspired by Gilles Castel's [Inkscape and Vim configuration](https://castel.dev/post/lecture-notes-2/) and [sleepymalc/VSCode-LaTeX-Inkscape](https://github.com/sleepymalc/VSCode-LaTeX-Inkscape). The goal of this project however is to create similar functionality based in vscode and works in windows, rather than Castel's python scripts.

## Disclaimer

This is my first vscode extension, so a lot of the functionality is currently very work-in-progress and unoptimal. If you want something that is more polished I'd recommend [Joao-Peterson/super-figure](https://github.com/Joao-Peterson/super-figure/) as that one has similar functionality.

## Features

- Creating new figures straight from vscode and opening them in inkscape.
- Updating all figures in workspace and generating pdf-tex files
- Automatically regenerating pdf-tex files whenever *.svgs are updated.


## Commands
- Create Inkscape Figure: Opens a wizard to create a new *.svg file from a template.
- Update Inkscape Figures: Regenerates all pdf-tex files in the open workspace. 

## Requirements

This extension requires [Inkscape](https://inkscape.org/) and depends on the command-line shell that it includes. Currently, the extension searchs in the first open workspace, and looks for a /figures/templates/ folder that contains svg files meant to be copied. 

## Configuration

`inkscape-quick-figures.inkscapeLocation` - Location of inkscape executable. Defaults to "inkscape"

## Known Issues

Currently there is no configuration as to where the templates are located and where the figures are stored. I want to eventually add support for a global template folder stored outside the project, but I'm still struggling on this. 

## TODO / Planned Features

- Running Latex-Workshop recipes on *.svg save.
- Global/external template folder
- General UX improvements
- Switch to Node.js File System completely rather than use some of `vscode.workspace.fs`
- Opening *.svgs when ctrl-clicking pdf-tex files. 


