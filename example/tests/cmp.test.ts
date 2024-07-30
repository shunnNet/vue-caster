import { expect, test } from "vitest";
import { mount } from './test-utils.cjs'
// import * as testUtilsV3 from "@vue/test-utils";
import { Counter } from '../src/components'


test('cmp3', async () => {
  const wrapper = mount(Counter);
  expect(wrapper.text()).toContain('0')
  // expect(1).toBe(1)
})
