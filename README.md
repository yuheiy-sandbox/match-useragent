# [WIP] Match Useragent

## Usage

```javascript
import matchUA from 'match-useragent'

const isLatestVersion = matchUA(navigator.userAgent, ['last 1 versions'])
if (isLatestVersion) {
  alert('Your browser is latest version')
}

const isNotSupportedVersion = !matchUA(navigator.userAgent, ['last 1 versions', '> 3%'])
if (isNotSupportedVersion) {
  alert('We do not support your browser')
}
```

## Lisence

MIT
