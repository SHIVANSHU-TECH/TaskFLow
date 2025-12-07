
import React from 'react';
import { Task } from '../types';
import { FaEdit, FaTrash, FaCalendarAlt, FaFlag } from 'react-icons/fa';

interface TaskItemProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

const statusConfig: Record<string, { bg: string, text: string, label: string }> = {
  pending: { bg: 'bg-blue-50', text: 'text-blue-700', label: 'To Do' },
  'in-progress': { bg: 'bg-amber-50', text: 'text-amber-700', label: 'In Progress' },
  completed: { bg: 'bg-emerald-50', text: 'text-emerald-700', label: 'Done' },
};

const priorityConfig: Record<string, { color: string }> = {
  low: { color: 'text-emerald-500' },
  medium: { color: 'text-amber-500' },
  high: { color: 'text-rose-500' },
};

const TaskItem: React.FC<TaskItemProps> = ({ task, onEdit, onDelete }) => {
  const status = statusConfig[task.status] || statusConfig['pending'];
  const priority = priorityConfig[task.priority] || priorityConfig['medium'];

  return (
    <div className="group bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full relative overflow-hidden">
      {/* Decorative top border based on priority */}
      <div className={`absolute top-0 left-0 w-full h-1 ${task.priority === 'high' ? 'bg-rose-500' : task.priority === 'medium' ? 'bg-amber-500' : 'bg-emerald-500'} opacity-80`} />

      <div className="flex justify-between items-start mb-3 mt-1">
        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${status.bg} ${status.text} ring-1 ring-inset ring-opacity-20`}>
          {status.label}
        </span>
        
        <div className="flex gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={() => onEdit(task)}
            className="p-2 md:p-1.5 text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors"
            title="Edit"
          >
            <FaEdit size={14} />
          </button>
          <button
            onClick={() => onDelete(task._id)}
            className="p-2 md:p-1.5 text-rose-600 bg-rose-50 rounded-lg hover:bg-rose-100 transition-colors"
            title="Delete"
          >
            <FaTrash size={14} />
          </button>
        </div>
      </div>

      <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2 leading-tight line-clamp-1 group-hover:text-indigo-600 transition-colors">
        {task.title}
      </h3>
      
      <p className="text-slate-500 dark:text-slate-400 text-sm mb-5 line-clamp-2 leading-relaxed flex-grow">
        {task.description || <span className="italic opacity-60">No description provided.</span>}
      </p>

      <div className="flex items-center justify-between pt-4 border-t border-slate-50 dark:border-slate-700 text-xs font-medium text-slate-400">
        <div className="flex items-center gap-1.5">
           <FaCalendarAlt className="text-indigo-400" />
           <span>{task.dueDate ? new Date(task.dueDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) : 'No Date'}</span>
        </div>

        <div className={`flex items-center gap-1.5 uppercase tracking-wide ${priority.color}`}>
           <FaFlag />
           <span>{task.priority}</span>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
