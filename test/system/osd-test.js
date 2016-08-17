const hypnotoad =
 '               ,\'``.._   ,\'``.\n'
+'              :,--._:)\\,:,._,.:       All Glory to\n'
+'              :`--,\'\'   :`...\';\\      the HYPNO TOAD!\n'
+'               `,\'       `---\'  `.\n'
+'               /                 :\n'
+'              /                   \\\n'
+'            ,\'                     :\\.___,-.\n'
+'           `...,---\'``````-..._    |:       \\\n'
+'             (                 )   ;:    )   \\  _,-.\n'
+'              `.              (   //          `\'    \\\n'
+'               :               `.//  )      )     , ;\n'
+'             ,-|`.            _,\'/       )    ) ,\' ,\'\n'
+'            (  :`.`-..____..=:.-\':     .     _,\' ,\'\n'
+'             `,\'\\ ``--....-)=\'    `._,  \\  ,\') _ \'``._\n'
+'          _.-/ _ `.       (_)      /     )\' ; / \\ \\`-.\'\n'
+'         `--(   `-:`.     `\' ___..\'  _,-\'   |/   `.)\n'
+'             `-. `.`.``-----``--,  .\'\n'
+'               |/`.\\`\'        ,\',\'); SSt\n'
+'                   `         (/  (/'

require('./test')( 'osd-test', 'indian', function ( loopin ) {
  return Promise.resolve( hypnotoad )
  .then( ( hypnotoad ) => loopin.patch( hypnotoad, 'osd/text' ) )
  .then( () => loopin.testDelay() )
  .then( () => loopin.patch( "", 'osd/text' ) )
  .then( () => loopin.patch( "server can write this string", 'osd/server' ) )
  .then( () => loopin.testDelay() )
  .then( () => loopin.patch( "disabling after testDelay", 'osd/text' ) )
  .then( () => loopin.testDelay() )
  .then( () => loopin.patch( { enabled: false }, 'osd' ) )
  .then( () => loopin.testDelay() )
} )
