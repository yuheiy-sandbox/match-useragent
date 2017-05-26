import browserslist from 'browserslist'
import range from 'lodash.range'
import {browserNameRegExps, browserVersionRegExps} from './userAgentRegExps'

export const createVersionRange = (oldVersion, newVersion) => {
  oldVersion = oldVersion.split('.')
  newVersion = newVersion.split('.')
  const diffVersionDepth = oldVersion.findIndex((n, i) => n !== newVersion[i])
  const versionRange = range(
    Number(oldVersion[diffVersionDepth]),
    Number(newVersion[diffVersionDepth]) + 1,
  ).map(n => {
    const version = [
      ...oldVersion.slice(0, diffVersionDepth),
      n,
      ...oldVersion.slice(diffVersionDepth + 1),
    ]
    return version.join('.')
  })
  return versionRange.slice().reverse()
}

const detectBrowser = (userAgent) => {
  const result = browserNameRegExps.find(({regExp}) => regExp.test(userAgent))
  return result && result.name
}

const detectBrowserVersion = (userAgent, browserName) => {
  const regExp = browserVersionRegExps[browserName]
  return regExp && regExp.exec(userAgent)[1]
}

const matchUA = (userAgent, queries) => {
  const matchedBrowsers = browserslist(queries).map(browser => {
    let [name, versions] = browser.split(' ')

    versions = versions.split('-')
    if (versions.length === 2) {
      const [oldVersion, newVersion] = versions
      versions = createVersionRange(oldVersion, newVersion)
    }

    return {
      name,
      versions,
    }
  }).reduce((result, currentBrowser) => {
    const indexOfSameBrowser = result.findIndex(prevBrowser => prevBrowser.name === currentBrowser.name)

    if (indexOfSameBrowser !== -1) {
      return [
        ...result.slice(0, indexOfSameBrowser),
        {
          ...result[indexOfSameBrowser],
          versions: [
            ...result[indexOfSameBrowser].versions,
            ...currentBrowser.versions,
          ],
        },
        ...result.slice(indexOfSameBrowser + 1),
      ]
    } else {
      return [...result, currentBrowser]
    }
  }, [])

  const browserName = detectBrowser(userAgent)
  const browserVersion = detectBrowserVersion(userAgent, browserName)

  const isMatched = matchedBrowsers.some((matchedBrowser) => {
    return matchedBrowser.name === browserName &&
      matchedBrowser.versions.includes(browserVersion)
  })

  return isMatched
}

export default matchUA
