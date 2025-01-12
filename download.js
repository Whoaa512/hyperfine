const { request } = require('https')
const os = require('os')
const { exec } = require('child_process')

const platform = os.platform()

const platformFiles = {
  linux: 'x86_64-unknown-linux-gnu',
  darwin: 'apple-darwin'
}

const chooseAsset = assets => {
  if (!platformFiles.hasOwnProperty(platform)) {
    throw new Error(`Couldn't find any asset for platform '${platform}''`)
  }

  const asset = assets.find(_ => _.name.includes(platformFiles[platform]))

  if (!asset) {
    throw new Error(`Couldn't find any asset for platform '${platform}''`)
  }

  return asset
}

const downloadAsset = asset => {
  const distFolder = `${__dirname}/dist`
  const untarFolder = `${distFolder}/${asset.name.replace('.tar.gz', '')}`

  exec(
    `
    mkdir -p ${distFolder} && \
    wget ${asset.browser_download_url} -O ${distFolder}/download.tar.gz && \
    tar xzf ${distFolder}/download.tar.gz -C ${distFolder}/ && \
    mv ${untarFolder}/hyperfine ${distFolder}/hyperfine && \
    rm -rf ${untarFolder} ${distFolder}/download.tar.gz
  `,
    error => {
      if (error) {
        throw error
      }
    }
  )
}

const req = request(
  {
    hostname: 'api.github.com',
    path: '/repos/sharkdp/hyperfine/releases/latest',
    method: 'GET',
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.131 Safari/537.36',
      Accept:
        'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3'
    }
  },
  res => {
    let data = ''

    res.on('data', _ => (data += _))
    res.on('end', _ => {
      let { assets } = JSON.parse(data)
      const asset = chooseAsset(assets)
      downloadAsset(asset)
    })
  }
)

req.on('error', console.log)

req.end()
