function e(e){if(!e||e.dataset.vcsInitialized===`true`)return;e.dataset.vcsInitialized=`true`;function t(){return{id:`grid-go`,name:`grid.go`,fullName:`grid.go`,path:`pkg/life`,shortPath:`pkg/life/grid.go`,iconType:`go`,statusLetter:`M`,statusColor:`status-yellow`,additions:`+3`,deletions:`-1`,isUnifiedDiff:!0,diffLines:[{oldNum:1,newNum:1,oldText:`package life`,newText:`package life`,type:`context`},{oldNum:2,newNum:2,oldText:``,newText:``,type:`context`},{oldNum:3,newNum:3,oldText:`// Grid represents a 2D cellular automaton universe.`,newText:`// Grid represents a 2D cellular automaton universe.`,type:`context`},{oldNum:4,newNum:4,oldText:`type Grid struct {`,newText:`type Grid struct {`,type:`context`},{oldNum:5,newNum:5,oldText:`	width, height int`,newText:`	width, height int`,type:`context`},{oldNum:6,newNum:6,oldText:`	cells         [][]bool`,newText:`	cells         [][]bool`,type:`context`},{oldNum:7,newNum:7,oldText:`}`,newText:`}`,type:`context`},{isFold:!0,foldId:`grid-fold-1`,foldText:`+12 more lines`,lines:[{oldNum:8,newNum:8,oldText:``,newText:``,type:`context`},{oldNum:9,newNum:9,oldText:`// NewGrid initializes an empty grid with given dimensions.`,newText:`// NewGrid initializes an empty grid with given dimensions.`,type:`context`},{oldNum:10,newNum:10,oldText:`func NewGrid(width, height int) *Grid {`,newText:`func NewGrid(width, height int) *Grid {`,type:`context`},{oldNum:11,newNum:11,oldText:`	cells := make([][]bool, height)`,newText:`	cells := make([][]bool, height)`,type:`context`},{oldNum:12,newNum:12,oldText:`	for i := range cells {`,newText:`	for i := range cells {`,type:`context`},{oldNum:13,newNum:13,oldText:`		cells[i] = make([]bool, width)`,newText:`		cells[i] = make([]bool, width)`,type:`context`},{oldNum:14,newNum:14,oldText:`	}`,newText:`	}`,type:`context`},{oldNum:15,newNum:15,oldText:`	return &Grid{width: width, height: height, cells: cells}`,newText:`	return &Grid{width: width, height: height, cells: cells}`,type:`context`},{oldNum:16,newNum:16,oldText:`}`,newText:`}`,type:`context`},{oldNum:17,newNum:17,oldText:``,newText:``,type:`context`},{oldNum:18,newNum:18,oldText:`// Set updates cell state at (x, y).`,newText:`// Set updates cell state at (x, y).`,type:`context`},{oldNum:19,newNum:19,oldText:`func (g *Grid) Set(x, y int, alive bool) { g.cells[y][x] = alive }`,newText:`func (g *Grid) Set(x, y int, alive bool) { g.cells[y][x] = alive }`,type:`context`}]},{oldNum:20,newNum:20,oldText:`// CountNeighbors returns live neighbors for cell (x, y).`,newText:`// CountNeighbors returns live neighbors for cell (x, y).`,type:`context`},{oldNum:21,newNum:21,oldText:`func (g *Grid) CountNeighbors(x, y int) int {`,newText:`func (g *Grid) CountNeighbors(x, y int) int {`,type:`context`},{oldNum:22,newNum:22,oldText:`	count := 0`,newText:`	count := 0`,type:`context`},{oldNum:23,newNum:23,oldText:`	for dy := -1; dy <= 1; dy++ {`,newText:`	for dy := -1; dy <= 1; dy++ {`,type:`context`},{oldNum:24,newNum:24,oldText:`		for dx := -1; dx <= 1; dx++ {`,newText:`		for dx := -1; dx <= 1; dx++ {`,type:`context`},{oldNum:25,newNum:25,oldText:`			if dx == 0 && dy == 0 {`,newText:`			if dx == 0 && dy == 0 {`,type:`context`},{oldNum:26,newNum:26,oldText:`				continue`,newText:`				continue`,type:`context`},{oldNum:27,newNum:27,oldText:`			}`,newText:`			}`,type:`context`},{oldNum:28,newNum:``,oldText:`			nx, ny := (x+dx)%g.width, (y+dy)%g.height`,newText:``,type:`delete`},{oldNum:``,newNum:28,oldText:``,newText:`			// Toroidal coordinate wrap across boundaries`,type:`insert`},{oldNum:``,newNum:29,oldText:``,newText:`			nx := (x + dx + g.width) % g.width`,type:`insert`},{oldNum:``,newNum:30,oldText:``,newText:`			ny := (y + dy + g.height) % g.height`,type:`insert`},{oldNum:29,newNum:31,oldText:`			if g.cells[ny][nx] {`,newText:`			if g.cells[ny][nx] {`,type:`context`},{oldNum:30,newNum:32,oldText:`				count++`,newText:`				count++`,type:`context`},{oldNum:31,newNum:33,oldText:`			}`,newText:`			}`,type:`context`},{oldNum:32,newNum:34,oldText:`		}`,newText:`		}`,type:`context`},{oldNum:33,newNum:35,oldText:`	}`,newText:`	}`,type:`context`},{oldNum:34,newNum:36,oldText:`	return count`,newText:`	return count`,type:`context`},{oldNum:35,newNum:37,oldText:`}`,newText:`}`,type:`context`}]}}function n(){return{id:`grid-test-go`,name:`grid_test.go`,fullName:`grid_test.go`,path:`pkg/life`,shortPath:`pkg/life/grid_test.go`,iconType:`go`,statusLetter:`U`,statusColor:`status-green`,additions:`+25`,deletions:`-0`,isUnifiedDiff:!0,diffLines:[{oldNum:``,newNum:1,oldText:``,newText:`package life_test`,type:`insert`},{oldNum:``,newNum:2,oldText:``,newText:``,type:`insert`},{oldNum:``,newNum:3,oldText:``,newText:`import (`,type:`insert`},{oldNum:``,newNum:4,oldText:``,newText:`	"testing"`,type:`insert`},{oldNum:``,newNum:5,oldText:``,newText:`	"github.com/example/conway/pkg/life"`,type:`insert`},{oldNum:``,newNum:6,oldText:``,newText:`)`,type:`insert`},{oldNum:``,newNum:7,oldText:``,newText:``,type:`insert`},{oldNum:``,newNum:8,oldText:``,newText:`func TestBlinkerOscillator(t *testing.T) {`,type:`insert`},{oldNum:``,newNum:9,oldText:``,newText:`	g := life.NewGrid(5, 5)`,type:`insert`},{oldNum:``,newNum:10,oldText:``,newText:`	g.Set(2, 1, true)`,type:`insert`},{oldNum:``,newNum:11,oldText:``,newText:`	g.Set(2, 2, true)`,type:`insert`},{oldNum:``,newNum:12,oldText:``,newText:`	g.Set(2, 3, true)`,type:`insert`},{oldNum:``,newNum:13,oldText:``,newText:``,type:`insert`},{oldNum:``,newNum:14,oldText:``,newText:`	// Step 1: Horizontal blinker becomes vertical`,type:`insert`},{oldNum:``,newNum:15,oldText:``,newText:`	step1 := g.Step()`,type:`insert`},{oldNum:``,newNum:16,oldText:``,newText:`	if !step1.Get(1, 2) || !step1.Get(2, 2) || !step1.Get(3, 2) {`,type:`insert`},{oldNum:``,newNum:17,oldText:``,newText:`		t.Errorf("expected vertical oscillator, got: %+v", step1)`,type:`insert`},{oldNum:``,newNum:18,oldText:``,newText:`	}`,type:`insert`},{oldNum:``,newNum:19,oldText:``,newText:``,type:`insert`},{oldNum:``,newNum:20,oldText:``,newText:`	// Step 2: Vertical blinker returns to horizontal`,type:`insert`},{oldNum:``,newNum:21,oldText:``,newText:`	step2 := step1.Step()`,type:`insert`},{oldNum:``,newNum:22,oldText:``,newText:`	if !step2.Get(2, 1) || !step2.Get(2, 2) || !step2.Get(2, 3) {`,type:`insert`},{oldNum:``,newNum:23,oldText:``,newText:`		t.Errorf("expected horizontal oscillator, got: %+v", step2)`,type:`insert`},{oldNum:``,newNum:24,oldText:``,newText:`	}`,type:`insert`},{oldNum:``,newNum:25,oldText:``,newText:`}`,type:`insert`}]}}function r(){return{id:`rules-go`,name:`rules.go`,fullName:`rules.go`,path:`pkg/life`,shortPath:`pkg/life/rules.go`,iconType:`go`,statusLetter:`M`,statusColor:`status-yellow`,additions:`+7`,deletions:`-1`,isUnifiedDiff:!0,diffLines:[{oldNum:1,newNum:1,oldText:`package life`,newText:`package life`,type:`context`},{oldNum:2,newNum:2,oldText:``,newText:``,type:`context`},{oldNum:3,newNum:3,oldText:`// RuleConfig defines birth and survival neighbor thresholds.`,newText:`// RuleConfig defines birth and survival neighbor thresholds.`,type:`context`},{oldNum:4,newNum:4,oldText:`type RuleConfig struct {`,newText:`type RuleConfig struct {`,type:`context`},{oldNum:5,newNum:5,oldText:`	Survive []int`,newText:`	Survive []int`,type:`context`},{oldNum:6,newNum:6,oldText:`	Birth   []int`,newText:`	Birth   []int`,type:`context`},{oldNum:7,newNum:7,oldText:`}`,newText:`}`,type:`context`},{oldNum:8,newNum:8,oldText:``,newText:``,type:`context`},{oldNum:9,newNum:``,oldText:`func DefaultRule() RuleConfig { return RuleConfig{[]int{2, 3}, []int{3}} }`,newText:``,type:`delete`},{oldNum:``,newNum:9,oldText:``,newText:`// ConwayB3S23 returns standard Conway (B3/S23) rules.`,type:`insert`},{oldNum:``,newNum:10,oldText:``,newText:`func ConwayB3S23() RuleConfig {`,type:`insert`},{oldNum:``,newNum:11,oldText:``,newText:`	return RuleConfig{`,type:`insert`},{oldNum:``,newNum:12,oldText:``,newText:`		Survive: []int{2, 3},`,type:`insert`},{oldNum:``,newNum:13,oldText:``,newText:`		Birth:   []int{3},`,type:`insert`},{oldNum:``,newNum:14,oldText:``,newText:`	}`,type:`insert`},{oldNum:``,newNum:15,oldText:``,newText:`}`,type:`insert`},{oldNum:10,newNum:16,oldText:``,newText:``,type:`context`}]}}function i(){return{id:`go-mod`,name:`go.mod`,fullName:`go.mod`,path:`conway-life`,shortPath:`go.mod`,iconType:`mod`,statusLetter:`M`,statusColor:`status-yellow`,additions:`+1`,deletions:`-1`,isUnifiedDiff:!0,diffLines:[{oldNum:1,newNum:1,oldText:`module github.com/example/conway-life`,newText:`module github.com/example/conway-life`,type:`context`},{oldNum:2,newNum:2,oldText:``,newText:``,type:`context`},{oldNum:3,newNum:``,oldText:`go 1.22`,newText:``,type:`delete`},{oldNum:``,newNum:3,oldText:``,newText:`go 1.26`,type:`insert`},{oldNum:4,newNum:4,oldText:``,newText:``,type:`context`},{oldNum:5,newNum:5,oldText:`require golang.org/x/sync v0.8.0`,newText:`require golang.org/x/sync v0.8.0`,type:`context`}]}}let a={uncommitted:{title:`Changes`,files:[t()]},branch:{title:`Branch Changes`,files:[t(),n(),r(),i()]},agent_edits:{title:`Agent Edits`,files:[t(),n()]}},o={},s=new Set,c=new Set,l=new Set,u=[{id:`term-1`,name:`zsh`,time:`09:16:00 AM`,historyHtml:``,historyCommands:[],historyIndex:-1}],d=`term-1`,f=`vcs`,p=`project`,m=typeof window<`u`?window.innerWidth>768:!0;function h(){return new Date().toLocaleTimeString(`en-US`,{hour12:!0})}function g(t){f=t;let n=j(`.tab-btn-vcs`),r=j(`.tab-btn-terminal`),i=j(`.vcs-review-pane`),a=j(`.vcs-terminal-pane`),o=j(`[data-action="toggle-sidebar"]`);t===`vcs`?(n&&n.classList.add(`active-tab`),r&&r.classList.remove(`active-tab`),i&&i.classList.remove(`hidden`),a&&a.classList.add(`hidden`),o&&o.classList.toggle(`active`,C)):(n&&n.classList.remove(`active-tab`),r&&r.classList.add(`active-tab`),i&&i.classList.add(`hidden`),a&&a.classList.remove(`hidden`),o&&o.classList.toggle(`active`,m),v(`project`),y(),b(),setTimeout(()=>{let t=e.querySelector(`.terminal-pane-block[data-session-id="${d}"]`);if(t){let e=t.querySelector(`.terminal-cli-input`);e&&e.focus()}},60))}function ee(){let e=j(`.terminal-dropdown-menu`);e&&e.classList.toggle(`hidden`)}function _(){m=!m;let e=j(`.terminal-sessions-sidebar`),t=j(`[data-action="toggle-terminal-sidebar"]`),n=j(`[data-action="toggle-sidebar"]`);e&&e.classList.toggle(`collapsed`,!m),t&&t.classList.toggle(`active`,m),n&&f===`terminal`&&n.classList.toggle(`active`,m)}function v(e){p=e;let t=j(`.terminal-dropdown-selected-label`),n=j(`[data-terminal-filter="project"]`),r=j(`[data-terminal-filter="conversation"]`),i=j(`.check-term-project`),a=j(`.check-term-conversation`);e===`project`?(t&&(t.textContent=`Project`),n&&n.classList.add(`selected`),r&&r.classList.remove(`selected`),i&&i.classList.remove(`hidden`),a&&a.classList.add(`hidden`)):(t&&(t.textContent=`Conversation`),n&&n.classList.remove(`selected`),r&&r.classList.add(`selected`),i&&i.classList.add(`hidden`),a&&a.classList.remove(`hidden`)),b();let o=j(`.terminal-dropdown-menu`);o&&o.classList.add(`hidden`)}function y(){let e=j(`.terminal-panes-container`);if(!e)return;let t=u.find(e=>e.id===d)||u[0];t&&(d=t.id,e.innerHTML=`
        <div class="terminal-pane-block" data-session-id="${t.id}">
          <div class="terminal-history">${t.historyHtml}</div>
          <div class="terminal-active-block">
            <div class="terminal-prompt-info">
              <span class="term-path">~/projects/game-of-life</span>
              <span class="term-dots">.....</span>
              <span class="term-runtime">system node</span>
              <span class="term-time-sep">|</span>
              <span class="term-clock">${t.time}</span>
            </div>
            <div class="terminal-input-row">
              <span class="term-chevron">&gt;</span>
              <div class="terminal-input-wrapper">
                <input type="text" class="terminal-cli-input" data-session-id="${t.id}" spellcheck="false" autocomplete="off" autocorrect="off" autocapitalize="off" />
              </div>
            </div>
          </div>
        </div>
      `,ne())}function b(){let e=j(`.terminal-sidebar-dynamic-container`);if(!e)return;let t=u.map(e=>`
        <div class="term-session-row ${e.id===d?`selected`:``}" data-session-id="${e.id}">
          <div class="term-session-left">
            <svg class="term-session-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="3" width="18" height="18" rx="2"/>
              <path d="M7 8l4 4-4 4M13 16h4" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span class="term-session-name">${e.name}</span>
          </div>
          <button type="button" class="term-session-delete-btn" data-action="delete-terminal" data-session-id="${e.id}" title="Kill Terminal">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
      `).join(``);e.innerHTML=p===`conversation`?`
          <div class="term-sidebar-section-title">Terminals</div>
          <div class="term-sessions-list">
            ${t}
          </div>
        `:`
          <div class="term-sidebar-section-title">Standalone</div>
          <div class="term-sidebar-section-sub">Conversations</div>
          <div class="term-conv-name">Toroidal coordinate wrap</div>
          <div class="term-sessions-list">
            ${t}
          </div>
        `,te()}function te(){e.querySelectorAll(`.term-session-row`).forEach(t=>{t.addEventListener(`click`,n=>{if(n.target.closest(`[data-action="delete-terminal"]`))return;let r=t.getAttribute(`data-session-id`);if(r){if(d=r,y(),b(),typeof window<`u`&&window.innerWidth<=768){m=!1;let e=j(`.terminal-sessions-sidebar`);e&&e.classList.add(`collapsed`);let t=j(`[data-action="toggle-terminal-sidebar"]`);t&&t.classList.remove(`active`);let n=j(`[data-action="toggle-sidebar"]`);n&&f===`terminal`&&n.classList.remove(`active`)}setTimeout(()=>{let t=e.querySelector(`.terminal-cli-input`);t&&t.focus()},30)}})}),e.querySelectorAll(`[data-action="delete-terminal"]`).forEach(e=>{e.addEventListener(`click`,t=>{t.stopPropagation();let n=e.getAttribute(`data-session-id`);n&&ie(n)})})}function ne(){e.querySelectorAll(`.terminal-cli-input`).forEach(e=>{let t=e,n=t.getAttribute(`data-session-id`);n&&(t.addEventListener(`focus`,()=>{d!==n&&(d=n,b())}),t.addEventListener(`keydown`,e=>{let r=u.find(e=>e.id===n);if(r){if(e.key===`Enter`){e.preventDefault();let n=t.value;t.value=``,ae(r,n)}else if(e.key===`ArrowUp`)e.preventDefault(),r.historyIndex>0&&(r.historyIndex--,t.value=r.historyCommands[r.historyIndex]||``);else if(e.key===`ArrowDown`)e.preventDefault(),r.historyIndex<r.historyCommands.length-1?(r.historyIndex++,t.value=r.historyCommands[r.historyIndex]||``):(r.historyIndex=r.historyCommands.length,t.value=``);else if(e.key===`Tab`){e.preventDefault();let n=t.value.trim(),r=[`git status`,`git diff`,`git add .`,`git commit -m "`,`git branch`,`git log`,`go test ./...`,`clear`,`help`,`ls`,`pwd`].find(e=>e.startsWith(n));r&&(t.value=r)}}}))}),e.querySelectorAll(`.terminal-pane-block`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.querySelector(`.terminal-cli-input`);t&&t.focus()})})}function re(){let t=`term-`+Math.random().toString(36).substring(2,7),n=u.length===0?`zsh`:`zsh ${u.length+1}`;u.push({id:t,name:n,time:h(),historyHtml:``,historyCommands:[],historyIndex:-1}),d=t,y(),b(),setTimeout(()=>{let t=e.querySelector(`.terminal-cli-input`);t&&t.focus();let n=j(`.terminal-viewport`);n&&(n.scrollTop=n.scrollHeight)},60)}function ie(e){if(u.length<=1)u=[{id:`term-`+Math.random().toString(36).substring(2,7),name:`zsh`,time:h(),historyHtml:``,historyCommands:[],historyIndex:-1}],d=u[0].id;else{let t=u.findIndex(t=>t.id===e);u=u.filter(t=>t.id!==e),d===e&&(d=u[Math.max(0,t-1)].id)}y(),b()}function ae(t,n){let r=n.trim();if(!r)return;t.historyCommands.push(r),t.historyIndex=t.historyCommands.length;let i=``,o=r.split(` `).filter(Boolean),s=o[0]?.toLowerCase(),c=o[1]?.toLowerCase();if(r===`clear`){t.historyHtml=``,y();return}if(s===`help`||r===`git help`)i=`
          <div class="terminal-output">
            <span class="term-out-bold term-out-cyan">Available Demo Commands:</span><br/>
            <span class="term-out-green">git status</span>          - Show working tree status<br/>
            <span class="term-out-green">git diff</span>            - Show diff of modified files<br/>
            <span class="term-out-green">git add &lt;file&gt;</span>       - Stage file(s) for commit<br/>
            <span class="term-out-green">git commit -m "..."</span> - Commit staged changes &amp; update UI<br/>
            <span class="term-out-green">git branch</span>          - List local branches<br/>
            <span class="term-out-green">git log</span>             - Show commit logs<br/>
            <span class="term-out-green">go test ./...</span>       - Run test suite<br/>
            <span class="term-out-green">clear</span>               - Clear terminal screen<br/>
            <span class="term-out-green">help</span>                - Show this help message
          </div>
        `;else if(s===`git`){if(!c||c===`status`){let e=a.uncommitted;i=e.files&&e.files.length>0?`
              <div class="terminal-output">
                <span>On branch <span class="term-out-cyan">feat/conway-toroidal-grid</span></span><br/>
                <span>Changes not staged for commit:</span><br/>
                <span class="term-out-dim">  (use "git add &lt;file&gt;..." to update what will be committed)</span><br/>
                <span class="term-out-dim">  (use "git restore &lt;file&gt;..." to discard changes in working directory)</span><br/>
                <span class="term-out-red">&nbsp;&nbsp;modified:&nbsp;&nbsp;&nbsp;pkg/life/grid.go</span><br/>
                <span class="term-out-red">&nbsp;&nbsp;modified:&nbsp;&nbsp;&nbsp;pkg/life/rules.go</span><br/>
                <span class="term-out-red">&nbsp;&nbsp;modified:&nbsp;&nbsp;&nbsp;go.mod</span><br/><br/>
                <span>Untracked files:</span><br/>
                <span class="term-out-dim">  (use "git add &lt;file&gt;..." to include in what will be committed)</span><br/>
                <span class="term-out-red">&nbsp;&nbsp;pkg/life/grid_test.go</span><br/><br/>
                <span class="term-out-dim">no changes added to commit (use "git add" and/or "git commit -a")</span>
              </div>
            `:`
              <div class="terminal-output">
                <span>On branch <span class="term-out-cyan">feat/conway-toroidal-grid</span></span><br/>
                <span class="term-out-green">nothing to commit, working tree clean</span>
              </div>
            `}else if(c===`diff`)i=`
            <div class="terminal-output">
              <span class="term-out-bold">diff --git a/pkg/life/grid.go b/pkg/life/grid.go</span><br/>
              <span class="term-out-bold">--- a/pkg/life/grid.go</span><br/>
              <span class="term-out-bold">+++ b/pkg/life/grid.go</span><br/>
              <span class="term-out-cyan">@@ -28,1 +28,3 @@ func (g *Grid) CountNeighbors(x, y int) int</span><br/>
              <span class="term-out-red">-&nbsp;&nbsp;&nbsp;&nbsp;nx, ny := (x+dx)%g.width, (y+dy)%g.height</span><br/>
              <span class="term-out-green">+&nbsp;&nbsp;&nbsp;&nbsp;// Toroidal coordinate wrap across boundaries</span><br/>
              <span class="term-out-green">+&nbsp;&nbsp;&nbsp;&nbsp;nx := (x + dx + g.width) % g.width</span><br/>
              <span class="term-out-green">+&nbsp;&nbsp;&nbsp;&nbsp;ny := (y + dy + g.height) % g.height</span>
            </div>
          `;else if(c===`add`)i=`
            <div class="terminal-output">
              <span class="term-out-dim">Changes staged for commit. Run 'git commit -m "..."' to commit.</span>
            </div>
          `;else if(c===`commit`){let e=a.uncommitted;if(!e.files||e.files.length===0)i=`
              <div class="terminal-output">
                <span>On branch <span class="term-out-cyan">feat/conway-toroidal-grid</span></span><br/>
                <span class="term-out-dim">nothing to commit, working tree clean</span>
              </div>
            `;else{z();let e=r.match(/-m\s+["'](.+?)["']/);i=`
              <div class="terminal-output">
                <span>[<span class="term-out-cyan">feat/conway-toroidal-grid</span> <span class="term-out-yellow">534db51</span>] ${K(e?e[1]:`feat(life): implement toroidal grid step and neighbor counting in Go`)}</span><br/>
                <span class="term-out-dim"> 4 files changed, 35 insertions(+), 3 deletions(-)</span><br/>
                <span class="term-out-dim"> create mode 100644 pkg/life/grid_test.go</span>
              </div>
            `}}else i=c===`branch`?`
            <div class="terminal-output">
              <span class="term-out-green">* feat/conway-toroidal-grid</span><br/>
              <span>  main</span>
            </div>
          `:c===`log`?`
            <div class="terminal-output">
              <span class="term-out-yellow">commit 534db51b2c48</span> (<span class="term-out-cyan">HEAD -&gt; feat/conway-toroidal-grid</span>)<br/>
              <span class="term-out-dim">Author: Antigravity Developer &lt;developer@google.com&gt;</span><br/>
              <span class="term-out-dim">Date:   Wed Aug 12 14:34:00 2026 -0700</span><br/><br/>
              <span>    feat(life): implement toroidal grid step and neighbor counting in Go</span><br/><br/>
              <span class="term-out-yellow">commit a8f019b3e712</span> (<span class="term-out-dim">origin/main, main</span>)<br/>
              <span class="term-out-dim">Author: Antigravity Developer &lt;developer@google.com&gt;</span><br/>
              <span class="term-out-dim">Date:   Wed Aug 12 10:15:00 2026 -0700</span><br/><br/>
              <span>    init: bootstrap conway-life Go cellular automaton module</span>
            </div>
          `:`
            <div class="terminal-output term-out-red">
              git: '${K(c)}' is not a valid demo command. Try 'git status', 'git diff', 'git commit', or 'help'.
            </div>
          `}else i=s===`go`&&(c===`test`||c===`run`)?`
          <div class="terminal-output">
            <span>=== RUN   TestBlinkerOscillator</span><br/>
            <span class="term-out-green">--- PASS: TestBlinkerOscillator (0.00s)</span><br/>
            <span class="term-out-green">PASS</span><br/>
            <span class="term-out-dim">ok      github.com/example/conway/pkg/life    0.012s</span>
          </div>
        `:s===`ls`?`
          <div class="terminal-output">
            <span class="term-out-cyan">pkg</span>   go.mod   go.sum   README.md
          </div>
        `:s===`pwd`?`
          <div class="terminal-output">
            /Users/developer/projects/game-of-life
          </div>
        `:`
          <div class="terminal-output term-out-red">
            zsh: command not found: ${K(r)}. Type 'help' for available commands.
          </div>
        `;t.historyHtml+=`
        <div class="terminal-history-item">
          <div class="terminal-prompt-info">
            <span class="term-path">~/projects/game-of-life</span>
            <span class="term-dots">.....</span>
            <span class="term-runtime">system node</span>
            <span class="term-time-sep">|</span>
            <span class="term-clock">${t.time}</span>
          </div>
          <div class="terminal-input-row">
            <span class="term-chevron">&gt;</span>
            <span>${K(r)}</span>
          </div>
          ${i}
        </div>
      `,t.time=h(),y(),setTimeout(()=>{let n=e.querySelector(`.terminal-pane-block[data-session-id="${t.id}"]`);if(n){let e=n.querySelector(`.terminal-cli-input`);e&&e.focus()}let r=j(`.terminal-viewport`);r&&(r.scrollTop=r.scrollHeight)},50)}let x=e.dataset.initialMode||`agent_edits`,S=`grid-go`,C=typeof window<`u`?window.innerWidth>768:!0,w=!1,T=!1,E=!1,D=``,O={case:!1,word:!1,regex:!1},k=[],A=-1,j=t=>e.querySelector(t),M=t=>e.querySelectorAll(t);function N(){return a[x]||a.agent_edits}function P(){let e=N(),t=e.files.length,n=j(`.sidebar-title`),r=j(`.sidebar-file-count`);n&&(n.textContent=t===0?`No file changes`:e.title),r&&(r.textContent=t===0?``:`${t} file${t===1?``:`s`}`);let i=j(`.file-list-container`);if(!i)return;if(t===0){i.innerHTML=`
          <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;padding:48px 0;text-align:center;color:#64748b;">
            <svg style="width:32px;height:32px;color:#94a3b8;margin-bottom:8px;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div style="font-size:12px;font-weight:500;color:#1e293b;">No file changes</div>
            <div style="font-size:11px;color:#64748b;margin-top:4px;">Working tree is clean</div>
            <button type="button" data-action="reset-demo" style="margin-top:16px;font-size:11px;color:#9333ea;background:none;border:none;cursor:pointer;text-decoration:underline;">Reset Demo</button>
          </div>
        `;let e=i.querySelector(`[data-action="reset-demo"]`);e&&e.addEventListener(`click`,B);return}let a=``;e.files.forEach(e=>{let t=e.id===S?`selected`:``,n=``;n=e.iconType===`go`?`<span class="badge-icon-go">GO</span>`:e.iconType===`mod`?`<span class="badge-icon-mod">MOD</span>`:e.iconType===`mdx`?`<span class="badge-icon-mx">MX</span>`:e.iconType===`plus`?`<span class="badge-icon-plus">M+</span>`:`<span class="badge-icon-go">GO</span>`,a+=`
          <div data-file-id="${e.id}" class="file-item-row ${t}">
            <div class="file-item-left">
              ${n}
              <span class="file-item-name">${e.shortPath||e.name}</span>
            </div>
            <span class="file-status-letter ${e.statusColor}">${e.statusLetter}</span>
          </div>
        `}),i.innerHTML=a,i.querySelectorAll(`.file-item-row`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.getAttribute(`data-file-id`);t&&oe(t)})})}function oe(t){if(S=t,P(),F(),typeof window<`u`&&window.innerWidth<=768){C=!1;let e=j(`.vcs-sidebar`);e&&e.classList.add(`collapsed`);let t=j(`[data-action="toggle-sidebar"]`);t&&t.classList.remove(`active`)}let n=j(`.code-viewer-container`),r=e.querySelector(`[data-block-file-id="${t}"]`);if(n&&r){let e=n.getBoundingClientRect(),t=r.getBoundingClientRect().top-e.top+n.scrollTop;n.scrollTo({top:t,behavior:`smooth`})}D&&w&&U(D)}function F(){let e=N(),t=j(`.code-viewer-container`);if(!t)return;if(e.files.length===0){t.innerHTML=`
          <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;color:#64748b;padding:64px 0;">
            <svg style="width:40px;height:40px;color:#94a3b8;margin-bottom:12px;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 13l4 4L19 7"/>
            </svg>
            <div style="font-size:14px;font-weight:500;color:#1e293b;">All changes committed</div>
            <div style="font-size:12px;color:#64748b;margin-top:4px;">There are no uncommitted changes in your workspace.</div>
            <button type="button" data-action="reset-demo" style="margin-top:16px;padding:6px 14px;border-radius:6px;background-color:#ffffff;border:1px solid #d1d5db;font-size:12px;color:#9333ea;cursor:pointer;font-weight:500;">Restore Mock Diff</button>
          </div>
        `;let e=t.querySelector(`[data-action="reset-demo"]`);e&&e.addEventListener(`click`,B);return}let n=``;e.files.forEach(e=>{let t=``;t=e.iconType===`go`?`<span class="badge-icon-go">GO</span>`:e.iconType===`mod`?`<span class="badge-icon-mod">MOD</span>`:e.iconType===`mdx`?`<span class="badge-icon-mx">MX</span>`:e.iconType===`plus`?`<span class="badge-icon-plus">M+</span>`:`<span class="badge-icon-go">GO</span>`;let r=c.has(e.id);n+=`
          <div class="file-diff-block ${r?`file-is-collapsed`:``}" data-block-file-id="${e.id}">
            <!-- Header for each file -->
            <div class="file-header-container">
              <div class="file-header-left">
                <span class="active-file-icon">${t}</span>
                <span class="current-review-file-name">${e.name}</span>
                <span class="current-review-file-path">${e.path}</span>
              </div>
              <div class="file-stats-container">
                <span class="current-additions text-green">${e.additions}</span>
                <span class="current-deletions text-red">${e.deletions}</span>
                <button type="button" class="fold-dropdown-btn" data-action="toggle-file-collapse" data-file-id="${e.id}" title="${r?`Expand file diff`:`Hide file diff`}">
                  ${r?`<svg class="dropdown-chevron-svg" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>`:`<svg class="dropdown-chevron-svg" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>`}
                </button>
              </div>
            </div>

            <!-- Lines / Diff View -->
            <div class="file-lines-wrapper" ${r?`style="display: none;"`:``}>
              ${le(e)}
            </div>
          </div>
        `}),t.innerHTML=n,ue(),se(),ce()}function se(){let e=j(`.code-viewer-container`);e&&e.querySelectorAll(`.fold-dropdown-btn[data-action="toggle-file-collapse"]`).forEach(e=>{e.addEventListener(`click`,t=>{t.stopPropagation();let n=e.getAttribute(`data-file-id`);n&&(c.has(n)?c.delete(n):c.add(n),F())})})}function ce(){let e=j(`.code-viewer-container`);e&&e.querySelectorAll(`[data-action="toggle-fold"]`).forEach(e=>{e.addEventListener(`click`,t=>{t.stopPropagation();let n=e.getAttribute(`data-fold-id`);n&&(l.has(n)?l.delete(n):l.add(n),F())})})}function le(e){if(T){let t=``,n=``;return e.diffLines.forEach((r,i)=>{if(r.isFold){let a=r.foldId||`${e.id}-fold-${i}`;if((l.has(a)||E)&&r.lines&&r.lines.length>0)r.lines.forEach((r,a)=>{let o=`
                  <div class="code-line" data-file-id="${e.id}" data-line-idx="${i}_${a}">
                    <span class="diff-line-num" style="width:24px;text-align:right;padding-right:8px;font-size:11px;">${r.oldNum||``}</span>
                    <span style="flex:1;white-space:pre-wrap;color:var(--text-main);">${K(r.oldText||r.text||``)}</span>
                  </div>
                `;t+=o,n+=o});else{let e=`
                <div class="fold-bar-wrapper">
                  <button type="button" class="fold-bar" data-action="toggle-fold" data-fold-id="${a}" title="Click to show hidden lines">
                    <span>${r.foldText}</span>
                    ${r.rightBadge?`<span class="fold-badge">${r.rightBadge}</span>`:``}
                  </button>
                </div>
              `;t+=e,n+=e}}else r.type===`delete`?(t+=`
              <div class="code-line delete-line" data-file-id="${e.id}" data-line-idx="${i}">
                <span class="diff-line-num" style="width:24px;text-align:right;padding-right:8px;font-size:11px;color:#dc2626;">${r.oldNum||``}</span>
                <span style="flex:1;white-space:pre-wrap;font-weight:500;">${K(r.oldText||r.text)}</span>
              </div>
            `,n+=`
              <div class="code-line" style="background-color:#fafafa;opacity:0.4;user-select:none;">
                <span class="diff-line-num" style="width:24px;text-align:right;padding-right:8px;font-size:11px;"></span>
                <span style="flex:1;white-space:pre-wrap;">&nbsp;</span>
              </div>
            `):r.type===`insert`?(t+=`
              <div class="code-line" style="background-color:#fafafa;opacity:0.4;user-select:none;">
                <span class="diff-line-num" style="width:24px;text-align:right;padding-right:8px;font-size:11px;"></span>
                <span style="flex:1;white-space:pre-wrap;">&nbsp;</span>
              </div>
            `,n+=`
              <div class="code-line insert-line" data-file-id="${e.id}" data-line-idx="${i}">
                <span class="diff-line-num" style="width:24px;text-align:right;padding-right:8px;font-size:11px;color:#16a34a;">${r.newNum||``}</span>
                <span style="flex:1;white-space:pre-wrap;font-weight:500;">${K(r.newText||r.text)}</span>
              </div>
            `):(t+=`
              <div class="code-line" data-file-id="${e.id}" data-line-idx="${i}">
                <span class="diff-line-num" style="width:24px;text-align:right;padding-right:8px;font-size:11px;">${r.oldNum||``}</span>
                <span style="flex:1;white-space:pre-wrap;color:var(--text-main);">${K(r.oldText||r.text)}</span>
              </div>
            `,n+=`
              <div class="code-line" data-file-id="${e.id}" data-line-idx="${i}">
                <span class="diff-line-num" style="width:24px;text-align:right;padding-right:8px;font-size:11px;">${r.newNum||``}</span>
                <span style="flex:1;white-space:pre-wrap;color:var(--text-main);">${K(r.newText||r.text)}</span>
              </div>
            `)}),`
          <div class="split-diff-grid">
            <div class="split-pane left-pane">
              <div class="split-pane-header">
                <span>BASE (ORIGINAL)</span>
                <span class="text-red">${e.deletions||`-0`} delete</span>
              </div>
              ${t}
            </div>
            <div class="split-pane">
              <div class="split-pane-header">
                <span>MODIFIED (WORKING TREE)</span>
                <span class="text-green">${e.additions||`+0`} insert</span>
              </div>
              ${n}
            </div>
          </div>
        `}let t=`<div style="display:flex;flex-direction:column;gap:0;">`;return e.diffLines.forEach((n,r)=>{let i=`${e.id}-${r}`;if(n.isFold){let i=n.foldId||`${e.id}-fold-${r}`;(l.has(i)||E)&&n.lines&&n.lines.length>0?n.lines.forEach((n,a)=>{let c=`${e.id}-sub-${i}-${a}`,l=n.newText===void 0?n.oldText===void 0?n.text||``:n.oldText:n.newText;t+=`
                <div class="code-line" data-file-id="${e.id}" data-line-idx="${r}_${a}">
                  <span class="diff-line-num" style="width:20px;text-align:right;padding-right:6px;font-size:11px;color:#94a3b8;">${n.oldNum||``}</span>
                  <span class="diff-line-num" style="width:20px;text-align:right;padding-right:12px;font-size:11px;color:#94a3b8;">${n.newNum||``}</span>
                  
                  <!-- Floating + Button on Line Hover -->
                  <button type="button" class="inline-comment-btn" data-line-key="${c}" title="Add inline comment">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 5v14M5 12h14"/></svg>
                    <span class="inline-comment-tooltip">Add inline comment</span>
                  </button>

                  <span style="flex:1;white-space:pre-wrap;font-weight:400;color:var(--text-main);">${K(l)}</span>
                </div>
              `;let u=o[c]||[],d=s.has(c);(u.length>0||d)&&(t+=`<div class="inline-comment-thread-container">`,u.forEach(e=>{t+=`
                    <div class="inline-comment-card" data-comment-id="${e.id}">
                      <div class="comment-body">${K(e.text)}</div>
                      <div class="comment-footer">
                        <button type="button" class="btn-delete-comment" data-action="delete-comment" data-line-key="${c}" data-comment-id="${e.id}">Delete</button>
                        <button type="button" class="btn-edit-comment" data-action="edit-comment" data-line-key="${c}" data-comment-id="${e.id}">Edit Comment</button>
                      </div>
                    </div>
                  `}),d&&(t+=`
                    <div class="inline-comment-composer" data-line-key="${c}">
                      <textarea class="comment-textarea" placeholder="Leave a comment" rows="2"></textarea>
                      <div class="comment-actions">
                        <button type="button" class="btn-cancel-comment" data-action="cancel-draft" data-line-key="${c}">Cancel</button>
                        <div class="comment-right-actions">
                          <button type="button" class="btn-submit-comment" data-action="submit-comment" data-line-key="${c}">Add Comment</button>
                        </div>
                      </div>
                    </div>
                  `),t+=`</div>`)}):t+=`
              <div class="fold-bar-wrapper">
                <button type="button" class="fold-bar" data-action="toggle-fold" data-fold-id="${i}" title="Click to show hidden lines">
                  <span>${n.foldText}</span>
                  ${n.rightBadge?`<span class="fold-badge">${n.rightBadge}</span>`:``}
                </button>
              </div>
            `;return}let a=`code-line`,c=`#94a3b8`,u=`#94a3b8`;n.type===`delete`?(a+=` delete-line`,c=`#dc2626`):n.type===`insert`&&(a+=` insert-line`,u=`#16a34a`);let d=n.newText===void 0?n.oldText===void 0?n.text||``:n.oldText:n.newText;t+=`
          <div class="${a}" data-file-id="${e.id}" data-line-idx="${r}">
            <span class="diff-line-num" style="width:20px;text-align:right;padding-right:6px;font-size:11px;color:${c};">${n.oldNum||``}</span>
            <span class="diff-line-num" style="width:20px;text-align:right;padding-right:12px;font-size:11px;color:${u};">${n.newNum||``}</span>
            
            <!-- Floating + Button on Line Hover -->
            <button type="button" class="inline-comment-btn" data-line-key="${i}" title="Add inline comment">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 5v14M5 12h14"/></svg>
              <span class="inline-comment-tooltip">Add inline comment</span>
            </button>

            <span style="flex:1;white-space:pre-wrap;font-weight:${n.type===`context`?`400`:`500`};">${K(d)}</span>
          </div>
        `;let f=o[i]||[],p=s.has(i);(f.length>0||p)&&(t+=`<div class="inline-comment-thread-container">`,f.forEach(e=>{t+=`
              <div class="inline-comment-card" data-comment-id="${e.id}">
                <div class="comment-body">${K(e.text)}</div>
                <div class="comment-footer">
                  <button type="button" class="btn-delete-comment" data-action="delete-comment" data-line-key="${i}" data-comment-id="${e.id}">Delete</button>
                  <button type="button" class="btn-edit-comment" data-action="edit-comment" data-line-key="${i}" data-comment-id="${e.id}">Edit Comment</button>
                </div>
              </div>
            `}),p&&(t+=`
              <div class="inline-comment-composer" data-line-key="${i}">
                <textarea class="comment-textarea" placeholder="Leave a comment" rows="2"></textarea>
                <div class="comment-actions">
                  <button type="button" class="btn-cancel-comment" data-action="cancel-draft" data-line-key="${i}">Cancel</button>
                  <div class="comment-right-actions">
                    <button type="button" class="btn-submit-comment" data-action="submit-comment" data-line-key="${i}">Add Comment</button>
                  </div>
                </div>
              </div>
            `),t+=`</div>`)}),t+=`</div>`,t}function ue(){e.querySelectorAll(`.inline-comment-btn`).forEach(t=>{t.addEventListener(`click`,n=>{n.stopPropagation();let r=t.getAttribute(`data-line-key`);if(!r)return;s.add(r),F();let i=e.querySelector(`.inline-comment-composer[data-line-key="${r}"]`);if(i){let e=i.querySelector(`.comment-textarea`);e&&e.focus()}})}),e.querySelectorAll(`[data-action="cancel-draft"]`).forEach(e=>{e.addEventListener(`click`,t=>{t.stopPropagation();let n=e.getAttribute(`data-line-key`);n&&(s.delete(n),F())})}),e.querySelectorAll(`[data-action="submit-comment"]`).forEach(t=>{t.addEventListener(`click`,n=>{n.stopPropagation();let r=t.getAttribute(`data-line-key`);if(!r)return;let i=e.querySelector(`.inline-comment-composer[data-line-key="${r}"]`);if(!i)return;let a=i.querySelector(`.comment-textarea`),c=a?a.value.trim():``;c&&(o[r]||(o[r]=[]),o[r].push({id:`c-`+Math.random().toString(36).substring(2,7),text:c}),s.delete(r),F())})}),e.querySelectorAll(`[data-action="delete-comment"]`).forEach(e=>{e.addEventListener(`click`,t=>{t.stopPropagation();let n=e.getAttribute(`data-line-key`),r=e.getAttribute(`data-comment-id`);n&&r&&o[n]&&(o[n]=o[n].filter(e=>e.id!==r),o[n].length===0&&delete o[n],F())})}),e.querySelectorAll(`[data-action="edit-comment"]`).forEach(t=>{t.addEventListener(`click`,n=>{n.stopPropagation();let r=t.getAttribute(`data-line-key`),i=t.getAttribute(`data-comment-id`);if(r&&i&&o[r]){let t=o[r].find(e=>e.id===i);if(t){o[r]=o[r].filter(e=>e.id!==i),o[r].length===0&&delete o[r],s.add(r),F();let n=e.querySelector(`.inline-comment-composer[data-line-key="${r}"]`);if(n){let e=n.querySelector(`.comment-textarea`);e&&(e.value=t.text,e.focus())}}}})})}function de(){let e=j(`.review-dropdown-menu`);e&&e.classList.toggle(`hidden`)}function I(e){x=e;let t=j(`.selected-prefix`),n=j(`.selected-branch-name`),r=j(`.check-branch`),i=j(`.check-uncommitted`),a=j(`.check-agent`),o=j(`.btn-opt-branch`),s=j(`.btn-opt-uncommitted`),c=j(`.btn-opt-agent`);r&&r.classList.add(`hidden`),i&&i.classList.add(`hidden`),a&&a.classList.add(`hidden`),o&&o.classList.remove(`selected`),s&&s.classList.remove(`selected`),c&&c.classList.remove(`selected`);let l=j(`.commit-btn-wrapper`);l&&l.classList.remove(`hidden`),e===`uncommitted`?(t&&(t.textContent=``),n&&(n.textContent=`Uncommitted`),i&&i.classList.remove(`hidden`),s&&s.classList.add(`selected`),S=`grid-go`):e===`branch`?(t&&(t.textContent=`Branch`),n&&(n.textContent=`feat/conway-toroidal-grid`),r&&r.classList.remove(`hidden`),o&&o.classList.add(`selected`),S=`grid-go`):e===`agent_edits`&&(t&&(t.textContent=``),n&&(n.textContent=`Agent Edits`),a&&a.classList.remove(`hidden`),c&&c.classList.add(`selected`),S=`grid-go`),P(),F();let u=j(`.review-dropdown-menu`);u&&u.classList.add(`hidden`)}function fe(){let e=N().files.length,t=j(`.modal-subtitle-prefix`);t&&(t.textContent=`Commit ${e} file change${e===1?``:`s`} to`);let n=j(`.commit-modal-backdrop`);n&&n.classList.remove(`hidden`);let r=j(`.commit-message-input`);r&&(r.value=``,r.focus())}function L(){let e=j(`.commit-modal-backdrop`);e&&e.classList.add(`hidden`)}function pe(){let e=j(`.commit-dropdown-menu`),t=j(`.commit-tooltip`);e&&(e.classList.toggle(`hidden`),!e.classList.contains(`hidden`)&&t?t.classList.add(`suppressed`):t&&t.classList.remove(`suppressed`))}function R(){let e=j(`.commit-dropdown-menu`);e&&e.classList.add(`hidden`);let t=j(`.commit-tooltip`);t&&t.classList.remove(`suppressed`)}function me(){R();let e=j(`.commit-toast`),t=j(`.toast-message`);t&&(t.textContent=`Pushed commits to origin/feat/conway-toroidal-grid`),e&&(e.classList.remove(`hidden`),setTimeout(()=>{e.classList.add(`hidden`)},3500))}function he(){R(),z();let e=j(`.toast-message`);e&&(e.textContent=`Committed and pushed changes to origin`)}function ge(){R();let e=j(`.commit-toast`),t=j(`.toast-message`);t&&(t.textContent=`Synchronized branch with origin`),e&&(e.classList.remove(`hidden`),setTimeout(()=>{e.classList.add(`hidden`)},3500))}function z(){L(),a.uncommitted.files=[];let e=a.branch.files.find(e=>e.id===`grid-go`);e&&(e.statusLetter=`U`,e.statusColor=`status-green`),P(),F();let t=j(`.commit-toast`),n=j(`.toast-message`);n&&(n.textContent=`Staged and committed changes to branch`),t&&(t.classList.remove(`hidden`),setTimeout(()=>{t.classList.add(`hidden`)},3500))}function B(){a.uncommitted.files=[t()],a.agent_edits.files=[t(),n()];let e=a.branch.files.findIndex(e=>e.id===`grid-go`);e>=0?a.branch.files[e]=t():a.branch.files.unshift(t()),S=`grid-go`,P(),F()}function _e(){if(f===`terminal`){_();return}C=!C;let e=j(`.vcs-sidebar`);M(`[data-action="toggle-sidebar"]`).forEach(e=>{e.classList.toggle(`active`,C)}),e&&e.classList.toggle(`collapsed`,!C)}function V(){w=!w;let e=j(`.find-search-bar`),t=j(`.search-toggle-btn`);if(w){e&&e.classList.remove(`hidden`),t&&t.classList.add(`active`);let n=j(`.find-input`);setTimeout(()=>{n&&(n.focus(),n.select())},80)}else{e&&e.classList.add(`hidden`),t&&t.classList.remove(`active`),D=``;let n=j(`.find-input`);n&&(n.value=``);let r=j(`.search-results-count`);r&&(r.textContent=`No Results`),F()}}function H(e){O[e]=!O[e];let t=j(`.opt-`+e);t&&(O[e]?t.classList.add(`active`):t.classList.remove(`active`));let n=j(`.find-input`);n&&U(n.value)}function U(e){D=e,F();let t=j(`.search-results-count`);if(!e.trim()){t&&(t.textContent=`No Results`),k=[],A=-1;return}k=[];let n=j(`.code-viewer-container`);n&&(n.querySelectorAll(`.code-line`).forEach((t,n)=>{let r=t.textContent||``,i=O.case?`g`:`gi`,a=O.regex?e:xe(e);O.word&&(a=`\\b${a}\\b`);try{new RegExp(a,i).test(r)&&k.push(n)}catch{}}),k.length>0?(A=0,t&&(t.textContent=`${A+1} of ${k.length}`),W()):(A=-1,t&&(t.textContent=`No Results`)))}function W(){let e=j(`.code-viewer-container`);if(!e)return;let t=e.querySelectorAll(`.code-line`);k.forEach((n,r)=>{let i=t[n];if(i){if(r===A){i.style.backgroundColor=`rgba(234, 179, 8, 0.25)`,i.style.outline=`1px solid #eab308`;let t=e.getBoundingClientRect(),n=i.getBoundingClientRect();if(n.top<t.top||n.bottom>t.bottom){let r=n.top-t.top+e.scrollTop-40;e.scrollTo({top:r,behavior:`smooth`})}}else i.style.backgroundColor=`rgba(245, 158, 11, 0.1)`}})}function G(e){if(k.length===0)return;A+=e,A>=k.length&&(A=0),A<0&&(A=k.length-1);let t=j(`.search-results-count`);t&&(t.textContent=`${A+1} of ${k.length}`),W()}function ve(){T=!T;let e=j(`.split-diff-menu-label`);e&&(e.textContent=T?`View Unified Diff`:`View Split Diff`);let t=j(`.more-context-menu`);t&&t.classList.add(`hidden`),F()}function ye(){E=!E,E?l.add(`grid-fold-1`):l.clear();let e=j(`.collapse-menu-label`);e&&(e.textContent=E?`Collapse All`:`Expand All`);let t=j(`.commit-toast`),n=j(`.toast-message`);n&&(n.textContent=E?`Expanded all diff sections`:`Collapsed all diff sections`),t&&(t.classList.remove(`hidden`),setTimeout(()=>{t.classList.add(`hidden`)},2e3)),F();let r=j(`.more-context-menu`);r&&r.classList.add(`hidden`)}function be(){let e=j(`.more-context-menu`);e&&e.classList.toggle(`hidden`)}function K(e){return e?e.replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`).replace(/'/g,`&#039;`):``}function xe(e){return e.replace(/[.*+?^${}()|[\]\\]/g,`\\$&`)}let q=j(`[data-action="toggle-dropdown"]`);q&&q.addEventListener(`click`,de);let J=j(`[data-action="tab-vcs"]`);J&&J.addEventListener(`click`,()=>g(`vcs`));let Y=j(`[data-action="tab-terminal"]`);Y&&Y.addEventListener(`click`,()=>g(`terminal`));let X=j(`[data-action="toggle-terminal-dropdown"]`);X&&X.addEventListener(`click`,ee),M(`[data-terminal-filter]`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.getAttribute(`data-terminal-filter`);t&&v(t)})});let Se=j(`[data-action="terminal-add"]`);Se&&Se.addEventListener(`click`,()=>{re()}),M(`[data-mode]`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.getAttribute(`data-mode`);t&&I(t)})}),M(`[data-action="toggle-sidebar"]`).forEach(e=>{e.addEventListener(`click`,_e)}),M(`[data-action="toggle-terminal-sidebar"]`).forEach(e=>{e.addEventListener(`click`,_)});let Ce=j(`[data-action="toggle-find"]`);Ce&&Ce.addEventListener(`click`,V);let we=j(`[data-action="prev-match"]`);we&&we.addEventListener(`click`,()=>G(-1));let Te=j(`[data-action="next-match"]`);Te&&Te.addEventListener(`click`,()=>G(1));let Ee=j(`[data-opt="case"]`);Ee&&Ee.addEventListener(`click`,()=>H(`case`));let De=j(`[data-opt="word"]`);De&&De.addEventListener(`click`,()=>H(`word`));let Oe=j(`[data-opt="regex"]`);Oe&&Oe.addEventListener(`click`,()=>H(`regex`));let Z=j(`.find-input`);Z&&(Z.addEventListener(`input`,e=>{U(e.target.value)}),Z.addEventListener(`keydown`,e=>{e.key===`Enter`?(e.preventDefault(),G(e.shiftKey?-1:1)):e.key===`Escape`&&V()}));let Q=j(`[data-action="open-commit"]`);Q&&Q.addEventListener(`click`,fe);let ke=j(`[data-action="toggle-commit-dropdown"]`);ke&&ke.addEventListener(`click`,pe);let Ae=j(`[data-action="commit-action-push"]`);Ae&&Ae.addEventListener(`click`,me);let je=j(`[data-action="commit-action-commit-push"]`);je&&je.addEventListener(`click`,he);let Me=j(`[data-action="commit-action-sync"]`);Me&&Me.addEventListener(`click`,ge),M(`[data-action="close-commit"]`).forEach(e=>{e.addEventListener(`click`,L)});let Ne=j(`[data-action="perform-commit"]`);Ne&&Ne.addEventListener(`click`,z);let Pe=j(`[data-action="toggle-more-menu"]`);Pe&&Pe.addEventListener(`click`,be);let Fe=j(`[data-action="toggle-diff-layout"]`);Fe&&Fe.addEventListener(`click`,ve);let $=j(`[data-action="toggle-collapse-all"]`);if($&&$.addEventListener(`click`,ye),document.addEventListener(`keydown`,t=>{if(!(!e.matches(`:hover`)&&!e.contains(document.activeElement))){if((t.ctrlKey||t.metaKey)&&t.key.toLowerCase()===`f`)t.preventDefault(),V();else if(t.key===`Escape`){L(),R();let e=j(`.review-dropdown-menu`);e&&!e.classList.contains(`hidden`)&&e.classList.add(`hidden`);let t=j(`.terminal-dropdown-menu`);t&&!t.classList.contains(`hidden`)&&t.classList.add(`hidden`);let n=j(`.more-context-menu`);n&&!n.classList.contains(`hidden`)&&n.classList.add(`hidden`)}else if(t.key===`Enter`&&(t.ctrlKey||t.metaKey)){let e=j(`.commit-modal-backdrop`);e&&!e.classList.contains(`hidden`)&&z()}}}),document.addEventListener(`click`,t=>{let n=t.target;if(e.contains(n)){if(!n.closest(`[data-action="toggle-dropdown"]`)&&!n.closest(`.review-dropdown-menu`)){let e=j(`.review-dropdown-menu`);e&&!e.classList.contains(`hidden`)&&e.classList.add(`hidden`)}if(!n.closest(`[data-action="toggle-commit-dropdown"]`)&&!n.closest(`.commit-dropdown-menu`)){let e=j(`.commit-dropdown-menu`);e&&!e.classList.contains(`hidden`)&&e.classList.add(`hidden`)}if(!n.closest(`[data-action="toggle-terminal-dropdown"]`)&&!n.closest(`.terminal-dropdown-menu`)){let e=j(`.terminal-dropdown-menu`);e&&!e.classList.contains(`hidden`)&&e.classList.add(`hidden`)}if(!n.closest(`[data-action="toggle-more-menu"]`)&&!n.closest(`.more-context-menu`)){let e=j(`.more-context-menu`);e&&!e.classList.contains(`hidden`)&&e.classList.add(`hidden`)}}}),I(x),y(),b(),typeof window<`u`&&window.innerWidth<=768){let e=j(`.vcs-sidebar`);e&&e.classList.add(`collapsed`);let t=j(`.terminal-sessions-sidebar`);t&&t.classList.add(`collapsed`);let n=j(`[data-action="toggle-sidebar"]`);n&&n.classList.remove(`active`);let r=j(`[data-action="toggle-terminal-sidebar"]`);r&&r.classList.remove(`active`)}}document.addEventListener(`DOMContentLoaded`,()=>{document.querySelectorAll(`.agy-vcs-widget`).forEach(t=>{e(t)})}),document.addEventListener(`astro:page-load`,()=>{document.querySelectorAll(`.agy-vcs-widget`).forEach(t=>{e(t)})});