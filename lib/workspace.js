const importers = require('insomnia-importers')
const fs = require('fs')

function applyAuthentication (workspace) {
  const resources = workspace.resources || []

  const updatedResources = resources.map((r) => {
    if (r._type === 'request') {
      return {
        ...r,
        authentication: {
          accessTokenUrl: '{{ base_url }}/oauth2/v1/auth',
          clientId: '{{ client_id }}',
          clientSecret: '{{ client_secret }}',
          grantType: 'client_credentials',
          scope: 'read:company write:company',
          type: 'oauth2'
        }
      }
    }
    if (r._type === 'environment' && r.name === 'Base environment') {
      return {
        ...r,
        data: {}
      }
    }
    if (r._type === 'environment' && r.name === 'OpenAPI env') {
      return {
        ...r,
        data: {
          ...r.data,
          base_url: '{{ scheme }}://{{ host }}{{ base_path }}',
          client_id: 'YOUR_CLIENT_ID',
          client_secret: 'YOUR_CLIENT_SECRET',
          entityId: 'ENTITY_ID'
        }
      }
    }
    return r
  })

  return {
    ...workspace,
    resources: updatedResources
  }
}

function readFile (path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, { encoding: 'utf8' }, (err, yaml) => {
      return err
        ? reject(new Error('ERROR: Failed to read file'))
        : resolve(yaml)
    })
  })
}

exports.generate = (filePath) => {
  return readFile(filePath)
    .then(importers.convert)
    .then((rawWorkspace) => applyAuthentication(rawWorkspace.data))
}
