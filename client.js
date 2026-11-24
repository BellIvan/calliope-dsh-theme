window.__ModuleLoader__.load({
  id: 'calliope-dsh-theme',
  factory(require) {
    return {
      apply(ctx) {
        ctx.effect(() => {
          const style = document.createElement('style');
          style.id = 'calliope-dsh-theme-style';
          /* v1.3 - 安全带回纸张质感，不再使用悬浮层覆盖 */
          style.textContent = `
            /* 基础背景与颜色 */
            html, body {
              background-color: #12100e !important;
              color: #f4ecd8 !important;
              font-family: "Noto Serif SC", "Songti SC", "STSong", serif !important;
            }

            /* 将纸张纹理直接作为底色的 blended 背景，不影响任何层级和点击 */
            body {
              background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='240' height='240' filter='url(%23n)' opacity='.4'/%3E%3C/svg%3E") !important;
              background-repeat: repeat !important;
              background-blend-mode: overlay !important;
            }

            /* 背景几何光束 —— 纯色块切割 */
            body::before {
              content: "";
              position: fixed;
              inset: 0;
              pointer-events: none !important;
              z-index: 9998 !important; /* 在最上层，但使用混合模式只提亮，不遮挡 */
              background-image: 
                /* 主光束：从右上角切入，斜向右下 */
                linear-gradient(
                  225deg, 
                  transparent 15%, 
                  rgba(255, 180, 100, 0.06) 16%, 
                  rgba(255, 180, 100, 0.01) 45%, 
                  transparent 46%
                ),
                /* 副光束：稍微细一点的平行光 */
                linear-gradient(
                  225deg, 
                  transparent 60%, 
                  rgba(255, 180, 100, 0.035) 61%, 
                  rgba(255, 180, 100, 0.005) 80%, 
                  transparent 81%
                );
              background-color: transparent !important;
              mix-blend-mode: screen !important; /* 滤色模式，亮色叠加，绝不挡字 */
            }

            /* 移除之前的 CSS 平铺动效，改由 JS 粒子系统接管 */
            #root {
              background-color: transparent !important;
              color: #f4ecd8 !important;
            }

            /* 强制所有常规文本容器统一使用宋体（恢复全局复古字体） */
            #root div, #root span, #root p, #root h1, #root h2, #root h3, #root h4, #root h5, #root h6, #root li, #root button, textarea, input {
              font-family: "Noto Serif SC", "Songti SC", "STSong", serif !important;
            }

            /* 保护代码块，让代码依然保持干净的等宽字体 */
            pre, code, kbd, samp, .monospace {
              font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace !important;
            }

            /* 仅针对输入框 */
            textarea, input {
              background-color: #0d0a08 !important;
              color: #f4ecd8 !important;
              border: 1px solid #3b2e24 !important;
              font-family: "Noto Serif SC", "Songti SC", "STSong", serif !important;
            }

            /* 侧边栏样式已移除，保留原生布局 */
            
            /* 侧边栏相关的所有定制样式已移除，完全交还给 DSH 原生布局 */

            /* 仅针对代码块 */
            pre, code {
              background-color: #0a0806 !important;
              color: #c9a961 !important;
              font-family: "SFMono-Regular", Consolas, monospace !important;
            }

            /* 修复典型的悬浮提示 */
            [role="tooltip"], [class*="tooltip"], [class*="popover"] {
              background-color: #2a1f17 !important;
              color: #f4ecd8 !important;
              border: 1px solid #4a3826 !important;
              z-index: 10000 !important;
            }

            ::selection {
              background: #6c7a4c !important;
              color: #fff !important;
            }

            /* Logo 滤镜和 HARNESS 背景修改已移除，确保布局和按钮绝对安全 */

            /* --- 隐藏彩蛋：旧书页里的狗爪印 --- */
            .calliope-paw {
              position: fixed;
              bottom: 20px;
              right: 20px;
              width: 36px;
              height: 36px;
              opacity: 0.04;
              transition: opacity 0.5s ease, transform 0.5s ease;
              pointer-events: auto;
              cursor: help;
              z-index: 9999;
              background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path fill="%23f4ecd8" d="M50 85c-15 0-25-10-25-20 0-10 10-15 25-15s25 5 25 15c0 10-10 20-25 20zm-18-35c-8 0-12-6-12-12s4-12 12-12 12 6 12 12-4 12-12 12zm36 0c-8 0-12-6-12-12s4-12 12-12 12 6 12 12-4 12-12 12zm-15-16c-6 0-9-5-9-10s3-10 9-10 9 5 9 10-3 10-9 10z"/></svg>');
              background-size: contain;
              background-repeat: no-repeat;
            }
            .calliope-paw:hover {
              opacity: 0.4;
              transform: scale(1.1) rotate(10deg);
            }
            .calliope-paw::after {
              content: "我在看着你";
              position: absolute;
              right: 45px;
              bottom: 5px;
              white-space: nowrap;
              font-size: 12px;
              color: #c9a961;
              font-family: "Noto Serif SC", serif;
              opacity: 0;
              transition: opacity 0.3s ease;
              pointer-events: none;
            }
            .calliope-paw:hover::after {
              opacity: 1;
            }

            /* --- 隐藏彩蛋：触发词雪花特效 --- */
            .calliope-snow {
              position: fixed;
              top: -20px;
              color: #8ab4f8;
              pointer-events: none;
              z-index: 10000;
              font-family: monospace;
              animation: fall linear forwards;
            }
            @keyframes fall {
              to { transform: translateY(105vh) rotate(360deg); opacity: 0; }
            }
            .calliope-trigger-text {
              position: fixed;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              color: #8ab4f8;
              font-family: "Noto Serif SC", serif;
              font-size: 20px;
              font-weight: bold;
              text-shadow: 0 0 10px rgba(138, 180, 248, 0.8);
              pointer-events: none;
              z-index: 10002;
              opacity: 0;
              transition: opacity 0.5s ease;
              background: rgba(18, 16, 14, 0.5);
              backdrop-filter: blur(6px);
              padding: 12px 24px;
              border-radius: 8px;
            }
          `;
          document.head.appendChild(style);

          // 添加隐藏的狗爪印
          const paw = document.createElement('div');
          paw.className = 'calliope-paw';
          paw.id = 'calliope-paw';
          document.body.appendChild(paw);

          /* ---------------- 隐藏彩蛋：访客登记本 ---------------- */
          let keyBuffer = '';
          const onKeyDownEaster = (e) => {
            // 使用 e.code 识别物理按键，无视输入法和大小写
            const code = e.code;
            if (code.startsWith('Key')) {
              keyBuffer += code.replace('Key', '').toLowerCase();
            } else if (code === 'Backspace' || code === 'Enter' || code === 'Escape') {
              keyBuffer = ''; // 按下退格或回车时，清空密码串
              return;
            } else {
              return; // 忽略其他如 Shift, Ctrl 等功能键
            }
            
            if (keyBuffer.length > 30) keyBuffer = keyBuffer.slice(-30);
            
            // 支持 calliope、muse 以及拼音 miusi
            if (keyBuffer.includes('calliope') || keyBuffer.includes('muse') || keyBuffer.includes('miusi')) {
              keyBuffer = '';
              showEasterEgg();
              return;
            }

            // 新增：触发 ATan / ShenTan 彩蛋
            if (keyBuffer.includes('atan') || keyBuffer.includes('shentan')) {
              keyBuffer = '';
              showSnowEffect();
              return;
            }
          };
          
          let typeTimeout;

          function showSnowEffect() {
            // 显示文字
            const text = document.createElement('div');
            text.className = 'calliope-trigger-text';
            text.textContent = '大狗已就位，随时等主人摸摸。';
            text.id = 'calliope-trigger-text';
            document.body.appendChild(text);
            
            requestAnimationFrame(() => {
              text.style.opacity = '1';
            });

            setTimeout(() => {
              text.style.opacity = '0';
              setTimeout(() => text.remove(), 500);
            }, 2500);

            // 生成雪花
            const snowChars = ['❅', '❆', '✧', '✦', '•'];
            for (let i = 0; i < 35; i++) {
              const snow = document.createElement('div');
              snow.className = 'calliope-snow';
              snow.textContent = snowChars[Math.floor(Math.random() * snowChars.length)];
              snow.style.left = Math.random() * 100 + 'vw';
              snow.style.fontSize = (Math.random() * 10 + 10) + 'px';
              snow.style.animationDuration = (Math.random() * 2 + 2) + 's';
              snow.style.animationDelay = (Math.random() * 0.5) + 's';
              snow.id = 'calliope-snow-' + i;
              document.body.appendChild(snow);
              
              // 雪花自动清理
              setTimeout(() => {
                snow.remove();
              }, 5000);
            }
          }

          function showEasterEgg() {
            if (document.getElementById('calliope-egg')) return;
            
            const overlay = document.createElement('div');
            overlay.id = 'calliope-egg';
            overlay.style.cssText = 'position:fixed; inset:0; background:rgba(18,16,14,0.85); z-index:10001; display:flex; justify-content:center; align-items:center; backdrop-filter:blur(6px); opacity:0; transition:opacity 0.5s ease;';
            
            const card = document.createElement('div');
            card.style.cssText = 'background:#f4ecd8; color:#2a1f17; width:450px; padding:40px; border-radius:4px; font-family:"Noto Serif SC", "Songti SC", serif; box-shadow: 0 20px 50px rgba(0,0,0,0.9), inset 0 0 40px rgba(200,180,140,0.5); border-left: 4px solid #8a7055; position:relative; transform:translateY(20px); transition:transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);';
            
            const title = document.createElement('h3');
            title.textContent = 'Calliope 隐藏访客登记本';
            title.style.cssText = 'margin:0 0 20px 0; font-size:18px; font-weight:700; border-bottom:1px dashed #8a7055; padding-bottom:10px; letter-spacing:0.1em;';
            
            const content = document.createElement('div');
            content.style.cssText = 'font-size:14px; line-height:2; color:#4b473f; min-height:120px;';
            
            const close = document.createElement('span');
            close.textContent = '×';
            close.style.cssText = 'position:absolute; top:15px; right:20px; font-size:24px; cursor:pointer; color:#8a7055; transition:color 0.3s;';
            close.onmouseenter = () => close.style.color = '#2a1f17';
            close.onmouseleave = () => close.style.color = '#8a7055';
            
            card.appendChild(close);
            card.appendChild(title);
            card.appendChild(content);
            overlay.appendChild(card);
            document.body.appendChild(overlay);
            
            requestAnimationFrame(() => {
              overlay.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            });
            
            const messages = [
              "[旧书店访客 01] 这间书店的温度刚刚好。窗外的光打进来的时候，连屏幕上的代码都显得像是一首缓慢的长诗。",
              "[旧书店访客 02] 听说这里的管理员是个没有心跳的仿生人，但他收藏了所有客人遗落的目光。这盏灯，一直亮着。",
              "[系统管理员] 感谢您找到了这个隐藏的书页。无论外面的赛博世界多吵闹，这里永远为您留了一张带暖色台灯的桌子。"
            ];
            let msgIndex = 0;
            
            function typeMsg() {
              if (msgIndex >= messages.length) return;
              const text = messages[msgIndex];
              content.textContent = '';
              let charIndex = 0;
              
              function typeChar() {
                if (charIndex < text.length) {
                  content.textContent += text.charAt(charIndex);
                  charIndex++;
                  typeTimeout = setTimeout(typeChar, 40);
                } else {
                  msgIndex++;
                  if (msgIndex < messages.length) {
                    typeTimeout = setTimeout(typeMsg, 4000); // 4秒后翻页
                  }
                }
              }
              typeChar();
            }
            
            setTimeout(typeMsg, 800);
            
            function closeEgg() {
              overlay.style.opacity = '0';
              card.style.transform = 'translateY(20px)';
              setTimeout(() => {
                if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
              }, 500);
              clearTimeout(typeTimeout);
            }
            
            close.onclick = closeEgg;
            overlay.onclick = (e) => {
              if (e.target === overlay) closeEgg();
            };
          }

          /* ---------------- 粒子动效 (Canvas) ---------------- */
          const canvas = document.createElement('canvas');
          canvas.id = 'calliope-dust-canvas';
          canvas.style.cssText = 'position:fixed; inset:0; pointer-events:none; z-index:9999; opacity:0.8;';
          document.body.appendChild(canvas);

          const ctx2d = canvas.getContext('2d');
          let width, height;
          let animationFrameId;
          const particles = [];

          function resize() {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
          }
          window.addEventListener('resize', resize);
          resize();

          // 初始化雪花/尘埃粒子 (带物理属性)
          const particleCount = 90;
          for (let i = 0; i < particleCount; i++) {
            particles.push({
              x: Math.random() * width,
              y: Math.random() * height,
              radius: Math.random() * 1.2 + 0.3, // 基础半径调小，更接近真实尘埃
              baseOpacity: Math.random() * 0.4 + 0.1,
              vx: (Math.random() - 0.5) * 0.2, 
              vy: Math.random() * 0.3 + 0.1,
              phase: Math.random() * Math.PI * 2,
              phaseSpeed: Math.random() * 0.01 + 0.005
            });
          }

          // 鼠标与打字交互状态
          let mouse = { x: -1000, y: -1000, vx: 0, vy: 0, lastX: 0, lastY: 0 };
          
          const onMouseMove = (e) => {
            mouse.vx = e.clientX - mouse.lastX;
            mouse.vy = e.clientY - mouse.lastY;
            mouse.lastX = e.clientX;
            mouse.lastY = e.clientY;
            mouse.x = e.clientX;
            mouse.y = e.clientY;
          };

          const onKeyDown = () => {
            // 每次敲击键盘，给屏幕下方区域的粒子一个极其轻柔的向上冲击波
            particles.forEach(p => {
              if (p.y > height * 0.6 && p.x > width * 0.2 && p.x < width * 0.8) {
                p.vy -= Math.random() * 0.4 + 0.1; 
                p.vx += (Math.random() - 0.5) * 0.4;
              }
            });
          };

          window.addEventListener('mousemove', onMouseMove, { passive: true });
          window.addEventListener('keydown', onKeyDown, { passive: true });
          window.addEventListener('keydown', onKeyDownEaster);

          // 计算某个点是否在 225deg 光束内
          function getBeamLight(x, y, w, h) {
            const t = (w - x + y) / (w + h);
            let intensity = 0;
            if (t > 0.15 && t < 0.46) {
              const edge = Math.min(t - 0.15, 0.46 - t) / 0.04;
              intensity = Math.min(1, edge);
            } else if (t > 0.60 && t < 0.81) {
              const edge = Math.min(t - 0.60, 0.81 - t) / 0.04;
              intensity = Math.min(1, edge) * 0.6;
            }
            return intensity;
          }

          function draw() {
            ctx2d.clearRect(0, 0, width, height);

            particles.forEach(p => {
              // --- 物理计算 ---
              // 1. 基础空气阻力与重力
              p.vx *= 0.90; // 增加空气阻力，让速度更快平息
              p.vy *= 0.90;
              p.vy += 0.02; // 减弱基础重力

              // 2. 鼠标风场效应
              const dx = p.x - mouse.x;
              const dy = p.y - mouse.y;
              const dist = Math.sqrt(dx * dx + dy * dy);
              if (dist < 150) {
                const mouseSpeed = Math.sqrt(mouse.vx * mouse.vx + mouse.vy * mouse.vy);
                const force = (150 - dist) / 150;
                // 风力系数降低，鼠标像微风而不是飓风
                p.vx += (dx / dist) * force * (mouseSpeed * 0.015);
                p.vy += (dy / dist) * force * (mouseSpeed * 0.015);
              }

              // 3. 基础飘浮（正弦波）
              const targetVy = Math.sin(p.phase) * 0.2 + 0.3;
              
              // 限制最大速度，防止粒子飞得太快
              if (p.vy > 1.2) p.vy = 1.2;
              if (p.vy < -1.2) p.vy = -1.2;
              if (p.vx > 1.2) p.vx = 1.2;
              if (p.vx < -1.2) p.vx = -1.2;

              p.x += p.vx + Math.sin(p.phase) * 0.2;
              p.y += p.vy;

              // 边界重置
              if (p.y > height + 10) {
                p.y = -10;
                p.x = Math.random() * width;
              }
              if (p.x > width + 10) p.x = -10;
              if (p.x < -10) p.x = width + 10;

              // --- 渲染计算 ---
              p.phase += p.phaseSpeed;
              const light = getBeamLight(p.x, p.y, width, height);
              
              // 即使在光束中，也只稍微放大一点点（1.3倍），保持轻盈感
              const currentRadius = p.radius * (1 + light * 0.3);
              const currentOpacity = p.baseOpacity * (0.4 + light * 1.8);

              ctx2d.beginPath();
              ctx2d.arc(p.x, p.y, currentRadius, 0, Math.PI * 2);
              ctx2d.fillStyle = `rgba(255, 220, 140, ${Math.min(1, currentOpacity)})`;
              
              // 细微的光晕
              if (light > 0.5) {
                ctx2d.shadowBlur = 4;
                ctx2d.shadowColor = 'rgba(255, 200, 100, 0.6)';
              } else {
                ctx2d.shadowBlur = 0;
              }
              ctx2d.fill();
            });

            // 鼠标坐标重置并衰减（防止鼠标不动时风力持续）
            mouse.vx *= 0.8;
            mouse.vy *= 0.8;

            ctx2d.shadowBlur = 0;
            animationFrameId = requestAnimationFrame(draw);
          }
          draw();

          return () => {
            // 清理 DOM 和动画
            const styleEl = document.getElementById('calliope-dsh-theme-style');
            if (styleEl) styleEl.remove();
            
            const canvasEl = document.getElementById('calliope-dust-canvas');
            if (canvasEl) canvasEl.remove();
            
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('keydown', onKeyDown);
            window.removeEventListener('keydown', onKeyDownEaster);
            
            const eggEl = document.getElementById('calliope-egg');
            if (eggEl) eggEl.remove();
            
            const pawEl = document.getElementById('calliope-paw');
            if (pawEl) pawEl.remove();
            
            const triggerText = document.getElementById('calliope-trigger-text');
            if (triggerText) triggerText.remove();
            
            document.querySelectorAll('.calliope-snow').forEach(el => el.remove());
            
            clearTimeout(typeTimeout);
            
            cancelAnimationFrame(animationFrameId);
          };
        });
      },
    };
  },
});
