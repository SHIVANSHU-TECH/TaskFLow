
import React, { useEffect, useState } from 'react';
import { getTasks, createTask, updateTask, deleteTask } from '../services/taskService';
import { Task } from '../types';
import TaskItem from '../components/TaskItem';
import Modal from '../components/Modal';
import TaskForm from '../components/TaskForm';
import { FaPlus, FaSearch, FaFilter } from 'react-icons/fa';

const Dashboard = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  
  // Filters
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const fetchTasks = async () => {
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (error) {
      console.error('Failed to fetch tasks', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCreate = async (taskData: any) => {
    try {
      const newTask = await createTask(taskData);
      setTasks([newTask, ...tasks]);
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = async (taskData: any) => {
    if (!editingTask) return;
    try {
      const updated = await updateTask(editingTask._id, taskData);
      setTasks(tasks.map(t => t._id === editingTask._id ? updated : t));
      setIsModalOpen(false);
      setEditingTask(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await deleteTask(id);
        setTasks(tasks.filter(t => t._id !== id));
      } catch (error) {
        console.error(error);
      }
    }
  };

  const openCreateModal = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const openEditModal = (task: Task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const filteredTasks = tasks.filter(task => {
    const matchesStatus = filterStatus === 'all' || task.status === filterStatus;
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          task.description?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pb-20">
      {/* Header Section with subtle gradient background */}
      <div className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 py-6 sm:py-8 px-4 sm:px-6 lg:px-8 mb-6 sm:mb-8">
        <div className="container mx-auto max-w-6xl">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-white tracking-tight">My Tasks</h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm sm:text-base">Manage your productivity and track progress.</p>
                </div>
                <button
                onClick={openCreateModal}
                className="w-full md:w-auto flex items-center justify-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:shadow-xl active:scale-95 transition-all duration-200"
                >
                <FaPlus size={14} /> 
                <span>New Task</span>
                </button>
            </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        {/* Controls Bar */}
        <div className="glass-card rounded-2xl p-2 mb-8 flex flex-col md:flex-row gap-3 shadow-sm border border-slate-200/60">
            <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <FaSearch className="text-slate-400" />
                </div>
                <input
                    type="text"
                    placeholder="Search tasks by title or description..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-transparent border-none focus:ring-0 text-slate-700 placeholder-slate-400 dark:text-white text-sm sm:text-base"
                />
            </div>
            <div className="h-px md:h-auto md:w-px bg-slate-200 dark:bg-slate-700 mx-2 hidden md:block"></div>
            <div className="relative md:w-48">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaFilter className="text-slate-400" size={12} />
                </div>
                <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="w-full pl-8 pr-8 py-3 bg-transparent border-none focus:ring-0 text-slate-600 font-medium cursor-pointer dark:text-slate-300 appearance-none text-sm sm:text-base border-t md:border-t-0 border-slate-100 md:border-none"
                >
                    <option value="all">All Statuses</option>
                    <option value="pending">To Do</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                </select>
                 <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
            </div>
        </div>

        {/* Content Area */}
        {loading ? (
            <div className="flex flex-col items-center justify-center py-20 text-slate-400 animate-pulse">
                <div className="w-16 h-16 bg-slate-200 rounded-full mb-4"></div>
                <div className="h-4 bg-slate-200 rounded w-48"></div>
            </div>
        ) : filteredTasks.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 bg-white/50 border-2 border-dashed border-slate-200 rounded-2xl text-center px-4">
                <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mb-4 text-indigo-300">
                    <FaPlus size={30} />
                </div>
                <h3 className="text-xl font-bold text-slate-700">No tasks found</h3>
                <p className="text-slate-500 mt-2 max-w-xs mx-auto text-sm sm:text-base">
                    {searchQuery ? "Try adjusting your search or filters." : "Get started by creating your first task above!"}
                </p>
            </div>
        ) : (
            <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 animate-fade-in-up">
            {filteredTasks.map(task => (
                <TaskItem
                key={task._id}
                task={task}
                onEdit={openEditModal}
                onDelete={handleDelete}
                />
            ))}
            </div>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingTask ? 'Edit Task' : 'Create New Task'}
      >
        <TaskForm
          initialData={editingTask}
          onSubmit={editingTask ? handleUpdate : handleCreate}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default Dashboard;
