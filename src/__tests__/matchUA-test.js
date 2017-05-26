import test from 'ava'
import matchUA, {createVersionRange} from '../matchUA'

test('createVersionRange', t => {
  t.deepEqual(createVersionRange('0.7', '0.10'), ['0.10', '0.9', '0.8', '0.7'])
  t.deepEqual(createVersionRange('4.4.3', '4.4.4'), ['4.4.4', '4.4.3'])
  t.deepEqual(createVersionRange('9.0', '9.2'), ['9.2', '9.1', '9.0'])

  t.pass()
})

test('matchUA', t => {
  // 
  matchUA('', ['last 2 versions'])
  t.pass()
})
