import{_ as e,o as s,c as n,L as t}from"./chunks/framework.9fa19bf9.js";const g=JSON.parse('{"title":"Git 常用命令","description":"","frontmatter":{},"headers":[],"relativePath":"column/Newcomer/002_Git.md"}'),c={name:"column/Newcomer/002_Git.md"};function l(p,a,o,i,d,r){return s(),n("div",null,a[0]||(a[0]=[t(`<h1 id="git-常用命令" tabindex="-1">Git 常用命令 <a class="header-anchor" href="#git-常用命令" aria-label="Permalink to &quot;Git 常用命令&quot;">​</a></h1><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">$ git checkout -b dev</span></span>
<span class="line"><span style="color:#babed8;">相当于</span></span>
<span class="line"><span style="color:#babed8;">$ git branch dev</span></span>
<span class="line"><span style="color:#babed8;">$ git checkout dev</span></span>
<span class="line"><span style="color:#babed8;">$ git branch -d dev</span></span>
<span class="line"><span style="color:#babed8;">Switched to branch &#39;dev&#39;</span></span>
<span class="line"><span style="color:#babed8;">$ git branch</span></span>
<span class="line"><span style="color:#babed8;">命令会列出所有分支，当前分支前面会标一个*号。</span></span>
<span class="line"><span style="color:#babed8;">$ git merge dev</span></span>
<span class="line"><span style="color:#babed8;">git merge命令用于合并指定分支到当前分支。</span></span></code></pre></div><p>查看分支：<code>git branch</code></p><p>创建分支：<code>git branch &lt;name&gt;</code></p><p>切换分支：<code>git checkout &lt;name&gt;</code>或者<code>git switch &lt;name&gt;</code></p><p>创建+切换分支：<code>git checkout -b &lt;name&gt;</code>或者<code>git switch -c &lt;name&gt;</code></p><p>合并某分支到当前分支：<code>git merge &lt;name&gt;</code></p><p>删除分支：<code>git branch -d &lt;name&gt;</code></p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">强制提交 </span></span>
<span class="line"><span style="color:#babed8;">$ git push --force origin 分支名</span></span>
<span class="line"><span style="color:#babed8;">恢复到上个版本</span></span>
<span class="line"><span style="color:#babed8;">$ git reset HEAD^</span></span></code></pre></div>`,9)]))}const h=e(c,[["render",l]]);export{g as __pageData,h as default};
