# Pinia 快速上手指南
## 开发建议

基于`pinia`的实现，建议遵从单向数据流模型，便于项目的问题定位及可维护性，具体有以下几条

1. 放弃选项式的写法，全部使用组合式的写法来构建store，保持和Vue3函数式思想一致的编程逻辑
2. 遵循单向数据流实现，即action、state、getter，确保state只能通过action修改getter获取
3. 不在函数中直接return `state`，用以确保外部无法直接修改state

![](https://cdn.nlark.com/yuque/0/2023/webp/27056598/1694585103447-ad1f11d2-80e0-4a97-b51f-3d4a6f86b503.webp#averageHue=%23f7ecc3&clientId=u4a1ecc9a-d80d-4&from=paste&id=u02b13581&originHeight=842&originWidth=1496&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u97680873-b45f-419b-a238-bfc3f387ded&title=)

## 前言

Pinia ，发音为 _/piːnjʌ/_ ，来源于西班牙语 _piña_ 。意思为菠萝，表示与菠萝一样，由很多小块组成。在 Pinia 中，每个 Store 都是单独存在，一同进行状态管理。
与 Vuex 相比，Pinia 提供了更简单的 API，更少的规范，以及 _Composition-API_ 风格的 API 。更重要的是，与 _TypeScript_ 一起使用具有可靠的类型推断支持。

## Pinia 与 Vuex 3.x/4.x 的不同

- mutations 不复存在。只有 state 、getters 、actions。
- actions 中支持同步和异步方法修改 state 状态。
- 与 TypeScript 一起使用具有可靠的类型推断支持。
- 不再有模块嵌套，只有 Store 的概念，Store 之间可以相互调用。
- 支持插件扩展，可以非常方便实现本地存储等功能。
- 更加轻量，压缩后体积只有 2kb 左右。

## 基本用法

在 main.js 中 引入 Pinia：

```javascript
js
复制代码// src/main.js
import { createPinia } from 'pinia'

const pinia = createPinia()
app.use(pinia)
```

**定义一个 Store**
在 _src/stores_ 目录下创建 _counter.js_ 文件，使用 _defineStore()_ 定义一个 Store 。_defineStore()_ 第一个参数是 _storeId_ ，第二个参数是一个选项对象：

```javascript
// src/stores/counter.js
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => ({ count: 0 }),
  getters: {
    doubleCount: (state) => state.count * 2
  },
  actions: {
    increment() {
      this.count++
    }
  }
})
```

我们也可以使用更高级的方法，第二个参数传入一个函数来定义 Store ：

```javascript
// src/stores/counter.js
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return { count, doubleCount, increment }
})
```

**在组件中使用**
在组件中导入刚才定义的函数，并执行一下这个函数，就可以获取到 store 了：

```javascript
<script setup>
import { useCounterStore } from '@/stores/counter'

const counterStore = useCounterStore()
// 以下三种方式都会被 devtools 跟踪
counterStore.count++
counterStore.$patch({ count: counterStore.count + 1 })
counterStore.increment()
</script>

<template>
  <div>{{ counterStore.count }}</div>
  <div>{{ counterStore.doubleCount }}</div>
</template>
```

## State

**解构 store**
store 是一个用 _reactive_ 包裹的对象，如果直接解构会失去响应性。我们可以使用 _storeToRefs()_ 对其进行解构：

```javascript
<script setup>
import { storeToRefs } from 'pinia'
import { useCounterStore } from '@/stores/counter'

const counterStore = useCounterStore()
const { count, doubleCount } = storeToRefs(counterStore)
</script>

<template>
  <div>{{ count }}</div>
  <div>{{ doubleCount }}</div>
</template>
```

**修改 store**
除了可以直接用 _store.count++_ 来修改 store，我们还可以调用 patch方法进行修改。patch 方法进行修改。patch方法进行修改。patch 性能更高，并且可以同时修改多个状态。

```javascript
<script setup>
import { useCounterStore } from '@/stores/counter'

const counterStore = useCounterStore()
counterStore.$patch({
  count: counterStore.count + 1,
  name: 'Abalam',
})
</script>
```

但是，这种方法修改集合（比如从数组中添加、删除、插入元素）都需要创建一个新的集合，代价太高。因此，$patch 方法也接受一个函数来批量修改：

```javascript
counterStore.$patch((state) => {
  state.items.push({ name: 'shoes', quantity: 1 })
  state.hasChanged = true
})
```

**监听 store**
1 、在本地开发环境下，我们可以通过 subscribe()方法可以监听store状态的变化，类似于Vuex的∗subscribe∗方法。与∗watch()∗相比，使用subscribe() 方法可以监听 store 状态的变化，类似于 Vuex 的 *subscribe* 方法。与 *watch()* 相比，使用 subscribe()方法可以监听store状态的变化，类似于Vuex的∗subscribe∗方法。与∗watch()∗相比，使用subscribe() 的优点是，store 多个状态发生变化之后，回调函数只会执行一次。

```javascript
<script setup>
import { useCounterStore } from '@/stores/counter'

const counterStore = useCounterStore()
counterStore.$subscribe((mutation, state) => {
  // 每当状态发生变化时，将 state 持久化到本地存储
  localStorage.setItem('counter', JSON.stringify(state))
})
</script>
```

2、也可以用watch监听 pinia 实例上所有 store 的变化

```javascript
// src/main.js
import { watch } from 'vue'
import { createPinia } from 'pinia'

const pinia = createPinia()
watch(
  pinia.state,
  (state) => {
    // 每当状态发生变化时，将所有 state 持久化到本地存储
    localStorage.setItem('piniaState', JSON.stringify(state))
  },
  { deep: true }
)

```

## Getters

**访问 store 实例**
大多数情况下，getter 只会依赖 state 状态。但有时候，它会使用到其他的 getter ，这时候我们可以通过 _this_ 访问到当前 store 实例。

```javascript
// src/stores/counter.js
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => ({ count: 0 }),
  getters: {
    doubleCount(state) {
      return state.count * 2
    },
    doublePlusOne() {
      return this.doubleCount + 1
    }
  }
})

```

**访问其他 Store 的 getter**
要使用其他 Store 的 getter，可以直接在 getter 内部使用：

```javascript
// src/stores/counter.js
import { defineStore } from 'pinia'
import { useOtherStore } from './otherStore'

export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 1
  }),
  getters: {
    composeGetter(state) {
      const otherStore = useOtherStore()
      return state.count + otherStore.count
    }
  }
})

```

**将参数传递给 getter**
getter 本质上是一个 _computed_ ，无法向它传递任何参数。但是，我们可以让它返回一个函数以接受参数：

```javascript
// src/stores/user.js
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    users: [{ id: 1, name: 'Tom'}, {id: 2, name: 'Jack'}]
  }),
  getters: {
    getUserById: (state) => {
      return (userId) => state.users.find((user) => user.id === userId)
    }
  }
})

```

在组件中使用：

```javascript
<script setup>
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const { getUserById } = storeToRefs(userStore)
</script>

<template>
  <p>User: {{ getUserById(2) }}</p>
</template>

```

注意：如果这样使用，getter 不会缓存，它只会当作一个普通函数使用。一般不推荐这种用法，因为在组件中定义一个函数，可以实现同样的功能。

## Actions

**访问 store 实例**
与 getters 一样，actions 可以通过 _this_ 访问当前 store 的实例。不同的是，actions 可以是异步的。

```javascript
/ src/stores/user.js
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({ userData: null }),
  actions: {
    async registerUser(login, password) {
      try {
        this.userData = await api.post({ login, password })
      } catch (error) {
        return error
      }
    }
  }
})

```

**访问其他 Store 的 action**
要使用其他 Store 的 action，也可以直接在 action 内部使用：

```javascript
// src/stores/setting.js
import { defineStore } from 'pinia'
import { useAuthStore } from './authStore'

export const useSettingStore = defineStore('setting', {
  state: () => ({ preferences: null }),
  actions: {
    async fetchUserPreferences(preferences) {
      const authStore = useAuthStore()
      if (authStore.isAuthenticated()) {
        this.preferences = await fetchPreferences()
      } else {
        throw new Error('User must be authenticated!')
      }
    }
  }
})

```

## Plugins

**实现本地存储**
相信大家使用 Vuex 都有这样的困惑，_F5_ 刷新一下数据全没了。在我们眼里这很正常，但在测试同学眼里这就是一个 _bug_ 。Vuex 中实现本地存储比较麻烦，需要把状态一个一个存储到本地，取数据时也要进行处理。而使用 Pinia ，一个插件就可以搞定。
引入插件，并将此插件传递给 _pinia_ ：

```javascript
pnpm add pinia-plugin-persist

```

接着在定义 store 时开启 _persist_ 即可：

```javascript
// src/main.ts
import { createPinia } from 'pinia'
import piniaPluginPersist from 'pinia-plugin-persist'

const pinia = createPinia()
pinia.use(piniaPluginPersist)

```

默认情况下，会以 _storeId_ 作为 key 值，把 state 中的所有状态存储在 _sessionStorage_ 中。我们也可以通过 _strategies_ 进行修改：

```javascript
// 开启数据缓存
persist: {
  enabled: true，
  strategies: [
    {
      key: 'myCounter', // 存储的 key 值，默认为 storeId
      storage: localStorage, // 存储的位置，默认为 sessionStorage
      paths: ['name', 'age'], // 需要存储的 state 状态，默认存储所有的状态
    }
  ]
}

```

