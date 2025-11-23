## [1.4.2](https://github.com/eliogos/slashheroes-game/compare/v1.4.1...v1.4.2) (2025-11-23)


### Bug Fixes

* **build:** correct user commands index exports ([2914fc4](https://github.com/eliogos/slashheroes-game/commit/2914fc4ef3c9fc277d26db3632ecdb535097449b))

## [1.4.1](https://github.com/eliogos/slashheroes-game/compare/v1.4.0...v1.4.1) (2025-11-23)


### Bug Fixes

* **commands:** correct import path for viewHero and remove unused import from slash commands ([db82fe6](https://github.com/eliogos/slashheroes-game/commit/db82fe61afc8390d4326adbb738cd3d3893a3073))

# [1.4.0](https://github.com/eliogos/slashheroes-game/compare/v1.3.0...v1.4.0) (2025-11-23)


### Features

* **commands:** add context types to about, explore, and ping commands for improved interaction handling ([52c595c](https://github.com/eliogos/slashheroes-game/commit/52c595c3189f4bf5971c0f2e9cf558d346faab77))

# [1.3.0](https://github.com/eliogos/slashheroes-game/compare/v1.2.0...v1.3.0) (2025-11-23)


### Bug Fixes

* **about:** update button label and separator spacing for improved UI clarity ([adaef5f](https://github.com/eliogos/slashheroes-game/commit/adaef5f9a3fea50261e13ffbdb2323ec78c0d4e8))
* **build:** avoid static import of missing build-info.json; make slash handler use commands index for bundler-friendly imports ([f37b648](https://github.com/eliogos/slashheroes-game/commit/f37b6483c299950776156c8d645b6cc0a508204d))
* **build:** make user command handler bundler-friendly via commands index ([285607c](https://github.com/eliogos/slashheroes-game/commit/285607c35839706174e40dc211f15c115062d7e6))


### Features

* **commands:** add handleSlashCommand router to slashCommandHandler ([8cd7e71](https://github.com/eliogos/slashheroes-game/commit/8cd7e719906ead4c6534bc6c0a364690c197c973))
* **commands:** update viewHero command and refactor imports for consistency ([4148d70](https://github.com/eliogos/slashheroes-game/commit/4148d70e95f84e07dd6f84150085ed48b8d303e2))

# [1.2.0](https://github.com/eliogos/slashheroes-game/compare/v1.1.0...v1.2.0) (2025-11-23)


### Features

* **about:** use package.json mtime for 'As of' timestamp ([2db5f7b](https://github.com/eliogos/slashheroes-game/commit/2db5f7b1ff96094c97d833b4b58fdcb5757f4c1c))
* **commands:** migrate explore to builder-based slash command using followUp/defer ([2dd6b00](https://github.com/eliogos/slashheroes-game/commit/2dd6b00bc6ec623655c9d6842c28f77d3636c63f))
* **commands:** migrate party command to builder-based slash command ([f4ab7c4](https://github.com/eliogos/slashheroes-game/commit/f4ab7c484fa9be385f41b2b0601f2b65010a4356))
* **commands:** refactor slash commands structure and add build-info generation ([e391fdb](https://github.com/eliogos/slashheroes-game/commit/e391fdb3701c3cc3b6c941e45d8babcd1dbaed80))

# [1.1.0](https://github.com/eliogos/slashheroes-game/compare/v1.0.0...v1.1.0) (2025-11-23)


### Features

* restructure slash command handling and add new commands ([285854e](https://github.com/eliogos/slashheroes-game/commit/285854e2ac81c2d1998958fd538a162ac598f7fe))

# 1.0.0 (2025-11-22)


### Bug Fixes

* Update project name in configuration and add D1 database binding ([36a6a87](https://github.com/eliogos/slashheroes-game/commit/36a6a87089f61db7c9bb8ad75d98c6a66dee35bb))


### Features

* Implement Discord interaction handling for commands, buttons, and modals ([f26948a](https://github.com/eliogos/slashheroes-game/commit/f26948aab910a666362022931340fd38790c09fd))
