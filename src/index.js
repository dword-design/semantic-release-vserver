import sshCommands from '@eclass/semantic-release-ssh-commands'
import readPkgUp from 'read-pkg-up'
import { mapValues } from '@dword-design/functions'

const { name } = readPkgUp.sync().packageJson

const config = {
  publishCmd: `source ~/.nvm/nvm.sh && cd /var/www/${name} && deploy`,
}

export default sshCommands
  |> mapValues(hook => (pluginConfig, ctx) =>
    hook({ ...pluginConfig, config }, ctx)
  )
