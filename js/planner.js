/**
 * COS 106 – Introduction to Web Technologies | Practical Term Project
 * Student: Prince Chimenem Godspower
 * File: js/planner.js
 * Description: Interactive Academic Planner featuring dynamic task creation,
 * status toggling, deletion with animations, completion tracking, localStorage persistence,
 * and multi-state filtering.
 */

document.addEventListener('DOMContentLoaded', () => {
  initAcademicPlanner();
});

function initAcademicPlanner() {
  // DOM References
  const taskForm = document.getElementById('task-form');
  const taskTitleInput = document.getElementById('task-title');
  const taskCourseInput = document.getElementById('task-course');
  const taskDueDateInput = document.getElementById('task-duedate');
  const taskPriorityInput = document.getElementById('task-priority');
  const taskListContainer = document.getElementById('task-items-container');
  const emptyStateEl = document.getElementById('task-empty-state');
  
  // Counter and Progress DOM references
  const totalTasksCountEl = document.getElementById('total-tasks-count');
  const completedTasksCountEl = document.getElementById('completed-tasks-count');
  const pendingTasksCountEl = document.getElementById('pending-tasks-count');
  const progressPercentEl = document.getElementById('progress-percent');
  const progressBarEl = document.getElementById('planner-progress-bar');
  
  // Filter buttons
  const filterButtons = document.querySelectorAll('.task-filter-btn');

  // Storage Key
  const STORAGE_KEY = 'pcg_academic_tasks';

  // State
  let currentFilter = 'all'; // 'all' | 'active' | 'completed'
  let tasks = loadTasksFromStorage();

  // If no tasks exist, pre-seed with realistic academic coursework tasks
  if (tasks.length === 0) {
    tasks = [
      {
        id: 'task_' + Date.now() + '_1',
        title: 'Complete COS 106 Web Technologies Term Project & Deploy',
        course: 'COS 106',
        dueDate: '2026-11-20',
        priority: 'High',
        completed: false,
        createdAt: new Date().toISOString()
      },
      {
        id: 'task_' + Date.now() + '_2',
        title: 'Synthesize MIVA South-South SQL Mentorship Workshop Deck',
        course: 'DSC 201',
        dueDate: '2026-11-25',
        priority: 'Medium',
        completed: true,
        createdAt: new Date().toISOString()
      },
      {
        id: 'task_' + Date.now() + '_3',
        title: 'Review Spatial Autocorrelation & Moran I Index for Agri-Carbon Paper',
        course: 'MTH 102',
        dueDate: '2026-11-30',
        priority: 'High',
        completed: false,
        createdAt: new Date().toISOString()
      }
    ];
    saveTasksToStorage(tasks);
  }

  // Initial render
  renderTasks();
  updateMetrics();

  // Form Submission Event Handler
  if (taskForm) {
    taskForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const title = taskTitleInput.value.trim();
      const course = taskCourseInput.value.trim() || 'General';
      const dueDate = taskDueDateInput.value || 'No date';
      const priority = taskPriorityInput.value || 'Medium';

      // Validation: Title cannot be empty
      if (!title) {
        showInputError(taskTitleInput, 'Please enter a valid task title.');
        return;
      }
      clearInputError(taskTitleInput);

      // Create new task object
      const newTask = {
        id: 'task_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
        title,
        course,
        dueDate,
        priority,
        completed: false,
        createdAt: new Date().toISOString()
      };

      // Add to array (unshift to place newest at top)
      tasks.unshift(newTask);
      saveTasksToStorage(tasks);

      // Reset form and re-render
      taskForm.reset();
      renderTasks();
      updateMetrics();
    });

    // Clear error message on typing
    taskTitleInput.addEventListener('input', () => {
      if (taskTitleInput.value.trim()) {
        clearInputError(taskTitleInput);
      }
    });
  }

  // Filter Buttons Event Handlers
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.getAttribute('data-filter') || 'all';
      renderTasks();
    });
  });

  /**
   * Render tasks into the DOM according to active filter
   */
  function renderTasks() {
    taskListContainer.innerHTML = '';

    // Filter array
    const filteredTasks = tasks.filter(task => {
      if (currentFilter === 'active') return !task.completed;
      if (currentFilter === 'completed') return task.completed;
      return true; // 'all'
    });

    // Toggle Empty State Visibility
    if (filteredTasks.length === 0) {
      if (emptyStateEl) emptyStateEl.style.display = 'block';
    } else {
      if (emptyStateEl) emptyStateEl.style.display = 'none';
    }

    // Build DOM elements dynamically
    filteredTasks.forEach(task => {
      const taskItem = document.createElement('article');
      taskItem.className = `task-item ${task.completed ? 'completed' : ''}`;
      taskItem.dataset.id = task.id;

      // Priority CSS class
      const priorityClass = `priority-${task.priority.toLowerCase()}`;

      taskItem.innerHTML = `
        <div class="task-left">
          <input 
            type="checkbox" 
            class="task-checkbox-custom" 
            aria-label="Mark task as complete"
            ${task.completed ? 'checked' : ''}
          >
          <div class="task-content">
            <h4 class="task-title">${escapeHTML(task.title)}</h4>
            <div class="task-meta">
              <span><strong>${escapeHTML(task.course)}</strong></span>
              <span>·</span>
              <span>Due: ${escapeHTML(task.dueDate)}</span>
              <span>·</span>
              <span class="task-priority-tag ${priorityClass}">${escapeHTML(task.priority)}</span>
            </div>
          </div>
        </div>
        <button 
          class="task-delete-btn" 
          aria-label="Delete task ${escapeHTML(task.title)}"
          title="Delete task"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            <line x1="10" y1="11" x2="10" y2="17"></line>
            <line x1="14" y1="11" x2="14" y2="17"></line>
          </svg>
        </button>
      `;

      // Event: Toggle Completed
      const checkbox = taskItem.querySelector('.task-checkbox-custom');
      checkbox.addEventListener('change', () => {
        toggleTaskCompletion(task.id, checkbox.checked, taskItem);
      });

      // Event: Delete Task with animated collapse
      const deleteBtn = taskItem.querySelector('.task-delete-btn');
      deleteBtn.addEventListener('click', () => {
        deleteTaskWithAnimation(task.id, taskItem);
      });

      taskListContainer.appendChild(taskItem);
    });
  }

  /**
   * Toggle completion state for a task
   */
  function toggleTaskCompletion(taskId, isCompleted, taskElement) {
    const taskIndex = tasks.findIndex(t => t.id === taskId);
    if (taskIndex !== -1) {
      tasks[taskIndex].completed = isCompleted;
      saveTasksToStorage(tasks);
      
      if (isCompleted) {
        taskElement.classList.add('completed');
      } else {
        taskElement.classList.remove('completed');
      }

      updateMetrics();

      // If active filter is non-all, re-filter after a short delay for smooth UI feedback
      if (currentFilter !== 'all') {
        setTimeout(renderTasks, 250);
      }
    }
  }

  /**
   * Delete task with smooth CSS animation
   */
  function deleteTaskWithAnimation(taskId, taskElement) {
    taskElement.classList.add('task-removing');
    setTimeout(() => {
      tasks = tasks.filter(t => t.id !== taskId);
      saveTasksToStorage(tasks);
      renderTasks();
      updateMetrics();
    }, 280);
  }

  /**
   * Recalculate and display metrics in the counters and progress bar
   */
  function updateMetrics() {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const pending = total - completed;
    const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

    if (totalTasksCountEl) totalTasksCountEl.textContent = total;
    if (completedTasksCountEl) completedTasksCountEl.textContent = completed;
    if (pendingTasksCountEl) pendingTasksCountEl.textContent = pending;
    if (progressPercentEl) progressPercentEl.textContent = `${percent}%`;
    if (progressBarEl) progressBarEl.style.width = `${percent}%`;
  }

  /**
   * Helper: Show input error
   */
  function showInputError(inputEl, message) {
    const group = inputEl.closest('.form-group');
    if (!group) return;
    group.classList.add('has-error');
    const errorEl = group.querySelector('.form-error-msg');
    if (errorEl) errorEl.textContent = message;
    inputEl.focus();
  }

  /**
   * Helper: Clear input error
   */
  function clearInputError(inputEl) {
    const group = inputEl.closest('.form-group');
    if (!group) return;
    group.classList.remove('has-error');
  }

  /**
   * Helper: Escape HTML to prevent XSS
   */
  function escapeHTML(str) {
    return String(str).replace(/[&<>'"]/g, tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag));
  }

  /**
   * LocalStorage Helpers
   */
  function loadTasksFromStorage() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (err) {
      console.error('Error loading tasks from localStorage', err);
      return [];
    }
  }

  function saveTasksToStorage(data) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (err) {
      console.error('Error saving tasks to localStorage', err);
    }
  }
}
