const { isVue2 } = require('vue-demi')

module.exports = isVue2 ? require('vue-test-utils1') : require('@vue/test-utils');