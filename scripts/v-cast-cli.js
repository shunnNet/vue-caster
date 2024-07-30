const fs = require('node:fs/promises')
const path = require('node:path')

const castVersionFunctionMap = {
  '2': cast2,
  '2.7': cast27,
  '3': cast3,
}
function resolve (p) {
  return path.resolve(__dirname, p)
}

async function cast2(alias='vue2') {
  await clearExportsFiles() 
  await rewritePackageJson('2')
  await copyDirectoryOrFile(
    resolve('../v2/caster'),
    resolve('../caster')
  )

  const rewriteFiles = [
    resolve('../caster/index.cjs'),
    resolve('../caster/index.mjs'),
    resolve('../caster/index.d.ts'),
  ] 
  for (const aFile of rewriteFiles) {
    const contents = await fs.readFile(aFile, 'utf-8')
    await fs.writeFile(
      aFile,
      contents.replace(/\$vue/g, alias)
    )
  }
}
async function cast27(alias='vue2.7') { 
  await clearExportsFiles()
  await copyDirectoryOrFile(
    resolve('../v2.7/compiler-sfc'),
    resolve('../compiler-sfc')
  )
  await copyDirectoryOrFile(
    resolve('../v2.7/caster'),
    resolve('../caster')
  )

  const rewriteFiles = [
    resolve('../compiler-sfc/index.js'),
    resolve('../compiler-sfc/index.mjs'),
    resolve('../compiler-sfc/index.d.ts'),
    resolve('../caster/index.cjs'),
    resolve('../caster/index.mjs'),
    resolve('../caster/index.d.ts'),
  ]
  for (const aFile of rewriteFiles) {
    const contents = await fs.readFile(aFile, 'utf-8')
    await fs.writeFile(
      aFile,
      contents.replace(/\$vue/g, alias)
    )
  }
  await rewritePackageJson('2.7')
}
async function cast3(alias='vue3') {
  await clearExportsFiles()
  await copyDirectoryOrFile(
    resolve('../v3/compiler-sfc'),
    resolve('../compiler-sfc')
  )
  await copyDirectoryOrFile(
    resolve('../v3/jsx-runtime'),
    resolve('../jsx-runtime')
  )
  await copyDirectoryOrFile(
    resolve('../v3/server-renderer'),
    resolve('../server-renderer')
  )
  await copyDirectoryOrFile(
    resolve('../v3/jsx.d.ts'),
    resolve('../jsx.d.ts')
  )
  await copyDirectoryOrFile(
    resolve('../v3/caster'),
    resolve('../caster')
  )

  await rewritePackageJson('3')
  const rewriteFiles = [
    resolve('../compiler-sfc/index.js'),
    resolve('../compiler-sfc/index.mjs'),
    resolve('../compiler-sfc/index.d.ts'),
    resolve('../jsx-runtime/index.js'),
    resolve('../jsx-runtime/index.mjs'),
    resolve('../jsx-runtime/index.d.ts'),
    resolve('../server-renderer/index.js'),
    resolve('../server-renderer/index.mjs'),
    resolve('../server-renderer/index.d.ts'),
    resolve('../server-renderer/index.d.mts'),
    resolve('../jsx.d.ts'),
    resolve('../caster/index.cjs'),
    resolve('../caster/index.mjs'),
    resolve('../caster/index.d.ts'),
  ]
  for (const aFile of rewriteFiles) {
    const contents = await fs.readFile(aFile, 'utf-8')
    await fs.writeFile(
      aFile,
      contents.replace(/\$vue/g, alias)
    )
  }
}

async function rewritePackageJson(version) {
  const pkgPath = resolve('../package.json')
  const sourcePkgPath = resolve(`../v${version}/package.json`)
  const currentPackage = JSON.parse(await fs.readFile(pkgPath, 'utf-8'))
  const sourcePackage = JSON.parse(await fs.readFile(sourcePkgPath, 'utf-8'))

  currentPackage.exports = sourcePackage.exports

  await fs.writeFile(pkgPath, JSON.stringify(currentPackage, null, 2))
}

async function clearExportsFiles() {
  await removeDirectoryOrFile(resolve('../compiler-sfc'))
  await removeDirectoryOrFile(resolve('../jsx-runtime'))
  await removeDirectoryOrFile(resolve('../jsx.d.ts'))
  await removeDirectoryOrFile(resolve('../caster'))
}

async function removeDirectoryOrFile(path) {
  await fs.rm(path, {recursive: true, force: true})
}
async function copyDirectoryOrFile(source, destination) {
  await fs.cp(source, destination, {recursive: true})
}
module.exports = {
  rewritePackageJson,
  clearExportsFiles,
  cast2,
  cast27,
  cast3,
  castVersionFunctionMap
}
