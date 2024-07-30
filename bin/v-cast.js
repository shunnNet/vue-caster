#!/usr/bin/env node
'use strict'
const version = process.argv[2]
const alias = process.argv[3]

const {castVersionFunctionMap} = require('../scripts/v-cast-cli.js')

const fn = castVersionFunctionMap[version]
if (!fn) {
  console.error(`[vue-caster] Only support version: 2, 2.7, 3`)
  process.exit(1)
}
fn(alias)
console.log(`[vue-caster] Cast Vue version: ${version}, alias: ${alias}`);

