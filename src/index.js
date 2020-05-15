import sshCommands from '@eclass/semantic-release-ssh-commands'
import readPkgUp from 'read-pkg-up'
import { mapValues, property } from '@dword-design/functions'
import parsePkgName from 'parse-pkg-name'

const name =
  readPkgUp.sync().packageJson.name |> parsePkgName |> property('name')

const config = {
  publishCmd: `source ~/.nvm/nvm.sh && cd /var/www/${name} && deploy`,
}

export default sshCommands
  |> mapValues(hook => (pluginConfig, ctx) =>
    hook({ ...pluginConfig, config }, ctx)
  )
