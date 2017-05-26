// ie, edge, firefox, chrome, safari, opera, ios_saf, op_mini, android, bb, op_mob, and_chr, and_ff, ie_mob, and_uc, samsung, and_qq, baidu

export const browserNameRegExps = [
  {
    name: 'chrome',
    regExp: /Chrome/,
  },
]

export const browserVersionRegExps = {
  // ie: //,
  // edge: //,
  // firefox: //,
  chrome: /Chrome\/([0-9]+)/,
  // safari: //,
  // opera: //,
  // ios_saf: //,
  // op_mini: //,
  // android: //,
  // bb: //,
  // op_mob: //,
  // and_chr: //,
  // and_ff: //,
  // ie_mob: //,
  // and_uc: //,
  // samsung: //,
  // and_qq: //,
  // baidu: //,
}
