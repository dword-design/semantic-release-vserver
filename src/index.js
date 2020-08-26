import { mapValues, property } from '@dword-design/functions'
import sshCommands from '@eclass/semantic-release-ssh-commands'
import parsePkgName from 'parse-pkg-name'
import readPkgUp from 'read-pkg-up'

const name =
  readPkgUp.sync().packageJson.name |> parsePkgName |> property('name')
const config = {
  publishCmd: `source ~/.nvm/nvm.sh && cd /var/www/${name} && deploy`,
}

export default sshCommands
  |> mapValues(hook => (pluginConfig, ctx) => {
    ctx.env.SSH_HOST = 'dword-design.de'
    return hook({ ...pluginConfig, ...config }, ctx)
  })
