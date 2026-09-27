/**
 * ==========================================================================
 * CORE.JS — MESIN QUEST, PROGRESS TRACKER, & INTERAKSI BAHAN AJAR
 * Sesuai Spesifikasi: 02-KETENTUAN_PEMBUATAN.md, 04-DESIGN.md, 06-QUEST.md
 * Protokol: file:// 100% aman (Vanilla JS, Zero Dependency, Offline-First)
 * ==========================================================================
 */

(function () {
  'use strict';

  /* --------------------------------------------------------------------------
     1. PROGRESS TRACKER (OFFLINE STORAGE AMAN PROTOKOL FILE://)
     -------------------------------------------------------------------------- */
  const ProgressTracker = {
    getStorageKey: function (moduleId) {
      return `bahan-ajar-fase-1-progress-${moduleId || 'default'}`;
    },

    getCompletedQuests: function (moduleId) {
      try {
        const key = this.getStorageKey(moduleId);
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : [];
      } catch (e) {
        return [];
      }
    },

    saveCompletedQuest: function (moduleId, questId) {
      if (!questId) return;
      try {
        const completed = this.getCompletedQuests(moduleId);
        if (!completed.includes(questId)) {
          completed.push(questId);
          localStorage.setItem(this.getStorageKey(moduleId), JSON.stringify(completed));
        }
      } catch (e) {
        // Abaikan batasan localStorage pada beberapa browser
      }
      this.updateHeaderProgress(moduleId);
    },

    updateHeaderProgress: function (moduleId) {
      const badge = document.querySelector('.badge-meta--quest');
      if (!badge) return;

      const questElements = document.querySelectorAll('.block--quest, .quest-card, [data-quest-id]');
      const totalQuests = questElements.length;
      const completed = this.getCompletedQuests(moduleId);

      if (totalQuests > 0) {
        badge.innerHTML = ` Quest: <strong>${Math.min(completed.length, totalQuests)} / ${totalQuests}</strong>`;
      }
    },

    // Task Checklist Persistence
    saveTaskState: function (taskId, isChecked) {
      try {
        const key = `bahan-ajar-task-${taskId}`;
        if (isChecked) {
          localStorage.setItem(key, 'true');
        } else {
          localStorage.removeItem(key);
        }
      } catch (e) {}
    },

    getTaskState: function (taskId) {
      try {
        return localStorage.getItem(`bahan-ajar-task-${taskId}`) === 'true';
      } catch (e) {
        return false;
      }
    },

    restoreTasks: function () {
      const taskInputs = document.querySelectorAll('input[type="checkbox"][onchange*="saveTaskProgress"]');
      taskInputs.forEach((cb) => {
        const onchangeAttr = cb.getAttribute('onchange') || '';
        const match = onchangeAttr.match(/saveTaskProgress\(['"]([^'"]+)['"]/);
        if (match && match[1]) {
          const taskId = match[1];
          if (ProgressTracker.getTaskState(taskId)) {
            cb.checked = true;
          }
        }
      });
    }
  };


  /* --------------------------------------------------------------------------
     2. READING PROGRESS BAR & SCROLL SPY SUB-TOPIK
     -------------------------------------------------------------------------- */
  function initScrollProgress() {
    const progressBar = document.querySelector('.progress-bar');
    const sections = document.querySelectorAll('.subtopic-section, .section-card, section[id]');
    const navItems = document.querySelectorAll('.subtopic-nav-item');
    const mobileSelect = document.querySelector('.mobile-nav-select');

    function onScroll() {
      // 1. Update lebar progress bar
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

      if (progressBar) {
        progressBar.style.width = `${Math.min(100, Math.max(0, scrollPercent))}%`;
      }

      // 2. Scroll spy untuk sidebar & mobile dropdown
      let currentSectionId = '';
      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 140;
        const sectionHeight = section.offsetHeight;
        if (scrollTop >= sectionTop && scrollTop < sectionTop + sectionHeight) {
          currentSectionId = section.getAttribute('id');
        }
      });

      if (currentSectionId) {
        navItems.forEach((item) => {
          const link = item.querySelector('a');
          if (link) {
            const href = link.getAttribute('href') || '';
            const targetId = href.replace(/^#/, '');
            if (targetId === currentSectionId) {
              item.classList.add('active');
            } else {
              item.classList.remove('active');
            }
          }
        });

        if (mobileSelect) {
          const matchingOption = Array.from(mobileSelect.options).find(
            (opt) => opt.value === currentSectionId || opt.value === `#${currentSectionId}`
          );
          if (matchingOption && mobileSelect.value !== matchingOption.value) {
            mobileSelect.value = matchingOption.value;
          }
        }
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // Mobile Select Event
    if (mobileSelect) {
      mobileSelect.addEventListener('change', function () {
        const rawValue = this.value;
        const targetId = rawValue.replace(/^#/, '');
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
          targetSection.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }
  }


  /* --------------------------------------------------------------------------
     3. TOGGLE PANEL CATATAN MENTOR
     -------------------------------------------------------------------------- */
  function toggleMentorPanel(elementOrHeader) {
    const panel = elementOrHeader ? elementOrHeader.closest('.mentor-panel') : null;
    if (panel) {
      panel.classList.toggle('is-open');
    }
  }

  function initMentorPanels() {
    const mentorPanels = document.querySelectorAll('.mentor-panel');

    mentorPanels.forEach((panel) => {
      const header = panel.querySelector('.mentor-panel__header');
      if (header && !header.getAttribute('onclick')) {
        header.addEventListener('click', () => {
          panel.classList.toggle('is-open');
        });
      }
    });
  }


  /* --------------------------------------------------------------------------
     4. MESIN QUEST INTERAKTIF (DUAL-MODE: DATA-ATTR & GLOBAL METHODS)
     -------------------------------------------------------------------------- */
  const QuestEngine = {
    checkQuest: function (questId) {
      const questEl = document.getElementById(questId) || document.querySelector(`[data-quest-id="${questId}"]`);
      if (!questEl) return;

      const selectedInput = questEl.querySelector('input[type="radio"]:checked');
      const solutionPanel = document.getElementById(`ans-${questId}`) || questEl.querySelector('.quest-answer-panel, .quest-solution');

      if (!selectedInput) {
        alert('Pilih salah satu jawaban terlebih dahulu!');
        return;
      }

      const moduleId = document.body.getAttribute('data-module-id') || 'modul-1-1';

      if (solutionPanel) {
        solutionPanel.style.display = 'block';
        solutionPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }

      // Catat progres
      ProgressTracker.saveCompletedQuest(moduleId, questId);

      // Cek apakah ada animasi jawaban yang terhubung
      const animId = questEl.getAttribute('data-anim-answer');
      if (animId && window.AnimEngine) {
        setTimeout(() => {
          window.AnimEngine.play(animId);
        }, 300);
      }
    },

    toggleAnswer: function (questId) {
      const questEl = document.getElementById(questId) || document.querySelector(`[data-quest-id="${questId}"]`);
      const solutionPanel = document.getElementById(`ans-${questId}`) || (questEl ? questEl.querySelector('.quest-answer-panel, .quest-solution') : null);

      if (solutionPanel) {
        const isHidden = solutionPanel.style.display === 'none' || !solutionPanel.style.display || getComputedStyle(solutionPanel).display === 'none';
        solutionPanel.style.display = isHidden ? 'block' : 'none';

        if (isHidden) {
          const moduleId = document.body.getAttribute('data-module-id') || 'modul-1-1';
          ProgressTracker.saveCompletedQuest(moduleId, questId);

          const animId = questEl ? questEl.getAttribute('data-anim-answer') : null;
          if (animId && window.AnimEngine) {
            setTimeout(() => {
              window.AnimEngine.play(animId);
            }, 300);
          }
        }
      }
    },

    init: function () {
      const questBlocks = document.querySelectorAll('.block--quest, .quest-card');

      questBlocks.forEach((questEl) => {
        const questId = questEl.getAttribute('id') || questEl.getAttribute('data-quest-id');
        const revealBtn = questEl.querySelector('.btn-reveal');
        const solutionPanel = questEl.querySelector('.quest-solution, .quest-answer-panel');
        const hintToggle = questEl.querySelector('.quest-hint-toggle');
        const hintContent = questEl.querySelector('.quest-hint-content');
        const retryBtn = questEl.querySelector('.btn-quest-retry');

        // Toggle Petunjuk (Hint)
        if (hintToggle && hintContent) {
          hintToggle.addEventListener('click', () => {
            const isShown = hintContent.style.display === 'block';
            hintContent.style.display = isShown ? 'none' : 'block';
            hintToggle.innerHTML = isShown ? ' Buka Petunjuk' : ' Sembunyikan Petunjuk';
          });
        }

        // Tombol Tampilkan Jawaban (Data-attribute mode)
        if (revealBtn && solutionPanel && !revealBtn.getAttribute('onclick')) {
          revealBtn.addEventListener('click', () => {
            solutionPanel.style.display = 'block';
            revealBtn.style.display = 'none';

            if (questId) {
              const moduleId = document.body.getAttribute('data-module-id') || 'modul-1-1';
              ProgressTracker.saveCompletedQuest(moduleId, questId);
            }

            const animId = questEl.getAttribute('data-anim-answer');
            if (animId && window.AnimEngine) {
              setTimeout(() => {
                window.AnimEngine.play(animId);
              }, 300);
            }
          });
        }

        // Tombol Coba Lagi / Reset
        if (retryBtn && solutionPanel) {
          retryBtn.addEventListener('click', () => {
            solutionPanel.style.display = 'none';
            if (revealBtn) revealBtn.style.display = 'inline-flex';

            const inputs = questEl.querySelectorAll('input, textarea');
            inputs.forEach((input) => {
              if (input.type === 'radio' || input.type === 'checkbox') input.checked = false;
              else input.value = '';
            });

            const animId = questEl.getAttribute('data-anim-answer');
            if (animId && window.AnimEngine) {
              window.AnimEngine.reset(animId);
            }
          });
        }
      });

      // Update counter di header
      const currentModuleId = document.body.getAttribute('data-module-id') || 'modul-1-1';
      ProgressTracker.updateHeaderProgress(currentModuleId);
      ProgressTracker.restoreTasks();
    }
  };


  /* --------------------------------------------------------------------------
     5. TERMINAL CODE COPIER & CLIPBOARD HELPER
     -------------------------------------------------------------------------- */
  function copyTextToClipboard(text, onSuccess) {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(onSuccess).catch(() => {
        fallbackCopyText(text, onSuccess);
      });
    } else {
      fallbackCopyText(text, onSuccess);
    }
  }

  function fallbackCopyText(text, onSuccess) {
    try {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      if (onSuccess) onSuccess();
    } catch (e) {}
  }

  function copyTerminal(button) {
    const term = button.closest('.terminal') || (button.parentElement ? button.parentElement.closest('.terminal') : null);
    if (!term) return;

    const body = term.querySelector('.terminal__body');
    if (!body) return;

    const rawText = body.innerText || body.textContent || '';
    const textToCopy = rawText.replace(/^[a-zA-Z0-9_@~:\$-]+[#>]?\s*/gm, '').trim();

    copyTextToClipboard(textToCopy || rawText, () => {
      const originalText = button.textContent;
      button.textContent = 'v Tersalin!';
      setTimeout(() => {
        button.textContent = originalText;
      }, 2000);
    });
  }

  function initTerminals() {
    const terminals = document.querySelectorAll('.terminal');

    terminals.forEach((term) => {
      const bar = term.querySelector('.terminal__bar');
      const body = term.querySelector('.terminal__body');
      if (!bar || !body) return;

      if (!bar.querySelector('.terminal__copy') && !bar.querySelector('.btn-copy-term')) {
        const copyBtn = document.createElement('button');
        copyBtn.className = 'btn-copy-term';
        copyBtn.textContent = 'Salin Perintah';
        copyBtn.type = 'button';

        copyBtn.addEventListener('click', () => {
          copyTerminal(copyBtn);
        });

        bar.appendChild(copyBtn);
      }
    });
  }


  /* --------------------------------------------------------------------------
     6. AUTOMATIC RESPONSIVE TABLES WRAPPER
     -------------------------------------------------------------------------- */
  function makeTablesResponsive() {
    const tables = document.querySelectorAll('table');
    tables.forEach((tbl) => {
      if (!tbl.closest('.table-responsive') && !tbl.closest('.table-wrapper') && !tbl.closest('.binary-table-container')) {
        const wrapper = document.createElement('div');
        wrapper.className = 'table-responsive';
        tbl.parentNode.insertBefore(wrapper, tbl);
        wrapper.appendChild(tbl);
      }
    });
  }


  /* --------------------------------------------------------------------------
     7. INISIALISASI UTAMA SAAT DOKUMEN SIAP
     -------------------------------------------------------------------------- */
  document.addEventListener('DOMContentLoaded', () => {
    makeTablesResponsive();
    initScrollProgress();
    initMentorPanels();
    QuestEngine.init();
    initTerminals();
  });

  // Ekspor API Global (Kompatibel dengan seluruh modul)
  window.Core = {
    ProgressTracker: ProgressTracker,
    QuestEngine: QuestEngine,
    checkQuest: QuestEngine.checkQuest,
    toggleAnswer: QuestEngine.toggleAnswer,
    toggleMentorPanel: toggleMentorPanel,
    copyTerminal: copyTerminal,
    saveTaskProgress: function (taskId, isChecked) {
      ProgressTracker.saveTaskState(taskId, isChecked);
    }
  };
})();
