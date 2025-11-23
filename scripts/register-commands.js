#!/usr/bin/env node
// Backwards-compatible shim for scripts/registerCommands.js
// Some CI configs call `register-commands.js` (kebab-case). Import the
// canonical script which contains the real implementation.
import './registerCommands.js';
