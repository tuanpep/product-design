import assert from 'node:assert/strict'
import test from 'node:test'
import { orchestrationOptions, parseModel } from '../runtime/delegation.mjs'
import './native-delegation.test.mjs'

test('native delegation retires scheduler options while preserving setup/model options', () => {
  assert.deepEqual(parseModel('provider/model#high'), { providerID: 'provider', id: 'model', variant: 'high' })
  assert.deepEqual(orchestrationOptions(), { workerModels: {}, agentSteps: {}, telemetry: false })
  assert.deepEqual(orchestrationOptions({ workerModels: { 'design-author': 'p/m' }, agentSteps: { 'design-product': 20 }, telemetry: true }), { workerModels: { 'design-author': { providerID: 'p', id: 'm' } }, agentSteps: { 'design-product': 20 }, telemetry: true })
  for (const delegation of [{}, { enabled: false }, { maxConcurrent: 2 }, { timeoutMs: 100 }]) assert.throws(() => orchestrationOptions({ delegation }), /retired/)
  for (const options of [{ workerModels: { 'design-product': 'p/m' } }, { workerModels: { 'review-design': 'invalid' } }, { agentSteps: { unknown: 4 } }, { agentSteps: { 'design-author': 201 } }, { telemetry: 'true' }]) assert.throws(() => orchestrationOptions(options))
})
