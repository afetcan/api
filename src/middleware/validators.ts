import { dirname, join } from 'path'

import { fileURLToPath } from 'url'
import { loadFilesSync } from '@graphql-tools/load-files'
import { merge } from 'merge-anything'

const __dirname = dirname(fileURLToPath(import.meta.url))

function getValidators() {
  const validators = loadFilesSync(
    join(__dirname, '..', 'modules', '**', '*.validators.*'),
    { extensions: ['js', 'ts'] },
  )
  return merge({}, ...validators)
}
console.log(getValidators())

export const validatorsMiddleware = getValidators()
