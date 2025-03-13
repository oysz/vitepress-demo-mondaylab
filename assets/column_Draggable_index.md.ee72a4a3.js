import{_ as a,o as n,c as e,L as l}from"./chunks/framework.9fa19bf9.js";const u=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"column/Draggable/index.md"}'),o={name:"column/Draggable/index.md"};function p(t,s,i,c,r,d){return n(),e("div",null,s[0]||(s[0]=[l(`<p>项目：货架 draggable+Vue3+TS</p><h3 id="_1-多层次商品展示和动态高度调整-horizontaldisplay-vue" tabindex="-1">1. 多层次商品展示和动态高度调整（HorizontalDisplay.vue） <a class="header-anchor" href="#_1-多层次商品展示和动态高度调整-horizontaldisplay-vue" aria-label="Permalink to &quot;1. 多层次商品展示和动态高度调整（HorizontalDisplay.vue）&quot;">​</a></h3><h4 id="难点描述" tabindex="-1">难点描述 <a class="header-anchor" href="#难点描述" aria-label="Permalink to &quot;难点描述&quot;">​</a></h4><ul><li><p><strong>多层商品展示</strong>：<code>HorizontalDisplay.vue</code> 文件中需要支持多层次的商品展示，每个层次的高度可以动态调整。这意味着在处理商品拖拽和排列时，必须考虑到不同层次之间的复杂关系。</p></li><li><p><strong>动态高度计算</strong>：每个 <code>draggable</code> 组件的高度是根据实际内容动态计算的，例如：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">javascript</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">:style=&quot;{ height: size2px(Math.min(horizontalHighsMap[hIdx - 1] ?? usableHighs, withBasketHigh)), justifyContent: justifyContent } &quot;</span></span></code></pre></div><p>这要求在每次商品拖拽或排列变化时，都需要重新计算并更新各个层次的高度。</p></li></ul><h4 id="解决方案" tabindex="-1">解决方案 <a class="header-anchor" href="#解决方案" aria-label="Permalink to &quot;解决方案&quot;">​</a></h4><ul><li><p><strong>使用 <code>horizontalCount</code> 和 <code>horizontalHighsMap</code></strong>：通过 <code>horizontalCount</code> 来管理不同的层次，并使用 <code>horizontalHighsMap</code> 存储每个层次的高度信息。每次商品拖拽或排列变化时，更新相应的高度值。</p></li><li><p><strong>监听数据变化</strong>：通过 <code>watch</code> 监听 <code>goodsListMap</code> 的变化，并根据新的商品排列情况动态调整各个层次的高度：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">javascriptwatch(() =&gt; goodsListMap, (newListMap: Record&lt;string, DisplaySku[]&gt;) =&gt; {</span></span>
<span class="line"><span style="color:#babed8;">  Object.keys(newListMap).forEach(key =&gt; {</span></span>
<span class="line"><span style="color:#babed8;">    if (Array.isArray(newListMap[key]) &amp;&amp; newListMap[key].length) {</span></span>
<span class="line"><span style="color:#babed8;">      _newListMap[index] = newListMap[key]</span></span>
<span class="line"><span style="color:#babed8;">      index++</span></span>
<span class="line"><span style="color:#babed8;">    }</span></span>
<span class="line"><span style="color:#babed8;">  })</span></span>
<span class="line"><span style="color:#babed8;">  horizontalCount.value = _horizontalCount || 1</span></span>
<span class="line"><span style="color:#babed8;">  if (horizontalCount.value === 1 &amp;&amp; !_horizontalHighsMap[0]) {</span></span>
<span class="line"><span style="color:#babed8;">    _horizontalHighsMap[0] = withBasketHigh.value</span></span>
<span class="line"><span style="color:#babed8;">  }</span></span>
<span class="line"><span style="color:#babed8;">  horizontalHighsMap.value = _horizontalHighsMap</span></span>
<span class="line"><span style="color:#babed8;">  // 更新视图</span></span>
<span class="line"><span style="color:#babed8;">  PageElement.updateView(widgetCode.value)</span></span>
<span class="line"><span style="color:#babed8;">}, { immediate: true, deep: true })</span></span></code></pre></div></li></ul><h3 id="_2-商品压缩和积压比例验证" tabindex="-1">2. 商品压缩和积压比例验证 <a class="header-anchor" href="#_2-商品压缩和积压比例验证" aria-label="Permalink to &quot;2. 商品压缩和积压比例验证&quot;">​</a></h3><h4 id="难点描述-1" tabindex="-1">难点描述 <a class="header-anchor" href="#难点描述-1" aria-label="Permalink to &quot;难点描述&quot;">​</a></h4><ul><li><p><strong>商品压缩</strong>：在 <code>HorizontalDisplay.vue</code> 中，商品可能会被挤压（<code>isSqueeze</code>），并且需要考虑长、高、宽三个维度的压缩比例。</p></li><li><p><strong>积压比例验证</strong>：在拖拽商品时，需要验证商品的长、高、宽是否超出可用空间，防止商品过度挤压导致布局混乱。例如：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">javascriptconst validateOverload = (realLongs: number, realHighs: number, goods: DisplaySku): boolean =&gt; {</span></span>
<span class="line"><span style="color:#babed8;">  if (longsOverloadRate.value === 0) return true;</span></span>
<span class="line"><span style="color:#babed8;">  const goodsLists = goodsList.value.filter((item: DisplaySku) =&gt; item !== goods);</span></span>
<span class="line"><span style="color:#babed8;">  let totalRealLongs = goodsLists.reduce((prev: number, cur: DisplaySku) =&gt; {</span></span>
<span class="line"><span style="color:#babed8;">    return prev + (cur.realLongs / (1 / longsOverloadRate.value));</span></span>
<span class="line"><span style="color:#babed8;">  }, 0) + (realLongs / (1 / longsOverloadRate.value));</span></span>
<span class="line"><span style="color:#babed8;">  let totalRealHighs = goodsLists.reduce((prev: number, cur: DisplaySku) =&gt; {</span></span>
<span class="line"><span style="color:#babed8;">    return prev + (cur.realHighs / (1 / longsOverloadRate.value));</span></span>
<span class="line"><span style="color:#babed8;">  }, 0) + realHighs;</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">  if (totalRealLongs &gt; gap.value.longs) {</span></span>
<span class="line"><span style="color:#babed8;">    ElMessage.warning({</span></span>
<span class="line"><span style="color:#babed8;">      message: &#39;长挤压比例超出，无法拖入！&#39;,</span></span>
<span class="line"><span style="color:#babed8;">      duration: 1000,</span></span>
<span class="line"><span style="color:#babed8;">      grouping: true,</span></span>
<span class="line"><span style="color:#babed8;">    });</span></span>
<span class="line"><span style="color:#babed8;">    return false;</span></span>
<span class="line"><span style="color:#babed8;">  }</span></span>
<span class="line"><span style="color:#babed8;">  return true;</span></span>
<span class="line"><span style="color:#babed8;">};</span></span></code></pre></div></li></ul><h4 id="解决方案-1" tabindex="-1">解决方案 <a class="header-anchor" href="#解决方案-1" aria-label="Permalink to &quot;解决方案&quot;">​</a></h4><ul><li><p><strong>商品压缩逻辑</strong>：在商品展示时，根据商品的 <code>longsRate</code>、<code>highsRate</code> 和 <code>widesRate</code> 动态调整商品的实际尺寸，并且在商品被挤压时显示提示信息：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">javascriptconst getGoodsWrapStyle = (goods: DisplaySku) =&gt; {</span></span>
<span class="line"><span style="color:#babed8;">  const { direction, longsRate = 1, highsRate = 1, widesRate = 1, isSqueeze } = goods</span></span>
<span class="line"><span style="color:#babed8;">  const { longs, highs, wides } = goods.skuInfo || {}</span></span>
<span class="line"><span style="color:#babed8;">  let width = longs * longsRate</span></span>
<span class="line"><span style="color:#babed8;">  let height = highs * highsRate</span></span>
<span class="line"><span style="color:#babed8;">  if (direction === &#39;FLAT&#39;) {</span></span>
<span class="line"><span style="color:#babed8;">    height = wides * widesRate</span></span>
<span class="line"><span style="color:#babed8;">  }</span></span>
<span class="line"><span style="color:#babed8;">  if ([&#39;LEFT_90&#39;, &#39;RIGHT_90&#39;].includes(direction)) {</span></span>
<span class="line"><span style="color:#babed8;">    width = highs * highsRate</span></span>
<span class="line"><span style="color:#babed8;">    height = longs * longsRate</span></span>
<span class="line"><span style="color:#babed8;">  }</span></span>
<span class="line"><span style="color:#babed8;">  return isSqueeze ? {</span></span>
<span class="line"><span style="color:#babed8;">    width: &#39;100%&#39;,</span></span>
<span class="line"><span style="color:#babed8;">    height: &#39;100%&#39;</span></span>
<span class="line"><span style="color:#babed8;">  } : {</span></span>
<span class="line"><span style="color:#babed8;">    width: size2px(width),</span></span>
<span class="line"><span style="color:#babed8;">    height: size2px(height)</span></span>
<span class="line"><span style="color:#babed8;">  }</span></span>
<span class="line"><span style="color:#babed8;">}</span></span></code></pre></div></li><li><p><strong>积压比例验证</strong>：在每次商品拖拽或排列变化时，调用 <code>validateOverload</code> 方法验证商品的长、高、宽是否超出可用空间，确保商品不会过度挤压。</p></li></ul><h3 id="_3-单层商品展示和固定高度-verticaldisplay-vue" tabindex="-1">3. 单层商品展示和固定高度（VerticalDisplay.vue） <a class="header-anchor" href="#_3-单层商品展示和固定高度-verticaldisplay-vue" aria-label="Permalink to &quot;3. 单层商品展示和固定高度（VerticalDisplay.vue）&quot;">​</a></h3><h4 id="难点描述-2" tabindex="-1">难点描述 <a class="header-anchor" href="#难点描述-2" aria-label="Permalink to &quot;难点描述&quot;">​</a></h4><ul><li><strong>单层商品展示</strong>：<code>VerticalDisplay.vue</code> 文件中只支持单层商品展示，所有商品都在同一个展示区域内。这意味着在处理商品拖拽和排列时，不需要考虑多层次的复杂性，但需要确保商品在单层内的合理排列。</li><li><strong>固定高度</strong>：商品展示区域的高度是固定的，通过 <code>gap.highs</code> 设置，不随内容变化而调整。这要求在商品拖拽和排列时，必须严格控制商品的数量和排列方式，避免超出固定高度。</li></ul><h4 id="解决方案-2" tabindex="-1">解决方案 <a class="header-anchor" href="#解决方案-2" aria-label="Permalink to &quot;解决方案&quot;">​</a></h4><ul><li><p><strong>简化商品排列逻辑</strong>：由于只需要处理单层商品展示，因此可以简化商品排列逻辑，减少不必要的复杂度。例如，在 <code>handleGoodsChange</code> 方法中，直接操作 <code>goodsList</code>，而不涉及多层次的处理：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">javascriptfunction handleGoodsChange(e: any) {</span></span>
<span class="line"><span style="color:#babed8;">  if (e.removed) return</span></span>
<span class="line"><span style="color:#babed8;">  let dragGoods: DisplaySku = {} as any</span></span>
<span class="line"><span style="color:#babed8;">  if (e.added) {</span></span>
<span class="line"><span style="color:#babed8;">    isAdd.value = true</span></span>
<span class="line"><span style="color:#babed8;">    dragGoods = e.added.element</span></span>
<span class="line"><span style="color:#babed8;">  }</span></span>
<span class="line"><span style="color:#babed8;">  if (e.moved) {</span></span>
<span class="line"><span style="color:#babed8;">    isAdd.value = false</span></span>
<span class="line"><span style="color:#babed8;">    dragGoods = e.moved.element</span></span>
<span class="line"><span style="color:#babed8;">  }</span></span>
<span class="line"><span style="color:#babed8;">  setTimeout(() =&gt; {</span></span>
<span class="line"><span style="color:#babed8;">    if (dragGoods.colCount) {</span></span>
<span class="line"><span style="color:#babed8;">      const directionWidesMap = {</span></span>
<span class="line"><span style="color:#babed8;">        NORMAL: dragGoods.skuInfo.wides * (dragGoods.widesRate ?? 1),</span></span>
<span class="line"><span style="color:#babed8;">        LEFT_90: dragGoods.skuInfo.wides * (dragGoods.widesRate ?? 1),</span></span>
<span class="line"><span style="color:#babed8;">        RIGHT_90: dragGoods.skuInfo.wides * (dragGoods.widesRate ?? 1),</span></span>
<span class="line"><span style="color:#babed8;">        FLAT: dragGoods.skuInfo.highs * (dragGoods.highsRate ?? 1),</span></span>
<span class="line"><span style="color:#babed8;">      }</span></span>
<span class="line"><span style="color:#babed8;">      let defaultRowCount = Math.floor(gap.value.wides / directionWidesMap[dragGoods.direction!])</span></span>
<span class="line"><span style="color:#babed8;">      defaultRowCount = defaultRowCount &gt; 1 ? defaultRowCount : 1</span></span>
<span class="line"><span style="color:#babed8;">      Object.assign(dragGoods, {</span></span>
<span class="line"><span style="color:#babed8;">        colIdx: cIdx.value,</span></span>
<span class="line"><span style="color:#babed8;">        floorIdx: lIdx.value,</span></span>
<span class="line"><span style="color:#babed8;">        rowIdx: rIdx.value,</span></span>
<span class="line"><span style="color:#babed8;">        gapIdx: gIdx.value,</span></span>
<span class="line"><span style="color:#babed8;">        rowCount: defaultRowCount,</span></span>
<span class="line"><span style="color:#babed8;">        isFullGap: true,</span></span>
<span class="line"><span style="color:#babed8;">        basketIdx: basketIdx?.value ?? undefined,</span></span>
<span class="line"><span style="color:#babed8;">        skuIdx: &#39;*&#39;,</span></span>
<span class="line"><span style="color:#babed8;">      })</span></span>
<span class="line"><span style="color:#babed8;">      return</span></span>
<span class="line"><span style="color:#babed8;">    }</span></span>
<span class="line"><span style="color:#babed8;">    if (e.added &amp;&amp; displayStore.areaId === areaId) {</span></span>
<span class="line"><span style="color:#babed8;">      editingGoods.value = dragGoods</span></span>
<span class="line"><span style="color:#babed8;">      showDisplaySetting()</span></span>
<span class="line"><span style="color:#babed8;">    } else {</span></span>
<span class="line"><span style="color:#babed8;">      const disSkuIndex = goodsList.value.findIndex(sku =&gt; !sku.colCount)</span></span>
<span class="line"><span style="color:#babed8;">      goodsList.value.splice(disSkuIndex, 1)</span></span>
<span class="line"><span style="color:#babed8;">    }</span></span>
<span class="line"><span style="color:#babed8;">  })</span></span>
<span class="line"><span style="color:#babed8;">}</span></span></code></pre></div></li><li><p><strong>固定高度管理</strong>：在处理商品拖拽和排列时，确保商品数量和排列方式不超过固定高度。例如，在 <code>validateOverload</code> 方法中，仅需验证商品的长度是否超出可用空间：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">javascriptconst validateOverload = (realLongs: number, realHighs: number, goods: DisplaySku): boolean =&gt; {</span></span>
<span class="line"><span style="color:#babed8;">  if (longsOverloadRate.value === 0) return true;</span></span>
<span class="line"><span style="color:#babed8;">  const goodsLists = goodsList.value.filter((item: DisplaySku) =&gt; item !== goods);</span></span>
<span class="line"><span style="color:#babed8;">  let totalRealLongs = goodsLists.reduce((prev: number, cur: DisplaySku) =&gt; {</span></span>
<span class="line"><span style="color:#babed8;">    return prev + (cur.realLongs / (1 / longsOverloadRate.value));</span></span>
<span class="line"><span style="color:#babed8;">  }, 0) + (realLongs / (1 / longsOverloadRate.value));</span></span>
<span class="line"><span style="color:#babed8;">  let totalRealHighs = goodsLists.reduce((prev: number, cur: DisplaySku) =&gt; {</span></span>
<span class="line"><span style="color:#babed8;">    return prev + (cur.realHighs / (1 / longsOverloadRate.value));</span></span>
<span class="line"><span style="color:#babed8;">  }, 0) + realHighs;</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">  if (totalRealLongs &gt; gap.value.longs) {</span></span>
<span class="line"><span style="color:#babed8;">    ElMessage.warning({</span></span>
<span class="line"><span style="color:#babed8;">      message: &#39;长挤压比例超出，无法拖入！&#39;,</span></span>
<span class="line"><span style="color:#babed8;">      duration: 1000,</span></span>
<span class="line"><span style="color:#babed8;">      grouping: true,</span></span>
<span class="line"><span style="color:#babed8;">    });</span></span>
<span class="line"><span style="color:#babed8;">    return false;</span></span>
<span class="line"><span style="color:#babed8;">  }</span></span>
<span class="line"><span style="color:#babed8;">  return true;</span></span>
<span class="line"><span style="color:#babed8;">};</span></span></code></pre></div></li></ul><h3 id="_4-数据同步和视图更新" tabindex="-1">4. 数据同步和视图更新 <a class="header-anchor" href="#_4-数据同步和视图更新" aria-label="Permalink to &quot;4. 数据同步和视图更新&quot;">​</a></h3><h4 id="难点描述-3" tabindex="-1">难点描述 <a class="header-anchor" href="#难点描述-3" aria-label="Permalink to &quot;难点描述&quot;">​</a></h4><ul><li><strong>数据同步</strong>：无论是 <code>HorizontalDisplay.vue</code> 还是 <code>VerticalDisplay.vue</code>，都需要确保商品列表的数据与视图保持同步。每当商品拖拽或排列发生变化时，都需要及时更新视图，以反映最新的商品状态。</li><li><strong>视图更新</strong>：在商品拖拽或排列变化后，需要调用 <code>PageElement.updateView(widgetCode.value)</code> 更新视图，确保用户界面能够正确显示最新的商品排列。</li></ul><h4 id="解决方案-3" tabindex="-1">解决方案 <a class="header-anchor" href="#解决方案-3" aria-label="Permalink to &quot;解决方案&quot;">​</a></h4><ul><li><p><strong>使用 <code>watch</code> 监听数据变化</strong>：在 <code>HorizontalDisplay.vue</code> 和 <code>VerticalDisplay.vue</code> 中，都使用了 <code>watch</code> 监听商品列表的变化，并在数据变化时更新视图：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">javascriptwatch(() =&gt; sourceGoodsList.value, newList =&gt; {</span></span>
<span class="line"><span style="color:#babed8;">  if (displayStore.dragging) {</span></span>
<span class="line"><span style="color:#babed8;">    return</span></span>
<span class="line"><span style="color:#babed8;">  }</span></span>
<span class="line"><span style="color:#babed8;">  const curJson = JSON.stringify(newList)</span></span>
<span class="line"><span style="color:#babed8;">  const preJson = JSON.stringify(goodsList.value)</span></span>
<span class="line"><span style="color:#babed8;">  if (preJson !== curJson) {</span></span>
<span class="line"><span style="color:#babed8;">    goodsList.value = (newList || []).sort((a, b) =&gt; (a.skuIdx as number) - (b.skuIdx as number)).map(item =&gt; ({</span></span>
<span class="line"><span style="color:#babed8;">      ...item,</span></span>
<span class="line"><span style="color:#babed8;">      key: item.key ?? getSkuKey(),</span></span>
<span class="line"><span style="color:#babed8;">    })) as DisplaySku[]</span></span>
<span class="line"><span style="color:#babed8;">  }</span></span>
<span class="line"><span style="color:#babed8;">}, { immediate: true })</span></span></code></pre></div></li><li><p><strong>调用 <code>PageElement.updateView</code> 更新视图</strong>：在商品拖拽或排列变化后，及时调用 <code>PageElement.updateView(widgetCode.value)</code> 更新视图，确保用户界面能够正确显示最新的商品排列：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">javascriptconst groupProps = {</span></span>
<span class="line"><span style="color:#babed8;">  name: &#39;goods&#39;,</span></span>
<span class="line"><span style="color:#babed8;">  pull: true,</span></span>
<span class="line"><span style="color:#babed8;">  put: () =&gt; {</span></span>
<span class="line"><span style="color:#babed8;">    areaLoading.value = true</span></span>
<span class="line"><span style="color:#babed8;">    const valid = goodsPutCheck()</span></span>
<span class="line"><span style="color:#babed8;">    areaLoading.value = false</span></span>
<span class="line"><span style="color:#babed8;">    // 更新视图</span></span>
<span class="line"><span style="color:#babed8;">    PageElement.updateView(widgetCode.value)</span></span>
<span class="line"><span style="color:#babed8;">    return valid</span></span>
<span class="line"><span style="color:#babed8;">  }</span></span>
<span class="line"><span style="color:#babed8;">}</span></span></code></pre></div></li></ul><h3 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h3><p>主要难点在于：</p><ol><li><strong>多层次商品展示和动态高度调整</strong>：需要处理多个层次的商品展示，并且每个层次的高度需要动态调整，增加了代码的复杂性和维护难度。</li><li><strong>商品压缩和积压比例验证</strong>：需要考虑商品在不同方向上的压缩比例，并且在拖拽商品时进行积压比例验证，确保商品不会过度挤压。</li><li><strong>单层商品展示和固定高度管理</strong>：虽然相对简单，但也需要确保商品在单层内的合理排列，并且在固定高度内进行管理。</li><li><strong>数据同步和视图更新</strong>：需要确保商品列表的数据与视图保持同步，并且在商品拖拽或排列变化后及时更新视图，保证用户界面的实时性和准确性。</li></ol><p>这些难点不仅考验了对 Vue.js 框架的理解和运用能力，还要求开发者具备良好的算法设计和性能优化能力，以确保系统在处理大量商品数据时仍能保持高效和流畅。</p>`,25)]))}const g=a(o,[["render",p]]);export{u as __pageData,g as default};
