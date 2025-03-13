项目：货架 draggable+Vue3+TS

### 1. 多层次商品展示和动态高度调整（HorizontalDisplay.vue）

#### 难点描述

- **多层商品展示**：`HorizontalDisplay.vue` 文件中需要支持多层次的商品展示，每个层次的高度可以动态调整。这意味着在处理商品拖拽和排列时，必须考虑到不同层次之间的复杂关系。

- **动态高度计算**：每个 `draggable` 组件的高度是根据实际内容动态计算的，例如：

  ```
  javascript
  
  :style="{ height: size2px(Math.min(horizontalHighsMap[hIdx - 1] ?? usableHighs, withBasketHigh)), justifyContent: justifyContent } "
  ```

  这要求在每次商品拖拽或排列变化时，都需要重新计算并更新各个层次的高度。

#### 解决方案

- **使用 `horizontalCount` 和 `horizontalHighsMap`**：通过 `horizontalCount` 来管理不同的层次，并使用 `horizontalHighsMap` 存储每个层次的高度信息。每次商品拖拽或排列变化时，更新相应的高度值。

- **监听数据变化**：通过 `watch` 监听 `goodsListMap` 的变化，并根据新的商品排列情况动态调整各个层次的高度：

  ```
  javascriptwatch(() => goodsListMap, (newListMap: Record<string, DisplaySku[]>) => {
    Object.keys(newListMap).forEach(key => {
      if (Array.isArray(newListMap[key]) && newListMap[key].length) {
        _newListMap[index] = newListMap[key]
        index++
      }
    })
    horizontalCount.value = _horizontalCount || 1
    if (horizontalCount.value === 1 && !_horizontalHighsMap[0]) {
      _horizontalHighsMap[0] = withBasketHigh.value
    }
    horizontalHighsMap.value = _horizontalHighsMap
    // 更新视图
    PageElement.updateView(widgetCode.value)
  }, { immediate: true, deep: true })
  ```

### 2. 商品压缩和积压比例验证

#### 难点描述

- **商品压缩**：在 `HorizontalDisplay.vue` 中，商品可能会被挤压（`isSqueeze`），并且需要考虑长、高、宽三个维度的压缩比例。

- **积压比例验证**：在拖拽商品时，需要验证商品的长、高、宽是否超出可用空间，防止商品过度挤压导致布局混乱。例如：

  ```
  javascriptconst validateOverload = (realLongs: number, realHighs: number, goods: DisplaySku): boolean => {
    if (longsOverloadRate.value === 0) return true;
    const goodsLists = goodsList.value.filter((item: DisplaySku) => item !== goods);
    let totalRealLongs = goodsLists.reduce((prev: number, cur: DisplaySku) => {
      return prev + (cur.realLongs / (1 / longsOverloadRate.value));
    }, 0) + (realLongs / (1 / longsOverloadRate.value));
    let totalRealHighs = goodsLists.reduce((prev: number, cur: DisplaySku) => {
      return prev + (cur.realHighs / (1 / longsOverloadRate.value));
    }, 0) + realHighs;
  
    if (totalRealLongs > gap.value.longs) {
      ElMessage.warning({
        message: '长挤压比例超出，无法拖入！',
        duration: 1000,
        grouping: true,
      });
      return false;
    }
    return true;
  };
  ```

#### 解决方案

- **商品压缩逻辑**：在商品展示时，根据商品的 `longsRate`、`highsRate` 和 `widesRate` 动态调整商品的实际尺寸，并且在商品被挤压时显示提示信息：

  ```
  javascriptconst getGoodsWrapStyle = (goods: DisplaySku) => {
    const { direction, longsRate = 1, highsRate = 1, widesRate = 1, isSqueeze } = goods
    const { longs, highs, wides } = goods.skuInfo || {}
    let width = longs * longsRate
    let height = highs * highsRate
    if (direction === 'FLAT') {
      height = wides * widesRate
    }
    if (['LEFT_90', 'RIGHT_90'].includes(direction)) {
      width = highs * highsRate
      height = longs * longsRate
    }
    return isSqueeze ? {
      width: '100%',
      height: '100%'
    } : {
      width: size2px(width),
      height: size2px(height)
    }
  }
  ```

- **积压比例验证**：在每次商品拖拽或排列变化时，调用 `validateOverload` 方法验证商品的长、高、宽是否超出可用空间，确保商品不会过度挤压。

### 3. 单层商品展示和固定高度（VerticalDisplay.vue）

#### 难点描述

- **单层商品展示**：`VerticalDisplay.vue` 文件中只支持单层商品展示，所有商品都在同一个展示区域内。这意味着在处理商品拖拽和排列时，不需要考虑多层次的复杂性，但需要确保商品在单层内的合理排列。
- **固定高度**：商品展示区域的高度是固定的，通过 `gap.highs` 设置，不随内容变化而调整。这要求在商品拖拽和排列时，必须严格控制商品的数量和排列方式，避免超出固定高度。

#### 解决方案

- **简化商品排列逻辑**：由于只需要处理单层商品展示，因此可以简化商品排列逻辑，减少不必要的复杂度。例如，在 `handleGoodsChange` 方法中，直接操作 `goodsList`，而不涉及多层次的处理：

  ```
  javascriptfunction handleGoodsChange(e: any) {
    if (e.removed) return
    let dragGoods: DisplaySku = {} as any
    if (e.added) {
      isAdd.value = true
      dragGoods = e.added.element
    }
    if (e.moved) {
      isAdd.value = false
      dragGoods = e.moved.element
    }
    setTimeout(() => {
      if (dragGoods.colCount) {
        const directionWidesMap = {
          NORMAL: dragGoods.skuInfo.wides * (dragGoods.widesRate ?? 1),
          LEFT_90: dragGoods.skuInfo.wides * (dragGoods.widesRate ?? 1),
          RIGHT_90: dragGoods.skuInfo.wides * (dragGoods.widesRate ?? 1),
          FLAT: dragGoods.skuInfo.highs * (dragGoods.highsRate ?? 1),
        }
        let defaultRowCount = Math.floor(gap.value.wides / directionWidesMap[dragGoods.direction!])
        defaultRowCount = defaultRowCount > 1 ? defaultRowCount : 1
        Object.assign(dragGoods, {
          colIdx: cIdx.value,
          floorIdx: lIdx.value,
          rowIdx: rIdx.value,
          gapIdx: gIdx.value,
          rowCount: defaultRowCount,
          isFullGap: true,
          basketIdx: basketIdx?.value ?? undefined,
          skuIdx: '*',
        })
        return
      }
      if (e.added && displayStore.areaId === areaId) {
        editingGoods.value = dragGoods
        showDisplaySetting()
      } else {
        const disSkuIndex = goodsList.value.findIndex(sku => !sku.colCount)
        goodsList.value.splice(disSkuIndex, 1)
      }
    })
  }
  ```

- **固定高度管理**：在处理商品拖拽和排列时，确保商品数量和排列方式不超过固定高度。例如，在 `validateOverload` 方法中，仅需验证商品的长度是否超出可用空间：

  ```
  javascriptconst validateOverload = (realLongs: number, realHighs: number, goods: DisplaySku): boolean => {
    if (longsOverloadRate.value === 0) return true;
    const goodsLists = goodsList.value.filter((item: DisplaySku) => item !== goods);
    let totalRealLongs = goodsLists.reduce((prev: number, cur: DisplaySku) => {
      return prev + (cur.realLongs / (1 / longsOverloadRate.value));
    }, 0) + (realLongs / (1 / longsOverloadRate.value));
    let totalRealHighs = goodsLists.reduce((prev: number, cur: DisplaySku) => {
      return prev + (cur.realHighs / (1 / longsOverloadRate.value));
    }, 0) + realHighs;
  
    if (totalRealLongs > gap.value.longs) {
      ElMessage.warning({
        message: '长挤压比例超出，无法拖入！',
        duration: 1000,
        grouping: true,
      });
      return false;
    }
    return true;
  };
  ```

### 4. 数据同步和视图更新

#### 难点描述

- **数据同步**：无论是 `HorizontalDisplay.vue` 还是 `VerticalDisplay.vue`，都需要确保商品列表的数据与视图保持同步。每当商品拖拽或排列发生变化时，都需要及时更新视图，以反映最新的商品状态。
- **视图更新**：在商品拖拽或排列变化后，需要调用 `PageElement.updateView(widgetCode.value)` 更新视图，确保用户界面能够正确显示最新的商品排列。

#### 解决方案

- **使用 `watch` 监听数据变化**：在 `HorizontalDisplay.vue` 和 `VerticalDisplay.vue` 中，都使用了 `watch` 监听商品列表的变化，并在数据变化时更新视图：

  ```
  javascriptwatch(() => sourceGoodsList.value, newList => {
    if (displayStore.dragging) {
      return
    }
    const curJson = JSON.stringify(newList)
    const preJson = JSON.stringify(goodsList.value)
    if (preJson !== curJson) {
      goodsList.value = (newList || []).sort((a, b) => (a.skuIdx as number) - (b.skuIdx as number)).map(item => ({
        ...item,
        key: item.key ?? getSkuKey(),
      })) as DisplaySku[]
    }
  }, { immediate: true })
  ```

- **调用 `PageElement.updateView` 更新视图**：在商品拖拽或排列变化后，及时调用 `PageElement.updateView(widgetCode.value)` 更新视图，确保用户界面能够正确显示最新的商品排列：

  ```
  javascriptconst groupProps = {
    name: 'goods',
    pull: true,
    put: () => {
      areaLoading.value = true
      const valid = goodsPutCheck()
      areaLoading.value = false
      // 更新视图
      PageElement.updateView(widgetCode.value)
      return valid
    }
  }
  ```

### 总结

主要难点在于：

1. **多层次商品展示和动态高度调整**：需要处理多个层次的商品展示，并且每个层次的高度需要动态调整，增加了代码的复杂性和维护难度。
2. **商品压缩和积压比例验证**：需要考虑商品在不同方向上的压缩比例，并且在拖拽商品时进行积压比例验证，确保商品不会过度挤压。
3. **单层商品展示和固定高度管理**：虽然相对简单，但也需要确保商品在单层内的合理排列，并且在固定高度内进行管理。
4. **数据同步和视图更新**：需要确保商品列表的数据与视图保持同步，并且在商品拖拽或排列变化后及时更新视图，保证用户界面的实时性和准确性。

这些难点不仅考验了对 Vue.js 框架的理解和运用能力，还要求开发者具备良好的算法设计和性能优化能力，以确保系统在处理大量商品数据时仍能保持高效和流畅。