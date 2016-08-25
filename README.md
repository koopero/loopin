# Getting Started

## Installation
*Note that Windows is not supported at this time.*
**Loopin** relies on a shared, native binary application. This application is automatically built by the [loopin-native](https://github.com/koopero/loopin-native#README) module, which is included as a dependency. To make sure that this module is functioning properly, it is recommended that you run its build process manually. The compiled binary will be used by all **Loopin** projects.

``` sh
# Install the module globally to use its command line tool
sudo npm install -g loopin-native

# Run the build process. This may take several minutes.
loopin-native --verbose --run
```

If everything goes well, **loopin-native** will build for several minutes and then open Loopin to a black window. For more information, including troubleshooting and requirements, see the [loopin-native](https://github.com/koopero/loopin-native#README) module.

## loopin.js 
``` js

```

# Documentation
Docs are being written in the [wiki](https://github.com/koopero/loopin/wiki).

# Sister Projects

* [ofxLoopin](https://github.com/koopero/ofxLoopin#README) ( C++ ) - Source code for Loopin virtual device.
* [loopin-native](https://github.com/koopero/loopin-native#README) ( Javascript ) - Build utility.
