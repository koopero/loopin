Loopin is a free, open-source visual creative coding system. The Loopin stack allows you to create and deploy simple, GPU-driven applications with built-in web-based controls.

Loopin is an on-going experiment, but has deployed with high success in several pieces of illuminated art.

Loopin is the brain child of Vancouver-based creative technologist **Samm Zuest Cooper**, in association with [HFour Design Studio](http://hfour.ca/).

# Getting Started

Fork the project [loopin-base](https://github.com/koopero/loopin-base) for setup instructions.

See [The Loopin Cookbook](https://github.com/koopero/loopin-base/blob/master/COOKBOOK.md) for documentation.

# Requirements

A properly developerized **Mac**, **Linux** or **Windoze** machine for development, and optionally a **Raspberry Pi** deployment. 

Knowledge of the following languages, or a willingness to learn, should be considered prerequisite to Loopin use:

- **GLSL** : Shader code. This is where the magic happens.
- **YAML** : Patches and presets, controlling the structure of Loopin applications.
- **Markdown** : Control configuration and documentation.  
- **node.js** : Project boilerplate and higher level logic.

# Stack

Loopin is a multi-tiered system, consisting of several loosely-coupled modules:

[loopin](https://github.com/koopero/loopin) ( root project ) contains node.js code to orchestrate projects.

[loopin-native](https://github.com/koopero/loopin-native) implements a low-level, natively compiled rendering machine named `ofxLoopin`.

[loopin-shaders](https://github.com/koopero/loopin-shaders) is a the shader loading system.

[loopin-server](https://github.com/koopero/loopin-server) delivers a RESTful interface to Loopin internals and hosts controls.

[horten-control](https://github.com/koopero/horten-control) implements an expressive, realtime, easy to use web based control system for Loopin applications.  


# Gallery

[Nympheas Generative Painting](http://hfour.ca/portfolio-item/nympheas-generative-painting/) by [HFour Design Studio](http://hfour.ca/). Loopin used to create an interactive, generative interpretation of Monet's lily pads.

![Monet](gallery/monet.jpg)

'Pride Obelisk', 2017. Loopin controlled, audio-reactive WS2811 LEDs.

![Pride Obelisk 2017](gallery/obelisk.jpg)

Example output from [loopin-starter](https://github.com/koopero/loopin-starter) project.

![loopin-starter sample](gallery/starter.jpg)

Simple, customizable, web-based controls available in every Loopin project.

![Controls example](gallery/controls.png)
